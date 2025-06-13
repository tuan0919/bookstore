import React, { useState, useEffect } from "react";
import { Paper, Typography, Tabs, Tab } from "@mui/material";
import { getOrder } from "~/api/order";
import Order from "~/components/Order"; // Import component Order
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/system";
const OrderList = () => {
  const [tab, setTab] = useState<string>("ALL");
  const [orders, setOrders] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const userDetails = JSON.parse(
    localStorage.getItem("userDetails") || "{}"
  );
  const fetchOrders = async (page: number, status?: string) => {
    try {
      const data = await getOrder(page);

      console.log("Fetched orders:", data);
      const mappedOrders = data.content.map((order: any) => ({
        orderId: order.orderId.toString(),
        orderDateTime: order.orderDate,
        nameUser: userDetails.fullName,
        phoneNumber: userDetails.phoneNum,
        address: order.shippingAddress.addressLine1,
        paymentMethod: order.paymentMethodName,
        shipmentMethod: "Giao hàng tận nơi",
        note: "",
        price: order.totalAmount,
        feeShip: 32000,
        status: convertStatus(order.status),
        items: order.items, 
        
      }
    ));
      

      if (status) {
        const filteredOrders = mappedOrders.filter(
          (order) => order.status === status
        );
        setOrders(filteredOrders);
      } else {
        setOrders(mappedOrders);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi fetch đơn hàng", error);
    }
  };

  const convertStatus = (status: string) => {
    switch (status) {
      case "Chờ xác nhận":
        return "PENDING_CONFIRMATION";
      case "Đã xác nhận":
        return "CONFIRMED";
      case "Đang vận chuyển":
        return "SHIPPING";
      case "Đã chuyển đến":
        return "DELIVERED";
      case "Đã hủy":
        return "CANCELED";
      default:
        return "PENDING_CONFIRMATION";
    }
  };

  // Call API khi page hoặc tab thay đổi
  useEffect(() => {
    if (tab === "ALL") {
      fetchOrders(page);
    } else {
      fetchOrders(page, tab);
    }
  }, [page, tab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    setPage(0); // Reset về trang đầu khi đổi tab
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
        sx={{ marginBottom: "10px" }}
      >
        <Tab value="ALL" label="Tất cả" />
        <Tab value="PENDING_CONFIRMATION" label="Chờ xác nhận" />
        <Tab value="CONFIRMED" label="Đã xác nhận" />
        <Tab value="SHIPPING" label="Đang vận chuyển" />
        <Tab value="DELIVERED" label="Đã chuyển đến" />
        <Tab value="CANCELED" label="Đã hủy" />
      </Tabs>

      {/* Danh sách hóa đơn */}
       <Box sx={{ maxHeight: "500px", overflowY: "auto", pr: 1 }}>
      {orders.map((order) => (
        <Order
          key={order.orderId}
          orderId={order.orderId || ""}
          orderDateTime={order.orderDateTime}
          status={order.status}
          titleBook={order.titleBook}
          items={order.items}
          price={order.price}
          imgBook={order.imgBook}
          feeShip={order.feeShip}
          nameUser={order.nameUser}
          phoneNumber={order.phoneNumber}
          address={order.address}
          paymentMethod={order.paymentMethod}
          shipmentMethod={order.shipmentMethod}
          note={order.note}
          refreshOrders={() => fetchOrders(page, tab)}
        />
      ))}
      </Box>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_event, value) => setPage(value - 1)}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </Paper>
  );
};

export default OrderList;