import type { Size } from "@/interfaces";
import clsx from "clsx";

type Props = {
  selectedSize: Size;
  availableSizes: Size[];
};

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5">
      <div className="font-bold mb-4">Tallas disponibles</div>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
