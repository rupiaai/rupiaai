import { toast } from "sonner";
import { signIn } from "next-auth/react";

export async function submitSignin(form: { email: string; password: string }) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (!res) {
      toast.error("An unknown error occurred.");
      return;
    }

    if (res.status !== 200) {
      const errorMessage = res.error || "Something went wrong!";
      toast.error(errorMessage);
    } else {
      toast.success("Signed in successfully");
    }
  } catch (err) {
    console.error(err);
    toast.error("An error occurred during sign-in.");
  }
}
