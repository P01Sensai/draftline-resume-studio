import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const { text, role, company, tone, type } = await req.json();

    if (!text || text.trim() === '') {
      return Response.json({ error: 'Text is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
    const isSummary = type === 'summary';
    const isCover = type === 'cover';

    let textTypeDesc = 'resume bullet point';
    let contextDesc = `Context: The user worked as a ${role || 'professional'} at ${company || 'a company'}.`;
    let toneActionDesc = 'starts with strong action verbs and emphasizes metrics';
    
    if (isSummary) {
      textTypeDesc = 'professional summary paragraph';
      contextDesc = `Context: The user is a ${role || 'professional'}.`;
      toneActionDesc = 'dynamic and achievement-focused';
    } else if (isCover) {
      textTypeDesc = 'cover letter body';
      contextDesc = `Context: The user is a ${role || 'professional'} writing a cover letter for ${company || 'a target company'}.`;
      toneActionDesc = 'persuasive, professional, and enthusiastic';
    }

    const prompt = `
      You are an expert career coach and resume writer. Rewrite the following ${textTypeDesc} to make it more impactful.
      ${contextDesc}
      Tone: ${tone || 'Professional'} (Ensure the output matches this tone: Professional = corporate and standard, Concise = short and to the point, Action-Oriented = ${toneActionDesc}, Creative = slightly more descriptive).
      Original Text: "${text}"
      
      Return ONLY the rewritten ${textTypeDesc}. Do not include quotes, explanations, or introductory text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text().replace(/^["']|["']$/g, '').trim();

    return Response.json({ result: generatedText });
  } catch (error) {
    console.error('AI Error:', error);
    return Response.json({ error: 'Failed to generate content' }, { status: 500 });
  }
}
