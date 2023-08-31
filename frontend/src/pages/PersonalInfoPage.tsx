import { ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

type InfoRowProps = {
  header: string;
  data: ReactNode;
};
function InfoRow({ header, data }: InfoRowProps) {
  return (
    <tr className="h-[72px]">
      <td className="h-full py-2 pl-5 sm:pl-12 uppercase text-[#BDBDBD] text-xs">{header}</td>
      <td className="h-full py-2 pr-12 flex items-center justify-end sm:justify-start">
        {typeof data === 'string' ? (
          <p className="line-clamp-1 text-[#333] dark:text-[#E0E0E0] font-medium text-lg">{data}</p>
        ) : (
          data
        )}
      </td>
    </tr>
  );
}

export function PersonalInfoPage() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
    }
  }, [user, navigate, isLoading]);
  if (isLoading) {
    return <>Loading...</>;
  }
  if (!user) {
    return;
  }
  return (
    <>
      <div className="text-center text-black dark:text-white tracking-tighter my-11">
        <h1 className="text-4xl">Personal Info</h1>
        <p className="text-lg font-light">Basic info, like your name and photo</p>
      </div>
      <div className="sm:border rounded-xl py-2">
        <div className="flex  min-h-[73px] py-2 px-5 sm:px-12 justify-between items-center mb-6 sm:mb-0 sm:border-b">
          <div className="mr-14">
            <h2 className="text-2xl text-black dark:text-white">Profile</h2>
            <p className="text-xs text-[#828282]">Some info may be visible to other people</p>
          </div>
          <Link
            to="/user/edit"
            className="text-[#828282] py-2 px-8 border rounded-xl hover:brightness-200"
          >
            Edit
          </Link>
        </div>
        <table className="w-full">
          <tbody className="border-b sm:border-none divide-y">
            <InfoRow
              header="photo"
              data={
                <img
                  className="rounded-lg"
                  src={user.photo}
                  width={72}
                  height={72}
                  alt="profile picture"
                />
              }
            />
            <InfoRow header="name" data={user.name} />
            <InfoRow header="Bio" data={user.bio} />
            <InfoRow header="phone" data={user.phone} />
            <InfoRow header="email" data={user.email} />
            <InfoRow header="password" data="************" />
          </tbody>
        </table>
      </div>
    </>
  );
}
