import { useState, FormEvent } from "react";
import { register } from "@/services/authService";
import { useFormError } from "@/hooks/useFormError"; // Adjust the path as necessary

function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const { error, setErrorMsg, clearError } = useFormError();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(username, password);
      setSuccess(true);
      clearError(); // Clear any existing errors on successful registration
    } catch (err: any) {
      console.log(err);
      setErrorMsg(err, "Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Register</h2>
        {success ? (
          <p className="text-green-500">
            Registration successful! You can now log in.
          </p>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
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
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
