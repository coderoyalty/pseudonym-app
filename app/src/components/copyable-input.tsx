import useClipboard from "@/hooks/useClipboard";
import { Button } from "./ui/button";
import { CheckCircledIcon, CopyIcon } from "@radix-ui/react-icons";

interface CopyableProps {
  value: string;
}

const CopyableInput: React.FC<CopyableProps> = ({ value }) => {
  const { copied, copy } = useClipboard();
  const handleClick = () => {
    copy(value);
  };
  return (
    <div className="mt-4">
      <div
        onClick={handleClick}
        className="mx-auto flex w-full max-w-[min(352px,calc(100%-12px))] mx-items-center justify-center gap-2 rounded-lg border-2 p-1 text-sm"
      >
        <input
          className="w-full border-none bg-transparent px-1.5 outline-none"
          readOnly
          value={value}
        />

        <Button
          onClick={handleClick}
          className="flex items-center justify-center gap-1 rounded-md border-0 p-2 px-4 text-sm text-black bg-gray-200 hover:bg-gray-300"
        >
          {copied ? (
            <CheckCircledIcon width={15} height={15} />
          ) : (
            <CopyIcon width={15} height={15} />
          )}

          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default CopyableInput;
