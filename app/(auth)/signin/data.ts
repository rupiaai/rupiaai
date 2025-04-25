import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitSignin } from "./api";
import signinSchema from "./schema/signinSchema";

export function useSignInForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Field-level validation
    const validationResult = signinSchema.safeParse({ ...form, [name]: value });

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      setFieldErrors(errors);
    } else {
      setFieldErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = signinSchema.safeParse(form);
    if (!validationResult.success) {
      const errors = validationResult.error.format();
      setFieldErrors(errors);
      return;
    }

    try {
      const res = await submitSignin(form);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    }
  };

  return {
    form,
    setForm,
    error,
    setError,
    fieldErrors,
    handleChange,
    onSubmit,
  };
}
