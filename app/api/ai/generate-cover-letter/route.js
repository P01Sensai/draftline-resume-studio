import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { resume, role, company } = await request.json();

    if (!resume || !role || !company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const prompt = `
You are an expert career coach and professional copywriter.
Write a highly compelling, professional cover letter body based on the following candidate's resume, tailored for the role of "${role}" at the company "${company}".

CANDIDATE RESUME DATA:
${JSON.stringify(resume, null, 2)}

INSTRUCTIONS:
1. ONLY write the body of the cover letter. DO NOT include the recipient's name, company address, date, salutation (e.g., "Dear Hiring Manager"), or closing (e.g., "Sincerely, [Name]"). Just the paragraphs.
2. The letter should be 3-4 paragraphs max.
3. Hook the reader immediately in the first paragraph.
4. Highlight 2-3 specific achievements from the resume that prove the candidate is a strong fit for a ${role} role. Use metrics if available.
5. Keep the tone confident, professional, and slightly enthusiastic.
6. Do NOT invent or hallucinate any facts, skills, or experiences not present in the resume data.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const response = await model.generateContent(prompt);
    
    const generatedText = response.response.text();

    return NextResponse.json({ result: generatedText.trim() });
  } catch (error) {
    console.error('AI Cover Letter Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter.' }, { status: 500 });
  }
}
