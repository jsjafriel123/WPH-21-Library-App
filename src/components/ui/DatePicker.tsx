import dayjs from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function DatePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "font-normal h-12 w-full justify-between gap-2 rounded-xl border border-neutral-300 bg-neutral-100 px-4 py-2 text-left",
            !value && "text-muted-foreground",
          )}
        >
          {value ? dayjs(value).format("DD MMM YYYY") : "Pick a date"}
          <CalendarIcon className="mr-2 size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
          autoFocus
          disabled={(date) => dayjs(date).isBefore(dayjs(), "day")}
          className="bg-neutral-25"
        />
      </PopoverContent>
    </Popover>
  );
}
