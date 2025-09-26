import { Button } from "@/components/ui/button";
import { Loader, LucideProps } from "lucide-react";
import { ComponentType, useTransition } from "react";
import { toast } from "sonner";

const IncreaseDecreaseButton = ({
  updateItemQuantity,
  Icon,
}: {
  updateItemQuantity: () =>
    | Promise<{
        success: boolean;
        message: string;
      }>
    | Promise<void>;
  Icon: ComponentType<LucideProps>;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending}
      variant="outline"
      type="button"
      onClick={() =>
        startTransition(async () => {
          const res = await updateItemQuantity();

          if (res && !res.success) {
            toast.error(res.message, {});
          }
        })
      }
    >
      {isPending ? (
        <Loader className="w-4 h-4  animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
    </Button>
  );
};

export default IncreaseDecreaseButton;
