import { useState } from 'react';
import { asyncAddThreads } from '../states/threads/action';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AddPage() {
  const navigate = useNavigate();

  const [threadInput, setThreadInput] = useState({
    title: '',
    category: '',
    body: '',
  });

  async function onThreadSubmitHandler(e) {
    e.preventDefault();

    if (!localStorage.accessToken) {
      toast.error('Anda harus login terlebih dahulu!');
      return navigate('/login');
    }

    const response = await asyncAddThreads(threadInput);
    if (response.status === 'success') {
      toast.success('Berhasil menambahkan thread!');
      navigate('/');
    } else {
      toast.error(response.message);
    }
  }

  function onthreadInputChangeHandler(e) {
    const { name, value } = e.target;
    setThreadInput({
      ...threadInput,
      [name]: value,
    });
  }

  return (
    <section className="mt-16 bg-gray-800 mx-auto p-6 md:w-4/5 lg:w-3/5 min-h-[92vh] text-white">
      <div>
        <h1 className="mt-3 mb-2 font-bold text-2xl">Buat Diskusi Baru</h1>
      </div>
      <form onSubmit={onThreadSubmitHandler}>
        <div className="mb-2">
          <input
            className="w-full bg-transparent border border-white rounded p-2"
            name="title"
            placeholder="Judul"
            value={threadInput.title}
            onChange={onthreadInputChangeHandler}
          />
        </div>
        <div className="mb-2">
          <input
            className="w-full bg-transparent border border-white rounded p-2"
            name="category"
            placeholder="Kategori"
            value={threadInput.category}
            onChange={onthreadInputChangeHandler}
          />
        </div>
        <div className="mb-2">
          <textarea
            className="w-full bg-transparent border border-white rounded h-24 p-2"
            name="body"
            placeholder="Isi konten disini..."
            value={threadInput.body}
            onChange={onthreadInputChangeHandler}
          ></textarea>
        </div>
        <button
          className="w-full bg-gray-600 py-2 hover:bg-gray-700 transition-all rounded"
          type="submit"
        >
          Kirim
        </button>
      </form>
    </section>
  );
}
