import styled from "styled-components";

import PrivateLock from "./PrivateLock";
import Button from "../Button";
import FloatTelePhone from "./FloatTelePhone";
import MyReservation from "./MyReservation";

const Div = styled.div`
  box-sizing: border-box;
  width: 490px;
  height: 410px;
  position: fixed;
  z-index: 10;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 40px 60px;

  @media (max-width: 1024px) {
    width: 90%;
    height: 350px;
    max-width: 370px;
    padding: 20px 30px;
  }
`;

type Props = {
  type: string;
};
export default function ModalUI({ type }: Props) {
  return (
    <Div>
      {type === "privateLock" && <PrivateLock />}
      {type === "FloatTelePhone" && <FloatTelePhone />}
      {type === "MyReservation" && <MyReservation />}
    </Div>
  );
}
