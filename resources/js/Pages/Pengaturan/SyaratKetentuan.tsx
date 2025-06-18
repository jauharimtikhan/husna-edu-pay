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

interface SyaratKetentuanProps extends PageProps {
    data: {
        kebijakan_privasi: string;
        bantuan: string;
        syarat_ketentuan: string;
    };
}
export default function Kebijakan({ alert, data }: SyaratKetentuanProps) {
    UseToast(alert);

    const formKebijakanPrivasi = useForm({
        syarat_ketentuan: data.syarat_ketentuan || "",
    });

    const handleSubmitKebijakanPrivasi = (e: FormEvent) => {
        e.preventDefault();
        formKebijakanPrivasi.post(route("pengaturan.syarat-ketentuan.store"));
    };

    useEffect(() => {
        if (data.kebijakan_privasi) {
            formKebijakanPrivasi.setData(
                "syarat_ketentuan",
                data.syarat_ketentuan
            );
        }
    }, [data.syarat_ketentuan]);

    return (
        <AuthenticatedLayout title="Kebijakan Privasi">
            <div className="@container/main px-4 py-4">
                <div className="flex items-center justify-between ">
                    <h1 className="font-semibold text-2xl">
                        Syarat & Ketentuan
                    </h1>
                </div>
                <form className="mt-10" onSubmit={handleSubmitKebijakanPrivasi}>
                    <div className="grid w-full gap-3">
                        <MarkdownEditor
                            value={formKebijakanPrivasi.data.syarat_ketentuan}
                            onChange={(e) =>
                                formKebijakanPrivasi.setData(
                                    "syarat_ketentuan",
                                    e
                                )
                            }
                        />
                        {formKebijakanPrivasi.errors.syarat_ketentuan && (
                            <span className="-mt-2 text-red-500 text-sm">
                                {formKebijakanPrivasi.errors.syarat_ketentuan}
                            </span>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <ButtonForm
                            loading={formKebijakanPrivasi.processing}
                            type="submit"
                            label="Simpan / Update Syarat & Ketentuan"
                            variant={"secondary"}
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
