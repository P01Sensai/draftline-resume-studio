import { GoogleGenerativeAI } from '@google/generative-ai';
import pdfParse from 'pdf-parse/lib/pdf-parse';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const rawText = pdfData.text;

    if (!rawText || rawText.trim() === '') {
      return Response.json({ error: 'Could not extract text from PDF' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `
      You are an expert resume data extractor. 
      I will provide you with the raw, unformatted text extracted from a PDF resume. 
      Your job is to parse this text and structure it EXACTLY into the following JSON format.
      Do NOT include markdown formatting (like \`\`\`json). Return ONLY raw JSON.

      JSON Schema requirement:
      {
        "personal": {
          "name": "Full Name",
          "title": "Professional Title (e.g. Software Engineer)",
          "email": "email@example.com",
          "phone": "Phone number",
          "location": "City, State",
          "website": "URL (LinkedIn, GitHub, or Portfolio)"
        },
        "summary": "A 2-4 sentence professional summary. If not explicitly present, synthesize one based on their experience.",
        "experience": [
          {
            "id": "generate-a-unique-string-id-1",
            "company": "Company Name",
            "role": "Job Title",
            "start": "Month Year (e.g. Jan 2020)",
            "end": "Month Year or Present",
            "bullets": [
              "Bullet point 1 (action oriented)",
              "Bullet point 2 (metric driven)",
              "Bullet point 3"
            ]
          }
        ],
        "education": [
          {
            "id": "generate-a-unique-string-id-edu-1",
            "school": "University Name",
            "degree": "Degree (e.g. B.S. Computer Science)",
            "start": "Year",
            "end": "Year"
          }
        ],
        "skills": ["Skill 1", "Skill 2", "Skill 3"]
      }

      Raw Resume Text:
      """
      ${rawText}
      """
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up response in case it includes markdown backticks
    const cleanedJsonString = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsedData = JSON.parse(cleanedJsonString);

    return Response.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('AI Parse Error:', error);
    return Response.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}
