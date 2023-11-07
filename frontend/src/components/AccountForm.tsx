import { MdEmail, MdLock } from 'react-icons/md';
import { AccountFormInput } from './AccountFormInput';
import { UserDTO } from '../types';
import { ReactNode } from 'react';

export function AccountForm({
  formData,
  onChange,
  onSubmit,
  children,
}: {
  formData: UserDTO;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  return (
    <form className="grid mt-8 gap-3.5 auto-rows-[3rem]" onSubmit={onSubmit}>
      <AccountFormInput
        Icon={MdEmail}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => onChange(e)}
      />
      <AccountFormInput
        Icon={MdLock}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => onChange(e)}
      />
      {children}
    </form>
  );
}
