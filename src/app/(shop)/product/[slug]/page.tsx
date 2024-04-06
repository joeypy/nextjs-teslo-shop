export const revalidate = 604800;

import { getProductBySLug } from "@/actions";
import {
  SizeSelector,
  QuantitySelector,
  ProductSliceShow,
  ProductMobileSliceShow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySLug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

const ProductBySlugPage = async ({ params }: Props) => {
  const { slug } = params;
  const product = await getProductBySLug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3 grid-cols-1">
      {/* Fotos */}
      <div className="col-span-1 md:col-span-2 ">
        <ProductSliceShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
        <ProductMobileSliceShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={product.slug} />
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selector de tallas */}
        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />
        {/* Seelector de cantidad */}
        <QuantitySelector quantity={1} />

        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripción */}
        <h3 className="font-bold text-md">Descripción</h3>
        <p className="font-light text-sm">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductBySlugPage;
