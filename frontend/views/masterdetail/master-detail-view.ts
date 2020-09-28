import { customElement, html, LitElement, query, unsafeCSS, property } from 'lit-element';

import { showNotification } from '@vaadin/flow-frontend/a-notification';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-form-layout/vaadin-form-item';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-column';
import '@vaadin/vaadin-notification/vaadin-notification';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field/vaadin-text-field';

import { EndpointError } from '@vaadin/flow-frontend/Connect';

// import the remote endpoint
import * as PersonEndpoint from '../../generated/PersonEndpoint';

// import types used in the endpoint
import Person from '../../generated/org/vaadin/artur/pushts/data/entity/Person';

// utilities to import style modules
import { CSSModule } from '@vaadin/flow-frontend/css-utils';

import styles from './master-detail-view.css';
import { Binder, field } from '@vaadin/form';
import PersonModel from '../../generated/org/vaadin/artur/pushts/data/entity/PersonModel';

@customElement('master-detail-view')
export class MasterDetailViewElement extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid: any;

  @property({ type: Number })
  private gridSize: number = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder(this, PersonModel);

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${this.gridSize}"
            .dataProvider="${this.gridDataProvider}"
          >
            <vaadin-grid-column path="firstName" header="First Name"></vaadin-grid-column>
            <vaadin-grid-column path="lastName" header="Last Name"></vaadin-grid-column>
            <vaadin-grid-column path="email" header="Email"></vaadin-grid-column>
          </vaadin-grid>
        </div>

        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout>
              <vaadin-form-item>
                <label slot="label">First Name</label>
                <vaadin-text-field
                  class="full-width"
                  id="firstName"
                  ...="${field(this.binder.model.firstName)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Last Name</label>
                <vaadin-text-field
                  class="full-width"
                  id="lastName"
                  ...="${field(this.binder.model.lastName)}"
                ></vaadin-text-field>
              </vaadin-form-item>
              <vaadin-form-item>
                <label slot="label">Email</label>
                <vaadin-text-field
                  class="full-width"
                  id="email"
                  ...="${field(this.binder.model.email)}"
                ></vaadin-text-field>
              </vaadin-form-item>
            </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="primary" @click="${this.save}">
              Save
            </vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.clearForm}">
              Cancel
            </vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
      <vaadin-notification
        duration="5000"
        id="notification"
      >
      </vaadin-notification>
    `;
  }

  async getGridDataSize() {
    return await PersonEndpoint.count();
  }
  async getGridData(params: any, callback: any) {
    const index = params.page * params.pageSize;
    const data = await PersonEndpoint.list(index, params.pageSize);
    callback(data);
  }

  // Wait until all elements in the template are ready to set their properties
  async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);

    this.gridSize = await this.getGridDataSize();
    this.grid.addEventListener('active-item-changed', async (event: CustomEvent) => {
      const item: Person = event.detail.value as Person;
      this.grid.selectedItems = item ? [item] : [];

      if (item) {
        const personFromBackend = await PersonEndpoint.get(item.id);
        personFromBackend ? this.binder.read(personFromBackend) : this.refreshGrid();
      } else {
        this.clearForm();
      }

    });
  }

  private async save() {
    try {
      await this.binder.submitTo(PersonEndpoint.update);
      this.clearForm();
      this.refreshGrid();
      showNotification('Person details stored.', {position: 'bottom-start'});
    } catch (error) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, {position: 'bottom-start'});
      } else {
        throw error;
      }
    }
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid(){
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
