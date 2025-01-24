import { InputHTMLAttributes } from "react";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (input: inputProps) => {
  return (
    <input
      className="border-o h-9 rounded-md outline-none px-2 mb-3 bg-white"
      {...input}
    />
  );
};

export default Input;
