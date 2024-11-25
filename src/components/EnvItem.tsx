import { Copy, Trash } from "lucide-react";

interface EnvItemProps {
    name: string;
    value: string;
    description: string;
    handleRemoveVariable: (name:string)=>void
}

const EnvItem: React.FC<EnvItemProps> = ({ name, value, description, handleRemoveVariable }) => {
    const handleCopy = () => {
        // Copia o valor para a área de transferência
        navigator.clipboard.writeText(value).then(() => {
            alert("Variable value copied!");
        });
    };

    return (
        <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center p-4">
            <div className="mb-2 sm:mb-0">
                <h3 className="font-bold text-sm sm:text-base">
                    {name}{" "}
                    {description && (
                        <span className="text-gray-600">({description})</span>
                    )}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">{value}</p>
            </div>

<div className="flex">
            <button
                onClick={()=>handleRemoveVariable(name)}
                className="ml-2 mt-2 sm:mt-0 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                title="Delete"
            >
                <Trash className="w-5 h-5" />
            </button>
            <button
                onClick={handleCopy}
                className="ml-2 mt-2 sm:mt-0 p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
                title="Copy to clipboard"
            >
                <Copy className="w-5 h-5" />
            </button>
        </div>
        </div>
    );
};

export default EnvItem;
