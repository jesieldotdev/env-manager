import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, value: string, description: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    if (name && value) {
      onAdd(name, value, description);
      setName('');
      setValue('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Variable</h2>
        <input
          type="text"
          placeholder="Variable Name"
          className="w-full p-2 border rounded mb-2 focus:outline-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Variable Description"
          className="w-full p-2 border rounded mb-2 focus:outline-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Variable Value"
          className="w-full p-2 border rounded mb-4 focus:outline-blue-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal