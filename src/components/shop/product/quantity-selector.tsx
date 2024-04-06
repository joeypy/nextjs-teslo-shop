"use client";

import clsx from "clsx";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from "react";

type Props = {
  quantity: number;
  onChange?: (value: number) => void;
};

export const QuantitySelector = ({ quantity, onChange }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;

    setCount((preState) => preState + value);
    onChange && onChange(count + value);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {count}
      </span>

      <button onClick={() => onQuantityChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
