
import { GoogleGenAI, Type } from "@google/genai";

export async function generateTrainingPreview(userData: {
  goal: string;
  routine: string;
  limitations: string;
}) {
  const getSafeApiKey = () => {
    try {
      // Uso de optional chaining para evitar crash se process.env não existir
      return (window as any).process?.env?.API_KEY || "";
    } catch {
      return "";
    }
  };

  const apiKey = getSafeApiKey();

  // FALLBACK: Simulação elegante se não houver chave
  if (!apiKey || apiKey === "SUA_CHAVE_AQUI") {
    console.warn("API_KEY não detectada. Ativando modo de simulação Elite.");
    await new Promise(resolve => setTimeout(resolve, 2000));

    const goal = userData.goal.toLowerCase();
    const isHypertrophy = goal.includes("ganho") || goal.includes("massa") || goal.includes("hipertrofia");

    return {
      analysis: `Protocolo estratificado para "${userData.goal}". Identificamos uma necessidade de ajuste na curva de cortisol matinal devido à sua rotina. Recomendamos foco em densidade metabólica.`,
      pillars: [
        { 
          title: isHypertrophy ? "Tensão Mecânica" : "Eficiência Lipídica", 
          description: isHypertrophy 
            ? "Foco em microlesões controladas com tempo de sob tensão (TUT) estendido." 
            : "Protocolos de cardio de baixa intensidade para otimização da oxidação de gordura."
        },
        { 
          title: "Ajuste Biomecânico", 
          description: "Correção de padrões posturais decorrentes da rotina de escritório para evitar sobrecarga lombar." 
        },
        { 
          title: "Gestão de Recovery", 
          description: "Implementação de higiene do sono e mobilidade ativa para acelerar a síntese proteica." 
        }
      ]
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o perfil para treino de personal trainer de luxo: 
      Objetivo: ${userData.goal}, Rotina: ${userData.routine}, Limitações: ${userData.limitations}. 
      Retorne uma análise curta e 3 pilares técnicos fundamentais em JSON.`,
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
    console.error("Erro na inteligência artificial:", error);
    return null;
  }
}
