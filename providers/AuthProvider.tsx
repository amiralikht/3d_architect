'use client';

import { getCurrentUser, signIn as puterSignIn, signOut as puterSignOut } from '@/lib/puter.action';
import { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_AUTH_STATE : AuthState = {
    isSignedIn : false,
    userName: null,
    userId: null,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>(DEFAULT_AUTH_STATE);

    const refreshAuth = async() =>{
        try {
            const user = await getCurrentUser();
            setAuthState({
                isSignedIn: !!user,
                userName: user?.username || null,
                userId: user?.uuid || null,
            })
            return !!user;
        } catch {
            setAuthState(DEFAULT_AUTH_STATE);
            return false
        }
    }

    useEffect(()=>{
        refreshAuth();
    },[])

    const signIn = async () => {
        await puterSignIn();
        return await refreshAuth();
    }

    const signOut = async () => {
        puterSignOut();
        return await refreshAuth();
    }

    return (
        <AuthContext.Provider value={{...authState, refreshAuth, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
