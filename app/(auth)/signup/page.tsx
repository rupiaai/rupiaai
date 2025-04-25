"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSignupForm } from "./data";
import GoogleButton from "@/components/signin";

export default function Signup() {
  const { form, handleChange, onSubmit, error, fieldErrors } = useSignupForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-[var(--card)] p-4 md:rounded-2xl md:p-8">
        <h2 className="text-xl font-bold text-[var(--foreground)]">
          Welcome to Rupia AI
        </h2>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground)]">
          Create your account to get started.
        </p>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500">{error}</p>
        )}

        <form className="my-8" onSubmit={onSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username" className="text-[var(--foreground)]">
              Name
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="John Doe"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--ring)]"
            />
            {fieldErrors.username && (
              <p className="text-red-600">{fieldErrors.username._errors[0]}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email" className="text-[var(--foreground)]">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--ring)]"
            />
            {fieldErrors.email && (
              <p className="text-red-600">{fieldErrors.email._errors[0]}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password" className="text-[var(--foreground)]">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)] focus:ring-[var(--ring)]"
            />
            {fieldErrors.password && (
              <p className="text-red-600">{fieldErrors.password._errors[0]}</p>
            )}
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

          <div className="flex flex-col space-y-4">
            <GoogleButton />
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{" "}
          <a
            href="/signin"
            className="font-medium text-[var(--primary)] hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

// --- Helper Components ---
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
