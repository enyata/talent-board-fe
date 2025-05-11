import { getUser } from '@/api/user';
import OnboardingFlow from './components'
import { redirect } from 'next/navigation';
const Onboard = async () => {
    const user = await getUser();
    if (!user) {
        redirect('/login');
    }
    if (user.data.user.profile_completed) {
        redirect('/dashboard')
    }
    return (
        <div className='w-full mx-auto'>
            <OnboardingFlow />
        </div>
    )
}

export default Onboard
