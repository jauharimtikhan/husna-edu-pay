import ButtonForm from "@/components/button-form";
import { DataTable, DataTableActionColumn } from "@/components/raw-table";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import {
    CirclePlus,
    Loader2Icon,
    Search,
    Settings2,
    Trash2,
    TriangleAlert,
    X,
} from "lucide-react";
import React, { FormEvent, useState } from "react";
import CreateUserIndex from "./Create";
import UpdateUserIndex from "./Update";
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

export type UserType = {
    id: number;
    username: string;
    device_id: string;
};

interface UserIndexProps extends PageProps {
    users: {
        data: UserType[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function UserIndex({ users, alert }: UserIndexProps) {
    UseToast(alert);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [id, setId] = useState<string | number | null | undefined>(null);
    const [userDetail, setDetailUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const searchParam = new URLSearchParams(window.location.search);
    const [searchParams, setSearchParams] = useState({
        nama_pengguna: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get(route("user.index"), searchParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = () => {
        if (!id) {
            return;
        } else {
            router.delete(route("user.destroy", id), {
                onStart: () => setLoading(true),
                onProgress: () => setLoading(true),
                onFinish: () => {
                    setLoading(false);
                    setOpenModalDelete(false);
                },
            });
        }
    };

    const columns: ColumnDef<UserType>[] = [
        {
            id: "rowNumber",
            header: "#",
            cell: ({ row, table }) => {
                const pageIndex = users.current_page - 1;
                const pageSize = users.per_page;

                return pageIndex * pageSize + row.index + 1;
            },
        },
        {
            accessorKey: "username",
            header: "Nama Pengguna",
        },
        {
            accessorKey: "devide_id",
            header: "Device Id",
            cell: ({ row }) => {
                const { device_id } = row.original;
                if (!device_id) {
                    return "-";
                }
                return device_id;
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
                                    setDetailUser(row.original);
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
        <AuthenticatedLayout>
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">User</h1>
                    <Button
                        onClick={() => setOpenModalCreate(true)}
                        variant={"secondary"}
                    >
                        <CirclePlus />
                        Buat User Baru
                    </Button>
                </div>
                <div className="mt-8">
                    <form
                        onSubmit={handleSearch}
                        className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
                    >
                        <Input
                            name="nama_pengguna"
                            value={searchParams.nama_pengguna}
                            onChange={handleChange}
                            placeholder="Cari berdasarkan Nama Pengguna"
                        />

                        <div className=" flex justify-end gap-x-3">
                            <ButtonForm
                                lefticon={<X />}
                                type="button"
                                label="Hapus filter pencarian"
                                onClick={() => {
                                    setSearchParams({
                                        nama_pengguna: "",
                                    });
                                    router.get(
                                        route("user.index"),
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
                                type="submit"
                            />
                        </div>
                    </form>
                    <DataTable
                        columns={columns}
                        data={users.data}
                        last_page={users.last_page}
                        current_page={users.current_page}
                        total={users.total}
                        per_page={users.per_page}
                        path="user.index"
                    />
                </div>
            </div>

            <CreateUserIndex
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
            />
            <UpdateUserIndex
                open={openModalUpdate}
                onClose={() => setOpenModalUpdate(false)}
                user={userDetail}
            />

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
