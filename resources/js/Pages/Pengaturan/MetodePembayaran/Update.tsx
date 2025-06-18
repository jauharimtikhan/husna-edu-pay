import React, { FormEvent, useEffect } from "react";
import { PaymentListType } from "./Index";
import { useForm } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputForm from "@/components/InputForm";
import { ImageUploader } from "@/components/ImageUploader";
import ButtonForm from "@/components/button-form";
import { getAssetUrl } from "@/lib/utils";

interface UpdateMetodePembayaran {
    paymentList: PaymentListType;
}
export default function UpdateMetodePembayaran({
    paymentList,
}: UpdateMetodePembayaran) {
    const { data, setData, put, processing, errors } = useForm({
        nama: paymentList.nama || "",
        kategori: paymentList.kategori || "",
        gambar: paymentList.gambar || (null as File | null),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route("pengaturan.payment.method.update", paymentList.id));
    };

    useEffect(() => {
        if (paymentList) {
            setData("gambar", paymentList.gambar);
            setData("nama", paymentList.nama);
            setData("kategori", paymentList.kategori);
        }
    }, [paymentList]);
    return (
        <form onSubmit={handleSubmit} className="space-y-2 overflow-auto mx-3">
            <ScrollArea className="h-[400px]">
                <InputForm
                    label="Nama Metode Pembayaran"
                    placeholder="Masukan Nama Metode Pembayaran"
                    error={errors.nama}
                    value={data.nama}
                    onChange={(e) => setData("nama", e.target.value)}
                />
                <InputForm
                    label="Kategori Metode Pembayaran"
                    placeholder="Masukan Kategori Metode Pembayaran"
                    error={errors.kategori}
                    value={data.kategori}
                    onChange={(e) => setData("kategori", e.target.value)}
                />
                <ImageUploader
                    name="avatar"
                    label="Gambar"
                    defaultImageUrl={getAssetUrl(paymentList.gambar)}
                    onChange={(file) => setData("gambar", file)}
                />
                <div className="flex justify-end">
                    <ButtonForm
                        loading={processing}
                        disabled={processing}
                        type="submit"
                        variant="default"
                        label="Update"
                    />
                </div>
            </ScrollArea>
        </form>
    );
}
