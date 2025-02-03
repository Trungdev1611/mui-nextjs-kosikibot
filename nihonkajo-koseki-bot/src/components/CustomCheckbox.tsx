import React from "react";

interface CustomCheckboxProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  label: string;
  isChecked: boolean;
  value?: boolean
  onChange?: () => void
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  // value,
  register,
  label,
  isChecked,
  onChange = () => console.log("onChange")
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        {...(register ? register(name) : {})}
        className="hidden peer"
        // value={value}
        onChange={onChange}
      />
      <div
        className={`w-5 h-5 flex items-center justify-center border rounded-sm border-gray-pastel
          `}
      >
        {isChecked && <span className="text-xs text-txt-primary font-normal w-full">✔️</span>}
      </div>
      {label && <span className="ml-3 text-sm font-normal text-txt-primary">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
