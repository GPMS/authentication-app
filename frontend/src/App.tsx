import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { DevChallengesIcon } from './components/icons/DevChallengesIcons';
import { RegisterPage } from './pages/RegisterPage';
import { LogInPage } from './pages/LogInPage';
import { PersonalInfoPage } from './pages/PersonalInfoPage';
import { DropdownMenu } from './components/DropdownMenu';
import { PersonalInfoEditPage } from './pages/PersonalInfoEditPage';
import { Toaster } from 'sonner';

function AccountPageLayout() {
  return (
    <div className="min-h-screen grid sm:justify-center sm:items-center">
      <div className="p-4 container flex flex-col sm:w-[473px] tracking-tight">
        <div className="sm:px-14 flex-grow sm:py-10 sm:mb-3 sm:border sm:rounded-3xl">
          <a href="https://devchallenges.io">
            <DevChallengesIcon className="fill-[#282051] dark:fill-[#F2F2F2]" />
          </a>
          <Outlet />
        </div>
        <footer className="flex justify-between mt-2 text-sm text-[#BDBDBD]">
          <p>
            created by{' '}
            <a className="underline font-semibold" href="https://github.com/GPMS">
              GPMS
            </a>
          </p>
          <a href="https://devchallenges.io">devChallenges.io</a>
        </footer>
      </div>
      <Toaster closeButton richColors />
    </div>
  );
}

function PersonalInfoLayout() {
  return (
    <>
      <header className="container pt-4 px-4 flex justify-between mx-auto">
        <DevChallengesIcon className="fill-[#282051] dark:fill-[#F2F2F2]" />
        <DropdownMenu />
      </header>
      <div className="container mx-auto max-w-[845px]">
        <main>
          <Outlet />
        </main>
        <footer className="flex justify-between mt-2 text-sm text-[#BDBDBD]">
          <p>
            created by{' '}
            <a className="underline font-semibold" href="https://github.com/GPMS">
              GPMS
            </a>
          </p>
          <a href="https://devchallenges.io">devChallenges.io</a>
        </footer>
      </div>
      <Toaster closeButton richColors />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountPageLayout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/register" index element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
        <Route path="/user" element={<PersonalInfoLayout />}>
          <Route index element={<PersonalInfoPage />} />
          <Route path="edit" element={<PersonalInfoEditPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
