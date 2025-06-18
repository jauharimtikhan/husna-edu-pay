import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Option {
    label: string;
    value: string | number;
}

interface Select2Props {
    options: Option[];
    value: string | number; // 👉 ubah dari Option | null
    onChange: (value: string | number) => void; // 👉 ubah dari Option | null
    placeholder?: string;
    searchable?: boolean;
}

export const Select2: React.FC<Select2Props> = ({
    options,
    value,
    onChange,
    placeholder = "Pilih salah satu",
    searchable = true,
}) => {
    const [search, setSearch] = React.useState("");

    const filteredOptions = options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Select value={String(value)} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {searchable && (
                    <div className="p-2">
                        <Input
                            placeholder="Cari..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                )}
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={String(option.value)}
                        >
                            {option.label}
                        </SelectItem>
                    ))
                ) : (
                    <div className="p-2 text-sm text-muted-foreground">
                        Tidak ada hasil
                    </div>
                )}
            </SelectContent>
        </Select>
    );
};
