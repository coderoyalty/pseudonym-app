const ErrorDisplay: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-red-600 text-2xl font-bold mb-4">Error</h2>
      <p className="text-gray-800 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export { ErrorDisplay };
