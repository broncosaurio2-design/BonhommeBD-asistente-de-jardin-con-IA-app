import React, { useState, useCallback, useRef } from 'react';
import { analyzePlantImage } from '../services/geminiService';
import type { PlantAnalysis } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { UploadIcon } from './icons/UploadIcon';
import { SunIcon } from './icons/SunIcon';
import { WaterIcon } from './icons/WaterIcon';
import { SoilIcon } from './icons/SoilIcon';
import { FertilizerIcon } from './icons/FertilizerIcon';
import { ToxicityIcon } from './icons/ToxicityIcon';
import { PestIcon } from './icons/PestIcon';
import { PruningIcon } from './icons/PruningIcon';
import { GrowthIcon } from './icons/GrowthIcon';
import { AddIcon } from './icons/AddIcon';


const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = (reader.result as string).split(',')[1];
            resolve(result);
        };
        reader.onerror = (error) => reject(error);
    });
};

interface PlantIdentifierProps {
    onPlantAdded: (plant: PlantAnalysis) => void;
}

const PlantIdentifier: React.FC<PlantIdentifierProps> = ({ onPlantAdded }) => {
    const [image, setImage] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<PlantAnalysis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const processFile = (file: File) => {
        setAnalysis(null);
        setError(null);
        setImage(URL.createObjectURL(file));
        
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDraggingOver(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDraggingOver(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };


    const handleAnalyze = async () => {
        if (!fileInputRef.current?.files?.length) {
            setError('Por favor, selecciona una imagen primero.');
            return;
        }

        const file = fileInputRef.current.files[0];
        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const base64Image = await fileToBase64(file);
            const result = await analyzePlantImage(base64Image);
            const plantWithId: PlantAnalysis = { ...result, id: `${result.plantName}-${Date.now()}`, image: image! };
            setAnalysis(plantWithId);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error desconocido.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAddToGarden = () => {
        if (analysis) {
            onPlantAdded(analysis);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const InfoCard: React.FC<{ icon: React.ReactNode, title: string, text: string }> = ({ icon, title, text }) => (
        <div className="bg-green-50 p-4 rounded-lg flex items-start gap-4">
            <div className="flex-shrink-0 text-green-600 pt-1">{icon}</div>
            <div>
                <h4 className="font-semibold text-green-800">{title}</h4>
                <p className="text-sm text-green-700">{text}</p>
            </div>
        </div>
    );

    const isNonToxic = analysis?.toxicity.toLowerCase().includes('no tóxica') || analysis?.toxicity.toLowerCase().includes('not toxic');

    return (
        <div className="flex flex-col items-center w-full">
            <div className="w-full max-w-xl">
                <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDraggingOver ? 'border-green-500 bg-green-100' : 'border-green-300 bg-green-50/50 hover:bg-green-100/50'}`} 
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                        aria-label="Subir archivo"
                    />
                    <div className="flex flex-col items-center text-green-700 pointer-events-none">
                        <UploadIcon />
                        <p className="mt-2 font-semibold">Haz clic para subir o arrastra y suelta</p>
                        <p className="text-xs text-green-500">PNG o JPG</p>
                    </div>
                </div>

                {image && (
                    <div className="mt-6 flex flex-col items-center">
                        <img src={image} alt="Vista previa de la planta" className="rounded-lg shadow-md max-h-64 w-auto" />
                    </div>
                )}
                
                <div className="mt-6 text-center">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !image}
                        className="w-full sm:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 flex items-center justify-center gap-2"
                    >
                        {loading ? <><LoadingSpinner /> Identificando...</> : 'Identificar Planta'}
                    </button>
                </div>
            </div>

            {error && <div className="mt-6 text-red-500 bg-red-100 border border-red-400 p-3 rounded-lg w-full max-w-xl">{error}</div>}

            {analysis && (
                <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-green-200 animate-fade-in">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-900">{analysis.plantName}</h2>
                        <p className="mt-3 text-green-700 italic">{analysis.description}</p>
                    </div>
                    
                    <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                        isNonToxic ? 'bg-green-100 border-green-200' : 'bg-yellow-100 border-yellow-300'
                    } border`}>
                        <div className={`flex-shrink-0 pt-1 ${isNonToxic ? 'text-green-600' : 'text-yellow-600'}`}>
                            <ToxicityIcon />
                        </div>
                        <div>
                            <h4 className={`font-semibold ${isNonToxic ? 'text-green-800' : 'text-yellow-800'}`}>Toxicidad</h4>
                            <p className={`text-sm ${isNonToxic ? 'text-green-700' : 'text-yellow-700'}`}>{analysis.toxicity}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">Instrucciones de Cuidado Básico</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard icon={<SunIcon />} title="Luz Solar" text={analysis.careInstructions.sunlight} />
                            <InfoCard icon={<WaterIcon />} title="Riego" text={analysis.careInstructions.watering} />
                            <InfoCard icon={<SoilIcon />} title="Suelo" text={analysis.careInstructions.soil} />
                            <InfoCard icon={<FertilizerIcon />} title="Fertilizante" text={analysis.careInstructions.fertilizer} />
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">Guía para una Planta Sana y Fuerte</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <InfoCard icon={<PestIcon />} title="Control de Plagas" text={analysis.healthCare.pestControl} />
                            <InfoCard icon={<PruningIcon />} title="Poda" text={analysis.healthCare.pruning} />
                            <InfoCard icon={<GrowthIcon />} title="Consejos de Crecimiento" text={analysis.healthCare.growthTips} />
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleAddToGarden}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 flex items-center justify-center gap-2 mx-auto"
                        >
                            <AddIcon />
                            Añadir a Mi Jardín
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlantIdentifier;