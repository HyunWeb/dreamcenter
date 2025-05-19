import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Time from "react-datepicker/dist/time";
import DeleteButton from "@/components/common/DeleteButton";

type FileItem = {
  id: string;
  file: File;
};
const Description = styled.p`
  line-height: 1.5;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0px 150px;
`;
const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Inputdiv = styled.div`
  margin-bottom: 24px;
  display: flex;
  width: 100%;
  .custom1 {
    gap: 10px;
  }
`;

const NoMargin = styled(Inputdiv)`
  margin-bottom: 10px;
`;

const Label = styled.label`
  line-height: 44px;
  font-size: 18px;
  font-weight: 500;
  width: 20%;
  display: block;
  text-align: left;
`;
const PhoneDash = styled.span`
  padding: 0 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 326px;
  display: flex;
  justify-content: flex-start;
`;

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 50%;
  height: 40px;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Span = styled.span`
  display: block;
  margin-bottom: 34px;
  text-align: left;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  height: 400px;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  ul {
    overflow-x: hidden;
    overflow-y: auto;
    width: 40%;
    height: 300px;
    text-align: left;
    li {
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px;
      margin-left: 10px;
    }
  }
`;

const ImgLabel = styled.label`
  color: #888888;
  border: 3px dashed #dddddd;
  box-sizing: border-box;
  padding: 50px 71px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  border-radius: 20px;
  width: 60%;
  height: 100%;

  svg {
    width: 45px;
    height: 40px;
  }
  p {
    margin-top: 16px;
    font-size: 16px;
  }
`;

const ImgListItems = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 2px solid #dddddd;
  margin-bottom: 16px;

  svg {
    width: 24px;
    height: 24px;
    color: #888888;
  }
  span {
    display: block;
    width: 70%;
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.5;
    margin-left: 10px;
  }
  button {
    background-color: transparent;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
`;

const AgreeLabel = styled.label`
  position: relative;
  margin-top: 38px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;
  border-top: 1px solid #dddddd;
  padding: 38px;

  input {
    width: 16px;
    height: 16px;
  }
  a {
    color: #888888;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 45px;
  color: white;
  background-color: #49b736;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-bottom: 178px;
`;

export default function FormSection() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [file, setFiles] = useState<FileItem[]>([]);
  // 자동 시간 생성기
  const generateTimeSlot = (startHour: number, endHour: number) => {
    const TimeSlot = [];
    for (let hours = startHour; hours <= endHour; hours++) {
      TimeSlot.push(`${String(hours).padStart(2, "0")}: 00`);
      TimeSlot.push(`${String(hours).padStart(2, "0")}: 30`);
    }
    return TimeSlot;
  };
  const TimeSlot: string[] = generateTimeSlot(10, 18);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files;
    if (!selectedFile) return;

    const newFiles = Array.from(selectedFile);
    const newItems = newFiles.map((file) => ({
      id: crypto.randomUUID(), // 또는 uuid(), index.toString() 등
      file,
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };
  return (
    <div>
      <Description className="description">
        모든 상담은 아래 예약을 한 경우에만 진행이 가능합니다. <br />
        정확하지 않거나 성실하지 않은 답변은 상담이 어려울 수있습니다.
        감사합니다.
      </Description>
      <Form>
        <Fieldset>
          <Inputdiv>
            <Label htmlFor="userId">글쓴이</Label>
            <Wrapper>
              <input
                id="userId"
                name="userId"
                readOnly
                value="jong****"
                className="readOnlyInput"
              />
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="name">
              이름<span className="required">*</span>
            </Label>
            <Wrapper>
              <SingleInput
                type="text"
                id="name"
                name="name"
                placeholder="홍길동"
                required
              />
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="phone1">
              연락처<span className="required">*</span>
            </Label>
            <Wrapper>
              <SingleInput
                type="text"
                id="phone1"
                name="phone1"
                maxLength={3}
                placeholder="010"
                required
              />
              <PhoneDash>-</PhoneDash>
              <SingleInput
                type="text"
                id="phone2"
                name="phone2"
                maxLength={4}
                placeholder="1234"
                required
              />
              <PhoneDash>-</PhoneDash>
              <SingleInput
                type="text"
                id="phone3"
                name="phone3"
                maxLength={4}
                placeholder="5678"
                required
              />
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="consultDate">
              상담날짜<span className="required">*</span>
            </Label>
            <Wrapper className="custom1">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy.MM.dd"
                placeholderText="2025.01.01"
                id="consultDate"
                name="consultDate"
                required
                className="DataPicker"
              />
              <StyledSelect name="consultTime" id="consultTime" required>
                <option value="">시간 선택</option>
                {TimeSlot.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </StyledSelect>
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="age">
              나이<span className="required">*</span>
            </Label>
            <Wrapper>
              <SingleInput
                type="number"
                id=" age"
                name="age"
                max={90}
                placeholder="만 나이를 입력해주세요"
                required
              />
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="school">
              학교명/전공/최종학력<span className="required">*</span>
            </Label>
            <Wrapper>
              <SingleInput
                type="text"
                id="school"
                placeholder="ex) 한국대학교 경영학과 재학중"
                required
              />
            </Wrapper>
          </Inputdiv>
          <NoMargin>
            <Label htmlFor="admissionType">
              신입합/편입학<span className="required">*</span>
            </Label>
            <Wrapper>
              <StyledSelect name="admissionType" id="admissionType" required>
                <option value="">지원전공 선택</option>
                <option value="신입학">신입학</option>
                <option value="편입학">편입학</option>
              </StyledSelect>
            </Wrapper>
          </NoMargin>
          <Span className="description">
            ※ 편입 문의는 uzbekdoctordream@gmail.com 으로 성적 증명서 보내주세요
          </Span>
          <Inputdiv>
            <Label htmlFor="recommender">추천인</Label>
            <Wrapper>
              <SingleInput type="text" id="recommender" name="recommender" />
            </Wrapper>
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="inquiry">핵심문의사항</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="inquiry"
              id="inquiry"
              placeholder="내용을 입력해 주세요"
            />
          </Inputdiv>
          <Inputdiv>
            <Label htmlFor="photoUpload">사진첨부</Label>

            <ImgDiv>
              <ImgLabel
                htmlFor="photoUpload"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files;
                  const ArrayFile = Array.from(file);

                  const newItems = ArrayFile.map((file, index) => ({
                    id: crypto.randomUUID(),
                    file,
                  }));

                  setFiles((prev) => [...prev, ...newItems]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-image"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                </svg>
                <p>파일을 선택해주세요</p>
              </ImgLabel>
              <ul>
                {file.map((item, index) => {
                  return (
                    <ImgListItems key={index}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-file-earmark-text"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                      </svg>
                      <span>{item.file.name}</span>
                      <DeleteButton file={item} setFiles={setFiles} />
                    </ImgListItems>
                  );
                })}
              </ul>
            </ImgDiv>

            <input
              type="file"
              id="photoUpload"
              name="photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </Inputdiv>

          <AgreeLabel>
            <input type="checkbox" name="agreePrivacy" required />
            개인정보 수집에 동의합니다.
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              내용 보기
            </a>
          </AgreeLabel>
        </Fieldset>
      </Form>
      <SubmitButton>등록</SubmitButton>
    </div>
  );
}
