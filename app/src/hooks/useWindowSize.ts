import { useEffect, useState } from "react";

function useWindowSize(callback?: (size: { x: number; y: number }) => void) {
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  useEffect(() => {
    const handleUpdate = () => {
      setSize({ x: window.innerWidth, y: window.innerHeight });
      if (callback) {
        callback({ x: window.innerWidth, y: window.innerHeight });
      }
    };

    document.addEventListener("resize", handleUpdate);

    return () => {
      document.removeEventListener("resize", handleUpdate);
    };
  }, []);

  return size;
}

export default useWindowSize;
