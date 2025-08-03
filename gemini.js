// gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.GEMINI_API_KEY; // Use environment variable

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateReply(prompt) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("❌ Error saat generateReply:", error.message);
    return "Maaf, bot sedang mengalami gangguan.";
  }
}

module.exports = { generateReply };
