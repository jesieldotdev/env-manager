import { useState } from 'react';
import { signOut } from '../config/auth';

interface HeaderProps{
    openAddEnvModal(): void
}

const Header = ({openAddEnvModal}: HeaderProps) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    async function loggout(){
       await signOut()
    }

    const options  = [
        {
            name: 'Logout',
            onClick:  () => loggout(),
        },
        {
            name: 'Profile',
            onClick: () => console.log('PROFILE')
        },
    ];

    return (
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded shadow-md">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Environment Variables</h1>
            <div className="flex items-center gap-4">
                {/* Dropdown Menu (Mobile) */}
                <div className="relative md:hidden">
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300"
                    >
                        Options
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                            <ul>
                                {options.map((option) => (
                                    <li key={option.name}>
                                        <button
                                            onClick={option.onClick ? option.onClick : undefined}
                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                        >
                                            {option.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Inline Menu (Desktop) */}
                <div className="hidden md:flex gap-4">
                    {options.map((option) => (
                        <button
                            key={option.name}
                            onClick={option.onClick ? () => option.onClick() : undefined}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300"
                        >
                            {option.name}
                        </button>
                    ))}
                </div>

                {/* Add Variable Button */}
                <button
                    onClick={() => openAddEnvModal()}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                >
                    Add Variable
                </button>
            </div>
        </div>
    );
};

export default Header;