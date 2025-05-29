export type NotificationType = 'upvote' | 'save' | 'message';

export interface Sender {
    name: string;
    role: string;       
    avatar: string;
    location: string;      
}

export interface NotificationData {
    id: string;
    type: NotificationType;
    message: string;
    read: boolean;
    timestamp: string;
    sender: Sender;
}


export interface TalentDashboardData {
    profile_status: 'approved' | 'rejected' | 'pending';
    total_upvotes: number;
    profile_views: number;
    search_appearances: number;
    recruiter_saves: number;
    notifications: NotificationData[];
}

export type ExperienceLevel = 'entry' | 'intermediate' | 'expert';

export interface TalentBrief {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    state: string;
    country: string;
    linkedin_profile: string;
    skills: string[];
    portfolio_url: string;
    experience_level: ExperienceLevel;
}

export interface RecruiterDashboardData {
    welcome_message: string;
    saved_talents: TalentBrief[];
    recommended_talents: string[];  
    notifications: string[]; 
}