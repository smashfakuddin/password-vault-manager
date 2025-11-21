"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setServerMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setServerMessage("✅ Account created successfully!");
        reset();

        setTimeout(() => router.push("/login"), 1200);
      } else {
        setServerMessage(`❌ ${result.message}`);
      }
    } catch (error) {
      setServerMessage("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="bg-gray-900/50 min-h-[90vh] flex items-center justify-center p-6">
      <div className="bg-neutral-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center border-b border-neutral-700 pb-3">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-neutral-400 text-sm mb-1">
              Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-neutral-400 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-less text-black font-semibold py-2 rounded-md bg-amber-500/50 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Server message */}
          {serverMessage && (
            <p
              className={`text-center mt-3 text-sm ${
                serverMessage.startsWith("✅")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {serverMessage}
            </p>
          )}

          <p className="text-center text-neutral-400 text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-main hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
