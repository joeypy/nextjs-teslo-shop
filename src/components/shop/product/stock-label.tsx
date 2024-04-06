"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect } from "react";

type Props = {
  slug: string;
};

export const StockLabel = ({ slug }: Props) => {
  useEffect(() => {
    getStock();
  }, []);

  const getStock = () => {
    const inStock = await getStockBySlug(slug);
  };

  return (
    <h2 className={` ${titleFont.className} antialiased font-bold text-xl`}>
      Stock: {inStock}
    </h2>
  );
};
