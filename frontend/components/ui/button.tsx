import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  onClick,
}) => {
  return (
    <button className={`btn ${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
