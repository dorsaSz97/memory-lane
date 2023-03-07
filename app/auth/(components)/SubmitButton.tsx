const SubmitButton = ({
  isSubmitting,
  btnText,
}: {
  isSubmitting: boolean;
  btnText: string;
}) => {
  return (
    <button
      type="submit"
      className="self-center px-4 py-2 bg-blob bg-no-repeat bg-cover bg-bottom w-[100px] h-[80px] text-primary text-md capitalize transition-all hover:text-lg"
      disabled={isSubmitting}
    >
      {btnText}
    </button>
  );
};

export default SubmitButton;
