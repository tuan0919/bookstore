package nlu.com.app.service.impl;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.constant.EOrderStatus;
import nlu.com.app.constant.UserRole;
import nlu.com.app.dto.response.RecentlyOrderResponseDTO;
import nlu.com.app.dto.response.SalesMonthlyReportResponseDTO;
import nlu.com.app.dto.response.SummaryDashboardResponseDTO;
import nlu.com.app.entity.Book;
import nlu.com.app.entity.Order;
import nlu.com.app.entity.OrderItem;
import nlu.com.app.entity.User;
import nlu.com.app.repository.BookRepository;
import nlu.com.app.repository.OrderRepository;
import nlu.com.app.repository.UserRepository;
import nlu.com.app.service.IChartService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChartService implements IChartService {
    OrderRepository orderRepository;
    UserRepository userRepository;
    BookRepository bookRepository;
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

        // 1. Profit
        List<Order> completedOrders = orderRepository.findByStatus(EOrderStatus.DELIVERED);

        long totalProfit = Math.round(completedOrders.stream()
                .mapToDouble(Order::getTotalAmount)
                .sum());

        long thisMonthProfit = Math.round(completedOrders.stream()
                .filter(o -> o.getOrderDate().getMonthValue() == month && o.getOrderDate().getYear() == year)
                .mapToDouble(Order::getTotalAmount)
                .sum());

        float profitDiffPercent = totalProfit == 0 ? 0f : ((float) thisMonthProfit / totalProfit) * 100;

        // 2. Customer
        List<User> customers = userRepository.findByRole(UserRole.CUSTOMER);

        long totalCustomer = customers.size();

        long thisMonthCustomer = customers.stream()
                .filter(u -> u.getCreated_date().getMonthValue() == month && u.getCreated_date().getYear() == year)
                .count();

        float customerDiffPercent = totalCustomer == 0 ? 0f : ((float) thisMonthCustomer / totalCustomer) * 100;

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
                .build();
    }
}
