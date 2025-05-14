import React from "react";
import styled from "styled-components";

interface ButtonProps {
  name: string;
  Bgcolor: "grey" | "green" | "red";
  TitleColor: "white" | "black";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const DefualtButton = styled.button<{ $color: string; $nameColor: string }>`
  padding: 8px 20px;
  border: none;
  background-color: ${(props) => props.$color};
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => props.$nameColor};
`;

export default function Button({
  name,
  Bgcolor,
  TitleColor,
  onClick,
  className,
}: ButtonProps) {
  const colorMap = {
    grey: "#eaeaea",
    green: "#49b736",
    red: "#C93E3E",
    white: "#ffffff",
    black: "#111111",
  } as const;
  return (
    <DefualtButton
      $color={colorMap[Bgcolor]}
      $nameColor={colorMap[TitleColor]}
      onClick={onClick}
      className={className}
    >
      {name}
    </DefualtButton>
  );
}
