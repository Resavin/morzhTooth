import { ReactNode } from "react";
import { useTheme } from "./buttonLayout";

export default function Child({
  bgColor,
  text,
  leftChild,
  rightChild,
}: {
  bgColor: string;
  text: string;
  leftChild: ReactNode;
  rightChild: ReactNode;
}) {
  const { setBgColor } = useTheme();

  return (


    <div className="relative size-fit my-24 group flex flex-row space-x-40">
      {/* Left content */}
      <div className="-mt-20 w-40 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {leftChild}
      </div>

      {/* Center animated stack */}
      <div onMouseEnter={() => setBgColor(bgColor)} className="inset-0 relative flex items-center justify-center h-full"
      >
        {/* Top button */}
        <div className="absolute w-56 h-16 text-white flex items-center justify-center border border-black rounded-md bg-black z-[3] transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-24%]">
          {text}
        </div>

        {/* Middle layer */}
        <div className="absolute w-56 h-16 text-white flex items-center justify-center border-2 border-black rounded-md bg-yellow-500 z-[2] transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-12%]" />

        {/* Bottom layer */}
        {/* <div className="absolute w-56 h-16 text-white flex items-center justify-center border-2 border-black rounded-md bg-maroon z-[1]" /> */}
      </div>

      {/* Right content */}
      <div className="-mt-10 w-40 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {rightChild}
      </div>
    </div>
  );
}
