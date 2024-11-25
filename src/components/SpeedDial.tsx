import { Plus } from 'lucide-react';
import React, { useState } from 'react';

interface SpeedDialOption {
  name: string;
  action: () => void;
}

const SpeedDial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options: SpeedDialOption[] = [
    { name: 'Add User', action: () => console.log('Add User clicked') },
    { name: 'Edit Settings', action: () => console.log('Edit Settings clicked') },
    { name: 'Logout', action: () => console.log('Logout clicked') },
  ];

  return (
    <div className="fixed bottom-8 right-8">
      {/* Main Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-2 flex flex-col items-end space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.action();
                setIsOpen(false);
              }}
              className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedDial;
