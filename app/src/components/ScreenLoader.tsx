import { PuffLoader } from "react-spinners";
interface ScreenLoaderProps {
  isLoading?: boolean;
  info?: string;
}
const ScreenLoader: React.FC<ScreenLoaderProps> = ({
  info,
  isLoading = true,
}) => {
  if (!isLoading) {
    return <></>;
  }
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0 bg-slate-950 opacity-50"></div>
        <div className="relative w-[200px] flex gap-4 items-center justify-center bg-white border border-slate-950 p-2 rounded-md">
          <PuffLoader size={35} color="#f20454" />
          {info && <span className="text-base font-medium">{info}</span>}
        </div>
      </div>
    </>
  );
};

export default ScreenLoader;
