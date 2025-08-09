import { signInAction } from "@/lib/action";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex">
      <div className="h-3/4 flex flex-col items-center justify-center">
        <form className="space-y-2 " action={signInAction}>
          <p className="text-center">Sign in to access your this page.</p>
          <button
            className="flex border-2 px-4 py-2 gap-x-4 items-center"
            type="submit"
          >
            <Image
              width={20}
              height={20}
              alt="google"
              src="/icons/google.png"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}
