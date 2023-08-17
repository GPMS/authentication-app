import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

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
            to="/user/5/edit"
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
                  src="https://source.unsplash.com/random/72x72?sig=1"
                  width={72}
                  height={72}
                  alt="profile picture"
                />
              }
            />
            <InfoRow header="name" data="Xanthe Neal" />
            <InfoRow
              header="Bio"
              data="I am a software developer and a big fan of devchallenges..."
            />
            <InfoRow header="phone" data="908249274292" />
            <InfoRow header="email" data="xanthe.neal@gmail.com" />
            <InfoRow header="password" data="************" />
          </tbody>
        </table>
      </div>
    </>
  );
}
