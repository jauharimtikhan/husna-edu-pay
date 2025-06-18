import ButtonForm from "@/components/button-form";
import { DatePicker } from "@/components/date-picker";
import InputForm from "@/components/InputForm";
import { Select2 } from "@/components/select2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { STATUSTRANSAKSI } from "@/lib/data";
import { formatRupiah, generateInvoiceCode } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import { SendHorizontal, Settings } from "lucide-react";
import React, { FormEvent } from "react";
import { FormDataTagihan } from "./Create";
import { User } from "@/types";

export default function CreateMultiple({ users }: { users: User[] }) {
    const form = useForm({
        nama_tagihan: "",
        user_id: "",
        nominal: "",
        tanggal: "",
        status: "",
        generate: 1,
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(route("tagihan.store.multiple"));
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardContent className="py-4 space-y-6">
                    <InputForm
                        label="Nama Tagihan"
                        placeholder="Masukan Nama Tagihan"
                        value={form.data.nama_tagihan}
                        onChange={(e) =>
                            form.setData("nama_tagihan", e.target.value)
                        }
                        error={form.errors.nama_tagihan}
                    />
                    <InputForm
                        label="Nominal"
                        type="text"
                        placeholder="Masukan Nominal Tagihan"
                        value={form.data.nominal}
                        onChange={(e) => {
                            // Ambil hanya angka dari input
                            const rawValue = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                            );

                            // Format ke Rupiah
                            const formatted = formatRupiah().format(
                                Number(rawValue)
                            );

                            form.setData("nominal", formatted);
                        }}
                        error={form.errors.nominal}
                    />
                    <div className="mb-3 flex flex-col">
                        <Label htmlFor="user_id" className="mb-2">
                            Pengguna
                        </Label>
                        <Select2
                            options={users.map((item) => ({
                                label: item.username,
                                value: item.id,
                            }))}
                            value={form.data.user_id}
                            onChange={(val) =>
                                form.setData("user_id", val as string)
                            }
                        />
                        {form.errors.user_id && (
                            <span className="text-red-500 text-sm mt-1">
                                {form.errors.user_id}
                            </span>
                        )}
                    </div>
                    <div className="mb-3 flex flex-col">
                        <Label htmlFor="status" className="mb-2">
                            Status Tagihan
                        </Label>
                        <Select2
                            options={STATUSTRANSAKSI.map((item) => ({
                                label: item.label,
                                value: item.value,
                            }))}
                            value={form.data.status}
                            onChange={(val) =>
                                form.setData("status", val as string)
                            }
                        />
                        {form.errors.status && (
                            <span className="text-red-500 text-sm mt-1">
                                {form.errors.status}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col ">
                        <Label htmlFor="tanggal" className="mb-2">
                            Tanggal
                        </Label>
                        <div className="w-full">
                            <DatePicker
                                date={form.data.tanggal}
                                onSelect={(e) => form.setData("tanggal", e)}
                            />
                        </div>
                        {form.errors.tanggal && (
                            <span className="text-red-500 mt-1 text-sm">
                                {form.errors.tanggal}
                            </span>
                        )}
                    </div>
                    <InputForm
                        type="number"
                        label="Buat Berapa Tagihan"
                        placeholder="Masukan Berapa Banyak Tagihan Yang Ingin Anda buat"
                        value={form.data.generate}
                        onChange={(e) =>
                            form.setData("generate", Number(e.target.value))
                        }
                        error={form.errors.generate}
                    />
                    <div className="flex justify-end">
                        <ButtonForm
                            loading={form.processing}
                            righticon={<SendHorizontal />}
                            label="Buat Tagihan Baru"
                            variant={"secondary"}
                            type="submit"
                        />
                    </div>
                </CardContent>
            </form>
        </Card>
    );
}
