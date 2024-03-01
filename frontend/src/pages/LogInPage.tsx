import { LoginForm } from '../components/AuthForm';

export function LogInPage() {
  return (
    <>
      <header>
        <h1 className="font-semibold tracking-tight text-lg mt-7">Login</h1>
      </header>
      <main>
        <LoginForm />
      </main>
    </>
  );
}
