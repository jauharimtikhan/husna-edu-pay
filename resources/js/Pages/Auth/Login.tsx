import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Loader2Icon } from "lucide-react";
import { PageProps } from "@/types";
import UseToast from "@/Hooks/UseToast";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

export default function Login({ alert }: PageProps) {
    UseToast(alert);

    const form = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        form.post(route("login.post"));
    };
    return (
        <GuestLayout>
            <div className={cn("flex flex-col gap-6 ")}>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Login Ke Husna Edu Pay</CardTitle>
                        <CardDescription>
                            Masukan informasi akun anda dibawah
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="username"
                                        placeholder="Masukan username anda"
                                        value={form.data.username}
                                        onChange={(e) =>
                                            form.setData(
                                                "username",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {form.errors.username && (
                                        <span className="text-red-500 text-sm -mt-3">
                                            {form.errors.username}
                                        </span>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Link
                                            href="#"
                                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                        >
                                            Lupa Password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Masukan password anda"
                                        value={form.data.password}
                                        onChange={(e) =>
                                            form.setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {form.errors.password && (
                                        <span className="text-red-500 text-sm -mt-3">
                                            {form.errors.password}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                        className="w-full"
                                    >
                                        {form.processing ? (
                                            <Loader2Icon className="animate-spin" />
                                        ) : null}
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
