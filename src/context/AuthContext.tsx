"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface User {
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: User | null;
    login: (userInfo: User) => void;
    logout: () => void;
    refreshToken: String;
    setRefreshToken: (refreshToken: String) => void;
    accessToken: String;
    setAccessToken: (accessToken: String) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [refreshToken, setRefreshToken] = useState<any>("");
    const [accessToken, setAccessToken] = useState<any>("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userInfo: User) => {
        setUser(userInfo);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <GoogleOAuthProvider clientId="98683621565-ktsjs4g7n2grbkh35888dbs5443h9t2b.apps.googleusercontent.com">
            <AuthContext.Provider
                value={{
                    user,
                    login,
                    logout,
                    refreshToken,
                    setRefreshToken,
                    accessToken,
                    setAccessToken,
                    isAuthenticated,
                    setIsAuthenticated,
                }}
            >
                {children}
            </AuthContext.Provider>
        </GoogleOAuthProvider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
