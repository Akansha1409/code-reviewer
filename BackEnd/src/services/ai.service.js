const Groq = require("groq-sdk");

// This uses your Groq Key correctly
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateContent(prompt) {
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are an expert code reviewer with 7+ years of experience. 
                    Focus on Code Quality, Best Practices, Performance, and Security.
                    Provide structured feedback with ❌ Bad Code, 🔍 Issues, ✅ Recommended Fix, and 💡 Improvements.`
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq API Error:", error);
        return "⚠️ AI Service is currently unavailable. Please check your API key and limits.";
    }
}

module.exports = generateContent;
