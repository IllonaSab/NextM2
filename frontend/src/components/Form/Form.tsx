import type { FormHTMLAttributes, ReactNode } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};

export default Form;
