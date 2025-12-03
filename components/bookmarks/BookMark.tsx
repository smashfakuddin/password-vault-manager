import { auth } from "@/auth";
import BookMarkForm from "./BookMarkForm";
import BookMarkHero from "./BookMarkHero";
import BookmarkShowCase from "./BookmarkShowCase";

export default async function BookMark({ query }: { query: any }) {
  const session = await auth();
  return (
    <div
      className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]
    bg-neutral-900 text-white p-5 rounded-md my-10 container mx-auto "
    >
      <BookMarkHero />
      <BookMarkForm userId={session?.user?.id} />
      <BookmarkShowCase userId={session?.user?.id} query={query} />
    </div>
  );
}
