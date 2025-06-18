import ButtonForm from "@/components/button-form";
import InputForm from "@/components/InputForm";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import React, { FormEvent, useState } from "react";

interface CreateUserIndexProps {
    open: boolean;
    onClose: () => void;
}
export default function CreateUserIndex({
    open,
    onClose,
}: CreateUserIndexProps) {
    const [togglePassword, setTogglePassword] = useState(false);
    const { data, setData, post, errors, processing } = useForm({
        nama_pengguna: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route("user.store"));
    };
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
                    label="Password Pengguna"
                    placeholder="Masukan password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    error={errors.password}
                    type={togglePassword ? "text" : "password"}
                    rightcontent={
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setTogglePassword(!togglePassword)}
                        >
                            {togglePassword ? <EyeOff /> : <Eye />}
                        </Button>
                    }
                />
                <div className="flex justify-end">
                    <ButtonForm
                        label="Buat User"
                        loading={processing}
                        type="submit"
                    />
                </div>
            </form>
        </Modal>
    );
}
