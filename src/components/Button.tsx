import React, { FunctionComponent } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  startIcon,
  ...rest
}) => {
  return (
    <button
      className="w-full bg-primaryDark text-white flex items-center justify-center rounded-xl shadow-lg border-none py-2 px-3 font-semibold transition-all duration-500 ease-in-out hover:bg-black cursor-pointer"
      {...rest}
    >
      {startIcon && (
        <div className="mr-2 h-full flex items-center">{startIcon}</div>
      )}
      {children}
    </button>
  );
};

export default Button;
