import { signOut } from '../config/auth';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/loadingReducer';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

interface HeaderProps {
    openAddEnvModal(): void;
}

const Header = ({ openAddEnvModal }: HeaderProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const options = [
        {
            name: 'Logout',
            onClick: () => loggout(),
        },
        {
            name: 'Profile',
            onClick: () => console.log('PROFILE'),
        },
    ];

    return (
        <div className="flex justify-between items-center mb-6 bg-[#f7f7f7] lg:pr-4 rounded shadow-md font-title">
            <img src={Logo} className="h-16 pl-4 py-2" alt="Logo" />
            <div className="flex items-center">
                {/* Dropdown Menu (Mobile) */}
            

                {/* Inline Menu (Desktop) */}
                <div className="hidden md:flex md:items-center gap-4 md:ml-auto">
                    {options.map((option) => (
                        <button
                            key={option.name}
                            onClick={option.onClick ? () => option.onClick() : undefined}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300"
                        >
                            {option.name}
                        </button>
                    ))}
                    {/* Add Variable Button */}
                    <button
                        onClick={() => openAddEnvModal()}
                        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                    >
                        Add Variable
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
