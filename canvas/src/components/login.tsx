import { useProviderContext } from "@/context/provider";

export const LoginView = () => {
  const { login, loggedIn, provider } = useProviderContext();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {loggedIn ? (
        <div>Logged in...</div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={login}
        >
          Login
        </button>
      )}
    </div>
  );
};
