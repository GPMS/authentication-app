import { useEffect, useState } from 'react';
import { MdArrowBackIosNew, MdCameraAlt } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { useUser } from '../hooks/useUser';
import { UserService } from '../services';
import { User } from '../types';
import { useToken } from '../hooks/useToken';
import { toast } from 'sonner';

export function PersonalInfoEditPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState<Partial<User> | null>(null);
  const { token, setToken } = useToken();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/');
      return;
    }
    if (user) {
      setFormData(user);
    }
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!formData) {
    return;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((old) => ({
      ...old!,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toast.promise(
      async () => {
        try {
          let key: keyof User;
          for (key in formData) {
            if (formData![key] === user![key]) {
              delete formData![key];
            }
          }
          const { accessToken } = await UserService.updateUser(formData!, token!);
          setToken(accessToken);
          navigate('/user');
        } catch (e) {
          if (e instanceof AxiosError) {
            if (e.response && e.response.status === 403) {
              toast.error('Invalid token!');
              throw e;
            }
          }
        }
      },
      {
        loading: 'Loading...',
      },
    );
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
        <form className="space-y-6 text-[13px]" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center gap-7 my-6">
            <div className="relative">
              <img
                className="rounded-lg"
                src={
                  formData.photo ?? user?.photo ?? 'https://source.unsplash.com/random/72x72?sig=1'
                }
                width={72}
                height={72}
                alt="profile picture"
              />
              <MdCameraAlt
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-black rounded"
                tabIndex={0}
              />
            </div>
            <input
              className="text-[#828282] bg-transparent hover:text-black dark:hover:text-white max-w-full"
              name="photo"
              placeholder="CHANGE PHOTO"
              id="photo"
              size={40}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
              value={formData!.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <textarea
              className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
              name="bio"
              id="bio"
              placeholder="Enter your bio..."
              value={formData!.bio}
              onChange={handleChange}
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
              value={formData!.phone}
              onChange={handleChange}
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
              value={formData!.email}
              onChange={handleChange}
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
              value={formData!.password}
              onChange={handleChange}
            />
          </div>
          <button className="bg-blue-600 mt-1 py-2 px-6 rounded-lg text-white">Save</button>
        </form>
      </div>
    </>
  );
}
