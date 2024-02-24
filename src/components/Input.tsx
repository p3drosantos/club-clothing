import React, { FunctionComponent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  errorMessage?: string;
}

const Input: FunctionComponent<InputProps> = React.forwardRef((props, ref) => {
  return (
    <div className="flex flex-col mb-5">
      <input
        className={`w-full bg-primaryInput px-5 py-2 shadow-md rounded-xl text-primaryGray ${
          props.hasError
            ? "border-2 border-red-500 focus:border-red-500 focus:outline-none placeholder-red-500"
            : "focus:border-gray-400 border-2 placeholder-primaryGray focus:outline-none border-transparent"
        }`}
        {...props}
        ref={ref as any}
      />
      {props.errorMessage && props.hasError && (
        <span className="text-red-500 text-sm mt-1">{props.errorMessage}</span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
