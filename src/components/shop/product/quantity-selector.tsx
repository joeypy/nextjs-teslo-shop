"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type Props = {
  quantity: number;
  inStock: number;
  onChange?: (value: number) => void;
};

export const QuantitySelector = ({ quantity, inStock, onChange }: Props) => {
  const onQuantityChanged = (value: number) => {
    if (quantity + value < 1) return;
    if (Math.sign(value) == 1 && quantity + 1 > inStock) return;
    onChange && onChange(quantity + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>

      <button
        onClick={() => onQuantityChanged(+1)}
        disabled={quantity === inStock}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
