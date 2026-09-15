import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { jobDescription, resumeData } = await req.json();

    if (!jobDescription || !resumeData) {
      return Response.json({ error: 'Missing job description or resume data' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

    const prompt = `
      You are an expert ATS (Applicant Tracking System) algorithm and a professional career coach.
      Analyze the provided Resume JSON against the Target Job Description.
      
      Your goal is to accurately calculate a match score out of 100 based on how well the candidate's skills and experience match the job description requirements.
      You must also extract exactly which critical keywords from the job description are present in the resume, and which are missing.
      Finally, provide 2-3 highly actionable recommendations on how the candidate can improve their resume specifically for this job.

      You MUST respond ONLY with a raw JSON object matching this schema (do NOT include markdown formatting like \`\`\`json):
      {
        "score": 85,
        "foundKeywords": ["React", "JavaScript", "Agile"],
        "missingKeywords": ["GraphQL", "Docker"],
        "recommendations": [
          "Add Docker to your skills section as it is mentioned as a requirement.",
          "Quantify your experience leading Agile sprints with specific team sizes."
        ]
      }

      Target Job Description:
      """
      ${jobDescription}
      """

      Candidate Resume (JSON format):
      """
      ${resumeData}
      """
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up response in case it includes markdown backticks
    const cleanedJsonString = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsedData = JSON.parse(cleanedJsonString);

    return Response.json({ success: true, data: parsedData });
  } catch (error) {
    console.error('AI ATS Error:', error);
    return Response.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}
