import { useState, useContext, FormEvent } from "react";


import { AuthContext } from "@/components/Auth/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginResponse {
  token: string;
}


function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const auth = useContext(AuthContext);

  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post<LoginResponse>("/api/login", {
        username,
        password,
      });

      auth?.login()
      setError("");

      router.push("/dashboard");
    } catch (err: any) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
        {auth?.isLoggedIn ? (
          <p className="text-green-500 text-center">You are now logged in!</p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 text-xs italic mt-2">{error}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
