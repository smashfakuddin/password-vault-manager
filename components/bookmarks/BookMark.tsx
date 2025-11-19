import BookMarkForm from "./BookMarkForm";
import BookMarkHero from "./BookMarkHero";

export default function BookMark() {
  return (
    <div
      className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]
    bg-neutral-900 text-white p-5 rounded-md my-10 container mx-auto "
    >
      <BookMarkHero />
      <BookMarkForm />
    </div>
  );
}
