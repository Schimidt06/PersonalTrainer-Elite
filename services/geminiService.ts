
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  const apiKey = process.env.API_KEY;

  // Se não houver chave, simulamos a resposta da IA com alta qualidade
  if (!apiKey || apiKey === "SUA_CHAVE_AQUI") {
    console.info("API_KEY não detectada. Utilizando motor de simulação local.");
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula latência de rede

    const goalLower = userData.goal.toLowerCase();
    
    let mockData = {
      analysis: `Com base no seu objetivo de "${userData.goal}", detectamos uma oportunidade de otimização metabólica significativa. Sua rotina exige um protocolo de densidade específica para evitar o platô biológico.`,
      pillars: [
        { title: "Periodização Não-Linear", description: "Ajuste diário de volume para compensar o estresse da sua rotina atual." },
        { title: "Eficiência Neuromuscular", description: "Foco em recrutamento de fibras do tipo II para resultados estéticos rápidos." },
        { title: "Gestão do Cortisol", description: "Treinos curtos e intensos para preservar a massa magra sob estresse." }
      ]
    };

    if (goalLower.includes("perda") || goalLower.includes("emagrecer") || goalLower.includes("secar")) {
      mockData.pillars[0] = { title: "Protocolo EPOC Avançado", description: "Estímulo metabólico que mantém o consumo de oxigênio elevado por até 36h." };
    } else if (goalLower.includes("ganho") || goalLower.includes("massa") || goalLower.includes("muscular")) {
      mockData.pillars[0] = { title: "Tensão Mecânica Progressiva", description: "Micro-ajustes de carga focados em tempo sob tensão para hipertrofia máxima." };
    }

    return mockData;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise este perfil para treinamento de elite: Objetivo: ${userData.goal}, Rotina: ${userData.routine}, Limitações: ${userData.limitations}. Forneça 3 pilares estratégicos sofisticados.`,
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
    console.error("Gemini Error:", error);
    return null;
  }
}
