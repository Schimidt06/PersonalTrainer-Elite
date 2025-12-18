
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client once with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  try {
    // Generate content using the recommended model for complex text tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise brevemente este perfil para um treinamento de elite:
      Objetivo: ${userData.goal}
      Rotina: ${userData.routine}
      Limitações: ${userData.limitations}
      
      Forneça 3 pilares estratégicos que um personal de alta performance aplicaria para este caso específico. Seja sofisticado e direto.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            pillars: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: ["title", "description"]
              }
            }
          },
          required: ["analysis", "pillars"]
        }
      }
    });

    // Access the .text property directly (not as a method) as per guidelines.
    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("Model returned empty or invalid text.");
    }

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
