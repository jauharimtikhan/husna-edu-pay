import ButtonForm from "@/components/button-form";
import { ImageUploader } from "@/components/ImageUploader";
import InputForm from "@/components/InputForm";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "@inertiajs/react";
import React, { FormEvent } from "react";

export default function CreateMetodePembayaran() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        kategori: "",
        gambar: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("pengaturan.payment.method.store"));
    };
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
                    onChange={(file) => setData("gambar", file)}
                />
                <div className="flex justify-end">
                    <ButtonForm
                        loading={processing}
                        disabled={processing}
                        type="submit"
                        variant="default"
                        label="Tambah"
                    />
                </div>
            </ScrollArea>
        </form>
    );
}
