import React, { useEffect, useState } from "react";
import NaverMap from "./location/NaverMap";
import styled from "styled-components";
import CurrentRoot from "../../common/CurrentRoot";
import { Link } from "react-router-dom";
import PageHeader from "../../common/PageHeader";
import { MapStore, UseModalStore, useUserStore } from "@/store/userStore";
import Button from "@/components/common/Button";
import EditModal from "./About&Office/EditModal";
import LocationModal from "./location/LocationModal";
import { GetLocation } from "@/api/postApi";

const Div = styled.div`
  text-align: center;

  strong {
    display: block;
    margin: 50px 0 35px 0;
    font-size: 20px;
    font-weight: 500;
    color: #c93e3e;
    @media (max-width: 600px) {
      font-size: 15px;
    }
  }

  ul {
    display: flex;
    justify-content: center;
    gap: 30px;

    margin-bottom: 120px;
    @media (max-width: 600px) {
      margin-top: 20px;
      margin-bottom: 30px;
      flex-direction: column;
      align-items: center;
    }
  }

  li {
    overflow: hidden;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 220px;
    height: 220px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-20%);
    box-sizing: border-box;
    svg {
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
    }
    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    p {
      font-size: 16px;
      font-weight: 500;
      color: #888888;
      line-height: 1.3;
      white-space: pre;
    }
    @media (max-width: 1024px) {
      svg {
        width: 27px;
        height: 27px;
      }
      h3 {
        font-size: 17px;
      }
      p {
        font-size: 15px;
      }
    }
    @media (max-width: 600px) {
      flex-shrink: 0;
      padding: 0;
      width: 90%;
      height: 190px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transform: translateY(0%);
    }
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #111111;
  background-image: url("./Reservation_Telephone.png"),
    linear-gradient(#92d5ba, #92d5ba);
  background-repeat: no-repeat;
  background-size: 200px, 100%;
  background-position: 20%;
  position: relative;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 170px;

  button {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translate(0, -50%);
    width: 140px;
    height: 45px;
    line-height: 45px;
    display: block;
    text-decoration: none;
    background-color: transparent;
    border: 2px solid #111111;
    color: #111111;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
    transition-duration: 180ms;

    &:hover {
      color: white;
      background-color: #111111;
    }
  }

  @media (max-width: 1024px) {
    background-image: url("./Reservation_Telephone.png"),
      linear-gradient(#92d5ba, #92d5ba);

    background-position: right;
    background-size: 120px, 100%;
    text-align: left;
    padding: 20px;
    box-sizing: border-box;
    line-height: 120px;
    font-size: 23px;
    font-weight: 700;
    span {
      border-bottom: 2px solid #111111;
    }
    margin-bottom: 50px;

    button {
      display: none;
    }
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    text-align: center;
    background-position: 20%;
    background-size: 180px, 100%;
    font-size: 25px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    margin-top: 10px;
  }
`;
export default function LocationPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    editAdress,
    editphone1,
    editphone2,
    editOPDays,
    editstartTime,
    editendTime,
    setEditPhone1,
    setEditPhone2,
    setEditOPDays,
    setEditStartTime,
    setEditEndTime,
    setAddress,
    setPhone1,
    setPhone2,
    setOPDays,
    setStartTime,
    setEndTime,
    setEditAdress,
  } = MapStore();
  const { role } = useUserStore();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await GetLocation();
      if (res.result) {
        setAddress(res.result.address);
        setEditAdress(res.result.address);
        setEditPhone1(res.result.phone1);
        setEditPhone2(res.result.phone2);
        setEditOPDays(res.result.op_days);
        setEditStartTime(res.result.start_time);
        setEditEndTime(res.result.end_time);
      } else {
        setAddress("-");
        setEditAdress("대구 광역시 수성구 화랑로 8길 11-13 성화빌딩 2층");
        setPhone1("-");
        setPhone2("-");
        setOPDays("평일");
        setStartTime("00:00");
        setEndTime("00:00");
      }
    };
    fetchData();
  }, []);
  return (
    <Div>
      <PageHeader title={"오시는 길"} root={"오시는 길"} />
      {role === "admin" && (
        <ButtonWrap>
          <Button
            name="정보 수정"
            Bgcolor="green"
            TitleColor="white"
            onClick={handleModalOpen}
          />
        </ButtonWrap>
      )}
      <strong>※ 유학원 방문 상담은 꼭 사전에 예약하셔야 됩니다.</strong>
      <section>
        <NaverMap />
        <ul>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#49B736"
              className="bi bi-geo-alt"
              viewBox="0 0 16 16"
            >
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <h3>주소</h3>
            <p>{editAdress || "-"}</p>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#49B736"
              className="bi bi-telephone-inbound"
              viewBox="0 0 16 16"
            >
              <path d="M15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0m-12.2 1.182a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>
            <h3>전화번호</h3>
            <p>
              {editphone1 || "-"} <br />
              {editphone2}
            </p>
          </li>
          <li>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#49B736"
              className="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
            <h3>이용시간</h3>
            <p>
              {editOPDays} <br />
              {editstartTime} ~ {editendTime}
            </p>
          </li>
        </ul>
      </section>
      <StyledLink to="/reservation">
        <span>예약 상담 바로가기</span>
        <button>바로가기</button>
      </StyledLink>
      {isModalOpen && <LocationModal />}
    </Div>
  );
}
