
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIRecommendation = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert in free and open-source software (FOSS) for students. 
      The user is looking for a free alternative to a paid software or has a specific need. 
      Analyze the request: "${userPrompt}"
      Return a response in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedTools: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  paidAlternative: { type: Type.STRING },
                  description: { type: Type.STRING },
                  whyRecommend: { type: Type.STRING },
                  officialLink: { type: Type.STRING }
                },
                required: ["name", "paidAlternative", "description", "whyRecommend", "officialLink"]
              }
            },
            advice: { type: Type.STRING }
          },
          required: ["recommendedTools", "advice"]
        }
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { error: "Failed to get AI recommendation. Please try again later." };
  }
};
