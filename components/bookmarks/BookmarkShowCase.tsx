import { getPasswordByUser } from "@/db/query";
import { getSiteName } from "@/utils/sitenameextract";
import ShowCaseCard from "./ShowCaseCard";

export default async function BookmarkShowCase({
  userId,
}: {
  userId: string | undefined;
}) {
  const passwords = await getPasswordByUser(userId);
  console.log(passwords);
  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto space-y-10 px-4">
        <section className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/80 to-neutral-900/40 p-6 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search saved credentials"
                className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/60 py-3 pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 transition focus:border-blue-500 focus:bg-neutral-950 focus:outline-none"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-2xl border border-neutral-800/80 bg-neutral-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-300 transition hover:border-blue-500 hover:text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 4h18l-8 8v6l-4 4v-8z"
                  ></path>
                </svg>
                Sort by
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {passwords.map((password) => (
            <ShowCaseCard
              key={password._id}
              url={password.url}
              username={password.username}
              password={password.password}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
