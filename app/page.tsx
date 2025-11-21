import { auth } from "@/auth";
import BookMark from "@/components/bookmarks/BookMark";
import { redirect } from "next/navigation";

export default async function MainPage() {
    const session = await auth();
    if(!session) {
      redirect("/login")
    }
  
  return (
    <div>
      <BookMark/>
    </div>
  )
}