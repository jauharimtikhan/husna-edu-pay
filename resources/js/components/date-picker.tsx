import * as React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
type DatePickerProps = {
    placeholder?: string;
    date: Date | string;
    onSelect: (value: any) => any;
};
export function DatePicker({ date, placeholder, ...props }: DatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? (
                        format(date, "yyyy-MM-dd", { locale: id })
                    ) : (
                        <span>{placeholder || "Pilih Tanggal"}</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar lang="id" mode="single" initialFocus {...props} />
            </PopoverContent>
        </Popover>
    );
}
