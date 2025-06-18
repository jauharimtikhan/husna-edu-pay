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
    const { data, setData, post, errors, processing } = useForm({
        nama_pengguna: "",
        device_id: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (user) {
            post(route("user.update", user.id));
        }
    };

    useEffect(() => {
        if (user) {
            setData("nama_pengguna", user?.username ?? "");
            setData("device_id", user?.device_id ?? "");
        }
    }, [user]);
    return (
        <Modal open={open} onClose={onClose} title="Buat Pengguna Baru">
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
                    error="Jangan diupdate bre biar dari device real user aja!"
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
