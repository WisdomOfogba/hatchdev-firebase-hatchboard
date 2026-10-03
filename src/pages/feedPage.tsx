import { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext';
import { addPost, listenToPosts, type Post } from '../services/post.service';

const feedPage = () => {
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) return;
        const unsubscribe = listenToPosts(setPosts);
        return unsubscribe; // stop listening when the component unmounts
    }, [user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newPost = {
                text,
                authorId: user?.uid || '',
                authorName: user?.displayName || 'Anonymous',
            }
            console.log('Adding post:', newPost);
            await addPost(newPost);
            console.log('Post added successfully');
            setText('');
        } catch (error) {
            console.error('Error adding post:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            Hi
            {user && <p>Welcome, {user.displayName}!</p>}
            <div>
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button disabled={loading} type="submit">
                        {loading ? 'Posting...' : 'Post'}
                    </button>
                </form>
            </div>
            {posts.length === 0 ? (<p>No posts yet.</p>) : (
                <>
                    {posts.map((p) => (
                        <p key={p.id}>
                            {p.authorName}:
                            {p.text}

                            <br />

                            <small>{new Date(p.createdAt).toLocaleString()}</small>
                        </p>
                    ))}
                </>
            )}
        </div>
    )
}

export default feedPage