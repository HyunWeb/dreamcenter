import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postLogin = async ({ code, state }) => {
  try {
    const response = await API.post(
      `/api/naver/callback`,
      { code, state },
      { withCredentials: true }
    );
    const storedState = localStorage.getItem("naver_oauth_state");
    console.log(state);

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

export const getposts = () => {
  return API.get(`/api/post`);
};
