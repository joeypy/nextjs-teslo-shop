"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProductCart = useCartStore((state) => state.removeProductCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-3">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <p>
                {product.size} - {product.title}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              inStock={product.inStock}
              onChange={(value) => updateProductQuantity(product, value)}
            />
            <button
              className="underline mt-3"
              onClick={() => removeProductCart(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
