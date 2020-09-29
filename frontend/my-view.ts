import "@vaadin/vaadin-ordered-layout";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-lumo-styles/all-imports";
import { customElement, html, internalProperty, LitElement } from "lit-element";
import * as MyEndpoint from "./generated/MyEndpoint";
import { Subscription } from "./generated/connect-client.default";
import "@vaadin/vaadin-lumo-styles/badge";
import { CSSModule } from "@vaadin/flow-frontend/css-utils";
import HealthGridItem from "./generated/org/vaadin/artur/pushts/HealthGridItem";
import { renderer } from "./renderer";
@customElement("my-view")
export class MyView extends LitElement {
  @internalProperty()
  data: HealthGridItem[] = [];

  @internalProperty()
  applPrices: string[] = [];
  @internalProperty()
  msftPrices: string[] = [];

  subscriptions: Subscription[] = [];

  static get styles() {
    return [CSSModule("lumo-badge")];
  }
  render() {
    return html`
      <vaadin-horizontal-layout theme="spacing">
        <div>
          <h2>Stock prices (AAPL)</h2>
          ${this.applPrices.map((item) => html`<div>${item}</div>`)}
        </div>
        <div>
          <h2>Stock prices (MSFT)</h2>
          ${this.msftPrices.map((item) => html`<div>${item}</div>`)}
        </div>
        <vaadin-grid label="Health items" .items=${this.data}>
          <vaadin-grid-column path="itemDate"></vaadin-grid-column>
          <vaadin-grid-column path="city"></vaadin-grid-column>
          <vaadin-grid-column path="country"></vaadin-grid-column>
          <vaadin-grid-column
            header="Status"
            .renderer="${renderer(
              (item: HealthGridItem) =>
                html`<span theme="badge ${item.theme}">${item.status}</span> `
            )}"
          >
          </vaadin-grid-column>
        </vaadin-grid>
      </vaadin-horizontal-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.subscriptions.push(
      MyEndpoint.getItems((data) => {
        this.data = [data, ...this.data];
      })
    );

    this.subscriptions.push(
      MyEndpoint.getStockPrices("AAPL", (priceString) => {
        this.applPrices = [...this.applPrices, priceString];
      })
    );
    this.subscriptions.push(
      MyEndpoint.getStockPrices("MSFT", (priceString) => {
        this.msftPrices = [...this.msftPrices, priceString];
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
