export const Avatar = ({ user }: { user: string }) => {
  return (
    <div className="w-8 h-8 rounded-full accent-gradient flex items-center justify-center">
      <span className="text-white font-medium text-sm">
        {user.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
