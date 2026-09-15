const { PDFParse } = require('pdf-parse');

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const uint8Array = new Uint8Array(arrayBuffer);
    const parser = new PDFParse(uint8Array);
    await parser.load();
    const textResult = await parser.getText();
    const rawText = textResult.text;

    if (!rawText || rawText.trim() === '') {
      return Response.json({ error: 'Could not extract text from PDF' }, { status: 400 });
    }

    return Response.json({ success: true, text: rawText });
  } catch (error) {
    console.error('PDF Extract Error:', error);
    return Response.json({ error: 'Failed to extract text from PDF' }, { status: 500 });
  }
}
