import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { submitSignup, checkUsername } from "./api";
import signupSchema from "./schema/signupSchema";

export function useSignupForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<any>({}); // Track errors for each field
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate each field on change
    const validationResult = signupSchema.safeParse({ ...form, [name]: value });

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

    if (name === "username") {
      debouncedCheckUsername(value); // Only trigger debounce for username
    }
  };

  // Debounced username check
  const debouncedCheckUsername = useCallback(
    debounce(async (username: string) => {
      try {
        const res = await checkUsername(username); // Make the API call here
        if (res.status === 409) {
          setFieldErrors((prev: any) => ({
            ...prev,
            username: { _errors: ["Username already taken"] },
          }));
        } else {
          setFieldErrors((prev: any) => {
            const newErrors = { ...prev };
            delete newErrors.username;
            return newErrors;
          });
        }
      } catch (err) {
        console.log(err);
      }
    }, 500),
    []
  );

  // Function to handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform full form validation using Zod
    const validationResult = signupSchema.safeParse(form);

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      setFieldErrors(errors);
      return;
    }

    try {
      const res = await submitSignup(form);
      if (res.status === 201) {
        // If the sign-up is successful
        router.push("/dashboard"); // Redirect to the dashboard page
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // Debounce utility function
  function debounce(fn: Function, delay: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }

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
