import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function Require() {
  let context = JSON.parse(localStorage.getItem('values'));
  return context ? <Outlet /> : <Navigate to="/" replace />;
}
