import type { InputHTMLAttributes, ReactNode } from "react";

import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: ReactNode;
  error?: string;
};

const Input = ({ label, hint, error, className, id, ...props }: InputProps) => {
  const inputClassName = [styles.input, error ? styles.inputError : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.field}>
      {(label || hint) && (
        <div className={styles.labelRow}>
          {label ? (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          ) : (
            <span />
          )}
          {hint ? <div className={styles.hint}>{hint}</div> : null}
        </div>
      )}

      <input id={id} className={inputClassName} {...props} />

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
};

export default Input;
