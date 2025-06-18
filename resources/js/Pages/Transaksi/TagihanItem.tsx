import React from "react";

import { TagihanType } from "../Tagihan/Index";
import { formatRupiah } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface TagihanItemProps {
    tagihan: TagihanType;
    selected: boolean;
    onSelect: (id: string | number) => void;
}

export default function TagihanItem({
    tagihan,
    selected,
    onSelect,
}: TagihanItemProps) {
    const statusStyles: Record<string, { color: string; icon?: JSX.Element }> =
        {
            pending: {
                color: " text-yellow-800",
            },
            authorize: {
                color: " text-purple-800",
            },
            failed: {
                color: " text-red-800",
            },
            settlement: {
                color: " text-green-800",
            },
            capture: {
                color: " text-blue-800",
            },
            deny: {
                color: " text-orange-800",
            },
            cancel: {
                color: " text-gray-800",
            },
            refund: {
                color: " text-indigo-800",
            },
            partial_refund: {
                color: " text-indigo-800",
            },
            partial_chargeback: {
                color: " text-pink-800",
            },
            expire: {
                color: " text-zinc-800",
            },
            failure: {
                color: " text-red-800",
            },
        };

    const current = statusStyles[tagihan.status] || {
        color: "bg-muted text-muted-foreground",
    };
    return (
        <div className="select-none flex items-center border rounded-lg p-3 transition-colors mb-2">
            <Checkbox
                checked={selected}
                className="mr-4"
                onCheckedChange={() => onSelect(tagihan.id)}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
                <span className="font-medium">
                    {tagihan.kode_tagihan} - {tagihan.nama_tagihan}
                </span>
                <span className="">
                    {formatRupiah().format(tagihan.nominal)}
                </span>
                <span className="">{tagihan.user.username}</span>
                <span className={`text-sm font-semibold ${current.color}`}>
                    {tagihan.status.toUpperCase()}
                </span>
            </div>
        </div>
    );
}
