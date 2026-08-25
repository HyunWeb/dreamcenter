import React from "react";
import styled from "styled-components";
import Button from "@/components/common/Button";
import FormRow from "@/components/pages/Client/Reservation/InputGroup/FormRow";
import { TransferStore, useAlertStore } from "@/store/userStore";
import { PostTransferContent } from "@/api/postApi";

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
  color: #888888;
  text-align: left;
  margin: -12px 0 12px;
`;

const KeywordHint = styled.p`
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

export default function TransferEditModal() {
  const { draft, setDraftField, setData, setIsModalOpen } = TransferStore();
  const { showAlert } = useAlertStore();

  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    const res = await PostTransferContent(draft);
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
      <h2 className="Section-title">편입안내 문구 수정</h2>

      <FormRow htmlFor="intro" label="상단 소개" required NeedWrapper={false}>
        <Textarea
          value={draft.intro}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("intro", e.target.value)}
        />
      </FormRow>
      <KeywordHint>💡 검색노출 유지 권장 키워드: 의대편입</KeywordHint>

      <FormRow
        htmlFor="eligibility_body"
        label="편입 대상 및 대학"
        required
        NeedWrapper={false}
      >
        <Textarea
          value={draft.eligibility_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("eligibility_body", e.target.value)}
        />
      </FormRow>
      <KeywordHint>
        💡 검색노출 유지 권장 키워드: 의대편입, 타슈켄트의대, 사마르칸트의대, 안디잔의대
      </KeywordHint>

      <FormRow
        htmlFor="steps_body"
        label="편입 절차"
        required
        NeedWrapper={false}
      >
        <Textarea
          value={draft.steps_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("steps_body", e.target.value)}
        />
      </FormRow>
      <Hint>한 줄에 한 단계씩 입력하세요. 줄바꿈마다 목록 항목으로 표시됩니다.</Hint>
      <FormRow
        htmlFor="procedure_note"
        label="절차 하단 안내"
        required={false}
        NeedWrapper={false}
      >
        <Textarea
          value={draft.procedure_note}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("procedure_note", e.target.value)}
        />
      </FormRow>
      <FormRow
        htmlFor="mou_notice_body"
        label="MOU 안내"
        required={false}
        NeedWrapper={false}
      >
        <Textarea
          value={draft.mou_notice_body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("mou_notice_body", e.target.value)}
        />
      </FormRow>
      <FormRow
        htmlFor="contact_note"
        label="문의 안내"
        required={false}
        NeedWrapper={false}
      >
        <Textarea
          value={draft.contact_note}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDraftField("contact_note", e.target.value)}
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
