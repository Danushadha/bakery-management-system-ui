import { createContext, useContext, useState, type ReactNode } from "react";

type AuthUser = {
    userName: string;
    role: string;
};

type AuthContextType = {
    user: AuthUser | null;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const getUserFromToken = (token: string): AuthUser | null => {

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        return {
            userName: payload.sub,
            role: payload.role
        };

    } catch (error) {

        console.error("Invalid JWT token", error);

        return null;
    }
};


export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<AuthUser | null>(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }

        return getUserFromToken(token);
    });


    const login = (token: string) => {

        localStorage.setItem("token", token);

        const userData = getUserFromToken(token);

        setUser(userData);
    };


    const logout = () => {

        localStorage.removeItem("token");

        setUser(null);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}