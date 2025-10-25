export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface CareInstructions {
  watering: string;
  sunlight: string;
  soil: string;
  fertilizer: string;
}

export interface HealthCareInstructions {
    pestControl: string;
    pruning: string;
    growthTips: string;
}

export interface PlantAnalysis {
  id: string;
  plantName: string;
  description: string;
  careInstructions: CareInstructions;
  healthCare: HealthCareInstructions;
  toxicity: string;
  // FIX: Add image property to store the plant's image URL.
  image: string;
}