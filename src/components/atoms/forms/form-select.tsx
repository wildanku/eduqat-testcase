import { Controller } from "react-hook-form";
import { FormSelectType } from "../../../types/form";

type Props = FormSelectType;

export const FormSelect = ({
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
  options,
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
            <select
              {...field}
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
            >
              <option value="">Select</option>
              {options?.map((item, key) => (
                <option key={key} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          )}
        />
      ) : (
        <select
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
          onChange={onChange}
        >
          <option value="">Select</option>
          {options?.map((item, key) => (
            <option key={key} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      )}
      {error && <small className="text-xs text-red-600">{error}</small>}
    </div>
  );
};
