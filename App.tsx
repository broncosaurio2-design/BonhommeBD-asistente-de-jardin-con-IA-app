import React, { useState } from 'react';
import PlantIdentifier from './components/PlantIdentifier';
import Chatbot from './components/Chatbot';
import MyGarden from './components/MyGarden';
import { PlantIcon } from './components/icons/PlantIcon';
import { ChatIcon } from './components/icons/ChatIcon';
import { GardenIcon } from './components/icons/GardenIcon';
import type { PlantAnalysis } from './types';

type Tab = 'identifier' | 'chatbot' | 'garden';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('identifier');
  const [savedPlants, setSavedPlants] = useState<PlantAnalysis[]>([]);

  const handleAddToGarden = (plant: PlantAnalysis) => {
    if (!savedPlants.some(p => p.id === plant.id)) {
        setSavedPlants(prevPlants => [...prevPlants, plant]);
        setActiveTab('garden'); // Switch to garden tab after adding a plant
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'identifier':
        return <PlantIdentifier onPlantAdded={handleAddToGarden} />;
      case 'chatbot':
        return <Chatbot />;
      case 'garden':
        return <MyGarden plants={savedPlants} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200 ${
        activeTab === tabName
          ? 'bg-white text-green-700 shadow-sm'
          : 'bg-green-100 text-green-600 hover:bg-green-200'
      }`}
      aria-current={activeTab === tabName ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 tracking-tight">
            BonhommeBD
          </h1>
          <p className="mt-2 text-lg text-green-600">
            asistente de jardinería con IA
          </p>
        </header>

        <main className="flex-grow flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex bg-green-100 p-1">
            <TabButton tabName="identifier" label="Identificador" icon={<PlantIcon />} />
            <TabButton tabName="chatbot" label="Chat de Jardinería" icon={<ChatIcon />} />
            <TabButton tabName="garden" label="Mi Jardín" icon={<GardenIcon />} />
          </div>
          <div className="flex-grow p-4 sm:p-6 md:p-8">
            {renderTabContent()}
          </div>
        </main>
        
        <footer className="text-center py-4 mt-4">
            <p className="text-sm text-green-500">
                Potenciado por Gemini
            </p>
        </footer>
      </div>
    </div>
  );
};

export default App;