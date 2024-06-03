import prisma from "@lib/prisma/client";

async function getCartItems({ userId }: { userId: string }) {
  const data = await prisma.cartItem.findMany({
    where: {
      buyerId: userId,
    },
    select: {
      productId: true,
      quantity: true,
    },
  });
  return { data };
}

async function addItemsToCart({
  productId,
  quantity,
  userId,
}: {
  productId: string;
  quantity: number;
  userId: string;
}) {
  const data = await prisma.cartItem.upsert({
    where: {
      buyerId_productId: {
        buyerId: userId,
        productId,
      },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: {
      productId,
      quantity,
      buyerId: userId,
    },
  });

  return { data };
}

async function removeItemFromCart({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const data = await prisma.cartItem.delete({
    where: {
      buyerId_productId: {
        buyerId: userId,
        productId,
      },
    },
  });

  return { data };
}

async function updateItemQuantity({
  productId,
  quantity,
  userId,
}: {
  productId: string;
  quantity: number;
  userId: string;
}) {
  const data = await prisma.cartItem.update({
    where: {
      buyerId_productId: {
        buyerId: userId,
        productId,
      },
    },
    data: {
      quantity,
    },
  });

  return { data };
}

async function clearCart({ userId }: { userId: string }) {
  const data = await prisma.cartItem.deleteMany({
    where: {
      buyerId: userId,
    },
  });
  console.log(data);
  return data;
}

export {
  addItemsToCart,
  getCartItems,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
};
