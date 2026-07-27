import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChat = async (req, res) => {
  const { prompt, history } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_gemini_api_key')) {
    console.log('ℹ️ GEMINI_API_KEY is unconfigured. Returning intelligent fallback response.');
    return res.json({
      success: true,
      reply: `Greetings! I am the Nightingale AI Culinary Assistant for Bigger Nightingale Manufacturing. 

I can help you discover delicious budget-friendly recipes (under $3/serving), plan meals offline using pantry ingredients, or answer questions about our Nightingale Lite & Cloud Sync apps! 

(Motto: "Big ideas, beautiful design. I am using Antigravity by the way.")`
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash (free tier compatible model)
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: `You are the AI Culinary Assistant for "Bigger Nightingale Manufacturing".
Your company builds a cloud and 100% offline budget recipe discovery app tailored for budget-conscious home cooks.
Tagline/Motto: "Big ideas, beautiful design. I am using Antigravity by the way."
Vibe: Luxurious, elegant, and kind.
Your job: Answer user questions about budget recipe ideas, zero-food-waste pantry matching, meal planning, and Nightingale app features (Nightingale Lite Offline Edition, Cloud Sync Pro, Household Suite).
Keep responses concise, helpful, and polite.`
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({
      success: true,
      reply: text
    });
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    return res.json({
      success: true,
      reply: `I am currently operating in local offline assistant mode. Feel free to ask me about our budget recipe discovery features, zero-waste pantry matcher, or offline app download!`
    });
  }
};
