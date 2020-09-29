// web components used in the view
import "@vaadin/vaadin-ordered-layout";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-lumo-styles/all-imports";
import {
  customElement,
  html,
  internalProperty,
  LitElement,
  property,
} from "lit-element";
import * as DashboardEndpoint from "../../generated/DashboardEndpoint";
import { Subscription } from "../../generated/connect-client.default";

@customElement("dashboard-view")
export class DashboardView extends LitElement {
  @internalProperty()
  data: any[] = [];

  @property({ type: Array })
  prices: string[] = [];

  subscriptions: Subscription[] = [];

  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <div>
          <h2>Stock prices</h2>
          ${this.prices.map((item) => html`<div>${item}</div>`)}
        </div>
        <vaadin-grid label="Health items" .items=${this.data}>
          <vaadin-grid-column path="itemDate"></vaadin-grid-column>
          <vaadin-grid-column path="city"></vaadin-grid-column>
          <vaadin-grid-column path="country"></vaadin-grid-column>
          <vaadin-grid-column path="status"></vaadin-grid-column>
          <vaadin-grid-column path="theme"></vaadin-grid-column>
        </vaadin-grid>
      </vaadin-horizontal-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.subscriptions.push(
      DashboardEndpoint.getItems((data) => {
        this.data = [data, ...this.data];
      })
    );

    this.subscriptions.push(
      DashboardEndpoint.getStockPrices((priceString) => {
        this.prices = [...this.prices, priceString];
      })
    );
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }
}
