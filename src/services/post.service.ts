import { ref, push, set, serverTimestamp, query, orderByChild, limitToLast, type Unsubscribe, onValue, update, remove } from 'firebase/database';
import { db } from '../lib/firebase';

export interface Post {
  id: string;
  text: string;
  authorId: string;
  authorName: string;
  createdAt: number;
}
 
type NewPost = Omit<Post, 'id' | 'createdAt'>;
 
export async function addPost(p: NewPost) {
  const newRef = push(ref(db, 'posts'));
  await set(newRef, { ...p, createdAt: serverTimestamp() });
}

export function listenToPosts(cb: (posts: Post[]) => void): Unsubscribe {
  const q = query(ref(db, 'posts'), orderByChild('createdAt'), limitToLast(50));
 
  return onValue(q, (snap) => {
    const list: Post[] = [];
    snap.forEach((child) => {
      list.push({ id: child.key as string, ...child.val() });
    });
    cb(list.reverse()); // newest first
  });
}
 
export const editPost = (id: string, text: string) =>
  update(ref(db, `posts/${id}`), { text });
 
export const deletePost = (id: string) =>
  remove(ref(db, `posts/${id}`));
