
import { Copy } from 'lucide-react';

interface EnvItemProps {
  name: string;
  value: string;
}

const EnvItem: React.FC<EnvItemProps> = ({ name, value }) => {
  const handleCopy = () => {
    // Copia o valor para a área de transferência
    navigator.clipboard.writeText(value).then(() => {
      alert('Variable value copied!');
    });
  };

  return (
    <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center p-4">
      <div className="mb-2 sm:mb-0">
        <h3 className="font-bold text-sm sm:text-base">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{value}</p>
      </div>

      <button
        onClick={handleCopy}
        className="ml-2 mt-2 sm:mt-0 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
        title="Copy to clipboard"
      >
        <Copy className="w-5 h-5" />
      </button>
    </div>
  );
};

export default EnvItem;