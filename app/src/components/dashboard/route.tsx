import React from "react";
import { Route } from "react-router-dom";
import DashboardHome from "@/pages/dashboard/home";
import DashboardLayout from "./layout";
import NotFoundPage from "@/pages/404";
import ProtectedRoute from "./protected-route";
import Profile from "@/pages/dashboard/profile";

const route = (
  <React.Fragment>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<DashboardHome />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </React.Fragment>
);

export default route;
