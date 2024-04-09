"use client";

import Link from "next/link";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/actions";
import { useState } from "react";
import { SubmitButton } from "@/components";
import { login } from "@/actions/auth/login";

type Props = {};

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = ({}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { name, email, password } = data;
    const resp = await registerUser({ name, email, password });
    console.log({ resp });

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500 mb-0": errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />
      {errors.name?.type === "required" && (
        <span className="text-red-500 mb-5">* Este campo es obligatorio</span>
      )}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500 mb-0": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email?.type === "required" && (
        <span className="text-red-500 mb-5">* Este campo es obligatorio</span>
      )}

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500 mb-0": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password?.type === "required" && (
        <span className="text-red-500 mb-5">* Este campo es obligatorio</span>
      )}
      {errors.password?.type === "minLength" && (
        <span className="text-red-500 mb-5">
          * Debe contener mínimo 6 caracteres
        </span>
      )}

      <span className="text-red-500 mb-5">{errorMessage}</span>

      <SubmitButton label="Crear cuenta" />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
