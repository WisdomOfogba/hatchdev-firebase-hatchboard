import { useAuth } from '../context/authContext';
import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth.service';

const ProfilePage = () => {
    const { user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

  return (
    <div>
        Welcome to your profile page, {user?.displayName}!

        <Button onClick={() => handleLogout()}>
            Logout
        </Button>
    </div>
  )
}

export default ProfilePage