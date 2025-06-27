import { InteractiveButton } from '@/components/client/InteractiveButton';

interface UserStatusProps {
  user?: {
    username: string;
  } | null;
  onSignIn?: () => void;
}

export function UserStatus({ user, onSignIn }: UserStatusProps) {
  return (
    <section className="py-8 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <div className="alert alert-info inline-flex max-w-2xl">
          <span>
            {user?.username ? (
              <>Welcome back, {user.username}! 👋</>
            ) : (
              <>
                Sign in to save your favorite properties and get personalized recommendations 🏠
                <InteractiveButton 
                  href="/user/login"
                  className="btn btn-primary btn-sm ml-4"
                >
                  Sign In
                </InteractiveButton>
              </>
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
