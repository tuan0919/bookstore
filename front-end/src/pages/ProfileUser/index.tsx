import { useState } from "react";
import { Box } from "@mui/material";
import SidebarMenu from "./Sidebar";
import PersonalProfile from "./ProfileSections/PersonalProfile";
import AddressBook from "./ProfileSections/AddressBook";
import ChangePassword from "./ProfileSections/ChangePassword";
import InvoiceInfo from "./ProfileSections/InvoiceInfo";
import Privileges from "./ProfileSections/Privileges";

import BookSeries from "./PageOther/BookSeries";
import NotificationList from "./Nofitication";
import OrderList from "./MyOrder";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
export function ProfileUser() {
  const [openAccount, setOpenAccount] = useState(true);
  const [selected, setSelected] = useState("Hồ sơ cá nhân");
  const location = useLocation();

  return (
    <Box
      display="flex"
      bgcolor="#f6f6f6"
      minHeight="100vh"
      sx={{ px: "140px" }}
    >
      <SidebarMenu
        selected={selected}
        setSelected={setSelected}
        openAccount={openAccount}
        setOpenAccount={setOpenAccount}
        currentPath={location.pathname}
      />
      <Box flex={1} p={3}>
        <Routes>
          <Route index element={<Navigate to="info/account" replace />} />
          <Route path="info/account" element={<PersonalProfile />} />
          <Route path="info/address" element={<AddressBook />} />
          <Route path="info/password" element={<ChangePassword />} />
          <Route path="info/invoice" element={<InvoiceInfo />} />
          <Route path="info/privileges" element={<Privileges />} />
          <Route path="book-series" element={<BookSeries />} />
          <Route path="notifications" element={<NotificationList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="*" element={<div>Chưa có nội dung</div>} />
        </Routes>
      </Box>
    </Box>
  );
}
