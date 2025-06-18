import Modal from "@/components/modal";
import { DataTable, DataTableActionColumn } from "@/components/raw-table";
import { Button } from "@/components/ui/button";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link, router, useForm } from "@inertiajs/react";
import { Column, ColumnDef } from "@tanstack/react-table";
import {
    CirclePlus,
    Loader2Icon,
    Settings2,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import React, { useState } from "react";
import CreateMetodePembayaran from "./Create";
import { getAssetUrl } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import UpdateMetodePembayaran from "./Update";

export type PaymentListType = {
    nama: string;
    kategori: string;
    gambar: string;
    id: number;
};

interface PaymentMethodIndexProps extends PageProps {
    payment_list: {
        data: PaymentListType[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function PaymentMethodList({
    alert,
    payment_list,
}: PaymentMethodIndexProps) {
    UseToast(alert);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [id, setId] = useState<string | number | null | undefined>(null);
    const [loading, setLoading] = useState(false);
    const [updateData, setUpdateData] = useState<PaymentListType | null>(null);
    const delForm = useForm({});

    const handleDelete = () => {
        if (!id) {
            return;
        } else {
            router.delete(route("pengaturan.payment.method.delete", id), {
                onStart: () => setLoading(true),
                onProgress: () => setLoading(true),
                onFinish: () => {
                    setLoading(false);
                    setOpenModalDelete(false);
                },
            });
        }
    };

    const columns: ColumnDef<PaymentListType>[] = [
        {
            id: "rowNumber",
            header: "#",
            cell: ({ row, table }) => {
                const pageIndex = payment_list.current_page - 1; // 0-based
                const pageSize = payment_list.per_page;

                return pageIndex * pageSize + row.index + 1;
            },
        },
        {
            accessorKey: "nama",
            header: "Nama Metode Pembayaran",
        },
        {
            accessorKey: "kategori",
            header: "Kategori Metode Pembayaran",
            cell: ({ row }) => {
                const { kategori } = row.original;
                const clearUnderScore = kategori.replaceAll("_", " ");
                return clearUnderScore;
            },
        },
        {
            accessorKey: "gambar",
            header: "Gambar",
            cell: ({ row }) => {
                const { gambar } = row.original;

                return (
                    <Avatar>
                        <AvatarImage
                            src={getAssetUrl(gambar)}
                            className="w-full max-w-[100px] mx-auto object-contain"
                        />
                        <AvatarFallback>HEP</AvatarFallback>
                    </Avatar>
                );
            },
        },
        {
            accessorKey: "aksi",
            header: "Aksi",
            cell: ({ row }) => {
                const { id } = row.original;
                return (
                    <DataTableActionColumn>
                        <>
                            <DropdownMenuItem
                                onClick={() => {
                                    setUpdateData(row.original);
                                    setOpenModalUpdate(true);
                                }}
                            >
                                <Settings2 />
                                Update
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

    return (
        <AuthenticatedLayout title="Daftar Metode Pembayaran">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">
                        Daftar Metode Pembayaran
                    </h1>
                    <Button
                        onClick={() => setOpenModalCreate(true)}
                        variant={"secondary"}
                    >
                        <CirclePlus />
                        Tambah Metode Pembayaran
                    </Button>
                </div>
                <div className="mt-8">
                    <DataTable
                        columns={columns}
                        data={payment_list.data}
                        last_page={payment_list.last_page}
                        current_page={payment_list.current_page}
                        total={payment_list.total}
                        per_page={payment_list.per_page}
                    />
                </div>
            </div>
            <Modal
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                title="Tambah Metode Pembayaran Baru"
                description="Hanya beberapa metode pembayaran yang berjalan dengan baik!"
            >
                <CreateMetodePembayaran />
            </Modal>

            <Modal
                open={openModalUpdate}
                onClose={() => setOpenModalUpdate(false)}
                title="Update Metode Pembayaran"
            >
                <UpdateMetodePembayaran
                    paymentList={updateData as PaymentListType}
                />
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
                            Anda akan kehilangan data metode pembayaran, Data
                            tidak dapat dipulihkan jika sudah terhapus!
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
