import React, { useState } from "react";
import { Box } from "@mui/material";
import SidebarMenu from "./SidebarMenu";
import PersonalProfile from "./ProfileSections/PersonalProfile";
// import các section khác ở đây...

export function ProfileUser() {
  const [openAccount, setOpenAccount] = useState(true);
  const [selected, setSelected] = useState('Hồ sơ cá nhân');

  const renderContent = () => {
    switch (selected) {
      case 'Hồ sơ cá nhân': return <PersonalProfile />;
      case 'Sổ địa chỉchỉ': return <PersonalProfile />;

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
