package nlu.com.app.controller.admin;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import nlu.com.app.dto.AppResponse;
import nlu.com.app.dto.response.*;
import nlu.com.app.service.IChartService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/admin/api/chart")
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AdminChartController {
    IChartService chartService;

    @GetMapping("/monthly-sales")
    public AppResponse<SalesMonthlyReportResponseDTO> getMonthlyReport() {
        return AppResponse.<SalesMonthlyReportResponseDTO>builder()
                .result(chartService.getSalesMonthlyReport())
                .build();
    }

    @GetMapping("/recently-order")
    public AppResponse<RecentlyOrderResponseDTO> getRecentlyOrder() {
        return AppResponse.<RecentlyOrderResponseDTO>builder()
                .result(chartService.getRecentlyOrder())
                .build();
    }

    @GetMapping("/summary-dashboard")
    public AppResponse<SummaryDashboardResponseDTO> getSummaryDashboard() {
        return AppResponse.<SummaryDashboardResponseDTO>builder()
                .result(chartService.getSummaryDashboard())
                .build();
    }

    @GetMapping("/summary-about-customer")
    public AppResponse<UserDetailsSummaryChartDTO> getUserDetailsSummaryChart(@RequestParam Long userId) {
        return AppResponse.<UserDetailsSummaryChartDTO>builder()
                .result(chartService.getUserDetailsSummaryChart(userId))
                .build();
    }

    @GetMapping("/top-selling")
    public AppResponse<TopSellingProductDTO> getTopSellingProduct() {
        return AppResponse.<TopSellingProductDTO>builder()
                .result(chartService.getTopSellingProducts())
                .build();
    }
}
