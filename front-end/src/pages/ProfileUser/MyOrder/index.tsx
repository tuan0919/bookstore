import React, { useState, useEffect } from "react";
import { Paper, Typography, Tabs, Tab, Box, Pagination } from "@mui/material";
import { getOrder } from "~/api/order";
import Order from "~/components/Order";

const OrderList = () => {
  const [tab, setTab] = useState<string>("ALL"); // Tab hiện tại
  const [allOrders, setAllOrders] = useState<any[]>([]); // Tất cả đơn hàng
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]); // Đơn hàng đã lọc theo tab
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

  // API lấy đơn hàng
  const fetchOrders = async (page: number) => {
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
      }));

      setAllOrders(mappedOrders); // Cập nhật danh sách gốc
      applyFilter(mappedOrders, tab); // Lọc theo tab hiện tại
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi fetch đơn hàng", error);
    }
  };

  // Hàm lọc đơn theo tab
  const applyFilter = (orders: any[], status: string) => {
    if (status === "ALL") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  // Chuyển trạng thái API về key
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

  // Call API khi đổi trang
  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  // Lọc lại khi đổi tab
  useEffect(() => {
    applyFilter(allOrders, tab);
  }, [tab, allOrders]);

  // Xử lý đổi tab
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
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
        {filteredOrders.map((order) => (
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
            refreshOrders={() => fetchOrders(page)} // Không cần truyền tab vì đã xử lý sẵn
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
