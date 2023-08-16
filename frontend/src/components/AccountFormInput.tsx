import { IconType } from 'react-icons';

interface AccountFormInputProps {
  type: string;
  name: string;
  placeholder: string;
  Icon: IconType;
}

export function AccountFormInput({ type, name, placeholder, Icon }: AccountFormInputProps) {
  return (
    <div className="relative text-[#828282]">
      <Icon
        className="text-inherit absolute w-[24px] h-[24px] left-[12px] -translate-y-1/2 top-1/2"
        name={`${name}-icon`}
      />
      <input
        className="placeholder:text-inherit border border-[#BDBDBD] rounded-lg w-full h-full pl-12 bg-transparent"
        type={type}
        name={name}
        placeholder={placeholder}
        id=""
      />
    </div>
  );
}
