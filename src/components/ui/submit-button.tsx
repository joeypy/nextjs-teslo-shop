"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";
import { ImSpinner2 } from "react-icons/im";

type Props = {
  label: string;
};

export const SubmitButton = ({ label }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`flex justify-center items-center gap-2 ${clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}`}
      disabled={pending}
    >
      {pending && <ImSpinner2 className="animate-spin" />}
      {pending ? "Procesando..." : label}
    </button>
  );
};
