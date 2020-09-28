import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';

// web components used in the view
import '@vaadin/vaadin-board/vaadin-board';
import '@vaadin/vaadin-charts/vaadin-chart';
import '@vaadin/vaadin-grid/theme/lumo/vaadin-grid';
import '@vaadin/vaadin-lumo-styles/all-imports';

// import the remote endpoint
import * as viewEndpoint from '../../generated/DashboardEndpoint';

// import types used in the endpoint
import ChartSeries from '../../generated/org/vaadin/artur/pushts/views/dashboard/ChartSeries';

// utilities to import style modules
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import styles from './dashboard-view.css';

@customElement('dashboard-view')
export class DashboardView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), CSSModule('lumo-badge'), unsafeCSS(styles)];
  }

  @property({ type: Number }) conversionRate = 18;

  @property({ type: Number }) currentUsers = 745;

  @property() numEvents = '54.6k';

  @query('#grid') private grid: any;

  @query('#statusColumn') private statusColumn: any;

  @query('#monthlyVisitors') private monthlyVisitors: any;

  @query('#responseTimes') private responseTimes: any;

  render() {
    return html`
      <vaadin-board>
        <vaadin-board-row>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge">Users</span>
              <h2 class="primary-text">${this.currentUsers}</h2>
              <span class="secondary-text">Current users in the app</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge success">Events</span>
              <h2 class="success-text">${this.numEvents}</h2>
              <span class="secondary-text">Events from the views</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="card space-m">
              <span theme="badge error">Conversion</span>
              <h2 class="error-text">${this.conversionRate}%</h2>
              <span class="secondary-text">User conversion rate</span>
            </div>
          </div>
        </vaadin-board-row>
        <div class="wrapper">
          <div class="card">
            <vaadin-chart
              type="column"
              id="monthlyVisitors"
              title="Monthly visitors per city"
              categories='["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]'
              additional-options='{"xAxis": {"crosshair": true}, "yAxis": {"min": 0}}'
            >
            </vaadin-chart>
          </div>
        </div>
        <vaadin-board-row>
          <div class="wrapper">
            <div class="card">
              <h3>Service health</h3>
              <vaadin-grid id="grid" theme="no-border">
                <vaadin-grid-column path="city" header="City"></vaadin-grid-column>
                <vaadin-grid-column id="statusColumn" header="Status"></vaadin-grid-column>
                <vaadin-grid-column path="itemDate" header="Date"></vaadin-grid-column>
              </vaadin-grid>
            </div>
          </div>
          <div class="wrapper">
            <div class="card">
              <vaadin-chart
                id="responseTimes"
                title="Response times"
                categories='["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]'
                additional-options='{"xAxis": {"crosshair": true}, "yAxis": {"min": 0}}'
              >
              </vaadin-chart>
            </div>
          </div>
        </vaadin-board-row>
      </vaadin-board>
    `;
  }

  // Wait until all elements in the template are ready to set their properties
  firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    // It is recomended to use renderers vs templates in grid
    this.statusColumn.renderer =
      // @ts-ignore
      (root, column, data) => {
        root.innerHTML = `<span theme="${data.item.theme}">${data.item.status}</span>`;
      };

    // Retrieve data from the server-side endpoint.
    viewEndpoint.healthGridItems().then((items) => {
      this.grid.items = items;
    });
    viewEndpoint.monthlyVisitorsSeries().then((series) => this.addSeries(this.monthlyVisitors, series));
    viewEndpoint.responseTimesSeries().then((series) => this.addSeries(this.responseTimes, series));
  }

  private addSeries(chart: any, series: ChartSeries[]) {
    series.forEach((data) => chart.configuration.addSeries(data));
  }
}
