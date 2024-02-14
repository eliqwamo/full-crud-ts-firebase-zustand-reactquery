import { db } from './firebaseConfig'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    DocumentData
} from 'firebase/firestore'
import { User } from '../store/useUserStore'

const usersCollectionRef = collection(db, 'users');

export const createUser = async(user: Omit<User, 'id'>): Promise<DocumentData> => {
    return await addDoc(usersCollectionRef, user);
}

export const fetchUsers = async() : Promise<User[]> => {
    const snapshot = await getDocs(usersCollectionRef);
    return snapshot.docs.map((doc) => {
        const data = doc.data() as User;
        return {...data, id: doc.id}
    })
}

export const updateUser = async(id: string, update: Partial<Omit<User, 'id'>>): Promise<void> => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, update)
}

export const deleteUser = async(id: string): Promise<void> => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc)
}