import ThreadList from '../components/ThreadList';
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function HomePage() {
  const navigate = useNavigate();

  function gotoAddThread() {
    if (!localStorage.accessToken) {
      return toast.error('Anda harus login terlebih dahulu!');
    }
    navigate('/threads/add');
  }

  return (
    <>
      <ThreadList />
      <div className="fixed bottom-4 right-4">
        <button className="text-blue-700 mr-5 font-bold" onClick={gotoAddThread}>
          <FaPlusCircle className="size-10" />
        </button>
      </div>
    </>
  );
}
