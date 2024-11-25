import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import EnvItem from './components/EnvItem';
import { fetchVariables, addVariable, removeVariable } from './config/supabase';

interface EnvVariable {
  id: string;
  name: string;
  value: string;
  description: string;
}

const App: React.FC = () => {
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadVariables = async () => {
      try {
        const data = await fetchVariables();
        setVariables(data || []);
      } catch (error) {
        console.error('Error fetching variables:', error);
      }
    };

    loadVariables();
  }, []);

  const handleAddVariable = async (name: string, value: string, description: string) => {
    try {
      await addVariable(name, value, description);
      const updatedVariables = await fetchVariables();
      setVariables(updatedVariables || []);
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding variable:', error);
    }
  };

  const handleRemoveVariable = async (id: string) => {
    try {
      await removeVariable(id);
      const updatedVariables = await fetchVariables();
      setVariables(updatedVariables || []);
    } catch (error) {
      console.error('Error removing variable:', error);
    }
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
          variables.map((variable) => (
            <EnvItem
              key={variable.id}
              id={variable.id}
              name={variable.name}
              value={variable.value}
              description={variable.description}
              handleRemoveVariable={handleRemoveVariable}
            />
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
    </div>
  );
};

export default App;
