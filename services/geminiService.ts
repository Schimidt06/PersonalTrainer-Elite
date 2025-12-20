
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  // Acesso seguro ao process.env para evitar crash em browsers puros
  const getApiKey = () => {
    try {
      return process.env.API_KEY;
    } catch (e) {
      return undefined;
    }
  };

  const apiKey = getApiKey();

  // Simulação local caso a chave não esteja presente ou seja o valor padrão
  if (!apiKey || apiKey === "SUA_CHAVE_AQUI" || apiKey === "") {
    console.info("Simulando análise de performance...");
    await new Promise(resolve => setTimeout(resolve, 1500));

    const goalLower = userData.goal.toLowerCase();
    
    let mockData = {
      analysis: `Protocolo identificado para "${userData.goal}". Sua rotina executiva demanda um ajuste fino de densidade metabólica para evitar o estresse oxidativo excessivo.`,
      pillars: [
        { title: "Densidade Progressiva", description: "Foco em intervalos de descanso curtos para otimizar a queima calórica pós-treino." },
        { title: "Neuro-Recrutamento", description: "Técnicas de pré-exaustão para garantir ativação total mesmo com cargas moderadas." },
        { title: "Recuperação Ativa", description: "Estratégias de mobilidade diária para neutralizar os efeitos da postura sentada." }
      ]
    };

    if (goalLower.includes("ganho") || goalLower.includes("massa")) {
      mockData.pillars[0] = { title: "Hipertrofia Miofibrilar", description: "Estímulo de alta tensão mecânica focado em microlesões controladas." };
    }

    return mockData;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise para treinamento de elite: Objetivo: ${userData.goal}, Rotina: ${userData.routine}, Limitações: ${userData.limitations}. Retorne análise e 3 pilares técnicos.`,
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

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Erro na chamada Gemini:", error);
    return null;
  }
}
