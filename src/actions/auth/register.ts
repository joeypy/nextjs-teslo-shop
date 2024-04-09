"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

type Props = {
  name: string;
  email: string;
  password: string;
};

export const registerUser = async ({ name, email, password }: Props) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
};
