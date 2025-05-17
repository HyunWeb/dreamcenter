import React from "react";
import styled from "styled-components";

interface TabSwitchProps {
  selectTab: boolean;
  setSelectTab: React.Dispatch<React.SetStateAction<boolean>>;
  Title1: string;
  Title2: string;
}

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #dddddd;
  margin-bottom: 30px;
`;

const Selected = styled.button`
  background-color: transparent;
  font-size: 20px;
  font-weight: 600;
  color: #49b736;
  border: none;
  border-bottom: 3px solid #49b736;
  padding: 20px;
  transform: translateY(2px);
`;

const DeSelected = styled(Selected)`
  color: #888888;
  border-bottom: none;
  cursor: pointer;
`;

export default function TabSwitch({
  selectTab,
  setSelectTab,
  Title1,
  Title2,
}: TabSwitchProps) {
  const ChangeTab = () => {
    setSelectTab((prev: boolean) => !prev);
  };
  return (
    <Ul role="tablist">
      <li>
        {selectTab ? (
          <Selected role="tab">{Title1}</Selected>
        ) : (
          <DeSelected role="tab" onClick={ChangeTab}>
            {Title1}
          </DeSelected>
        )}
      </li>
      <li>
        {selectTab ? (
          <DeSelected role="tab" onClick={ChangeTab}>
            {Title2}
          </DeSelected>
        ) : (
          <Selected role="tab">{Title2}</Selected>
        )}
      </li>
    </Ul>
  );
}
