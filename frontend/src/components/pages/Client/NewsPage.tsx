import React, { useEffect } from "react";
import { getNews } from "../../../api/postApi";

export default function NewsPage() {
  useEffect(() => {
    const axiosData = async () => {
      const res = await getNews();
      console.log(res);
    };
    axiosData();
  }, []);
  return <div>Page</div>;
}
