import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const Button = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const buttonClassName = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={buttonClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
