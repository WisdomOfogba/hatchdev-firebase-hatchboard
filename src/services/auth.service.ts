import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, signOut, updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { FirebaseError } from 'firebase/app';
 
export async function register(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  return cred.user;
}
 
export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
 
export const loginWithGoogle = () =>
  signInWithPopup(auth, new GoogleAuthProvider());
 
export const logout = () => signOut(auth);
 
export function friendlyAuthError(err: unknown): string {
  if (err instanceof FirebaseError) {
    switch (err.code) {
      case 'auth/email-already-in-use':
        return 'That email is already registered.';
      case 'auth/invalid-credential':
        return 'Wrong email or password.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
  return 'Unexpected error.';
}
