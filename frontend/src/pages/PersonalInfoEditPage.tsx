import { MdArrowBackIosNew } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { PersonalInfoEditForm } from '../components/icons/PersonalInfoEditForm';

export function PersonalInfoEditPage() {
  return (
    <>
      <Link to="/user" className="flex items-center gap-2 text-[#2D9CDB] mt-2 mb-6">
        <MdArrowBackIosNew /> Back
      </Link>
      <div className="sm:border rounded-xl py-7 px-12">
        <div>
          <h1 className="text-2xl text-black dark:text-white">Change Info</h1>
          <p className="text-xs text-[#828282]">Changes will be reflected to every service</p>
        </div>
        <PersonalInfoEditForm />
      </div>
    </>
  );
}
