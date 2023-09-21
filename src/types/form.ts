import { Control } from "react-hook-form";

export type FormInputType = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
  icon?: string | JSX.Element;
  register?: any;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  control?: Control<any>;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: [] | null;
};

export type FormSelectType = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: any;
  icon?: string | JSX.Element;
  register?: any;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  control?: Control<any>;
  options?: any[];
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: [] | null;
};
