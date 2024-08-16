import { useState, FormEvent } from "react";
import axios from "axios";

interface RegisterResponse {
  username: string;
  id: number;
}

function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<RegisterResponse>(
        "/api/register",
        {
          username,
          password,
        }
      );
      setSuccess(true);
      setError("");
    } catch (err: any) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success ? (
        <p>Registration successful! You can now log in.</p>
      ) : (
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default Register;
