import styled from "styled-components";

import PrivateLock from "./PrivateLock";
import Button from "../Button";
import FloatTelePhone from "./FloatTelePhone";

const Div = styled.div`
  width: 370px;
  height: 330px;
  position: fixed;
  z-index: 10;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  padding: 40px 60px;
`;

type Props = {
  type: string;
};
export default function ModalUI({ type }: Props) {
  return (
    <Div>
      {type === "privateLock" && <PrivateLock />}
      {type === "FloatTelePhone" && <FloatTelePhone />}
    </Div>
  );
}
