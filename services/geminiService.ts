import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { PlantAnalysis } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const careInstructionsSchema = {
    type: Type.OBJECT,
    properties: {
        watering: { type: Type.STRING, description: "Instrucciones detalladas de riego." },
        sunlight: { type: Type.STRING, description: "Requisitos de luz solar." },
        soil: { type: Type.STRING, description: "Tipo de suelo ideal." },
        fertilizer: { type: Type.STRING, description: "Recomendaciones de fertilizante." }
    },
    required: ["watering", "sunlight", "soil", "fertilizer"],
};

const healthCareSchema = {
    type: Type.OBJECT,
    properties: {
        pestControl: { type: Type.STRING, description: "Consejos para prevenir y controlar plagas y enfermedades comunes." },
        pruning: { type: Type.STRING, description: "Instrucciones sobre cuándo y cómo podar la planta para un crecimiento saludable." },
        growthTips: { type: Type.STRING, description: "Otros consejos para fomentar un crecimiento vigoroso y una floración abundante." }
    },
    required: ["pestControl", "pruning", "growthTips"],
};

const plantAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        plantName: { type: Type.STRING, description: "El nombre común de la planta." },
        description: { type: Type.STRING, description: "Una descripción breve e interesante." },
        careInstructions: careInstructionsSchema,
        healthCare: healthCareSchema,
        toxicity: { type: Type.STRING, description: "Información sobre la toxicidad para mascotas y humanos." },
    },
    required: ["plantName", "description", "careInstructions", "healthCare", "toxicity"],
};

// FIX: Update the return type to reflect that `image` is not part of the API response.
export const analyzePlantImage = async (imageData: string): Promise<Omit<PlantAnalysis, 'id' | 'image'>> => {
    try {
        const imagePart = {
            inlineData: { mimeType: 'image/jpeg', data: imageData },
        };
        const textPart = {
            text: 'Identifica esta planta. Proporciona su nombre común, una breve descripción, instrucciones de cuidado detalladas (riego, luz solar, suelo, fertilizante), información sobre su toxicidad y una guía completa para mantenerla sana y fuerte (control de plagas, poda y consejos de crecimiento).',
        };

        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: plantAnalysisSchema,
            },
        });

        const jsonString = response.text.trim();
        // FIX: Update the cast to match the new return type.
        return JSON.parse(jsonString) as Omit<PlantAnalysis, 'id' | 'image'>;
    } catch (error) {
        console.error("Error analyzing plant image:", error);
        throw new Error("No se pudo analizar la planta. Por favor, inténtalo de nuevo con una imagen más clara.");
    }
};

export const createChat = (): Chat => {
    return ai.chats.create({
        model: model,
        config: {
            systemInstruction: "Eres un experto en jardinería amigable y conocedor. Tu objetivo es ayudar a los usuarios con sus preguntas de jardinería. Proporciona consejos claros, concisos y útiles en español.",
        },
    });
};