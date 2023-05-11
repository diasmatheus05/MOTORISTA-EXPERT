import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({ children, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-4 rounded-lg uppercase bg-primary-300 w-full max-w-xs bg-center duration-500 hover:bg-primary-400"
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export function LinkButton({ to, ...props }: LinkButtonProps) {
  return (
    <Link href={to} passHref className="w-full flex justify-center">
      <Button {...props} />
    </Link>
  );
}
