import create from 'zustand';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
}

interface UserStore {
    users: User[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    updateUser: (id: string, update: Partial<User>) => void;
    deleteUser: (id:string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    setUsers: (users) => set({users}),
    addUser: (user) => set((state) => ({users: [...state.users, user]})),
    updateUser: (id, update) => set((state) => ({users: state.users.map((user) => (user.id === id ? {...user, ...update} : user)),})),
    deleteUser: (id) => set((state) => ({users: state.users.filter((user) => user.id !== id)}))
}))