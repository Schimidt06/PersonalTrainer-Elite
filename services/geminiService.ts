
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY não configurada nas variáveis de ambiente da Vercel.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
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

    const text = response.text;
    if (!text) {
      throw new Error("Resposta vazia do modelo.");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Erro no Gemini Service:", error);
    return null;
  }
}
