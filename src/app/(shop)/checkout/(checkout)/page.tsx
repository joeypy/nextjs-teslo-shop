import Link from "next/link";

import { PlaceOrder, Title } from "@/components";
import { ProductsInCheckout } from "@/components";
import { useCartStore } from "@/store";
import { redirect } from "next/navigation";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);

  if (cart.length === 0) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsInCheckout />
          </div>

          {/* Checkout - Resumen de orden */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
