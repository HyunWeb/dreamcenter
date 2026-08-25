import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import FormRow from "@/components/pages/Client/Reservation/InputGroup/FormRow";
import { SchoolsStore, useAlertStore } from "@/store/userStore";
import { PostSchoolsContent } from "@/api/postApi";

const Div = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  max-height: 85vh;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
  padding: 60px 40px 40px;
  box-sizing: border-box;
  overflow: auto;

  h2 {
    padding-bottom: 24px;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 24px;
  }

  @media (max-width: 1024px) {
    width: 90%;
    height: 90%;
    padding: 20px;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 12px;
  border: 1px solid #dddddd;
  font-size: 15px;
  box-sizing: border-box;
  font-family: inherit;
`;

const Hint = styled.p`
  font-size: 13px;
  color: #49b736;
  text-align: left;
  margin: -12px 0 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export default function SchoolsEditModal() {
  const { draft, setDraftField, setData, setIsModalOpen } = SchoolsStore();
  const { showAlert } = useAlertStore();

  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    const res = await PostSchoolsContent(draft);
    if (res) {
      setData(draft);
      showAlert("수정이 완료되었습니다.");
      setIsModalOpen(false);
    } else {
      showAlert("저장에 실패했습니다.");
    }
  };

  return (
    <Div>
      <h2 className="Section-title">대학안내 문구 수정</h2>

      <FormRow htmlFor="intro" label="상단 소개" required NeedWrapper={false}>
        <Textarea
          value={draft.intro}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("intro", e.target.value)}
        />
      </FormRow>
      <Hint>💡 검색노출 유지 권장 키워드: 우즈베키스탄 의대, 우즈벡의대, 해외의대</Hint>

      <FormRow
        htmlFor="tashkent_body"
        label="타슈켄트의대"
        required
        NeedWrapper={false}
      >
        <Textarea
          value={draft.tashkent_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("tashkent_body", e.target.value)}
        />
      </FormRow>
      <Hint>💡 검색노출 유지 권장 키워드: 타슈켄트의대</Hint>

      <FormRow
        htmlFor="samarkand_body"
        label="사마르칸트국립의과대학교"
        required
        NeedWrapper={false}
      >
        <Textarea
          value={draft.samarkand_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("samarkand_body", e.target.value)}
        />
      </FormRow>
      <Hint>💡 검색노출 유지 권장 키워드: 사마르칸트의대</Hint>

      <FormRow
        htmlFor="andijan_body"
        label="안디잔국립의과대학교"
        required
        NeedWrapper={false}
      >
        <Textarea
          value={draft.andijan_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("andijan_body", e.target.value)}
        />
      </FormRow>
      <Hint>💡 검색노출 유지 권장 키워드: 안디잔의대</Hint>

      <FormRow
        htmlFor="stat_body"
        label="국시 합격률 통계"
        required={false}
        NeedWrapper={false}
      >
        <Textarea
          value={draft.stat_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("stat_body", e.target.value)}
        />
      </FormRow>

      <ButtonBox>
        <Button
          name="취소"
          Bgcolor="grey"
          TitleColor="darkGrey"
          onClick={handleCancel}
        />
        <Button
          name="저장"
          Bgcolor="green"
          TitleColor="white"
          onClick={handleSubmit}
        />
      </ButtonBox>
    </Div>
  );
}
