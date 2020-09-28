// web components used in the view
import "@vaadin/vaadin-board/vaadin-board";
import "@vaadin/vaadin-charts/vaadin-chart";
import "@vaadin/vaadin-grid/theme/lumo/vaadin-grid";
import "@vaadin/vaadin-lumo-styles/all-imports";
import { customElement, html, LitElement, property } from "lit-element";
import * as DashboardEndpoint from "../../generated/DashboardEndpoint";

@customElement("dashboard-view")
export class DashboardView extends LitElement {
  @property({ type: Array })
  data: any[] = [];

  render() {
    return html` ${this.data.map((item) => html`<div>${item}</div>`)} `;
  }

  // Wait until all elements in the template are ready to set their properties
  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    DashboardEndpoint.getStockPrices().addEventListener("message", (e) => {
      this.data = [JSON.parse(e.data), ...this.data];
    });
  }

  // private addSeries(chart: any, series: ChartSeries[]) {
  //   series.forEach((data) => chart.configuration.addSeries(data));
  // }
}
