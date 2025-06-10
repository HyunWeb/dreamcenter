import { useUserStore, WriteAboutStore } from "@/store/userStore";
import Button from "../../../common/Button";
import React, { useEffect } from "react";
import styled from "styled-components";
import { GetAboutWrite, GetOfficeWrite } from "@/api/postApi";
import { useLocation } from "react-router-dom";

const ViewSection = styled.section`
  margin-bottom: 400px;
  position: relative;
  text-align: left;
  padding: 20px;
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(-100%);
`;

const DefaultText = styled.p`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  color: #888888;
  margin: 100px;

  @media (max-width: 1024px) {
    font-size: 20px;
    margin: 100px 0 0 0;
  }
`;

export default function ViewBox() {
  const { setEditSection, setContent, aboutTextData, setAboutTextData } =
    WriteAboutStore();
  const { role } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    const fetchText = async () => {
      let res;
      if (location.pathname.includes("/about")) {
        res = await GetAboutWrite();
      } else if (location.pathname.includes("/office")) {
        res = await GetOfficeWrite();
      }
      setAboutTextData(res.result.content);
    };
    fetchText();
  }, []);

  const OpenHandler = () => {
    setEditSection(false);
    setContent(aboutTextData);
  };
  return (
    <ViewSection>
      {role === "admin" && (
        <EditButton
          name="내용 수정"
          Bgcolor="green"
          TitleColor="white"
          onClick={OpenHandler}
        />
      )}
      {aboutTextData === "" ? (
        <DefaultText>내용을 입력해주세요</DefaultText>
      ) : (
        <div
          className="editor-preview"
          dangerouslySetInnerHTML={{ __html: aboutTextData }}
        />
      )}
    </ViewSection>
  );
}
