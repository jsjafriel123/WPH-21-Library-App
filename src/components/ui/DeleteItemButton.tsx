import { Button } from "./button";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { removeCartItem } from "@/services/cart";
import { useState } from "react";
export default function DeleteItemButton({
  itemId,
  onRemoved,
}: {
  itemId: number;
  onRemoved?: (itemId: number) => void;
}) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onMutate: async (itemId: number) => {
      setDeletingId(itemId);
      onRemoved?.(itemId);
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.CART],
      });

      const previousCart = queryClient.getQueryData([QUERY_KEYS.CART]);

      queryClient.setQueryData([QUERY_KEYS.CART], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.filter((item: any) => item.id !== itemId),
          },
        };
      });

      return { previousCart };
    },

    onError: (_err, _itemId, context) => {
      queryClient.setQueryData([QUERY_KEYS.CART], context?.previousCart);
    },

    onSettled: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
  });

  return (
    <div className="ml-auto flex size-fit">
      <Button
        variant="outline"
        onClick={() => removeMutation.mutate(itemId)}
        disabled={removeMutation.isPending || deletingId === itemId}
        className="size-8 bg-neutral-500 p-0 lg:size-10"
      >
        <img
          src="/assets/icon-Delete.svg"
          alt="Remove"
          className="object-fill"
        />
      </Button>
    </div>
  );
}
