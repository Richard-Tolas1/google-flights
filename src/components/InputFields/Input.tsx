import React from "react";

interface Props {
  icon?: React.ReactNode;
  className?: string;
  max?: number;
  value?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
  id?: string;
  name?: string;
  maxLength?: number;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  placeHolder?: string;
  inputClassName?: string
}

function Input({ ...props }: Props) {
  return (
    <div className={`border-2 border-[#6e7276] p-4 rounded-[4px] ${props.className}`}>
      <div className="flex gap-1">
        <div>{props.icon}</div>
        <input
          className={`bg-transparent border-none focus:ring-0 outline-none ${props.inputClassName}`}
          placeholder={props.placeHolder}
          type={props.type}
          max={props.max}
          maxLength={props.maxLength}
          id={props.id}
          name={props.name}
          value={props.value}
          onClick={props.onClick}
          onChange={props.onChange}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
}

export default Input;