package org.vaadin.artur.pushts.views.dashboard;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import reactor.core.publisher.Flux;

/**
 * The endpoint for the client-side Dashboard View.
 */
@Endpoint
@AnonymousAllowed
public class DashboardEndpoint {

  public List<HealthGridItem> healthGridItems() {
    return Arrays.asList(new HealthGridItem(LocalDate.of(2019, 1, 14), "M\u00FCnster", "Germany", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 2, 14), "Cluj-Napoca", "Romania", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 3, 14), "Ciudad Victoria", "Mexico", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 4, 14), "Ebetsu", "Japan", "Excellent", "badge success"),
        new HealthGridItem(LocalDate.of(2019, 5, 14), "S\u00E3o Bernardo do Campo", "Brazil", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 6, 14), "Maputo", "Mozambique", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 7, 14), "Warsaw", "Poland", "Good", "badge"),
        new HealthGridItem(LocalDate.of(2019, 8, 14), "Kasugai", "Japan", "Failing", "badge error"),
        new HealthGridItem(LocalDate.of(2019, 9, 14), "Lancaster", "United States", "Excellent", "badge success"));
  }

  public Flux<String> getStockPrices() {
    Random random = new Random();
    return Flux.<String>generate(sink -> {
      sink.next(BigDecimal.valueOf(random.nextInt(10000), 2).toString());
    }).delayElements(Duration.ofMillis(500)).take(30);
  }

}
