"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { Cart } from "@prisma/client";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import IncreaseDecreaseButton from "./increase-decrease-button";
const AddToCart = ({
  item,
  cart,
}: {
  cart?: Cart;
  item: Omit<CartItem, "cartId">;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleAddToCart = async () => {
    startTransition(async () => {
      // Execute the addItemToCart action

      const res = await addItemToCart(item);

      // Display appropriate toast message based on the result
      if (!res.success) {
        toast.error("Somting went wrong", {
          description: res.message,
        });
        return;
      }

      toast.success(res.message, {
        action: {
          label: "Go to cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast.success(res.message, {
        classNames: { actionButton: "bg-primary text-white hover:bg-gray-800" },
      });

      return;
    });
  };

  const existItem =
    cart &&
    (cart.items as unknown as CartItem[]).find(
      (x: CartItem) => x.productId === item.productId
    );

  return existItem ? (
    <div>
      <IncreaseDecreaseButton
        Icon={Minus}
        updateItemQuantity={handleRemoveFromCart}
      />
      <span className="px-2">{existItem.qty}</span>
      <IncreaseDecreaseButton
        Icon={Plus}
        updateItemQuantity={handleAddToCart}
      />
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4  animate-spin" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      Add to cart
    </Button>
  );
};

export default AddToCart;
