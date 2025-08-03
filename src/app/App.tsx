import { useAuth0 } from '@auth0/auth0-react';
// import { api } from '../utils/api';
import { trpc } from './providers';

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow
    logout: auth0Logout, // Starts the logout flow
    user, // User profile
  } = useAuth0();

  const signup = () =>
    login({ authorizationParams: { screen_hint: 'signup' } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) return 'Loading...';

  const test = trpc.post.getSecretMessage.useQuery();

  return isAuthenticated ? (
    <>
      <p> {test.isError}</p>
      <p> {test.data} </p>
      coucou <p>Logged in as {user?.email}</p>
      <h1>User Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
    </>
  ) : (
    <div className="flex w-dvw items-center justify-center gap-2.5">
      {error && <p>Error: {error.message}</p>}

      <p> {test.isError}</p>
      <p> {test.data} </p>

      <button onClick={signup}>Signup</button>

      <button onClick={void login}>Login</button>
    </div>
  );
}

export default App;
