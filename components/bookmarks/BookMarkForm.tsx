"use client";

import { useForm } from "react-hook-form";
import { addPassword } from "@/db/query/index";

type FormData = {
  url: string;
  favicon: string;
  category: string;
  username: string;
  password: string;
};

export default function BookMarkForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      favicon: "#3b82f6",
    },
  });

  const onSubmit = async (data: FormData) => {
    const res = await addPassword({ ...data, userId });
    console.log(res);
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-10 rounded-2xl border border-neutral-800 bg-gradient-to-br from-neutral-900/70 to-neutral-800/40 p-8 shadow-2xl shadow-black/40 backdrop-blur"
      >
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            New bookmark
          </p>
          <h2 className="text-2xl font-semibold">
            Store website credentials safely
          </h2>
          <p className="text-sm text-neutral-400">
            Fill the details below. Your brand color helps us render a matching
            favicon.
          </p>
        </div>

        {/* TOP INPUTS */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* WEBSITE URL */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-neutral-900 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Website URL
              </span>

              <input
                type="url"
                placeholder="https://example.com"
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                {...register("url", {
                  required: "Website URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: "URL must start with http:// or https://",
                  },
                })}
              />

              {errors.url && (
                <p className="text-xs text-red-400">{errors.url.message}</p>
              )}

              <span className="text-xs text-neutral-500">
                Include https:// for best results.
              </span>
            </label>

            {/* FAVICON COLOR */}
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-neutral-900 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Favicon color
                  </p>
                  <p className="text-xs text-neutral-500">
                    Select the accent color we should render.
                  </p>
                </div>

                <input
                  type="color"
                  className="h-12 w-12 cursor-pointer rounded-full border border-neutral-700 bg-neutral-800 p-1 shadow-inner shadow-black/50"
                  {...register("favicon")}
                />
              </div>
            </div>

            {/* CATEGORY */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-neutral-900 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Category
              </span>

              <select
                className="w-full bg-transparent text-base text-white outline-none"
                {...register("category", {
                  required: "Select a category",
                })}
              >
                <option className="bg-neutral-900 text-white" value="">
                  Select category
                </option>
                <option className="bg-neutral-900 text-white">Social</option>
                <option className="bg-neutral-900 text-white">Video</option>
                <option className="bg-neutral-900 text-white">Design</option>
                <option className="bg-neutral-900 text-white">Streaming</option>
                <option className="bg-neutral-900 text-white">
                  Productivity
                </option>
                <option className="bg-neutral-900 text-white">
                  Entertainment
                </option>
                <option className="bg-neutral-900 text-white">Shopping</option>
                <option className="bg-neutral-900 text-white">Music</option>
              </select>

              {errors.category && (
                <p className="text-xs text-red-400">
                  {errors.category.message}
                </p>
              )}

              <span className="text-xs text-neutral-500">
                Helps you filter quicker later.
              </span>
            </label>
          </div>

          {/* USERNAME + PASSWORD */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* USERNAME */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-neutral-900 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Username
              </span>

              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                {...register("username", {
                  required: "Username is required",
                })}
              />

              {errors.username && (
                <p className="text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}

              <span className="text-xs text-neutral-500">
                Use workspace or personal handle.
              </span>
            </label>

            {/* PASSWORD */}
            <label className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 text-sm transition focus-within:border-blue-500 focus-within:bg-neutral-900 focus-within:shadow-lg focus-within:shadow-blue-500/10">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Password
              </span>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}

              <span className="text-xs text-neutral-500">
                Choose at least 6 characters.
              </span>
            </label>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-neutral-500">
            By submitting you confirm the entry is safe to store.
          </div>

          <div className="flex flex-1 justify-end gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full rounded-full border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white md:w-auto"
            >
              Clear
            </button>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 md:w-auto"
            >
              Add Bookmark
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
