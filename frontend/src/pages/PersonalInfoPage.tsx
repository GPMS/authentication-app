import { useUser } from '../hooks/useUser';
import { PersonalInfo } from '../components/icons/PersonalInfo';

export function PersonalInfoPage() {
  const { user, isLoading } = useUser();

  return (
    <>
      <div className="text-center text-black dark:text-white tracking-tighter my-11">
        <h1 className="text-4xl">Personal Info</h1>
        <p className="text-lg font-light">Basic info, like your name and photo</p>
      </div>
      {isLoading && <>Loading</>}
      {user && <PersonalInfo user={user} />}
    </>
  );
}
