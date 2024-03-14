import { ReloadIcon } from "@radix-ui/react-icons";
interface LoadingOverlayProps {
  isLoading?: boolean;
}
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading = true,
}) => {
  if (!isLoading) {
    return <></>;
  }
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-slate-950 opacity-50"></div>
        <ReloadIcon className="mr-2 h-8 w-8 z-10 animate-spin text-white" />
      </div>
    </>
  );
};

export default LoadingOverlay;
