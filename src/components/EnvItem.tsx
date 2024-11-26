import { Copy, Trash } from "lucide-react";

interface EnvItemProps {
    id: string
    name: string;
    value: string;
    description: string;
    handleRemoveVariable: (id:string)=>void
}

const EnvItem: React.FC<EnvItemProps> = ({ name, value, description, handleRemoveVariable, id }) => {
    const handleCopy = () => {
        const text = `${name}=${value}`
        // Copia o valor para a área de transferência
        navigator.clipboard.writeText(text).then(() => {
            alert("Variable value copied!");
        });
    };

    return (
        <div className="flex flex-row sm:flex-row justify-between items-start sm:items-center p-4">
            <div className="mb-2 sm:mb-0 overflow-auto scrolb">
                <p className="font-light text-sm sm:text-base font-title text-[#282828]">
                    {name}{" = "}
                    {value && (
                        <span className="text-gray-500 font-extralight font-mono text-sm ">{value}</span>
                    )}
                </p>
                {description && (
                        <p className="text-sm text-gray-500 font-mono">{description}</p>
                    )}
                
            </div>

<div className="flex">
            <button
                onClick={()=>handleRemoveVariable(id)}
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
