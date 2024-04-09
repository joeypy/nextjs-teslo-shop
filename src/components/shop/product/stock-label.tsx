"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useCallback, useEffect, useState } from "react";

type Props = {
  slug: string;
};

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getStock = useCallback(async () => {
    const inStock = await getStockBySlug(slug);
    setIsLoading(false);
    setStock(inStock);
  }, [slug]);

  useEffect(() => {
    getStock();
  }, [getStock]);

  return (
    <>
      {isLoading ? (
        <h2
          className={` ${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h2>
      ) : (
        <h2 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {stock}
        </h2>
      )}
    </>
  );
};
