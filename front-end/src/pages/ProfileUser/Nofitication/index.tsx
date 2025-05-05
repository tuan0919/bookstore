// src/components/NotificationList.tsx
import { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import NotificationCard from "~/components/NotificationCard";

type Notification = {
  id: string;
  title: string;
  content: string;
  date: string;
  img?: string;
  type: "all" | "order" | "voucher" | "discountCode" ;
};
const notifications = [
  {
    id: "1",
    title: "MCBooks Đồng Hành Cùng Sĩ Tử",
    content: "Sẵn sàng thi cử. Sách Hot Ngoại Ngữ giảm đến 38%. Tủ Sách Tiếng Trung giảm đến 35%. Tủ Sách Thiếu Nhi đồng giảm 22%",
    date: "09:15 10/04/2024",
    type: "all",
  },
  {
    id: "2",
    title: "Fahasa nhắc bạn!",
    content: "Chỉ còn 29 phút sẽ hết hạn thanh toán đơn hàng 102688940. Thanh toán ngay!",
    date: "11:10 23/09/2022",
    type: "order",
  },
  {
    id: "3",
    title: "Fahasa tặng bạn Voucher",
    content: "Giảm 20k ĐH từ 250k. Số lượng có hạn. Voucher sẽ tự động mất khi hết số lượng",
    date: "15:44 11/04/2023",
    type: "voucher",
  }
]


export default function NotificationList() {
  const [tab, setTab] = useState<Notification["type"]>("all");

  const handleChange = (_: React.SyntheticEvent, newValue: Notification["type"]) => {
    setTab(newValue);
  };

  const filteredNotifications =
     notifications.filter((n) => n.type === tab);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: "2px solid rgba(128, 128, 128, 0.19)",
          ".MuiTab-root": { textTransform: "none", fontWeight: "bold" }
          
        }}
      >
        <Tab value="all" label="Tất Cả" />
        <Tab value="order" label="Đơn Hàng" />
        <Tab value="voucher" label="Voucher" />
        <Tab value="discountCode" label="Mã Giảm Giá" />
      </Tabs>

      <Box
        sx={{
          maxHeight: 500,
          overflowY: "auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {filteredNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            content={notification.content}
            date={notification.date}
            type={notification.type}
          />
        ))}
      </Box>
    </Box>
  );
}
