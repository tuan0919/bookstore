package nlu.com.app.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.constant.UserRole;
import nlu.com.app.dto.response.*;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.OrderItem;
import nlu.com.app.entity.User;
import nlu.com.app.mapper.ChartMapper;
import nlu.com.app.repository.OrderItemRepository;
import nlu.com.app.repository.OrderRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.IChartService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChartService implements IChartService {
    OrderRepository orderRepository;
    UserRepository userRepository;
    ChartMapper chartMapper;
    OrderItemRepository orderItemRepository;
    @Override
    public SalesMonthlyReportResponseDTO getSalesMonthlyReport() {
        List<Order> completedOrders = orderRepository.findByStatus(EOrderStatus.DELIVERED);

        String[] months = {"Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"};
        double[] monthlyTotals = new double[12];

        for (Order order : completedOrders) {
            int monthIndex = order.getOrderDate().getMonthValue() - 1;
            monthlyTotals[monthIndex] += order.getTotalAmount();
        }

        List<SalesMonthlyReportResponseDTO.Sale> result = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            var s = SalesMonthlyReportResponseDTO.Sale.builder()
                    .name(months[i])
                    .total(Math.round(monthlyTotals[i] * 10) / 10.0)
                    .build();
            result.add(s);
        }
        return SalesMonthlyReportResponseDTO.builder()
                .sales(result)
                .build();
    }

    @Override
    public RecentlyOrderResponseDTO getRecentlyOrder() {
        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();
        int currentYear = now.getYear();

        // Lấy tổng số đơn hàng trong tháng hiện tại
        int totalOrdersInMonth = orderRepository.countByOrderDateMonthAndYear(currentMonth, currentYear);

        // Lấy 5 đơn hàng gần nhất có trạng thái "Hoàn thành"
        List<Order> recentOrders = orderRepository.findTop5ByStatusOrderByOrderDateDesc(EOrderStatus.DELIVERED);

        List<RecentlyOrderResponseDTO.Order> dtoOrders = new ArrayList<>();
        for (Order order : recentOrders) {
            User user = order.getUser();
            dtoOrders.add(RecentlyOrderResponseDTO.Order.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .totalAmount(Math.round(order.getTotalAmount())) // Làm tròn thành số nguyên
                    .build());
        }

        return RecentlyOrderResponseDTO.builder()
                .recentlyOrders(dtoOrders)
                .totalOrdersInMonth(totalOrdersInMonth)
                .build();
    }
    @Override
    public SummaryDashboardResponseDTO getSummaryDashboard() {
        LocalDate now = LocalDate.now();
        int month = now.getMonthValue();
        int year = now.getYear();

        // Tháng trước
        LocalDate prevMonthDate = now.minusMonths(1);
        int prevMonth = prevMonthDate.getMonthValue();
        int prevYear = prevMonthDate.getYear();

        // 1. Profit
        List<Order> completedOrders = orderRepository.findByStatus(EOrderStatus.DELIVERED);

        long totalProfit = Math.round(completedOrders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum());

        long thisMonthProfit = Math.round(completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == month && o.getOrderDate().getYear() == year)
                .mapToDouble(Order::getTotalAmount)
                .sum());

        long prevMonthProfit = Math.round(completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == prevMonth && o.getOrderDate().getYear() == prevYear)
                .mapToDouble(Order::getTotalAmount)
                .sum());

        float profitDiffPercent = prevMonthProfit == 0
                ? 0f
                : ((float) (thisMonthProfit - prevMonthProfit) / prevMonthProfit) * 100;

        // 2. Customer
        List<User> customers = userRepository.findByRole(UserRole.CUSTOMER);

        long totalCustomer = customers.size();

        long thisMonthCustomer = customers.stream()
                .filter(u -> u.getCreated_date().getMonthValue() == month && u.getCreated_date().getYear() == year)
                .count();

        long prevMonthCustomer = customers.stream()
                .filter(u -> u.getCreated_date().getMonthValue() == prevMonth && u.getCreated_date().getYear() == prevYear)
                .count();

        float customerDiffPercent = prevMonthCustomer == 0
                ? 0f
                : ((float) (thisMonthCustomer - prevMonthCustomer) / prevMonthCustomer) * 100;

        // 3. Most Sold Product in Month
        List<Order> completedOrdersThisMonth = completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == month && o.getOrderDate().getYear() == year)
                .toList();

        Map<Book, Integer> bookSoldMap = new HashMap<>();
        for (Order order : completedOrdersThisMonth) {
            for (OrderItem item : order.getOrderItems()) {
                Book book = item.getBook();
                bookSoldMap.put(book, bookSoldMap.getOrDefault(book, 0) + item.getQuantity());
            }
        }

        SummaryDashboardResponseDTO.Product mostSellProduct = null;
        if (!bookSoldMap.isEmpty()) {
            Map.Entry<Book, Integer> maxEntry = Collections.max(bookSoldMap.entrySet(), Map.Entry.comparingByValue());
            Book bestBook = maxEntry.getKey();
            mostSellProduct = SummaryDashboardResponseDTO.Product.builder()
                    .title(bestBook.getTitle())
                    .thumbnail(bestBook.getImages().isEmpty() ? null : bestBook.getImages().get(0).getImageUrl())
                    .soldAmount(maxEntry.getValue())
                    .build();
        }

        // 4. Order
        long totalOrder = completedOrders.size();

        long thisMonthOrder = completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == month && o.getOrderDate().getYear() == year)
                .count();

        long prevMonthOrder = completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == prevMonth && o.getOrderDate().getYear() == prevYear)
                .count();

        float orderDiffPercent = prevMonthOrder == 0
                ? 0f
                : ((float) (thisMonthOrder - prevMonthOrder) / prevMonthOrder) * 100;

        // Build response
        return SummaryDashboardResponseDTO.builder()
                .profit(SummaryDashboardResponseDTO.Profit.builder()
                        .total(totalProfit)
                        .thisMonth(thisMonthProfit)
                        .diffPercent(profitDiffPercent)
                        .build())
                .customer(SummaryDashboardResponseDTO.Customer.builder()
                        .total(totalCustomer)
                        .thisMonth(thisMonthCustomer)
                        .diffPercent(customerDiffPercent)
                        .build())
                .mostSellInMonth(mostSellProduct)
                .order(SummaryDashboardResponseDTO.Order.builder()
                        .total(totalOrder)
                        .thisMonth(thisMonthOrder)
                        .diffPercent(orderDiffPercent)
                        .build())
                .build();
    }

    @Override
    public UserDetailsSummaryChartDTO getUserDetailsSummaryChart(Long userId) {
        Integer totalOrders = orderRepository.countDeliveredOrdersByUserId(userId);
        Double totalPayAmounts = orderRepository.sumDeliveredTotalAmountByUserId(userId);

        List<Object[]> dbResults = orderRepository.sumDeliveredAmountGroupByMonth(userId);
        List<UserDetailsSummaryChartDTO.PayInMonth> frequency = buildFull12MonthFrequency(dbResults);

        return chartMapper.toDto(
                totalOrders,
                totalPayAmounts != null ? totalPayAmounts.intValue() : 0,
                frequency
        );
    }

    private List<UserDetailsSummaryChartDTO.PayInMonth> buildFull12MonthFrequency(List<Object[]> dbResults) {
        // Map dữ liệu DB: key = tháng (1-12), value = tổng tiền
        Map<Integer, Long> monthAmountMap = new HashMap<>();
        for (Object[] row : dbResults) {
            String monthStr = (String) row[0]; // ví dụ: "2025-04"
            int month = Integer.parseInt(monthStr.split("-")[1]); // lấy số tháng
            Long amount = row[1] == null ? 0L : ((Number) row[1]).longValue();
            monthAmountMap.put(month, amount);
        }

        List<UserDetailsSummaryChartDTO.PayInMonth> result = new ArrayList<>();
        for (int m = 1; m <= 12; m++) {
            String name = "th" + m;
            Long amount = monthAmountMap.getOrDefault(m, 0L);
            result.add(new UserDetailsSummaryChartDTO.PayInMonth(name, amount));
        }
        return result;
    }

    @Override
    public TopSellingProductDTO getTopSellingProducts() {
        List<Object[]> raw = orderItemRepository.findTopSellingBooks();

        List<TopSellingProductDTO.Element> elements = new ArrayList<>();
        int total = Math.min(raw.size(), 5);

        for (int i = 0; i < raw.size(); i++) {
            Object[] row = raw.get(i);
            Long bookId = (Long) row[0];
            String title = (String) row[1];
            String thumbnail = (String) row[2];
            Integer quantity = ((Number) row[3]).intValue();
            Long lastOrderId = (Long) row[4];
            LocalDate lastSellDate = (LocalDate) row[5];

            if (i < 4) {
                elements.add(
                        TopSellingProductDTO.Element.builder()
                                .top(i + 1)
                                .showName(title)
                                .product(
                                        TopSellingProductDTO.Element.ProductInfo.builder()
                                                .productId(bookId)
                                                .productName(title)
                                                .thumbnail(thumbnail)
                                                .lastOrderId(lastOrderId)
                                                .quantity(quantity)
                                                .lastSellDate(lastSellDate.format(DateTimeFormatter.ofPattern("dd-MM-YYYY")))
                                                .build()
                                )
                                .build()
                );
            }
            // "Others" xử lý như trước, không cần lastOrderId/lastSellDate
        }

        if (raw.size() > 4) {
            elements.add(
                    TopSellingProductDTO.Element.builder()
                            .top(5)
                            .showName("Còn lại")
                            .product(null)
                            .build()
            );
            total = 5;
        }

        return TopSellingProductDTO.builder()
                .totalElements(total)
                .elements(elements)
                .build();
    }
}
