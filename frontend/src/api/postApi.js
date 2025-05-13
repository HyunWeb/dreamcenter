import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 로그인 요청
export const postLogin = async ({ code, state }) => {
  try {
    const response = await API.post(`/api/naver/callback`, { code, state });
    const storedState = localStorage.getItem("naver_oauth_state");

    if (state !== storedState) {
      alert("위조된 요청일 가능성이 있습니다. 로그인 취소");
      return;
    }

    return response.data;
  } catch (error) {
    console.error("로그인 실패", error);
    throw error;
  }
};

export const postLogout = async () => {
  try {
    const response = await API.post(`/api/auth/logout`, {});
    return response.data;
  } catch (err) {
    console.error("로그아웃 실패", err);
  }
};

export const postUpload = async (formData) => {
  try {
    const response = await API.post(`/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("업로드 실패", err);
  }
};

export const getNews = async () => {
  try {
    const response = await API.get(`/api/rss`);
    return response.data;
  } catch (err) {
    console.error("뉴스 받아오기 실패", err);
  }
};
