import { toast } from "sonner";
import { signIn } from "next-auth/react";

export async function submitSignin(form: { email: string; password: string }) {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res.status !== 200) {
      toast.error(res.message);
    }
    toast.success("Signed in successfully");
  } catch (err) {
    console.error(err);
  }
}
