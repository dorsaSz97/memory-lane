'use client';

import { useField } from 'formik';

const CustomInput = ({
  label,
  ...props
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <input {...field} />
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </>
  );
};

export default CustomInput;
