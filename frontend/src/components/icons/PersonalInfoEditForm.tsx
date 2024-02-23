import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCameraAlt } from 'react-icons/md';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useToken } from '../../hooks/useToken';
import { useUser } from '../../hooks/useUser';
import { User } from '../../types';
import { UserService } from '../../services';

export function PersonalInfoEditForm() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState<Partial<User> | null>(null);
  const { setToken } = useToken();

  useEffect(() => {
    if (!isLoading) {
      setFormData(user);
    }
  }, [user, isLoading]);

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
          // Remove unchanged fields
          let key: keyof User;
          for (key in formData) {
            if (formData![key] === user![key]) {
              delete formData![key];
            }
          }
          const { accessToken } = await UserService.updateUser(formData!);
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
        success: 'Values updated successfully!',
        loading: 'Loading...',
      },
    );
  }

  if (!formData) {
    return <>Loading</>;
  }

  return (
    <form className="space-y-6 text-[13px]" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex items-center gap-7 my-6">
        <div className="relative">
          <img
            className="rounded-lg"
            src={formData?.photo ?? user?.photo ?? 'https://source.unsplash.com/random/72x72?sig=1'}
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
          className="text-[#828282] px-2 border rounded-xl border-[#828282] bg-transparent hover:text-black dark:hover:text-white max-w-full"
          name="photo"
          placeholder="CHANGE PHOTO"
          id="photo"
          size={40}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Name
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={formData!.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Bio
          <textarea
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            name="bio"
            placeholder="Nice to meet you"
            value={formData!.bio}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <div>
        <label>
          Phone
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            name="phone"
            placeholder="(55) 92321-1231"
            value={formData!.phone}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="email"
            name="email"
            placeholder="myemail@ssss.com"
            value={formData!.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            className="block w-full max-w-[375px] p-4 mt-1 rounded-xl bg-transparent border border-[#828282]"
            type="text"
            name="password"
            placeholder="*******"
            value={formData!.password}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="bg-blue-600 mt-1 py-2 px-6 rounded-lg text-white">Save</button>
    </form>
  );
}
