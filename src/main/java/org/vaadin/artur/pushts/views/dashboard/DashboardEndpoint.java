package org.vaadin.artur.pushts.views.dashboard;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

/**
 * The endpoint for the client-side Dashboard View.
 */
@Endpoint
@AnonymousAllowed
public class DashboardEndpoint {

  public List<HealthGridItem> healthGridItems() {
    return Arrays.asList(
      new HealthGridItem(LocalDate.of(2019, 1, 14), "M\u00FCnster", "Germany", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 2, 14), "Cluj-Napoca", "Romania", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 3, 14), "Ciudad Victoria", "Mexico", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 4, 14), "Ebetsu", "Japan", "Excellent", "badge success"),
      new HealthGridItem(LocalDate.of(2019, 5, 14), "S\u00E3o Bernardo do Campo", "Brazil", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 6, 14), "Maputo", "Mozambique", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 7, 14), "Warsaw", "Poland", "Good", "badge"),
      new HealthGridItem(LocalDate.of(2019, 8, 14), "Kasugai", "Japan", "Failing", "badge error"),
      new HealthGridItem(LocalDate.of(2019, 9, 14), "Lancaster", "United States", "Excellent", "badge success")
    );
  }

  public List<ChartSeries> responseTimesSeries() {
    return Arrays.asList(
      new ChartSeries("Tokyo", 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6),
      new ChartSeries("London", 3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8)
    );
  }

  public List<ChartSeries> monthlyVisitorsSeries() {
    return Arrays.asList(
      new ChartSeries("Tokyo", 49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,194.1, 95.6, 54.4),
      new ChartSeries("New York", 83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3),
      new ChartSeries("London", 48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2),
      new ChartSeries("Berlin", 42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1)
    );
  }
}
