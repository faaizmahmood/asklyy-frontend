import { useField } from "formik";
import styles from "./customCheckbox.module.scss";

type CustomCheckboxProps = {
  label: string;
  name: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" {...field} {...props} className={styles.hiddenCheckbox} />
        <span className={styles.customBox}>
          {field.checked && <span className={styles.tick}>✔</span>}
        </span>
        <span className={styles.labelText}>{label}</span>
      </label>

      {meta.touched && meta.error ? (
        <div className="inputFiledErrorMessage">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomCheckbox;
