import { useField, type FieldHookConfig } from "formik";
import styles from "../customInput/customInput.module.scss";

type CustomTextAreaProps = {
  label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldHookConfig<string>;

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={`${styles.inputWrapper} mt-4`}>
        {label && <label htmlFor={props.id || props.name}>{label}</label>}

        <textarea {...field} {...props} className={styles.textarea} />
      </div>

      {meta.touched && meta.error ? (
        <div className="inputFiledErrorMessage">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CustomTextArea;
