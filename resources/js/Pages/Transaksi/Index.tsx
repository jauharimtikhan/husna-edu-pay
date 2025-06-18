import ButtonForm from "@/components/button-form";
import { DatePicker } from "@/components/date-picker";
import { Select2 } from "@/components/select2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { METODEPEMBAYARAN, STATUSTRANSAKSI } from "@/lib/data";
import { Link, router } from "@inertiajs/react";
import {
    CirclePlus,
    Copy,
    Eye,
    Loader2Icon,
    Search,
    Trash2,
    TriangleAlert,
    X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { TagihanType } from "../Tagihan/Index";
import { MidtransChargeResponse, PageProps } from "@/types";
import UseToast from "@/Hooks/UseToast";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableActionColumn } from "@/components/raw-table";
import Charge from "./Charge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Modal from "@/components/modal";
import ResultChargeWrapper from "./ResultCharge/ResultChargeWrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isPaymentLink } from "@/lib/utils";

export type TransaksiType = {
    id: number;
    metode_pembayaran: string;
    tagihan_id: number;
    detail_charge: string;
    tagihan: TagihanType;
    provider: string;
};

interface TransaksiIndexProps extends PageProps {
    transaksis: {
        data: TransaksiType[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function TransaksiIndex({
    alert,
    transaksis,
}: TransaksiIndexProps) {
    UseToast(alert);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const [id, setId] = useState<string | number | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const [detailCharge, setDetailCharge] =
        useState<MidtransChargeResponse | null>(null);
    const searchParam = new URLSearchParams(window.location.search);
    const [searchParams, setSearchParams] = useState({
        nama_pengguna: "",
        kode_tagihan: "",
        tanggal: "",
        status: "",
        metode_pembayaran: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        router.get(route("transaksi.index"), searchParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = () => {
        if (!id) {
            return;
        } else {
            router.delete(route("transaksi.destroy", id), {
                onStart: () => setLoading(true),
                onProgress: () => setLoading(true),
                onFinish: () => {
                    setLoading(false);
                    setOpenModalDelete(false);
                },
            });
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Teks berhasil di salin!");
    };

    const columns: ColumnDef<TransaksiType>[] = [
        {
            id: "rowNumber",
            header: "#",
            cell: ({ row, table }) => {
                const pageIndex = transaksis.current_page - 1; // 0-based
                const pageSize = transaksis.per_page;

                return pageIndex * pageSize + row.index + 1;
            },
        },
        {
            accessorKey: "metode_pembayaran",
            header: "Metode Pembayaran",
        },
        {
            accessorKey: "provider",
            header: "Provider Pembayaran",
            cell: ({ row }) => {
                const { provider } = row.original;
                if (!provider) {
                    return "-";
                }
                return provider;
            },
        },
        {
            accessorKey: "tagihan.kode_tagihan",
            header: "Provider Pembayaran",
        },
        {
            accessorKey: "tagihan.status",
            header: "Status Pembayaran",
        },
        {
            accessorKey: "aksi",
            header: "Aksi",
            cell: ({ row }) => {
                const { id, detail_charge } = row.original;
                const detailChargeParse: MidtransChargeResponse =
                    JSON.parse(detail_charge);

                return (
                    <DataTableActionColumn>
                        <>
                            <DropdownMenuItem
                                onClick={() => {
                                    setDetailCharge(detailChargeParse);
                                    setOpenModalDetail(true);
                                }}
                            >
                                <Eye />
                                Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setId(id);
                                    setOpenModalDelete(true);
                                }}
                            >
                                <Trash2 className="text-red-500" />
                                Hapus
                            </DropdownMenuItem>
                        </>
                    </DataTableActionColumn>
                );
            },
        },
    ];

    useEffect(() => {
        setSearchParams({
            nama_pengguna: searchParam.get("nama_pengguna") || "",
            kode_tagihan: searchParam.get("kode_tagihan") || "",
            tanggal: searchParam.get("tanggal") || "",
            status: searchParam.get("status") || "",
            metode_pembayaran: searchParam.get("metode_pembayaran") || "",
        });
    }, []);

    return (
        <AuthenticatedLayout title="Transaksi">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">Transaksi</h1>
                    <Button
                        type="button"
                        onClick={() => setOpenSideDrawer(true)}
                        variant={"secondary"}
                    >
                        <CirclePlus />
                        Buat Transaksi Baru
                    </Button>
                </div>
                <div className="mt-8">
                    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Input
                            name="nama_pengguna"
                            value={searchParams.nama_pengguna}
                            onChange={handleChange}
                            placeholder="Cari berdasarkan Nama Pengguna"
                        />
                        <Input
                            name="kode_tagihan"
                            value={searchParams.kode_tagihan}
                            onChange={handleChange}
                            placeholder="Cari berdasarkan Kode Transaksi"
                        />
                        <DatePicker
                            date={searchParams.tanggal}
                            onSelect={(value) =>
                                setSearchParams({
                                    ...searchParams,
                                    tanggal: value,
                                })
                            }
                            placeholder="Cari Berdasarkan Tanggal"
                        />
                        <Select2
                            options={STATUSTRANSAKSI.map((status) => ({
                                label: status.label,
                                value: status.value,
                            }))}
                            value={searchParams.status}
                            onChange={(selected) =>
                                setSearchParams({
                                    ...searchParams,
                                    status: String(selected),
                                })
                            }
                            placeholder="Cari Berdasarkan Status"
                        />
                        <Select2
                            options={METODEPEMBAYARAN.map((status) => ({
                                label: status.label,
                                value: status.value,
                            }))}
                            value={searchParams.metode_pembayaran}
                            onChange={(selected) =>
                                setSearchParams({
                                    ...searchParams,
                                    metode_pembayaran: String(selected),
                                })
                            }
                            placeholder="Cari Berdasarkan Metode Pembayaran"
                        />
                        <div className="flex items-center gap-x-3">
                            <ButtonForm
                                lefticon={<X />}
                                label="Hapus filter pencarian"
                                onClick={() => {
                                    setSearchParams({
                                        nama_pengguna: "",
                                        kode_tagihan: "",
                                        tanggal: "",
                                        status: "",
                                        metode_pembayaran: "",
                                    });
                                    router.get(
                                        route("transaksi.index"),
                                        {},
                                        {
                                            preserveState: true,
                                            replace: true,
                                        }
                                    );
                                }}
                                variant={"destructive"}
                            />
                            <ButtonForm
                                righticon={<Search />}
                                label="Cari..."
                                onClick={handleSearch}
                            />
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={transaksis.data}
                        last_page={transaksis.last_page}
                        current_page={transaksis.current_page}
                        total={transaksis.total}
                        per_page={transaksis.per_page}
                    />
                </div>
            </div>
            <Charge open={openSideDrawer} onOpenChange={setOpenSideDrawer} />

            <Modal
                open={openModalDetail}
                onClose={() => setOpenModalDetail(false)}
                size="min-w-[800px]"
            >
                <ScrollArea className="h-[550px]">
                    {detailCharge &&
                    isPaymentLink(detailCharge) &&
                    detailCharge.payment_type === "payment_link" ? (
                        <div>
                            <Label>Url Pembayaran</Label>
                            <div className="flex items-center justify-between bg-muted rounded-md px-3 py-2 mt-1">
                                <span className="font-medium">
                                    {detailCharge.payment_url}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        handleCopy(detailCharge.payment_url)
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
                    ) : (
                        <ResultChargeWrapper
                            data={detailCharge}
                            status_code={201}
                            error={null}
                        />
                    )}
                </ScrollArea>
            </Modal>

            <AlertDialog
                open={openModalDelete}
                onOpenChange={setOpenModalDelete}
            >
                <AlertDialogContent>
                    <div className="flex justify-center">
                        <TriangleAlert className="text-red-500 size-12" />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Apakah anda yakin ingin menghapus data ini?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Anda akan kehilangan data tagihan dan transaksi,
                            Data tidak dapat dipulihkan jika sudah terhapus!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Kembali</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            {loading ? (
                                <Loader2Icon className="animate-spin" />
                            ) : null}
                            Ya, Saya yakin
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
