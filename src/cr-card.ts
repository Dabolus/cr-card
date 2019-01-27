export enum CRCardLanguage {
  EN = 'en',
  JA = 'ja',
  FR = 'fr',
  DE = 'de',
  ES = 'es',
  IT = 'it',
  NL = 'nl',
  NO = 'no',
  PT = 'pt',
  TR = 'tr',
  RU = 'ru',
};
export enum CRCardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
};
export enum CRCardType {
  TROOP = 'troop',
  BUILDING = 'building',
  SPELL = 'spell',
};
export type CRCardLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type CRCardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * `cr-card`
 * A custom element that automatically generates a Clash Royale card inside a canvas.
 *
 * Basic example:
 *
 * ```html
 * <cr-card
 *     card-name="Simple CR Card Demo"
 *     description="This really basic demo shows how easy it is to generate a Clash Royale card using Web Components.">
 *     <cr-card-property title="HP" value="100" icon="hp"></cr-card-property>
 * </cr-card>
 * ```
 *
 * View the element demo for a more advanced example.
 *
 * @customElement
 * @demo demo/index.html
 */
export class CRCard extends HTMLElement {
  public static readonly observedAttributes: string[] = [
    'language',
    'name',
    'rarity',
    'level',
    'type',
    'cost',
    'description',
    'image',
    'stretch',
  ];

  public static readonly supportedLanguages: CRCardLanguage[] = [
    CRCardLanguage.EN,
    CRCardLanguage.JA,
    CRCardLanguage.FR,
    CRCardLanguage.DE,
    CRCardLanguage.ES,
    CRCardLanguage.IT,
    CRCardLanguage.NL,
    CRCardLanguage.NO,
    CRCardLanguage.PT,
    CRCardLanguage.TR,
    CRCardLanguage.RU,
  ];

  /**
   * The language of the generated card.
   *
   * Supported languages:
   * - en (English)
   * - ja (Japanese)
   * - fr (French)
   * - de (German)
   * - es (Spanish)
   * - it (Italian)
   * - nl (Dutch)
   * - no (Norwegian)
   * - pt (Portuguese)
   * - tr (Turkish)
   * - ru (Russian)
   *
   * @return {string}
   */
  public get language(): CRCardLanguage {
    return this.getAttribute('language') as CRCardLanguage;
  }

  public set language(val: CRCardLanguage) {
    this.setAttribute('language', val);
  }

  /**
   * The name of the card.
   *
   * @return {string}
   */
  public get name(): string {
    return this.getAttribute('name');
  }

  public set name(val: string) {
    this.setAttribute('name', val);
  }

  /**
   * The rarity of the card.
   *
   * Available rarities:
   * - common
   * - rare
   * - epic
   * - legendary
   *
   * @return {string}
   */
  public get rarity(): CRCardRarity {
    return this.getAttribute('rarity') as CRCardRarity;
  }

  public set rarity(val: CRCardRarity) {
    this.setAttribute('rarity', val);
  }

  /**
   * The level of the card.
   *
   * @return {number}
   */
  public get level(): CRCardLevel {
    return parseInt(this.getAttribute('level'), 10) as CRCardLevel;
  }

  public set level(val: CRCardLevel) {
    this.setAttribute('level', val.toString());
  }

  /**
   * The type of the card.
   *
   * Available types:
   * - troop
   * - building
   * - spell
   *
   * @return {string}
   */
  public get type(): CRCardType {
    return this.getAttribute('type') as CRCardType;
  }

  public set type(val: CRCardType) {
    this.setAttribute('type', val);
  }

  /**
   * The cost of the card.
   *
   * @return {number}
   */
  public get cost(): CRCardCost {
    return parseInt(this.getAttribute('cost'), 10) as CRCardCost;
  }

  public set cost(val: CRCardCost) {
    this.setAttribute('cost', val.toString());
  }

  /**
   * The description of the card.
   *
   * @return {string}
   */
  public get description(): string {
    return this.getAttribute('description');
  }

  public set description(val: string) {
    this.setAttribute('description', val);
  }

  /**
   * The image URL of the card.
   * It can also be a valid data URL (e.g. a base64 encoded image).
   *
   * @return {string}
   */
  public get image(): string {
    return this.getAttribute('image');
  }

  public set image(val: string) {
    this.setAttribute('image', val);
  }

  /**
   * If true, the card image will be stretched in the frame instead of being centered.
   *
   * @return {boolean}
   */
  public get stretchImage(): boolean {
    return this.hasAttribute('stretch-image');
  }

  public set stretchImage(val: boolean) {
    if (val) {
      this.setAttribute('stretch-image', '');
    } else {
      this.removeAttribute('stretch-image');
    }
  }

  private readonly _template: HTMLTemplateElement;

  constructor() {
    super();

    this._template = document.createElement('template');
    this._template.innerHTML = `
      <style>
        :host { display: inline-block; }
        #card { width: 100%; height: auto; }
      </style>
      <canvas id="card" width="1432" height="1794"></canvas>
      <slot id="slot"></slot>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }
}

window.customElements.define('cr-card', CRCard);
