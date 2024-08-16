import { useState, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface LoginResponse {
  token: string;
}

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post<LoginResponse>("/api/login", {
        username,
        password,
      });

      setLoggedIn(true);
      setError("");

      router.push("/dashboard");
    } catch (err: any) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {loggedIn ? (
        <p>You are now logged in!</p>
      ) : (
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Login;
