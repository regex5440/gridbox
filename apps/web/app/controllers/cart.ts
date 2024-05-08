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

export { addItemsToCart, getCartItems };
