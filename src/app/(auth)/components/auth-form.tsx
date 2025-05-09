'use client';
import { ButtonWithLoader } from "@/components/ui/button-with-loader";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import { useState } from "react";

export default function AuthForm({ action }: { action: 'login' | 'signup' }) {
  const { loginWithProvider } = useAuth();
  const { loading } = useAuthStore();
  const [provider, setProvider] = useState<'google' | 'linkedin' | undefined>();

  const handleClick = (provider: 'google' | 'linkedin') => {
    setProvider(provider);
    loginWithProvider(provider);
  }

  return (
    <div className="mt-[32px] flex flex-col items-center justify-center w-full gap-4 text-[14px] text-[#5F5F5F]">
      <ButtonWithLoader
        disabled={loading}
        isLoading={loading && provider === 'google'}
        onClick={() => handleClick('google')}
        variant="outline"
        className="h-[56px] w-full flex gap-4 cursor-pointer rounded-md">
        <Image
          src={'/assets/icons/google-icon.svg'}
          alt="Google Icon"
          height={24}
          width={24}
        />
        <span>{action === 'login' ? 'Login' : 'Signup'} with Google</span>
      </ButtonWithLoader>

      <ButtonWithLoader
        disabled={loading}
        isLoading={loading && provider === 'linkedin'}
        onClick={() => handleClick('linkedin')}
        variant="outline"
        className="h-[56px] w-full flex gap-4 cursor-pointer rounded-md">
        <Image
          src={'/assets/icons/linkedin-icon.svg'}
          alt="Linkedin Icon"
          height={24}
          width={24}
        /> <span>{action === 'login' ? 'Login' : 'Signup'} with LinkedIn</span>
      </ButtonWithLoader>
    </div>
  );
}
