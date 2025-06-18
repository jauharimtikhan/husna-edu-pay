import { Button } from "@/components/ui/button";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Link, router } from "@inertiajs/react";
import {
    Check,
    CheckCircle,
    CirclePlus,
    Clock,
    Loader2,
    Search,
    Settings2,
    Trash2,
    TriangleAlert,
    X,
    XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { TransaksiType } from "../Transaksi/Index";
import { TagihanType } from "../Tagihan/Index";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/date-picker";
import { Select2 } from "@/components/select2";
import { STATUSTRANSAKSI } from "@/lib/data";
import ButtonForm from "@/components/button-form";
import { ColumnDef } from "@tanstack/react-table";
import {
    DataTable,
    DataTableActionColumn,
    DataTableColumnHeader,
} from "@/components/raw-table";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Modal from "@/components/modal";
type HistoryPembayaranType = {
    user_id: number;
    tagihan_id: number;
    transaksi_id: number;
    transaksi: TransaksiType;
    tagihan: TagihanType;
    user: User;
    id: number;
};

interface HistoryIndexProps extends PageProps {
    history_pembayaran: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        data: HistoryPembayaranType[];
    };
}
export default function Index({
    history_pembayaran,
    alert,
}: HistoryIndexProps) {
    UseToast(alert);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [id, setId] = useState<string | number | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const searchParam = new URLSearchParams(window.location.search);
    const [searchParams, setSearchParams] = useState({
        nama_pengguna: "",
        kode_tagihan: "",
        tanggal: "",
        status: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = () => {
        router.get(route("history.index"), searchParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = () => {
        if (!id) {
            return;
        } else {
            //
        }
    };

    const columns: ColumnDef<HistoryPembayaranType>[] = [
        {
            id: "rowNumber",
            header: "#",
            cell: ({ row, table }) => {
                const pageIndex = history_pembayaran.current_page - 1; // 0-based
                const pageSize = history_pembayaran.per_page;

                return pageIndex * pageSize + row.index + 1;
            },
        },
        {
            accessorKey: "tagihan.nama_tagihan",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Nama Tagihan"
                    />
                );
            },
        },
        {
            accessorKey: "user_id",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Pengguna" />
                );
            },
            cell: ({ row }) => {
                const { username } = row.original.user;
                return username;
            },
        },
        {
            accessorKey: "tagihan.kode_tagihan",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader
                        column={column}
                        title="Kode Tagihan"
                    />
                );
            },
        },
        {
            accessorKey: "tagihan.nominal",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Nominal" />
                );
            },
            cell: ({ row }) => {
                const amount = row.original.tagihan.nominal;
                const formatted = new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                }).format(amount);

                return (
                    <div className="text-right font-medium">{formatted}</div>
                );
            },
        },
        {
            accessorKey: "tagihan.status",
            header: "Status Tagihan",
            cell: ({ row }) => {
                const status: string = row.original.tagihan.status;

                const statusStyles: Record<
                    string,
                    { color: string; icon?: JSX.Element }
                > = {
                    pending: {
                        color: "bg-yellow-100 text-yellow-800",
                        icon: <Clock className="w-3 h-3 mr-1" />,
                    },
                    authorize: {
                        color: "bg-purple-100 text-purple-800",
                        icon: <Loader2 className="w-3 h-3 mr-1 animate-spin" />,
                    },
                    failed: {
                        color: "bg-red-100 text-red-800",
                        icon: <XCircle className="w-3 h-3 mr-1" />,
                    },
                    settlement: {
                        color: "bg-green-100 text-green-800",
                        icon: <CheckCircle className="w-3 h-3 mr-1" />,
                    },
                    capture: {
                        color: "bg-blue-100 text-blue-800",
                    },
                    deny: {
                        color: "bg-orange-100 text-orange-800",
                    },
                    cancel: {
                        color: "bg-gray-100 text-gray-800",
                    },
                    refund: {
                        color: "bg-indigo-100 text-indigo-800",
                    },
                    partial_refund: {
                        color: "bg-indigo-100 text-indigo-800",
                    },
                    partial_chargeback: {
                        color: "bg-pink-100 text-pink-800",
                    },
                    expire: {
                        color: "bg-zinc-100 text-zinc-800",
                    },
                    failure: {
                        color: "bg-red-100 text-red-800",
                        icon: <XCircle className="w-3 h-3 mr-1" />,
                    },
                };

                const current = statusStyles[status] || {
                    color: "bg-muted text-muted-foreground",
                };

                return (
                    <div
                        className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${current.color}`}
                    >
                        {current.icon}
                        {status.toUpperCase()}
                    </div>
                );
            },
        },
        {
            accessorKey: "tagihan.tanggal",
            header: ({ column }) => {
                return (
                    <DataTableColumnHeader column={column} title="Tanggal" />
                );
            },
            cell: ({ row }) => {
                const dateString: string = row.original.tagihan.tanggal;

                const formatter = new Intl.DateTimeFormat("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                });

                const date = new Date(dateString);

                return formatter.format(date);
            },
        },
        {
            accessorKey: "aksi",
            header: "Aksi",
            cell: ({ row }) => {
                const { id } = row.original;
                return (
                    <Button
                        variant={"destructive"}
                        size={"icon"}
                        onClick={() => {
                            setId(id);
                            setOpenModalDelete(true);
                        }}
                    >
                        <Trash2 className="text-white" />
                    </Button>
                );
            },
        },
    ];

    return (
        <AuthenticatedLayout title="Riwayat Pembayaran Tagihan">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">
                        History Pembayaran
                    </h1>
                </div>
                <div className="mt-8">
                    <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                            placeholder="Cari berdasarkan Kode Tagihan"
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
                        <div className="col-span-full flex justify-end gap-x-3">
                            <ButtonForm
                                lefticon={<X />}
                                label="Hapus filter pencarian"
                                onClick={() => {
                                    setSearchParams({
                                        nama_pengguna: "",
                                        kode_tagihan: "",
                                        tanggal: "",
                                        status: "",
                                    });
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
                        data={history_pembayaran.data}
                        last_page={history_pembayaran.last_page}
                        current_page={history_pembayaran.current_page}
                        total={history_pembayaran.total}
                        per_page={history_pembayaran.per_page}
                    />
                </div>
            </div>

            <Modal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
            >
                <div className="flex flex-col items-center">
                    <div className="mb-1">
                        <TriangleAlert className="size-12 text-red-500" />
                    </div>
                    <p className="text-2xl font-semibold -mt-2">
                        Apakah anda yakin?
                    </p>
                    <div className="flex items-center gap-x-3 mt-12">
                        <ButtonForm
                            onClick={() => setOpenModalDelete(false)}
                            label="Tidak"
                            variant={"destructive"}
                        />
                        <ButtonForm
                            onClick={handleDelete}
                            label="Ya, Saya yakin"
                            variant={"default"}
                            righticon={<Check />}
                            loading={loading}
                        />
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
