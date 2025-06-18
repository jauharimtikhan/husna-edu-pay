import ButtonForm from "@/components/button-form";
import MarkdownEditor from "@/components/MarkdownEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UseToast from "@/Hooks/UseToast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { FormEvent, useEffect } from "react";

interface KebijakanPrivasiProps extends PageProps {
    data: {
        kebijakan_privasi: string;
        bantuan: string;
    };
}
export default function Bantuan({ alert, data }: KebijakanPrivasiProps) {
    UseToast(alert);

    const formKebijakanPrivasi = useForm({
        bantuan: data.bantuan || "",
    });

    const handleSubmitKebijakanPrivasi = (e: FormEvent) => {
        e.preventDefault();
        formKebijakanPrivasi.post(route("pengaturan.bantuan.store"));
    };

    useEffect(() => {
        if (data.bantuan) {
            formKebijakanPrivasi.setData("bantuan", data.bantuan);
        }
    }, [data.bantuan]);

    return (
        <AuthenticatedLayout title="Kebijakan Privasi">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">Bantuan</h1>
                </div>
                <form className="mt-10" onSubmit={handleSubmitKebijakanPrivasi}>
                    <div className="grid w-full gap-3">
                        <MarkdownEditor
                            value={formKebijakanPrivasi.data.bantuan}
                            onChange={(e) =>
                                formKebijakanPrivasi.setData("bantuan", e)
                            }
                        />
                        {formKebijakanPrivasi.errors.bantuan && (
                            <span className="-mt-2 text-red-500 text-sm">
                                {formKebijakanPrivasi.errors.bantuan}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <ButtonForm
                            loading={formKebijakanPrivasi.processing}
                            type="submit"
                            label="Simpan / Update Bantuan"
                            variant={"secondary"}
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
