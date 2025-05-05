import { parseLaravelError } from "@/utils/parseLaravelError";
import { useRef, useState } from "react";
import { TextInput } from "react-native";

interface UseFormReturn<T> {
  data: T;
  setData: <K extends keyof T>(key: K, value: T[K]) => void;
  setAll: (newData: Partial<T>) => void;
  reset: () => void;
  errors: Partial<Record<keyof T, string>>;
  setError: (field: keyof T, message: string) => void;
  clearErrors: () => void;
  submit: () => Promise<void>;
  processing: boolean;

  // Tambahan untuk auto fokus
  registerInput: (field: keyof T, ref: TextInput | null) => void;
  handleSubmitEditing: (field: keyof T) => void;
}

interface UseFormProps<T> {
  initialData: T;
  onSubmit: (data: T) => Promise<void>;
}

export const useForm = <T extends Record<string, any>>({
  initialData,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> => {
  const [data, setDataState] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [processing, setProcessing] = useState(false);

  // Refs dan field order untuk auto fokus
  const inputRefs = useRef<Record<keyof T, TextInput | null>>({} as any);
  const fieldKeys = Object.keys(initialData) as (keyof T)[];

  const setData = <K extends keyof T>(key: K, value: T[K]) => {
    setDataState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setAll = (newData: Partial<T>) => {
    setDataState((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const setError = (field: keyof T, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearErrors = () => setErrors({});

  const reset = () => {
    setDataState(initialData);
    setErrors({});
  };

  const submit = async () => {
    setProcessing(true);
    clearErrors();
    try {
      await onSubmit(data);
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        const parsedError = parseLaravelError(err);
        Object.entries(parsedError).forEach(([field, message]) => {
          setError(field as keyof typeof data, message as string);
        });
      }
    } finally {
      setProcessing(false);
    }
  };

  const registerInput = (field: keyof T, ref: TextInput | null) => {
    inputRefs.current[field] = ref;
  };

  const handleSubmitEditing = (field: keyof T) => {
    const currentIndex = fieldKeys.indexOf(field);
    const nextField = fieldKeys[currentIndex + 1];
    if (nextField) {
      inputRefs.current[nextField]?.focus();
    } else {
      inputRefs.current[field]?.blur();
    }
  };

  return {
    data,
    setData,
    setAll,
    reset,
    errors,
    setError,
    clearErrors,
    submit,
    processing,
    registerInput,
    handleSubmitEditing,
  };
};
