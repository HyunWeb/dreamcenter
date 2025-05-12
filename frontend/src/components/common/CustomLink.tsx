import React from "react";
import { Link } from "react-router-dom";

interface CustomLinkProps {
  to: string;
}

export default function CustomLink({ to }: CustomLinkProps) {
  return <Link to={to}>더보기</Link>;
}
