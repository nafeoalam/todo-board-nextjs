import Dashboard from "@/components/Dashboard";
import { getSession, login, logout } from "@/lib/auth";
import { checkSessionValidity } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  const isSessonValid = checkSessionValidity(session);
  return (
    <>
      {isSessonValid ? (
        <Dashboard />
      ) : (
        <section>
          <form
            action={async (formData) => {
              "use server";
              await login(formData);
              redirect("/");
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="bg-black-200"
            />
            <br />
            <button type="submit" className="font-red">
              Login
            </button>
          </form>
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/");
            }}
          >
            <button type="submit">Logout</button>
          </form>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </section>
      )}
    </>
  );
}
