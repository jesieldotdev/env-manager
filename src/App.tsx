import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import EnvItem from './components/EnvItem';

interface EnvVariable {
  name: string;
  value: string;
  description: string;
}

const App: React.FC = () => {
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Carrega as variáveis do localStorage quando o componente é montado
  useEffect(() => {
    const savedVariables = localStorage.getItem('envVariables');
    if (savedVariables) {
      setVariables(JSON.parse(savedVariables));  // Converte os dados do localStorage de volta para um array
    }
  }, []);

  const handleAddVariable = (name: string, value: string, description: string) => {
    const newVariables = [...variables, { name, value, description }];
    setVariables(newVariables);
    localStorage.setItem('envVariables', JSON.stringify(newVariables));  // Atualiza as variáveis no localStorage
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Environment Variables</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Add Variable
        </button>
      </div>

      <div className="bg-white shadow rounded divide-y">
        {variables.length > 0 ? (
          variables.map((variable, index) => (
            <EnvItem key={index} 
            description={variable.description}
            name={variable.name} value={variable.value} />
          ))
        ) : (
          <p className="p-4 text-gray-500 text-center">No variables added yet.</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddVariable}
      />

      <button
        onClick={() => {
          localStorage.removeItem('envVariables');
          setVariables([]);
        }}
        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 mt-4"
      >
        Clear All Variables
      </button>
    </div>
  );
};

export default App;