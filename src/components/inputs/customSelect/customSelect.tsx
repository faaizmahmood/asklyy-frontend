import { useField, type FieldHookConfig } from "formik";
import type { ReactNode } from "react";

type OptionType = {
  value: string | number;
  label: ReactNode;
};

type CustomSelectProps = {
  label?: string;
  options: OptionType[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value"> &
  FieldHookConfig<string | number>;

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="mt-3">
        {label && <label htmlFor={props.id || props.name}>{label}</label>}

        <select {...field} {...props}>
          <option value="">-- Select --</option>
          {options.map((opt: OptionType) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {meta.touched && meta.error ? (
        <div className="inputFiledErrorMessage">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CustomSelect;
