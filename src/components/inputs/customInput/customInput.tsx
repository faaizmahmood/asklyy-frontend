import { useState } from "react";
import { useField, type FieldHookConfig } from "formik";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./customInput.module.scss";

type CustomInputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  FieldHookConfig<string>;

const CustomInput: React.FC<CustomInputProps> = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" && showPassword ? "text" : (type as string);

  return (
    <>

      <div className={styles.inputWrapper}>
        {label && <label htmlFor={props.id || props.name} className="mt-3">{label}</label>}

        <input {...field} {...props} type={inputType} />

        {type === "password" && (
          <span
            className={`${styles.eyeIcon} ${showPassword ? styles.active : ""}`}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        )}

      </div>

      {meta.touched && meta.error ? (
        <div className={`inputFiledErrorMessage `}>{meta.error}</div>
      ) : null}

    </>
  );
};

export default CustomInput;
