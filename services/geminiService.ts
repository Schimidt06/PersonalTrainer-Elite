
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  try {
    // Inicializa dentro da função para garantir que process.env esteja disponível
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY não encontrada. Verifique as variáveis de ambiente.");
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
