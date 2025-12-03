import { auth } from "@/auth";
import BookMark from "@/components/bookmarks/BookMark";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function MainPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <BookMark query={query}/>
    </div>
  );
}
