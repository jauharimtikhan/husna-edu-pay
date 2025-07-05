import ButtonForm from "@/components/button-form";
import InputForm from "@/components/InputForm";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import React, { FormEvent, useEffect, useState } from "react";
import { UserType } from "./Index";

interface UpdateUserIndexProps {
    open: boolean;
    onClose: () => void;
    user: UserType | null;
}
export default function UpdateUserIndex({
    open,
    onClose,
    user,
}: UpdateUserIndexProps) {
    const { data, setData, put, errors, processing } = useForm({
        nama_pengguna: "",
        device_id: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (user) {
            put(route("user.update", user.id));
        }
    };

    useEffect(() => {
        if (user) {
            setData("nama_pengguna", user?.username ?? "");
            setData("device_id", user?.device_id ?? "");
        }
    }, [user]);
    return (
        <Modal open={open} onClose={onClose} title="Update Pengguna">
            <form onSubmit={handleSubmit}>
                <InputForm
                    label="Nama Pengguna"
                    placeholder="Masukan nama pengguna"
                    value={data.nama_pengguna}
                    onChange={(e) => setData("nama_pengguna", e.target.value)}
                    error={errors.nama_pengguna}
                />
                <InputForm
                    label="Device Id"
                    readOnly
                    value={data.device_id}
                    type="text"
                    placeholder="Otomatis terisi dari device id user"
                />

                <InputForm
                    label="Password"
                    value={data.password}
                    type="text"
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="Masukan Password Baru"
                />
                <div className="flex justify-end">
                    <ButtonForm
                        label="Update User"
                        loading={processing}
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
}
