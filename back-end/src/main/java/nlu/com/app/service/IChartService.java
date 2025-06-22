package nlu.com.app.service;

import nlu.com.app.dto.response.*;

import java.util.List;

/**
 * @author Nguyen Tuan
 */
public interface IChartService {
  SalesMonthlyReportResponseDTO getSalesMonthlyReport();
  RecentlyOrderResponseDTO getRecentlyOrder();
  SummaryDashboardResponseDTO getSummaryDashboard();
  UserDetailsSummaryChartDTO getUserDetailsSummaryChart(Long userId);

  TopSellingProductDTO getTopSellingProducts();
}
