import ButtonForm from "@/components/button-form";
import { DatePicker } from "@/components/date-picker";
import InputForm from "@/components/InputForm";
import { Select2 } from "@/components/select2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STATUSTRANSAKSI } from "@/lib/data";
import { formatRupiah, generateInvoiceCode } from "@/lib/utils";
import { PageProps, User } from "@/types";
import { Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Loader2Icon, SendHorizontal, Settings } from "lucide-react";
import React, { FormEvent, useEffect } from "react";
import { TagihanType } from "./Index";

type FormDataTagihan = {
    nama_tagihan: string;
    kode_tagihan: string;
    user_id: string;
    nominal: string;
    tanggal: Date | string;
    status: string;
};

export default function Update({
    alert,
    users,
    tagihan,
}: PageProps<{
    users: User[];
    tagihan: TagihanType;
}>) {
    UseToast(alert);
    const form = useForm<FormDataTagihan>({
        nama_tagihan: "",
        kode_tagihan: "",
        user_id: "",
        nominal: "",
        tanggal: "",
        status: "",
    });
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.post(route("tagihan.update", tagihan.id));
    };

    useEffect(() => {
        form.setData("kode_tagihan", tagihan.kode_tagihan);
        form.setData("nama_tagihan", tagihan.nama_tagihan);
        form.setData("user_id", tagihan.user_id.toString());
        form.setData("status", tagihan.status);
        form.setData("tanggal", tagihan.tanggal);
        form.setData("nominal", formatRupiah().format(tagihan.nominal));
    }, []);
    return (
        <AuthenticatedLayout title="Buat Tagihan Baru">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">Update Tagihan</h1>
                    <Button asChild variant={"secondary"}>
                        <Link href={route("tagihan.index")}>
                            <ArrowLeft />
                            Kembali
                        </Link>
                    </Button>
                </div>
                <div className="mt-8">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="py-4 space-y-6">
                                <InputForm
                                    label="Nama Tagihan"
                                    placeholder="Masukan Nama Tagihan"
                                    value={form.data.nama_tagihan}
                                    onChange={(e) =>
                                        form.setData(
                                            "nama_tagihan",
                                            e.target.value
                                        )
                                    }
                                    error={form.errors.nama_tagihan}
                                />
                                <InputForm
                                    label="Kode Tagihan"
                                    placeholder="Masukan Kode Tagihan"
                                    value={form.data.kode_tagihan}
                                    onChange={(e) =>
                                        form.setData(
                                            "kode_tagihan",
                                            e.target.value
                                        )
                                    }
                                    readOnly
                                    error={form.errors.kode_tagihan}
                                    rightcontent={
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    onClick={() => {
                                                        form.setData(
                                                            "kode_tagihan",
                                                            generateInvoiceCode()
                                                        );
                                                    }}
                                                    variant={"outline"}
                                                    type="button"
                                                    size={"icon"}
                                                >
                                                    <Settings />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Generate Kode Tagihan</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    }
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
                                            form.setData(
                                                "user_id",
                                                val as string
                                            )
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
                                        options={STATUSTRANSAKSI.map(
                                            (item) => ({
                                                label: item.label,
                                                value: item.value,
                                            })
                                        )}
                                        value={form.data.status}
                                        onChange={(val) =>
                                            form.setData(
                                                "status",
                                                val as string
                                            )
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
                                            onSelect={(e) =>
                                                form.setData("tanggal", e)
                                            }
                                        />
                                    </div>
                                    {form.errors.tanggal && (
                                        <span className="text-red-500 mt-1 text-sm">
                                            {form.errors.tanggal}
                                        </span>
                                    )}
                                </div>
                                <div className="flex justify-end">
                                    <ButtonForm
                                        loading={form.processing}
                                        righticon={<SendHorizontal />}
                                        label="Update Data Tagihan"
                                        variant={"secondary"}
                                        type="submit"
                                    />
                                </div>
                            </CardContent>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
