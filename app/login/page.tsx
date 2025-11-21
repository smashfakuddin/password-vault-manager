"use client"; // if using Next.js 13+ with app directory
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { credentialLogin } from "@/lib/auth/signin";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await credentialLogin({ email, password });

      if (!res.ok) {
        setError(res.message || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 min-h-[90vh] flex items-center justify-center p-6">
      <div className="bg-neutral-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center border-b border-neutral-700 pb-3">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-neutral-400 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-neutral-400 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-less text-black font-semibold py-2 rounded-md bg-amber-500/50 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-neutral-400 text-sm mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-main hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}