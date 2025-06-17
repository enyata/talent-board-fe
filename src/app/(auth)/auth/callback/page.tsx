'use client'
import { Suspense } from 'react';
import AuthCallbackPageComponent from './callbackPageComponent';
import { Loader } from '@/components/ui/loader';

export default function CallbackPage() {
  return (
    <Suspense fallback={<Loader className="text-primary shadow-none size-[40px]" />}>
      <AuthCallbackPageComponent />
    </Suspense>
  );
}


