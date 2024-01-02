import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import Navbar from './components/Navbar';
import AddPage from './pages/AddPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Loading from './components/Loading';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { asyncCheckAuthUser } from './states/authUser/action';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(asyncCheckAuthUser());
  // }, [dispatch]);

  return (
    <>
      <header>
        <Navbar />
        <Loading />
      </header>
      <main className="bg-gray-700">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
          <Route path="/threads/add" element={<AddPage />} />
          <Route path="/threads/:threadId" element={<DetailPage />} />
          <Route path="/*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </main>
    </>
  );
}
export default App;
