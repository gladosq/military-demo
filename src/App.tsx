import { Route, Routes } from 'react-router-dom';
import '@/styles/global.scss';
import '@/styles/font-family.scss';
import MainPage from './components/MainPage/MainPage.tsx';

export default function App() {
  return (
    <Routes location={location}>
      <Route index path='/' element={<MainPage />} />
    </Routes>
  );
}
