import "./App.css";
import "./style/reset.css";
import "./style/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Client/main/Main";
import LocationPage from "./components/pages/Client/LocationPage";
import ReservationPage from "./components/pages/Client/ReservationPage";
import QuestionsPage from "./components/pages/Client/QuestionsPage";
import GalleryPage from "./components/pages/Client/GalleryPage";
import NewsPage from "./components/pages/Client/NewsPage";

import LayoutPage from "./components/pages/Client/LayoutPage";
import QuestionWritePage from "./components/pages/Client/QuestionWritePage";
import NaverLogin from "./components/pages/Client/NaverLogin";
import Office from "./components/pages/Client/Office";
import AboutPage from "./components/pages/Client/AboutPage";
import AdminReservationPage from "./components/pages/Client/AdminReservationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/naver/callback" element={<NaverLogin />} />
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Main />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="office" element={<Office />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="adminReservation" element={<AdminReservationPage />} />
          <Route path="questions/write" element={<QuestionWritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
