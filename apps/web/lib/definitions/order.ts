import { z } from "zod";

export const PaymentIntentMetadataSchema = z.object({
  forUser: z.string().min(1, "User id is required").trim(),
  shippingId: z.string().min(1, "Shipping address is required").trim(),
  billingId: z.string().min(1, "Billing address is required").trim(),
  buyNowOrder: z.literal("0").or(z.literal("1")),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Item id is required").trim(),
        quantity: z.number().min(1, "Item quantity must be greater than 0"),
      })
    )
    .min(1, "At least one item is required"),
  savePayment: z.literal("0").or(z.literal("1")).optional(),
});

export type CheckoutFormState =
  | {
      error?: string;
    }
  | {
      data: {
        id: string;
        createdBy: string;
        status: string;
        shippingLocation: string;
        contactInfo: string;
        paymentStatus: string;
        createdAt: Date;
      };
    }
  | undefined;
