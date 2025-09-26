import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: "login" | "register";
  }>;
}) {
  const { type } = await searchParams;

  const Component = type === "register" ? RegisterForm : LoginForm;

  return (
    <main className="flex items-center justify-center w-dvw h-dvh">
      <Component />
    </main>
  );
}
