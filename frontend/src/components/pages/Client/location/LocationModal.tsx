import React, { useEffect } from "react";
import styled from "styled-components";
import FormRow from "../Reservation/InputGroup/FormRow";
import { MapStore } from "@/store/userStore";
import SelectOPTime from "./SelectOPTime";
import LocationButtonBox from "./LocationButtonBox";
import { GetLocation } from "@/api/postApi";

const Div = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 880px;
  height: 850px;
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  text-align: center;
  padding: 60px 40px 0;
  box-sizing: border-box;
  overflow: auto;
  scrollbar-width: none;

  h2 {
    padding-bottom: 44px;
    border-bottom: 1px solid #dddddd;
  }

  .Info {
    font-size: 14px;
    color: #888888;
    display: block;
    text-align: left;
  }

  @media (max-width: 1024px) {
    width: 90%;
    background-color: white;
    height: 90%;
    padding: 20px 20px;

    h2 {
      padding-bottom: 20px;
    }
  }
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section = styled.section`
  padding: 40px;

  @media (max-width: 1024px) {
    padding: 0;
    padding-top: 20px;
  }
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  padding: 17px 0 0 19px;
  border: 1px solid #dddddd;
  font-size: 16px;
  min-height: 150px;
  @media (max-width: 1024px) {
    box-sizing: border-box;
    font-size: 15px;
    padding: 10px;
  }
`;

const SingleInput = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #dddddd;
  padding-left: 10px;
  font-size: 16px;

  @media (max-width: 1024px) {
    box-sizing: border-box;
    font-size: 15px;
  }
`;

export default function LocationModal() {
  const {
    address,
    setAddress,
    phone1,
    setPhone1,
    phone2,
    setPhone2,
    setOPDays,
    setStartTime,
    setEndTime,
  } = MapStore();
  const handleMainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone1(e.target.value);
  };
  const handleSubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone2(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await GetLocation();
      console.log(res.result);
      setAddress(res.result.address);
      setPhone1(res.result.phone1);
      setPhone2(res.result.phone2);
      setOPDays(res.result.op_days);
      setStartTime(res.result.start_time);
      setEndTime(res.result.end_time);
    };
    fetchData();
  }, []);

  return (
    <Div>
      <h2 className="Section-title">정보 수정</h2>
      <Section>
        <FormRow
          htmlFor="address"
          label="주소"
          required={true}
          NeedWrapper={false}
        >
          <Textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            id="address"
            placeholder="주소를 입력해 주세요"
          />
        </FormRow>
        <FormRow
          htmlFor="phone1"
          label="메인 전화번호"
          required={true}
          NeedWrapper={false}
        >
          <FlexBox>
            <SingleInput
              type="text"
              id="phone1"
              name="phone1"
              placeholder="메인 전화번호를 입력해주세요"
              required
              value={phone1}
              onChange={handleMainChange}
            />
            <span className="Info">
              ※ 메인 전화번호가 단축버튼에 반영됩니다.
            </span>
          </FlexBox>
        </FormRow>

        <FormRow
          htmlFor="phone2"
          label="서브 전화번호"
          required={false}
          NeedWrapper={false}
        >
          <SingleInput
            type="text"
            id="phone2"
            name="phone2"
            placeholder="서브 전화번호를 입력해주세요"
            value={phone2}
            onChange={handleSubChange}
          />
        </FormRow>
        <FormRow
          htmlFor="runtime"
          label="이용시간"
          required={true}
          NeedWrapper={false}
        >
          <SelectOPTime />
        </FormRow>
      </Section>
      <LocationButtonBox />
    </Div>
  );
}
