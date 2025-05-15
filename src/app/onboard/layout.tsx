

import { cookies } from 'next/headers';
import OnboardingNestedLayout from './components/nested-layout';
import { getUser } from '@/api/user';
import { redirect } from 'next/navigation';
import { AuthHydrator } from '@/components/authHydrator';

const OnboardingLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token");
    const user = await getUser();
    if (!user) {
        redirect('/login');
    }
    if (user.data.user.profile_completed) {
        redirect('/dashboard')
    }
    return (
        <AuthHydrator user={user.data.user} refreshToken={refreshToken?.value}>
            <OnboardingNestedLayout>
                {children}
            </OnboardingNestedLayout>
        </AuthHydrator>
    );
};

export default OnboardingLayout;
