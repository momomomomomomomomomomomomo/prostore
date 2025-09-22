import {
  cartItemSchema,
  insertCartSchema,
  insertProductsSchema,
  shippingAddressSchema,
} from "@/lib/validators";
import z from "zod";

export type Product = z.infer<typeof insertProductsSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
