/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, TemplateResult, css, PropertyValues, CSSResultGroup } from 'lit';
import { customElement, property, state } from 'lit/decorators';
import {
  HomeAssistant,
  hasConfigOrEntityChanged,
  hasAction,
  ActionHandlerEvent,
  handleAction,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types. https://github.com/custom-cards/custom-card-helpers

import type { UVIndexCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

import './editor';

/* eslint no-console: 0 */
console.info(
  `%c  UV-INDEX-CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'uv-index-card',
  name: 'UV Index Card',
  preview: true,
  description: 'A Lovelace card that shows a the UV index and risk level for Home Assistant',
});

// TODO Name your custom element
@customElement('uv-index-card')
export class UVIndexCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // await import('./editor');
    return document.createElement('uv-index-card-editor');
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit.dev/docs/components/properties/
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config!: UVIndexCardConfig;

  // https://lit.dev/docs/components/properties/#accessors-custom
  public setConfig(config: UVIndexCardConfig): void {
    // TODO Check for required fields and that they are of the proper format
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      name: 'UV Index',
      ...config,
    };
  }

  // https://lit.dev/docs/components/lifecycle/#reactive-update-cycle-performing
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    return hasConfigOrEntityChanged(this, changedProps, false);
  }

  // https://lit.dev/docs/components/rendering/
  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning', '', '', this.config.language));
    }

    if (this.config.show_error) {
      return this._showError(localize('common.show_error', '', '', this.config.language));
    }

    const entityId = this.config.entity;
    const entityState = entityId ? this.hass.states[entityId] : undefined;
    const stateValue:number = entityState ? parseFloat(entityState.state) : 0;

    let uvRiskStr = 'uv_levels.low'
    if (stateValue >= 3 && stateValue < 6) {
      uvRiskStr = 'uv_levels.moderate'
    }
    if (stateValue >= 6 && stateValue < 8) {
      uvRiskStr = 'uv_levels.high'
    }
    if (stateValue >= 8 && stateValue < 11) {
      uvRiskStr = 'uv_levels.very_high'
    }
    if (stateValue >= 11) {
      uvRiskStr = 'uv_levels.extreme'
    }
    const colours = {
      idle: '#EDEDED',
      low: 'green', // #5B9F49
      moderate: 'yellow', // #FFFF00
      high: 'orange', // #FFA500
      veryHigh: 'red', // #FF0000
      extreme: 'blueviolet' // #8A2BE2
    }

    return html`
      <ha-card
        .header=${this.config.name}
        @action=${this._handleAction}
        .actionHandler=${actionHandler({
          hasHold: hasAction(this.config.hold_action),
          hasDoubleClick: hasAction(this.config.double_tap_action),
        })}
        .label=${`UV Index: ${this.config.entity || 'No Entity Defined'}`}
      >
        <div style="display: flex;">
          <div style="width: 100%;">
            <svg width="100%" viewBox="0 0 660 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>UV</title>
              <g id="UV-Index-Triangle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <!-- First Segment (Fully Rounded Left Corners) -->
                <path d="M 10,10 H 45 V 40 H 10 Q 0,40 0,30 V 20 Q 0,10 10,10 Z" fill="${stateValue>=12? colours.extreme : colours.idle}"></path>

                <!-- Middle Segments -->
                <polygon points="50,10 95,10 95,40 50,40" fill="${stateValue>=11? colours.extreme : colours.idle}"></polygon>
                <polygon points="100,10 145,10 145,40 100,40" fill="${stateValue>=10? colours.veryHigh : colours.idle}"></polygon>
                <polygon points="150,10 195,10 195,40 150,40" fill="${stateValue>=9? colours.veryHigh : colours.idle}"></polygon>
                <polygon points="200,10 245,10 245,40 200,40" fill="${stateValue>=8? colours.veryHigh : colours.idle}"></polygon>
                <polygon points="250,10 295,10 295,40 250,40" fill="${stateValue>=7? colours.high : colours.idle}"></polygon>
                <polygon points="300,10 345,10 345,40 300,40" fill="${stateValue>=6? colours.high : colours.idle}"></polygon>
                <polygon points="350,10 395,10 395,40 350,40" fill="${stateValue>=5? colours.moderate : colours.idle}"></polygon>
                <polygon points="400,10 445,10 445,40 400,40" fill="${stateValue>=4? colours.moderate : colours.idle}"></polygon>
                <polygon points="450,10 495,10 495,40 450,40" fill="${stateValue>=3? colours.moderate : colours.idle}"></polygon>
                <polygon points="500,10 545,10 545,40 500,40" fill="${stateValue>=2? colours.low : colours.idle}"></polygon>
                <polygon points="550,10 595,10 595,40 550,40" fill="${stateValue>=1? colours.low : colours.idle}"></polygon>

                <!-- Last Segment (Fully Rounded Right Corners) -->
                <path d="M 600,10 H 640 Q 650,10 650,20 V 30 Q 650,40 640,40 H 600 V 10 Z" fill="${colours.low}"></path>
              </g>
            </svg>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _handleAction(ev: ActionHandlerEvent): void {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html` ${errorCard} `;
  }

  // https://lit.dev/docs/components/styles/
  static get styles(): CSSResultGroup {
    return css``;
  }
}
