"use client";

import { setTransactionId } from "@/actions";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

type Props = {
  orderId: string;
  amount: number;
};

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100).toString();

  if (isPending) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded" />
        <div className="h-12 bg-gray-300 rounded mb-8" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: roundedAmount,
          },
        },
      ],
    });

    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error("No se pudo actualizar la orden");
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
