import { Alert } from "@/types";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function UseToast(alert?: Alert) {
    useEffect(() => {
        if (alert) {
            if (alert.type === "success") {
                toast.success(alert.message);
            } else {
                toast.error(alert.message);
            }
        }
    }, [alert]);
}
