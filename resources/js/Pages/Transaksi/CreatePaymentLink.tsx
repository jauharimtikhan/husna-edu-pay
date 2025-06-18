import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { TagihanType } from "../Tagihan/Index";
import { AxiosError } from "axios";
import InputForm from "@/components/InputForm";
import ButtonForm from "@/components/button-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import TagihanItem from "./TagihanItem";
import { Copy, DollarSign } from "lucide-react";
import { MidtransPaymentLinkResponse } from "@/types";

export default function CreatePaymentLink() {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchTagihan, setSearchTagihan] = useState("");
    const [selectedTagihanId, setSelectedTagihanId] = useState<
        string | null | number
    >(null);
    const [resultTagihan, setResultSearchTagihan] = useState<{
        success: boolean;
        data: TagihanType[];
        message: string;
    } | null>(null);
    const [form, setForm] = useState({
        tagihan_id: "",
        max_usage: 1,
    });

    const [responsePaymentLink, setResponsePaymentLink] = useState<
        | {
              data: MidtransPaymentLinkResponse;
              message: string;
              midtrans_code: number;
          }
        | undefined
    >(undefined);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await window.axios.post(
                route("transaksi.charge.payment.link"),
                form
            );
            setResponsePaymentLink(response.data);
            setResultSearchTagihan(null);
            console.log("RESPONSE:", response);
        } catch (error) {
            console.error("ERROR PAYMENT LINK CREATION:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingSearch(true);
        try {
            const response = await window.axios.get(
                route("tagihan.search", { q: searchTagihan })
            );
            setResultSearchTagihan(response.data);
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                if (error.response.status === 401) {
                    window.location.reload();
                    return;
                }
                setResultSearchTagihan({
                    success: false,
                    data: [],
                    message:
                        error.response.data?.message ??
                        "Data tagihan tidak ditemukan!",
                });
            }
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Teks berhasil di salin!");
    };

    return (
        <Card className="max-w-xl mx-auto mt-10">
            <CardHeader>
                <CardTitle>Buat Payment Link</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4">
                <div className="my-3">
                    <InputForm
                        label="Maksimal Penggunaan Link"
                        id="max_usage"
                        placeholder="Masukan maksimal berapa kali user dapat menggunakan link ini "
                        value={form.max_usage}
                        type="number"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                max_usage: Number(e.target.value),
                            })
                        }
                    />
                </div>
                <div className="flex flex-col ">
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center gap-x-5 mb-4"
                    >
                        <div className="w-full">
                            <InputForm
                                label="Tagihan"
                                id="tagihan_id"
                                placeholder="Cari Data Tagihan Berdasarkan Nama, Kode, atau Status"
                                value={searchTagihan}
                                onChange={(e) =>
                                    setSearchTagihan(e.target.value)
                                }
                            />
                        </div>
                        <div className="mt-2">
                            <ButtonForm
                                size="sm"
                                label="Cari"
                                type="submit"
                                loading={loadingSearch}
                            />
                        </div>
                    </form>
                    {responsePaymentLink && (
                        <div>
                            <Label>Url Pembayaran</Label>
                            <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1">
                                <span className="font-medium">
                                    {responsePaymentLink.data.payment_url}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        handleCopy(
                                            responsePaymentLink.data.payment_url
                                        )
                                    }
                                    type="button"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="mt-1 text-gray-500">
                                Berikan link ini ke pengguna
                            </p>
                        </div>
                    )}
                    {resultTagihan && resultTagihan.success ? (
                        <>
                            <ScrollArea className="h-72">
                                {resultTagihan.data.map((tagihan, key) => (
                                    <TagihanItem
                                        key={tagihan.id}
                                        tagihan={tagihan}
                                        selected={
                                            selectedTagihanId === tagihan.id
                                        }
                                        onSelect={(id) => {
                                            setSelectedTagihanId(id);
                                            setForm({
                                                ...form,
                                                tagihan_id: String(id),
                                            });
                                        }}
                                    />
                                ))}
                            </ScrollArea>
                            <div className="mt-4"></div>
                        </>
                    ) : (
                        <div className="text-red-500 text-md text-center">
                            {resultTagihan?.message}
                        </div>
                    )}
                </div>
                {responsePaymentLink === undefined && (
                    <div className="flex justify-end">
                        <ButtonForm
                            label="Submit"
                            loading={isSubmitting}
                            type="button"
                            onClick={handleSubmit}
                            variant={"secondary"}
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
