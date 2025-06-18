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
export default function Kebijakan({ alert, data }: KebijakanPrivasiProps) {
    UseToast(alert);

    const formKebijakanPrivasi = useForm({
        kebijakan_privasi: data.kebijakan_privasi || "",
    });

    const handleSubmitKebijakanPrivasi = (e: FormEvent) => {
        e.preventDefault();
        formKebijakanPrivasi.post(route("pengaturan.kebijakan-privasi.store"));
    };

    useEffect(() => {
        if (data.kebijakan_privasi) {
            formKebijakanPrivasi.setData(
                "kebijakan_privasi",
                data.kebijakan_privasi
            );
        }
    }, [data.kebijakan_privasi]);

    return (
        <AuthenticatedLayout title="Kebijakan Privasi">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">
                        Kebijakan & Privasi
                    </h1>
                </div>
                <form className="mt-10" onSubmit={handleSubmitKebijakanPrivasi}>
                    <div className="grid w-full gap-3">
                        <MarkdownEditor
                            value={formKebijakanPrivasi.data.kebijakan_privasi}
                            onChange={(e) =>
                                formKebijakanPrivasi.setData(
                                    "kebijakan_privasi",
                                    e
                                )
                            }
                        />
                        {formKebijakanPrivasi.errors.kebijakan_privasi && (
                            <span className="-mt-2 text-red-500 text-sm">
                                {formKebijakanPrivasi.errors.kebijakan_privasi}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <ButtonForm
                            loading={formKebijakanPrivasi.processing}
                            type="submit"
                            label="Simpan / Update Kebijakan Privasi"
                            variant={"secondary"}
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
