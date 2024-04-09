"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product } from "@/interfaces";
import { useState } from "react";
import type { CartProduct, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store";

type Props = {
  product: Product;
};

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      price: product.price,
      quantity: quantity,
      size: size,
      title: product.title,
      inStock: product.inStock,
      slug: product.slug,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setSize(undefined);
    setQuantity(1);
    setPosted(false);
  };

  return (
    <>
      {posted && !size && (
        <span className="text-red-500 mt-2"> Debe seleccionar una talla</span>
      )}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />
      {/* Seelector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        inStock={product.inStock}
        onChange={setQuantity}
      />

      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
