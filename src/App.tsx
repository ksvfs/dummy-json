import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
