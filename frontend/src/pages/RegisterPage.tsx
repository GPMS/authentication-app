import { RegisterForm } from '../components/AuthForm';

export function RegisterPage() {
  return (
    <>
      <header>
        <h1 className="font-semibold text-lg mt-7">
          Join thousands of learners from
          <br /> around the world
        </h1>
      </header>
      <main>
        <p className="mt-3.5">
          Master web development by making real-life projects. There are multiple paths for you to
          choose
        </p>
        <RegisterForm />
      </main>
    </>
  );
}
