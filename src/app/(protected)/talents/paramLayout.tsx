'use client';

import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

const ParamLayout = ({ children }: { children: React.ReactNode }) => {
    const params = useSearchParams();
    const arrParam = (key: string): string[] =>
        (params.get(key) || '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);

    const strParam = (key: string): string =>
        (params.get(key) || '').trim();

    const form = useForm({
        defaultValues: {
            cursor: strParam('cursor') || '',
            direction: strParam('direction') || '',
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
