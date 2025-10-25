import React from 'react';
import type { PlantAnalysis } from '../types';
import { PlantIcon } from './icons/PlantIcon';

interface MyGardenProps {
    plants: PlantAnalysis[];
}

const MyGarden: React.FC<MyGardenProps> = ({ plants }) => {
    if (plants.length === 0) {
        return (
            <div className="text-center py-10 px-6 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
                <div className="inline-block p-4 bg-green-100 rounded-full">
                    <PlantIcon className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-green-800">Tu jardín está vacío</h3>
                <p className="mt-2 text-green-600">
                    Usa el 'Identificador' para analizar una planta y añadirla a tu colección personal.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Mi Colección de Plantas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.map(plant => (
                    <div key={plant.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100 transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        {/* FIX: Remove `(plant as any)` cast as `image` is now a known property of `PlantAnalysis`. */}
                        <img src={plant.image} alt={plant.plantName} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-green-900">{plant.plantName}</h3>
                            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{plant.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyGarden;