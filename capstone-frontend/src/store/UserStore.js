import { create } from 'zustand';

const savedUser = JSON.parse(localStorage.getItem('user-storage'));


export const useUserStore = create((set) => ({
    userId: savedUser?.userId || "",
    username: savedUser?.username || "",
    email: savedUser?.email || "",
    role: savedUser?.role || "user",
    loggedIn: !!savedUser?.loggedIn,

    authSuccess: (data) => { 
        const userData = {
            userId: data._id || data.id || "", 
            username: data.username, 
            email: data.email, 
            role: data.role, 
            loggedIn: true };
        
        localStorage.setItem('user-storage', JSON.stringify(userData));
        set(userData);
        },

    logout: () => { 
    localStorage.removeItem('user-storage');
    set({userId: "", username: "", email: "", role: "user", loggedIn: false });
}
}));