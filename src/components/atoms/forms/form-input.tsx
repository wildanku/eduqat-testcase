import { Controller } from "react-hook-form";
import { FormInputType } from "../../../types/form";

type Props = FormInputType;

export const FormInput = ({
  label,
  name,
  type,
  className,
  placeholder,
  onInput,
  onChange,
  required = false,
  register,
  value,
  defaultValue,
  disabled = false,
  control,
  error,
  onKeyPress,
}: Props) => {
  return (
    <div className="mb-3">
      <label className="block text-sm mb-1 text-gray-700">
        {label} {required ? <span className="text-red-600">*</span> : ""}
      </label>
      {control ? (
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={type ?? "text"}
              className={`
                  block w-full rounded-lg border-gray-300 border p-2
                  ${error ? "border-red-600" : "border-gray-300"} 
                  ${className}
                  ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
                `}
              placeholder={placeholder ?? ""}
              required={required}
              disabled={disabled}
              defaultValue={defaultValue}
            />
          )}
        />
      ) : (
        <input
          type={type ?? "text"}
          className={`
              block w-full rounded-lg border-gray-300 border p-2
              ${error ? "border-red-600" : "border-gray-300"} 
              ${className}
              ${disabled && "cursor-not-allowed bg-gray-100 text-gray-600"}
            `}
          placeholder={placeholder ?? ""}
          required={required}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};
