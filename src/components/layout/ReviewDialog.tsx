import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { useCreateReview } from "@/features/books/useCreateReview";
import { useState } from "react";
import { toast } from "sonner";
import { StarRating } from "../ui/StarRating-v2";
export default function ReviewDialog({ bookId }: { bookId: number }) {
  const { mutate, isPending } = useCreateReview();
  const [open, setOpen] = useState(false);
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    mutate(
      {
        bookId,
        star,
        comment,
      },
      {
        onSuccess: () => {
          setComment("");
          setStar(5);
          toast.success("Review submitted");
          setOpen(false);
        },
        onError: (error: any) => {
          toast.error("Failed to submit review", {
            description:
              error?.response?.data?.message || "Something went wrong",
          });
        },
      },
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-10 w-full gap-2 rounded-[100px] bg-primary-300 p-2 text-md font-bold tracking-[-2%] text-neutral-25 lg:w-[182px]">
          Give Review
        </Button>
        {/* <Button>X</Button> */}
      </DialogTrigger>
      <DialogContent className="h-[479px] w-[345px] gap-6 rounded-2xl bg-white p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold tracking-[-3%] text-neutral-950">
            Give Review
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[68px] w-full flex-col items-center">
          <p className="text-sm font-bold tracking-[-2%] text-neutral-950">
            Give Rating
          </p>
          <div className="flex h-10 w-full justify-center gap-1">
            <StarRating value={star} onChange={setStar} />
          </div>
        </div>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about this book"
          className="h-[235px] w-[313px] resize-none gap-2 rounded-xl px-3 py-2"
        ></Textarea>
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="h-10 w-full gap-2 rounded-[100px] bg-primary-300 p-2 text-md font-bold tracking-[-2%] text-neutral-25 lg:w-[182px]"
        >
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
}
