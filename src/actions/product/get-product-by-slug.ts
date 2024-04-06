"use server";

import prisma from "@/lib/prisma";

export const getProductBySLug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        productImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!product) return;

    return {
      ...product,
      images: product.productImage.map((image) => image.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener producto por slug");
  }
};
