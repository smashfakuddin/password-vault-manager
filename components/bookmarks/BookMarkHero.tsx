import { auth } from "@/auth";
import { dateExtractor } from "@/utils/dateextractor";
import Intro from "./Intro";
import { getPasswordStats } from "@/db/query";

export default async function BookMarkHero({
  userId,
}: {
  userId: string | undefined;
}) {
  const session = await auth();
  const message = dateExtractor();
  const date = new Date();
  const stats = await getPasswordStats(userId);
  console.log(stats);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return (
    <header className="relative border-b group border-neutral-800  from-neutral-950 via-neutral-900/60 to-transparent">
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/70 bg-neutral-900/60 px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-blue-400/90">
            🔐 Vault Overview
          </span>

          <div className="space-y-4">
            <Intro session={session} message={message} />

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-900/50 px-3 py-1.5 text-xs text-neutral-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Active – {formattedDate}
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
            Manage and secure your saved credentials in one synchronized vault.
            Below is a quick snapshot of your account health and recent
            activity.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-4 mt-6 lg:mt-0">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 shadow-lg shadow-black/30">
              <p className="text-neutral-500 text-xs">Total Saved</p>
              <p className="text-2xl font-semibold text-white">{stats?.totalSaved ?? 0}</p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 shadow-lg shadow-black/30">
              <p className="text-neutral-500 text-xs">Last Added</p>
              <p className="text-2xl font-semibold text-white">{stats?.lastSavedAgo}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
