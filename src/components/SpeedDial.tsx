import { Plus } from 'lucide-react';
import  { useState } from 'react';
import { startLoading, stopLoading } from '../store/loadingReducer';
import { signOut } from '../config/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface SpeedDialOption {
  name: string;
  action: () => void;
}

interface SpeedDialProps{
  openAddEnvModal: ()=>void

}

const SpeedDial = ({openAddEnvModal}:SpeedDialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  async function loggout() {
    dispatch(startLoading());
    try {
        await signOut();
        navigate('/login');
    } catch (error) {
        console.error(error);
    }
    dispatch(stopLoading());
}


  const options: SpeedDialOption[] = [
    { name: 'Add Variable', action: () => openAddEnvModal() },
    // { name: 'Edit Settings', action: () => console.log('Edit Settings clicked') },
    { name: 'Logout', action: () => loggout() },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <div className="fixed bottom-8 right-8 font-title">
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
              className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition w-28"
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
