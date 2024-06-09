import prisma from "@lib/prisma/client";

type OrderItemParams = {
  name: string;
  price: number;
  quantity: number;
};

type OrderCreationParams = {
  contactInfo: string;
  shippingLocation: string;
  initOrderStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "success" | "failed" | "refunded";
  userId: string;
  paymentIntent: string;
  items: OrderItemParams[];
  paidAmount: number;
  discountPercentage: number;
  tax: number;
};

export async function createOrder({
  initOrderStatus,
  paymentStatus,
  contactInfo,
  shippingLocation,
  userId,
  paymentIntent,
  items,
  paidAmount,
  discountPercentage,
  tax,
}: OrderCreationParams) {
  const order = await prisma.order.create({
    data: {
      contactInfo,
      status: initOrderStatus,
      paymentStatus,
      shippingLocation,
      createdBy: userId,
      intent: paymentIntent,
      paidAmount,
      discountApplied: discountPercentage,
      taxAdded: tax,
      orderItem: {
        createMany: {
          data: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    },
    select: {
      id: true,
      createdBy: true,
      status: true,
      shippingLocation: true,
      contactInfo: true,
      paymentStatus: true,
      createdAt: true,
      _count: {
        select: {
          orderItem: true,
        },
      },
    },
  });
  return { data: order };
}

export async function getOrderInfo({
  orderId: id,
  intentId: intent,
}: {
  orderId?: string;
  intentId?: string;
}) {
  if (!id && !intent) {
    return;
  }

  const order = await prisma.order.findUnique({
    where: {
      id,
      intent,
      OR: [
        {
          intent,
        },
        {
          id,
        },
      ],
    },
  });
  return { data: order };
}
