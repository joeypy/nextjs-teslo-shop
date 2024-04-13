"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
      message: "Dirección grabadaa",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

export const createOrReplaceAddress = async (
  address: Address,
  userId: string
) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      city: address.city,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      return await prisma.userAddress.create({
        data: addressToSave,
      });
    }

    return await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};
