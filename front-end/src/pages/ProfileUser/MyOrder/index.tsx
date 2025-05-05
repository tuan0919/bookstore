import React, { useState } from "react";
import { Paper, Typography, Tabs, Tab } from "@mui/material";

import Order from "~/components/Order"; // Import component Order

const orders = [
  {
    orderId: "102688946",
    orderDateTime: "23/09/2022 - 10:42",
    nameUser: "Trần Anh Tú",
    phoneNumber: "0589330263",
    address: "18/3B Khu Phố 1, P. Long Bình Tân, Đồng Nai",
    paymentMethod: "Thanh toán khi nhận hàng",
    shipmentMethod: "Giao hàng tận nơi",
    note: "",
    price: 95000,
    feeShip: 30000,
    status: "new",
    imgBook:
      "https://cdn1.fahasa.com/media/catalog/product/t/h/thien-su-nha-ben---tap-4---ban-gioi-han.jpg",
    titleBook: "Thiên Sứ Nhà Bên - Tập 4 - Bản Giới Hạn",
    amount: 1,
  },
  {
    orderId: "102688947",
    orderDateTime: "23/09/2022 - 10:42",
    nameUser: "Trần Anh Tú",
    phoneNumber: "0589330263",
    address: "18/3B Khu Phố 1, P. Long Bình Tân, Đồng Nai",
    paymentMethod: "Thanh toán khi nhận hàng",
    shipmentMethod: "Giao hàng tận nơi",
    note: "",
    price: 95000,
    feeShip: 30000,
    status: "completed",
    imgBook:
      "https://cdn1.fahasa.com/media/catalog/product/t/h/thien-su-nha-ben---tap-4---ban-gioi-han.jpg",
    titleBook: "Thiên Sứ Nhà Bên - Tập 4 - Bản Giới Hạn",
    amount: 1,
  },
];

const OrderList = () => {
  const [tab, setTab] = useState(0);
 

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Paper sx={{ padding: 3, minWidth: 700, margin: "auto" }}>
      <Typography variant="h6" fontWeight="bold">
        Đơn hàng của tôi
      </Typography>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{marginBottom:"10px"}}
      >
        <Tab label="Tất cả" />
        <Tab label="Chờ thanh toán" />
        <Tab label="Đang xử lý" />
        <Tab label="Đang giao" />
        <Tab label="Hoàn tất" />
        <Tab label="Bị hủy" />
        <Tab label="Đổi trả" />
      </Tabs>
      

      {/* Danh sách hóa đơn */}
      {orders.map((order) => (
        <Order
        key={order.orderId}
          orderId={order.orderId || ""}
          orderDateTime={order.orderDateTime}
          status={order.status}
          titleBook={order.titleBook}
          amount={order.amount}
          imgBook={order.imgBook}
          price={order.price}
          feeShip={order.feeShip}
          nameUser={order.nameUser}
          phoneNumber={order.phoneNumber}
            address={order.address}
            paymentMethod={order.paymentMethod}
            shipmentMethod={order.shipmentMethod}
            note={order.note}
         />
    ))}
    </Paper>
  );
};

export default OrderList;
