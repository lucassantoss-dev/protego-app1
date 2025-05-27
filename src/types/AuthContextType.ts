import { UserContext } from './UserContext';

export interface AuthContextType {
    user: UserContext | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    updateUserData: (newData: Partial<UserContext>) => Promise<boolean>;
} 