import type { Order } from "@repo/ui/types";
import type { Prisma } from "prisma/prisma-client";
import prisma from "@lib/prisma/client";

type OrderItemParams = {
  name: string;
  price: number;
  quantity: number;
  id: string;
};

type OrderCreationParams = {
  contactInfo: string;
  shippingLocation: string;
  initOrderStatus: Pick<Order, "status">["status"];
  paymentStatus: Pick<Order, "paymentStatus">["paymentStatus"];
  userId: string;
  paymentIntent: string;
  items: OrderItemParams[];
  paidAmount: number;
  discountPercentage: number;
  tax: number;
};

const ORDER_SELECT = {
  id: true,
  createdAt: true,
  status: true,
  contactInfo: true,
  shippingLocation: true,
  paidAmount: true,
  paymentStatus: true,
  orderItem: true,
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
            productId: item.id,
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

export async function getOrderByQuery({
  query,
  userId,
  offset = 0,
  ps = 10,
}: {
  userId: string;
  query: string;
  offset?: number;
  ps?: number;
}) {
  const WHERE_QUERY: Prisma.orderWhereInput = {
    createdBy: userId,
    orderItem: {
      some: {
        name: {
          mode: "insensitive",
          contains: query,
        },
      },
    },
  };
  const [totalCount, orders] = await Promise.all([
    prisma.order.count({
      where: WHERE_QUERY,
    }),
    prisma.order.findMany({
      where: WHERE_QUERY,
      select: ORDER_SELECT,
      orderBy: {
        createdAt: "desc",
      },
      take: ps,
      skip: offset,
    }),
  ]);
  return { data: orders as Order[], total: totalCount };
}

export async function getOrdersByUser({
  userId,
  offset = 0,
  ps = 10,
}: {
  userId: string;
  offset?: number;
  ps?: number;
}) {
  const [totalCount, orders] = await Promise.all([
    prisma.order.count({
      where: {
        createdBy: userId,
      },
    }),
    prisma.order.findMany({
      where: {
        createdBy: userId,
      },
      select: ORDER_SELECT,
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: ps,
    }),
  ]);
  return { data: orders as Order[], total: totalCount };
}
