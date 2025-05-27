'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const ParamLayout = ({ children }: { children: React.ReactNode }) => {
    const params = useSearchParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter();
    const arrParam = (key: string): string[] =>
        (params.get(key) || '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

    const strParam = (key: string): string =>
        (params.get(key) || '').trim();

    const form = useForm({
        defaultValues: {
            q: strParam('q') || '',
            limit: strParam('limit') || 10,
            filter_options: arrParam('filter_options') || [] as string[],
            experience: strParam('experience') || '',
            country: strParam('country') || '',
            state: strParam('state') || '',
            skills: arrParam('skills') || [] as string[]
        },
    });
    return (
        <>
            <FormProvider {...form}>
                {children}
            </FormProvider>
        </>
    )
}

export default ParamLayout
