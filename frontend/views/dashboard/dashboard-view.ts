// web components used in the view
import "@vaadin/vaadin-ordered-layout";
import "@vaadin/vaadin-lumo-styles/all-imports";
import { customElement, html, LitElement, property } from "lit-element";
import * as DashboardEndpoint from "../../generated/DashboardEndpoint";

@customElement("dashboard-view")
export class DashboardView extends LitElement {
  @property({ type: Array })
  data: any[] = [];

  @property({ type: Array })
  prices: string[] = [];
  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <div>
          <h2>Stock prices</h2>
          ${this.prices.map((item) => html`<div>${item}</div>`)}
        </div>
        <div>
          <h2>Health items</h2>
          <p>${this.data.map((item) => html`<div>${item}</div>`)}</p>
        </div>
      </vaadin-horizontal-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    DashboardEndpoint.getItems((data) => {
      this.data = [data, ...this.data];
    });

    DashboardEndpoint.getStockPrices((priceString) => {
      this.prices = [...this.prices, priceString];
    });
  }
}
