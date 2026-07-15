import React, { ReactNode, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps extends React.ComponentProps<"input"> {
  label?: string;
  type?: string;
  value: string | number;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  greyInput?: boolean;
  inputRightElement?: ReactNode;
  inputLeftElement?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder = "",
  readOnly = false,
  greyInput,
  inputRightElement,
  inputLeftElement,
  ...rest
}: CustomInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordType = showPassword ? "text" : "password";

  return (
    <div className="space-y-1.5">
      {label ? (
        <Label htmlFor={name} className="text-[14px] font-normal">
          {label}
        </Label>
      ) : (
        ""
      )}
      <div className="relative">
        {inputLeftElement && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            {inputLeftElement}
          </div>
        )}
        <Input
          id={name}
          type={type === "password" ? passwordType : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`h-[42px] border-[#D0D5DD] text-[13.5px] focus-visible:bg-white ${
            greyInput ? "bg-[#F9FAFB]" : ""
          } ${inputLeftElement ? "pl-9" : ""} ${
            inputRightElement || type === "password" ? "pr-9" : ""
          }`}
          {...rest}
        />
        {inputRightElement && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            {inputRightElement}
          </div>
        )}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-3.5" />
            ) : (
              <Eye className="size-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
