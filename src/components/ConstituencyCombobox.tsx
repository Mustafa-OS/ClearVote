import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ConstituencyComboboxProps {
  constituencies: string[];
  value: string;
  onValueChange: (value: string) => void;
}

export function ConstituencyCombobox({
  constituencies,
  value,
  onValueChange,
}: ConstituencyComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[280px] justify-between rounded-xl font-body text-sm border-border/60 bg-background shadow-sm"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
              {value || "Select constituency..."}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search constituency..." />
          <CommandList>
            <CommandEmpty>No constituency found.</CommandEmpty>
            <CommandGroup>
              {constituencies.map((c) => (
                <CommandItem
                  key={c}
                  value={c}
                  onSelect={() => {
                    onValueChange(c);
                    setOpen(false);
                  }}
                  className="font-body text-sm"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === c ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {c}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
