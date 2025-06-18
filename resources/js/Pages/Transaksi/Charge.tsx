import React, { FormEvent, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Select2 } from "@/components/select2";
import { METODEPEMBAYARAN, PROVIDERPEMBAYARANLIST } from "@/lib/data";
import { cn, isOnline } from "@/lib/utils";
import InputForm from "@/components/InputForm";
import ButtonForm from "@/components/button-form";
import { TagihanType } from "../Tagihan/Index";
import TagihanItem from "./TagihanItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign } from "lucide-react";
import VaVariant from "./ResultCharge/VaVariant";
import ResultChargeWrapper from "./ResultCharge/ResultChargeWrapper";
import { AxiosError } from "axios";
import { useOnlineStatus } from "@/Hooks/use-online-status";
import toast from "react-hot-toast";
import { MidtransChargeResponse, MidtransErrorResponseType } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePaymentLink from "./CreatePaymentLink";

interface ChargeProps {
    open: boolean;
    onOpenChange?(open: boolean): void;
}
interface ChargeOptions {
    username: string;
    nominal: number;
    metode_pembayaran?:
        | "bank_transfer"
        | "cstore"
        | "gopay"
        | "shopeepay"
        | "dana";
    bank?: "bca" | "bni" | "bri" | "mandiri" | "permata"; // sesuaikan jika perlu
    store?: "alfamart" | "indomaret";
    tagihan_id: number | string;
    provider: number | string;
}

export default function Charge({ open, onOpenChange }: ChargeProps) {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [loadingCharge, setLoadingCharge] = useState(false);
    const [showResultCharge, setShowResultCharge] = useState(false);
    const [statusCodeCharge, setStatusCodeCharge] = useState<number | null>(
        null
    );
    const [dataCharge, setDataCharge] = useState<MidtransChargeResponse | null>(
        null
    );
    const [errorResponseCharge, setErrorResponseCharge] =
        useState<MidtransErrorResponseType | null>(null);

    const [selectedTagihanId, setSelectedTagihanId] = useState<
        string | null | number
    >(null);
    const [resultTagihan, setResultSearchTagihan] = useState<{
        success: boolean;
        data: TagihanType[];
        message: string;
    }>();
    const [searchTagihan, setSearchTagihan] = useState("");

    const form = useForm({
        metode_pembayaran: "",
        provider: "",
        tagihan_id: "",
        username: "",
        nominal: 0,
    });

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

    const currentProviderList =
        //@ts-ignore
        PROVIDERPEMBAYARANLIST[form.data.metode_pembayaran] ?? [];

    const showProvider = !!form.data.metode_pembayaran;
    const showTagihan = showProvider && !!form.data.provider;

    const handleClose = () => {
        onOpenChange?.(false);
        form.reset();
        setSearchTagihan("");
        setResultSearchTagihan({
            success: false,
            data: [],
            message: "Data tagihan tidak ditemukan!",
        });
        setShowResultCharge(false);
    };

    const handleChargeTransaksi = async () => {
        if (!isOnline()) {
            toast.error("Koneksi internet bermasalah!");
            return;
        }
        const chargeOptions: ChargeOptions = {
            username: form.data.username,
            nominal: form.data.nominal,
            tagihan_id: form.data.tagihan_id,
            provider: form.data.provider,
            ...(form.data.metode_pembayaran === "bank_transfer" && {
                metode_pembayaran: "bank_transfer",
                bank: form.data.provider as ChargeOptions["bank"],
                original_metode_pembayaran: "bank_transfer",
            }),
            ...(form.data.metode_pembayaran === "e_wallet" && {
                metode_pembayaran: form.data
                    .provider as ChargeOptions["metode_pembayaran"],
                original_metode_pembayaran: "e_wallet",
            }),
            ...(form.data.metode_pembayaran === "otc" && {
                metode_pembayaran: "cstore",
                store: form.data.provider as ChargeOptions["store"],
                original_metode_pembayaran: "otc",
            }),
        };
        setLoadingCharge(true);
        try {
            const response = await window.axios.post(
                route("transaksi.charge"),
                chargeOptions
            );
            if (response.status === 201) {
                form.reset();
                setSearchTagihan("");
                setSelectedTagihanId("");
                setDataCharge(response.data.data);
                setShowResultCharge(true);
                setStatusCodeCharge(response.data.midtrans_code);
            }
            console.log(response);
        } catch (error) {
            form.reset();
            setSearchTagihan("");
            setSelectedTagihanId("");
            setShowResultCharge(true);
            setDataCharge(null);
            if (error instanceof AxiosError && error.response) {
                setErrorResponseCharge(error.response.data);
                setStatusCodeCharge(error.response.data.midtrans_code);
            }
        } finally {
            setLoadingCharge(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent
                onPointerDownOutside={(event) => event.preventDefault()}
                className="min-w-[600px] overflow-auto"
            >
                <SheetHeader>
                    <SheetTitle>Buat Transaksi Baru</SheetTitle>
                    <SheetDescription>
                        Silakan pilih type pembayaran
                    </SheetDescription>
                </SheetHeader>
                <Tabs defaultValue="core-api" className="mt-2">
                    <TabsList className="flex w-full max-w-[300px] mx-auto">
                        <TabsTrigger value="core-api">Manual</TabsTrigger>
                        <TabsTrigger value="payment_link">
                            Payment Link
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="core-api">
                        <div className="mt-4 space-y-4">
                            <div
                                className={cn(
                                    "flex items-center",
                                    showProvider && "gap-x-5"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex flex-col",
                                        showProvider ? "w-[50%]" : "w-full"
                                    )}
                                >
                                    <Label
                                        htmlFor="metode_pembayaran"
                                        className="mb-2"
                                    >
                                        Metode Pembayaran
                                    </Label>
                                    <Select2
                                        searchable={false}
                                        options={METODEPEMBAYARAN.map(
                                            (metode) => ({
                                                label: metode.label,
                                                value: metode.value,
                                            })
                                        )}
                                        value={form.data.metode_pembayaran}
                                        onChange={(selected) => {
                                            form.setData(
                                                "metode_pembayaran",
                                                selected as string
                                            );
                                            form.setData("provider", "");
                                        }}
                                    />
                                    {form.errors.metode_pembayaran && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {form.errors.metode_pembayaran}
                                        </span>
                                    )}
                                </div>

                                {showProvider && (
                                    <div className="flex flex-col w-[50%]">
                                        <Label
                                            htmlFor="provider"
                                            className="mb-2"
                                        >
                                            Provider Pembayaran
                                        </Label>
                                        <Select2
                                            searchable={false}
                                            options={currentProviderList.map(
                                                (provider: any) => ({
                                                    label: provider.label,
                                                    value: provider.name,
                                                })
                                            )}
                                            value={form.data.provider}
                                            onChange={(selected) =>
                                                form.setData(
                                                    "provider",
                                                    selected as string
                                                )
                                            }
                                        />
                                        {form.errors.provider && (
                                            <span className="text-red-500 text-sm mt-1">
                                                {form.errors.provider}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {showTagihan && (
                                <div className="flex flex-col">
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
                                                    setSearchTagihan(
                                                        e.target.value
                                                    )
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

                                    {resultTagihan && resultTagihan.success ? (
                                        <>
                                            <ScrollArea className="h-72">
                                                {resultTagihan.data.map(
                                                    (tagihan, key) => (
                                                        <TagihanItem
                                                            key={tagihan.id}
                                                            tagihan={tagihan}
                                                            selected={
                                                                selectedTagihanId ===
                                                                tagihan.id
                                                            }
                                                            onSelect={(id) => {
                                                                setSelectedTagihanId(
                                                                    id
                                                                );
                                                                form.setData(
                                                                    "tagihan_id",
                                                                    String(id)
                                                                );
                                                                form.setData(
                                                                    "username",
                                                                    tagihan.user
                                                                        .username
                                                                );
                                                                form.setData(
                                                                    "nominal",
                                                                    tagihan.nominal
                                                                );
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </ScrollArea>
                                            <div className="mt-4">
                                                <ButtonForm
                                                    label="Buat Transaksi Baru"
                                                    righticon={<DollarSign />}
                                                    loading={loadingCharge}
                                                    type="button"
                                                    onClick={
                                                        handleChargeTransaksi
                                                    }
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-red-500 text-md text-center">
                                            {resultTagihan?.message}
                                        </div>
                                    )}
                                </div>
                            )}

                            {showResultCharge && (
                                <ResultChargeWrapper
                                    data={dataCharge}
                                    status_code={statusCodeCharge}
                                    error={errorResponseCharge}
                                />
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="payment_link">
                        <CreatePaymentLink />
                    </TabsContent>
                </Tabs>
            </SheetContent>
        </Sheet>
    );
}
