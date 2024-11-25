
interface LoadingProps{
    show?: boolean
}

const Loading = ({show}: LoadingProps) => {
    if (show)
    return (
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <span className="text-white text-xl font-semibold">Loading...</span>
        </div>
    );
};

export default Loading;
