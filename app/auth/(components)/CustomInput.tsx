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
    <div className="flex flex-col gap-3 justify-between">
      <div className="flex gap-3 justify-between items-center">
        <label htmlFor={props.name} className="self-end">
          {label}
        </label>
        <input
          id={props.name}
          {...props}
          {...field}
          className="w-[16rem] border-b-[1px] border-dark p-2 text-sm font-sans placeholder:font-gaiaDisplay outline-primary"
        />
      </div>
      {
        <p
          className={`h-[20px] w-[90%] transition-all text-sm text-red-500 ${
            meta.touched && meta.error ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {meta?.error}
        </p>
      }
    </div>
  );
};

export default CustomInput;
