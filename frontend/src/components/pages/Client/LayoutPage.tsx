import React from "react";
import { Outlet } from "react-router-dom";

export default function LayoutPage() {
  return (
    <div>
      LayoutPage
      <Outlet />
    </div>
  );
}
