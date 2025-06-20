import React, { useState, useEffect } from "react";
import { Paper, Typography, Tabs, Tab, Box, Pagination } from "@mui/material";
import { getOrder } from "~/api/order";
import Order from "~/components/Order";
import { useTranslation } from "react-i18next";
const OrderList = () => {
  const [tab, setTab] = useState<string>("ALL");
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");
  const { t } = useTranslation();
  // API lấy đơn hàng theo trang (chỉ dùng cho tab ALL)
  const fetchOrders = async (page: number) => {
    try {
      const data = await getOrder(page);

      const mappedOrders = data.content.map((order: any) => ({
        orderId: order.orderId.toString(),
        orderDateTime: order.orderDate,
        nameUser: userDetails.fullName,
        phoneNumber: userDetails.phoneNum,
        address: order.shippingAddress.addressLine1,
        paymentMethod: order.paymentMethodName,
        shipmentMethod: "Giao hàng tận nơi",
        note: "",
        img: order.items.img,
        price: order.totalAmount,
        feeShip: 32000,
        status: convertStatus(order.status),
        items: order.items,
      }));

      setAllOrders(mappedOrders);
      setFilteredOrders(mappedOrders);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi fetch đơn hàng", error);
    }
  };

  // API lấy toàn bộ đơn hàng (chỉ dùng cho các tab khác ALL)
  const fetchAllOrders = async () => {
    try {
      let page = 0;
      let allResults: any[] = [];
      let isLastPage = false;

      while (!isLastPage) {
        const data = await getOrder(page);
        const mappedOrders = data.content.map((order: any) => ({
          orderId: order.orderId.toString(),
          orderDateTime: order.orderDate,
          nameUser: userDetails.fullName,
          phoneNumber: userDetails.phoneNum,
          address: order.shippingAddress.addressLine1,
          paymentMethod: order.paymentMethodName,
          shipmentMethod: "Giao hàng tận nơi",
          note: "",
          img: order.items.img,
          price: order.totalAmount,
          feeShip: 32000,
          status: convertStatus(order.status),
          items: order.items,
        }));

        allResults = [...allResults, ...mappedOrders];
        isLastPage = data.last;
        page++;
      }

      return allResults;
    } catch (error) {
      console.error("Lỗi khi fetch toàn bộ đơn hàng", error);
      return [];
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

  // Call API khi đổi tab
  useEffect(() => {
    const fetchData = async () => {
      if (tab === "ALL") {
        setPage(1); // Reset page khi đổi tab
        fetchOrders(0);
      } else {
        setPage(1); // Reset page khi đổi tab
        const allFetchedOrders = await fetchAllOrders();
        const filtered = allFetchedOrders.filter(
          (order) => order.status === tab
        );

        setAllOrders(filtered);
        setFilteredOrders(filtered);
        setTotalPages(Math.ceil(filtered.length / itemsPerPage));
      }
    };

    fetchData();
  }, [tab]);

  // Call API khi đổi trang (chỉ với tab ALL)
  useEffect(() => {
    if (tab === "ALL") {
      fetchOrders(page);
    }
  }, [page]);

  // Xử lý đổi tab
  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  // Danh sách đơn hàng hiện tại
  const currentOrders =
    tab === "ALL"
      ? filteredOrders
      : filteredOrders.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
  // Tự động chuyển về tab ALL
  const handleGoToAllTab = () => {
    setTab("ALL");
    setPage(1);
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
        <Tab
          value="ALL"
          label={t("page.profileUser.profileSection.orders.status.item1")}
        />
        <Tab
          value="PENDING_CONFIRMATION"
          label={t("page.profileUser.profileSection.orders.status.item2")}
        />
        <Tab
          value="CONFIRMED"
          label={t("page.profileUser.profileSection.orders.status.item3")}
        />
        <Tab
          value="SHIPPING"
          label={t("page.profileUser.profileSection.orders.status.item4")}
        />
        <Tab
          value="DELIVERED"
          label={t("page.profileUser.profileSection.orders.status.item5")}
        />
        <Tab
          value="CANCELED"
          label={t("page.profileUser.profileSection.orders.status.item6")}
        />
      </Tabs>

      {/* Danh sách hóa đơn */}
      <Box sx={{ maxHeight: "500px", overflowY: "auto", pr: 1 }}>
        {currentOrders.map((order) => (
          <Order
            key={order.orderId}
            orderId={order.orderId || ""}
            orderDateTime={order.orderDateTime}
            status={order.status}
            titleBook={order.titleBook}
            items={order.items}
            price={order.price}
            imgBook={order.img}
            feeShip={order.feeShip}
            nameUser={order.nameUser}
            phoneNumber={order.phoneNumber}
            address={order.address}
            paymentMethod={order.paymentMethod}
            shipmentMethod={order.shipmentMethod}
            note={order.note}
            img={order.img}
            refreshOrders={() => fetchOrders(page)}
            goToAllTab={handleGoToAllTab}
          />
        ))}
      </Box>

      <Pagination
        count={
          tab === "ALL"
            ? totalPages
            : Math.ceil(filteredOrders.length / itemsPerPage)
        }
        page={page + 1}
        onChange={(_event, value) => setPage(value - 1)}
        color="primary"
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </Paper>
  );
};

export default OrderList;
