import { Link } from "react-router"; // Import Link from react-router-dom
import { ReactNode } from "react";
import { useTheme } from "@/components/buttonLayout";
interface ButtonProps {
  bgColor: string;
  text: string;
  to?: string;
  onClick?: () => void;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  bgColor,
  text,
  to,
  onClick,
  leftChild,
  rightChild,
}) => {
  const { setBgColor } = useTheme();

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setBgColor(bgColor)}
      className="relative size-fit my-24 group "
    >
      {/* Left content */}
      <div className="absolute -mt-5 w-sm right-[10rem] top-1/2 -translate-y-1/2  opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {leftChild}
      </div>

      {/* Center animated stack */}
      <div className="inset-0 relative flex items-center justify-center h-full">
        {/* Top button */}
        <div className="absolute w-56 h-16 text-white flex items-center justify-center border border-slate-500 rounded-md bg-slate-700 z-[3] transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-24%]">
          {to ? <Link className="absolute w-full h-full" to={to} /> : <div />}
          {text}
        </div>

        {/* Middle layer */}
        <div className="absolute w-56 h-16 text-white flex items-center justify-center border-2 border-slate-500 rounded-md bg-zinc-700 z-[2] transform transition-transform duration-300 ease-in-out group-hover:translate-y-[-12%]" />

        {/* Bottom layer */}
        {/* <div className="absolute w-56 h-16 text-white flex items-center justify-center border-2 border-black rounded-md bg-maroon z-[1]" /> */}
      </div>

      {/* Right content */}
      <div className="absolute -mt-5 w-4xl left-[10rem] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
        {rightChild}
      </div>
    </div>
  );
};
