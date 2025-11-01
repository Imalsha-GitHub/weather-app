import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButton() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  if (isLoading) {
    return (
      <div className="text-white">
        <span>Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3 text-white">
        <span className="hidden md:inline">{user?.email}</span>
        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
    >
      Login
    </button>
  );
}
