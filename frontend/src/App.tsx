import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { DevChallengesIcon } from './components/icons/DevChallengesIcons';
import { RegisterPage } from './pages/RegisterPage';
import { LogInPage } from './pages/LogInPage';

function AccountPageLayout() {
  return (
    <div className="min-h-screen grid sm:justify-center sm:items-center text-[#333] dark:text-[#E0E0E0] dark:bg-[#252329]">
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
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccountPageLayout />}>
          <Route index element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
