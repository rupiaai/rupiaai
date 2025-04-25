import { toast } from "sonner";

export async function submitSignup(form: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
  } catch (err: unknown) {
    toast.error("Something went wrong");
  }
}

export async function checkUsername(username: string) {
  try {
    const res = await fetch("/api/auth/checkUsername", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(username),
    });
    if (res.status === 409) {
      toast.error(res.message);
    }
  } catch (err) {
    toast.error("Something went wrong");
  }
}
