import { useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export function PersonalInfoEditPage() {
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);
  if (!user) {
    return;
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate('/user');
  }
  return (
    <>
      <Link to="/user" className="flex items-center gap-2 text-[#2D9CDB] mt-2 mb-6">
        <MdArrowBackIosNew /> Back
      </Link>
      <div className="sm:border rounded-xl py-7 px-12">
        <div>
          <h1 className="text-2xl text-black dark:text-white">Change Info</h1>
          <p className="text-xs text-[#828282]">Changes will be reflected to every services</p>
        </div>
        <div className="flex items-center gap-7 my-6">
          <img
            className="rounded-lg"
            src="https://source.unsplash.com/random/72x72?sig=1"
            width={72}
            height={72}
            alt="profile picture"
          />
          <button className="text-[#828282] hover:text-black dark:hover:text-white">
            Change Photo
          </button>
        </div>
        <form className="space-y-6 text-[13px]" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              name="bio"
              id="bio"
              placeholder="Enter your bio..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone..."
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              type="text"
              name="password"
              id="password"
              placeholder="Enter your password..."
            />
          </div>
          <button className="bg-blue-600 mt-1 py-2 px-6 rounded-lg text-white">Save</button>
        </form>
      </div>
    </>
  );
}
