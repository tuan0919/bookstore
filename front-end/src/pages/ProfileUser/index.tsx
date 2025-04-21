import React, { useState } from "react";
import { Box } from "@mui/material";
import SidebarMenu from "./Sidebar";
import PersonalProfile from "./ProfileSections/PersonalProfile";
import AddressBook from "./ProfileSections/AddressBook";
import ChangePassword from "./ProfileSections/ChangePassword";
import InvoiceInfo from "./ProfileSections/InvoiceInfo";
import Privileges from "./ProfileSections/Privileges";

import BookSeries from "./PageOther/BookSeries";

export function ProfileUser() {
  const [openAccount, setOpenAccount] = useState(true);
  const [selected, setSelected] = useState('Hồ sơ cá nhân');

  const renderContent = () => {
    switch (selected) {
      case 'Hồ sơ cá nhân': return <PersonalProfile />;
      case 'Sổ địa chỉ': return < AddressBook/>;
      case 'Đổi mật khẩu': return <ChangePassword />;
      case 'Thông tin xuất hóa đơn GTGT': return <InvoiceInfo />;
      case 'Ưu đãi thành viên': return <Privileges />;

      case 'Sách theo bộ': return <BookSeries />;

      default: return <div>Chưa có nội dung</div>;
    }
  };

  return (
    <Box display="flex" bgcolor="#f6f6f6" minHeight="100vh" sx={{ px: '140px' }}>
      <SidebarMenu selected={selected} setSelected={setSelected} openAccount={openAccount} setOpenAccount={setOpenAccount} />
      <Box flex={1} p={3}>
        {renderContent()}
      </Box>
    </Box>
  );
}
