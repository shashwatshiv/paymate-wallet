import { Button } from "./button";
import { Avatar } from "./avatar";
interface AppbarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="sticky top-0 z-50">
      <div className="glass-effect border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg accent-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="text-xl font-bold text-gradient">PayMate</div>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-300">
                    Welcome, {user.name || user.email}
                  </div>
                  <Avatar user={user?.name || ""}></Avatar>
                </div>
              )}
              <Button onClick={user ? onSignout : onSignin}>
                {user ? "Sign Out" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
