import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserInfo = async () => {
  try {
    const response = await API.get(`/api/user/getInfo`);
    return response.data;
  } catch (err) {
    console.error("유저 데이터 불러오기 실패", err);
  }
};

// 로그인 요청
export const postLogin = async ({ code, state }: any) => {
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

export const postUpload = async (formData: FormData) => {
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

export const PostAboutImages = async (formData: FormData) => {
  try {
    const response = await API.post(`/api/about/imgUpdate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("About 페이지 이미지 전송 실패", err);
  }
};
export const PostOfficeImages = async (formData: FormData) => {
  try {
    const response = await API.post(`/api/office/imgUpdate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Office 페이지 이미지 전송 실패", err);
  }
};

export const GetAboutImages = async () => {
  try {
    const response = await API.get(`/api/about/imgGet`);
    return response.data;
  } catch (err) {
    console.error("About 페이지 이미지 불러오기 실패", err);
  }
};
export const GetOfficeImages = async () => {
  try {
    const response = await API.get(`/api/office/imgGet`);
    return response.data;
  } catch (err) {
    console.error("Office 페이지 이미지 불러오기 실패", err);
  }
};

interface EditAboutImgesProps {
  image_url: string;
  name: string;
  sort_order: number;
}
export const EditAboutImges = async (newArray: EditAboutImgesProps[]) => {
  try {
    const response = await API.post(`/api/about/imgEdit`, newArray);
    return response;
  } catch (err) {
    console.error("About 페이지 이미지 수정하기 실패", err);
  }
};
interface EditOfficeImgesProps {
  image_url: string;
  name: string;
  sort_order: number;
}
export const EditOfficeImges = async (newArray: EditOfficeImgesProps[]) => {
  try {
    const response = await API.post(`/api/office/imgEdit`, newArray);
    return response;
  } catch (err) {
    console.error("Office 페이지 이미지 수정하기 실패", err);
  }
};

export const PostAboutWrite = async (content: string) => {
  try {
    const response = await API.post(`/api/about/postWrite`, { content });
    return response;
  } catch (err) {
    console.error("About 페이지 텍스트 저장 실패", err);
  }
};
export const PostOfficeWrite = async (content: string) => {
  try {
    const response = await API.post(`/api/office/postWrite`, { content });
    return response;
  } catch (err) {
    console.error("About 페이지 텍스트 저장 실패", err);
  }
};
export const GetAboutWrite = async () => {
  try {
    const response = await API.get("/api/about/getWrite");
    return response.data;
  } catch (err) {
    console.error("About 페이지 이미지 불러오기 실패", err);
  }
};
export const GetOfficeWrite = async () => {
  try {
    const response = await API.get("/api/office/getWrite");
    return response.data;
  } catch (err) {
    console.error("Office 페이지 이미지 불러오기 실패", err);
  }
};

export const PostReservation = async (formdata: FormData) => {
  try {
    const response = await API.post(`/api/reservation/postSubmit`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (err) {
    console.error("예약 상담 제출 실패", err);
  }
};

export const GetReservation = async () => {
  try {
    const response = await API.get(`/api/reservation/getSubmit`);
    return response.data;
  } catch (err) {
    console.error("상담 신청내역 불러오기 실패", err);
  }
};
