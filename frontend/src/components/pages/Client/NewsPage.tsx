import React, { useEffect, useState } from "react";
import { getNews } from "../../../api/postApi";

interface NewsDataProps {
  date: string;
  description: string;
  img: string;
  link: string;
  title: string;
}

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsDataProps[]>([]);

  useEffect(() => {
    const axiosData = async () => {
      const res = await getNews();
      console.log(res.message);
      setNewsList(res.message);
    };
    axiosData();
  }, []);
  console.log(newsList[0].title);
  return <div></div>;
}
