import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AuthForm({ action }: { action: 'login' | 'signup' }) {
  return (
    <div className="mt-[32px] flex flex-col items-center justify-center w-full gap-4 text-[14px] text-[#5F5F5F]">
      <Button variant="outline" className="h-[56px] w-full flex gap-4 cursor-pointer rounded-md">
        <Image
          src={'/assets/icons/google-icon.svg'}
          alt="Google Icon"
          height={24}
          width={24}
        />
        <span>{action === 'login' ? 'Login' : 'Signup'} with Google</span>
      </Button>

      <Button variant="outline" className="h-[56px] w-full flex gap-4 cursor-pointer rounded-md">
        <Image
          src={'/assets/icons/linkedin-icon.svg'}
          alt="Google Icon"
          height={24}
          width={24}
        /> <span>{action === 'login' ? 'Login' : 'Signup'} with LinkedIn</span>
      </Button>
    </div>
  );
}
