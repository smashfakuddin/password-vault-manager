import { getPasswordByUser } from "@/db/query";
import { getSiteName } from "@/utils/sitenameextract";
import ShowCaseCard from "./ShowCaseCard";
import Search from "./Search";
import { Suspense } from "react";

export default async function BookmarkShowCase({
  userId,
  query,
}: {
  userId: string | undefined;
  query: any;
}) {
  const passwords = await getPasswordByUser(userId, query);
  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto space-y-10 px-4">
        <Search />

        <Suspense fallback={<div>Loading........</div>}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {passwords.map((password) => (
              <ShowCaseCard
                key={password.password}
                url={password.url}
                username={password.username}
                password={password.password}
              />
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  );
}
