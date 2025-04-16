import React, { useEffect } from "react";

import "./App.css";
import { getposts } from "./api/postApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/pages/Client/Main";
import AboutPage from "./components/pages/Client/AboutPage";
import LocationPage from "./components/pages/Client/LocationPage";
import ReviewPage from "./components/pages/Client/ReviewPage";
import ReservationPage from "./components/pages/Client/ReservationPage";
import QuestionsPage from "./components/pages/Client/QuestionsPage";
import AdminLayout from "./components/pages/Admin/AdminLayout";
import GalleryPage from "./components/pages/Client/GalleryPage";
import NewsPage from "./components/pages/Client/NewsPage";
import AdminNewsPage from "./components/pages/Admin/AdminNewsPage";
import AdminGalleryPage from "./components/pages/Admin/AdminGalleryPage";
import AdminReviewPage from "./components/pages/Admin/AdminReviewPage";
import AdminReservationPage from "./components/pages/Admin/AdminReservationPage";
import AdminQuestionsPage from "./components/pages/Admin/AdminQuestionsPage";
import LayoutPage from "./components/pages/Client/LayoutPage";
import QuestionWritePage from "./components/pages/Client/QuestionWritePage";
import NaverLogin from "./components/pages/Client/NaverLogin";

function App() {
  useEffect(() => {
    getposts()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* 클라이언트(사용자) 페이지 */}
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Main />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="reservation" element={<ReservationPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="questions/write" element={<QuestionWritePage />} />
          <Route path="naver/callback" element={<NaverLogin />} />
        </Route>

        {/* 관리자(admin) 페이지 */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="news" element={<AdminNewsPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="review" element={<AdminReviewPage />} />
          <Route path="reservation" element={<AdminReservationPage />} />
          <Route path="questions" element={<AdminQuestionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
