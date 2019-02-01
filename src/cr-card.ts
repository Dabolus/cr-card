interface FontFaceSet {
  readonly status: 'loading' | 'loaded';
  readonly ready: Promise<void>;
  load(font: string, text?: string): Promise<void>;
}

interface DocumentWithFonts extends Document {
  fonts: FontFaceSet;
}

declare var document: DocumentWithFonts;

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
}
export enum CRCardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}
export enum CRCardType {
  TROOP = 'troop',
  BUILDING = 'building',
  SPELL = 'spell',
}
export type CRCardLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type CRCardCost = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type CRCardObservedAttribute = 'language'
  | 'name'
  | 'rarity'
  | 'level'
  | 'type'
  | 'cost'
  | 'description'
  | 'image'
  | 'stretch';
export interface CRCardLocaleTranslation {
  name: (cardName: string, level: number) => string;
  rarity: {
    label: string;
    common: string;
    rare: string;
    epic: string;
    legendary: string;
  };
  type: {
    label: string;
    troop: string;
    building: string;
    spell: string;
  };
}

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

  /**
   * The assets base path. It is used to load all the assets needed
   * by the card (icons, shapes, etc.). For example, if you copy the content
   * of the `assets` directory into a `static` directory in the root of your
   * web server, you have to set the assets base path to `/static/` or to
   * `<your-website-url>/static/`.
   *
   * @return {string}
   */
  public get assetsPath(): string {
    return this.getAttribute('assets-path');
  }

  public set assetsPath(val: string) {
    this.setAttribute('assets-path', val);
  }

  public static readonly observedAttributes: CRCardObservedAttribute[] = [
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
  private static readonly _neededFonts = ['Supercell Magic', 'SC CCBackBeat'];
  private static readonly _neededAssets = [''];

  private static readonly _translations: { [key: string]: CRCardLocaleTranslation } = {
    en: {
      name: (cardName, level) => `Level ${level} ${cardName}`,
      rarity: {
        label: 'Rarity:',
        common: 'Common',
        rare: 'Rare',
        epic: 'Epic',
        legendary: 'Legendary'
      },
      type: {
        label: 'Type:',
        troop: 'Troop',
        building: 'Building',
        spell: 'Spell',
      },
    },
    ja: {
      name: (cardName, level) => `レベル${level} ${cardName}`,
      rarity: {
        label: 'レア度：',
        common: 'ノーマル',
        rare: 'レア',
        epic: 'スーパーレア',
        legendary: 'ウルトラレア',
      },
      type: {
        label: 'タイプ：',
        troop: 'ユニット',
        building: '建物',
        spell: '呪文',
      },
    },
    fr: {
      name: (cardName, level) => `${cardName} de niveau ${level}`,
      rarity: {
        label: 'Rareté :',
        common: 'Commune',
        rare: 'Rare',
        epic: 'Épique',
        legendary: 'Légendaire',
      },
      type: {
        label: 'Type :',
        troop: 'Combattant',
        building: 'Bâtiment',
        spell: 'Sort',
      },
    },
    de: {
      name: (cardName, level) => `${cardName} Level ${level}`,
      rarity: {
        label: 'Seltenheit',
        common: 'Gewöhnlich',
        rare: 'Selten',
        epic: 'Episch',
        legendary: 'Legendär',
      },
      type: {
        label: 'Typ',
        troop: 'Einheit',
        building: 'Gebäude',
        spell: 'Zauber',
      },
    },
    es: {
      name: (cardName, level) => `${cardName} (nivel ${level})`,
      rarity: {
        label: 'Calidad:',
        common: 'Común',
        rare: 'Especial',
        epic: 'Épica',
        legendary: 'Legendaria',
      },
      type: {
        label: 'Tipo',
        troop: 'Tropa',
        building: 'Estructura',
        spell: 'Hechizo',
      },
    },
    it: {
      name: (cardName, level) => `${cardName} livello ${level}`,
      rarity: {
        label: 'Rarità:',
        common: 'Comune',
        rare: 'Rara',
        epic: 'Epica',
        legendary: 'Leggendaria',
      },
      type: {
        label: 'Tipo:',
        troop: 'Truppa',
        building: 'Edificio',
        spell: 'Incantesimo',
      },
    },
    nl: {
      name: (cardName, level) => `Level ${level} ${cardName}`,
      rarity: {
        label: 'Zeldzaamheid:',
        common: 'Gewoon',
        rare: 'Zeldzaam',
        epic: 'Episch',
        legendary: 'Legendarisch',
      },
      type: {
        label: 'Type:',
        troop: 'Eenheid',
        building: 'Gebouw',
        spell: 'Spreuk',
      },
    },
    no: {
      name: (cardName, level) => `${cardName} på nivå ${level}`,
      rarity: {
        label: 'Forekomst:',
        common: 'Vanlig',
        rare: 'Sjeldent',
        epic: 'Episk',
        legendary: 'Legendarisk',
      },
      type: {
        label: 'Type:',
        troop: 'Tropp',
        building: 'Bygning',
        spell: 'Formel',
      },
    },
    pt: {
      name: (cardName, level) => `${cardName} Nível ${level}`,
      rarity: {
        label: 'Raridade:',
        common: 'Comum',
        rare: 'Rara',
        epic: 'Épica',
        legendary: 'Lendária',
      },
      type: {
        label: 'Tipo:',
        troop: 'Tropa',
        building: 'Construção',
        spell: 'Feitiço',
      },
    },
    tr: {
      name: (cardName, level) => `${level}. Seviye ${cardName}`,
      rarity: {
        label: 'Enderlik:',
        common: 'Sıradan',
        rare: 'Ender',
        epic: 'Destansı',
        legendary: 'Efsanevi',
      },
      type: {
        label: 'Tür:',
        troop: 'Birlik',
        building: 'Bina',
        spell: 'Büyü',
      },
    },
    ru: {
      name: (cardName, level) => `${cardName} ${level}-го уровеня`,
      rarity: {
        label: 'Редкость:',
        common: 'Обычная',
        rare: 'Редкая',
        epic: 'Эпическая',
        legendary: 'Легендарная',
      },
      type: {
        label: 'Тип:',
        troop: 'Войско',
        building: 'Здание',
        spell: 'Заклинание',
      },
    },
  };
  private ready: Promise<any> = Promise.all([
    document.fonts.load('Supercell Magic'),
  ]);

  private _canvasRef: HTMLCanvasElement;
  private _slotRef: HTMLSlotElement;
  private _ctx: CanvasRenderingContext2D;

  private readonly _template: HTMLTemplateElement;

  constructor() {
    super();

    this._template = document.createElement('template');
    this._template.innerHTML = `<!-- html -->
      <style>
        :host { display: inline-block; }
        canvas { width: 100%; height: auto; }
      </style>
      <canvas width="1432" height="1794"></canvas>
      <slot></slot>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }

  /**
   * Draws the card in the internal canvas.
   *
   * This method is called automatically when a property of the card changes,
   * but you can also call it yourself to force the update of the canvas.
   */
  public async draw() {
    await this.ready;
    // Draw the background and save the context
    this._ctx.translate(0, 0);
    this._ctx.drawImage(this._bg, 0, 0, 1432, 1794);
    this._ctx.save();

    // Draw the card name
    this._ctx.save();
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'hanging';
    this._ctx.lineWidth = 6;
    this._ctx.fillStyle = 'white';
    this._ctx.strokeStyle = 'black';
    this._ctx.shadowOffsetY = 5;
    this._ctx.shadowColor = 'black';
    const cardName = CRCard._translations[this.language].name(this.name, this.level);
    this._fitFontSize(cardName, 'Supercell Magic', 1120, 70, 1);
    this._ctx.strokeText(cardName, 716, 50);
    this._ctx.fillText(cardName, 716, 50);
    this._ctx.restore();

    // Draw the image (if possible)
    this._ctx.save();
    this._ctx.translate(88, 215);
    this._ctx.save();
    this._ctx.beginPath();
    // First of all, let's create the clip for the image based on the card rarity
    if (this.rarity === 'legendary') {
      this._ctx.moveTo(211, 17);
      this._ctx.lineTo(385, 81);
      this._ctx.lineTo(385, 445);
      this._ctx.lineTo(211, 510);
      this._ctx.lineTo(35, 445);
      this._ctx.lineTo(35, 81);
      this._ctx.clip();
    } else {
      this._ctx.moveTo(52, 34);
      this._ctx.lineTo(371, 34);
      this._ctx.quadraticCurveTo(397, 34, 397, 60);
      this._ctx.lineTo(397, 469);
      this._ctx.quadraticCurveTo(397, 495, 371, 495);
      this._ctx.lineTo(52, 495);
      this._ctx.quadraticCurveTo(26, 495, 26, 469);
      this._ctx.lineTo(26, 60);
      this._ctx.clip();
    }
    // Draw the image white background
    this._ctx.fillStyle = 'white';
    this._ctx.fillRect(32, 34, 360, 460);
    // Now we can finally draw the image
    if (this._image && this._image.src && this._image.complete) {
      if (this.stretchImage) {
        this._ctx.drawImage(this._image, 32, 34, 360, 460);
      }
      else {
        const ratio = Math.min(360 / this._image.width, 460 / this._image.height);
        this._ctx.drawImage(
          this._image,
          32 + (180 - (this._image.width * ratio / 2)),
          34 + (230 - (this._image.height * ratio / 2)),
          this._image.width * ratio,
          this._image.height * ratio
        );
      }
    }
    this._ctx.restore();
    // Draw the contour of the image
    const contour = this._shapes[this._rarities[this.rarity].shape];
    if (this.rarity === 'legendary') {
      this._ctx.drawImage(contour, 18, 0, 386, 529);
    } // 368x529
    else {
      this._ctx.drawImage(contour, 18, 27, 385, 477);
    } // 367x450

    // Draw the elixir cost
    // Let's draw the elixir drop...
    this._ctx.drawImage(this._elixir, 0, 15, 105, 125);
    // ...and then the elixir cost
    this._ctx.font = '70px "Supercell Magic"';
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'middle';
    this._ctx.lineWidth = 6;
    this._ctx.fillStyle = '#FFE9FF';
    this._ctx.strokeStyle = '#760088';
    this._ctx.shadowOffsetY = 5;
    this._ctx.shadowColor = '#760088';
    this._ctx.strokeText(this.elixirCost, 52, 77);
    this._ctx.fillText(this.elixirCost, 52, 77);
    this._ctx.restore();

    // Draw rarity and type
    // First of all, draw the little box based on the card rarity
    this._ctx.save();
    this._ctx.translate(558, 207);
    this._ctx.fillStyle = this._rarities[this.rarity].color;
    this._ctx.beginPath();
    this._ctx.moveTo(15, 0);
    this._ctx.lineTo(758, 0);
    this._ctx.quadraticCurveTo(773, 0, 773, 15);
    this._ctx.lineTo(773, 127);
    this._ctx.quadraticCurveTo(773, 157, 758, 157);
    this._ctx.lineTo(15, 157);
    this._ctx.quadraticCurveTo(0, 157, 0, 142);
    this._ctx.lineTo(0, 15);
    this._ctx.quadraticCurveTo(0, 0, 15, 0);
    this._ctx.fill();
    // Ok, now we can draw the text
    this._ctx.fillStyle = 'white';
    this._ctx.textBaseline = 'hanging';
    // First of all, draw the labels
    this._fitFontSize(
      CRCard._translations[this.language].rarity.label,
      'Supercell Magic',
      330,
      48,
      1
    );
    this._ctx.fillText(CRCard._translations[this.language].rarity.label, 17, 23);
    this._fitFontSize(
      CRCard._translations[this.language].type.label,
      'Supercell Magic',
      330,
      48,
      1
    );
    this._ctx.fillText(CRCard._translations[this.language].type.label, 392, 23);
    // Then the type
    this._ctx.lineWidth = 5;
    this._ctx.strokeStyle = 'black';
    this._ctx.fillStyle = 'white';
    this._ctx.shadowOffsetY = 5;
    this._ctx.shadowColor = 'black';
    this._fitFontSize(
      CRCard._translations[this.language].type[this.type],
      'Supercell Magic',
      330,
      54,
      1
    );
    this._ctx.strokeText(CRCard._translations[this.language].type[this.type], 394, 88);
    this._ctx.fillText(CRCard._translations[this.language].type[this.type], 394, 88);
    // And finally the rarity
    if (this.rarity === 'legendary') {
      const randStartIndex = Math.floor(Math.random() * 5);

      const gradient = this._ctx.createLinearGradient(0, 0, 380, 0);
      gradient.addColorStop(0, CrCard.LEGENDARY_GRADIENT[randStartIndex]);
      gradient.addColorStop(0.5, CrCard.LEGENDARY_GRADIENT[(randStartIndex + 1) % 5]);
      gradient.addColorStop(1, CrCard.LEGENDARY_GRADIENT[(randStartIndex + 2) % 5]);
      this._ctx.fillStyle = gradient;
    }
    this._fitFontSize(
      CRCard._translations[this.language].rarity[this.rarity],
      'Supercell Magic',
      330,
      54,
      1
    );
    this._ctx.strokeText(CRCard._translations[this.language].rarity[this.rarity], 18, 88);
    this._ctx.fillText(CRCard._translations[this.language].rarity[this.rarity], 18, 88);
    this._ctx.restore();

    // Draw the description
    // DESCRIPTION
    this._ctx.save();
    this._ctx.font = '42px "SC CCBackBeat"';
    // Alignment
    this._ctx.textAlign = 'center';
    this._ctx.textBaseline = 'top';
    this._ctx.fillStyle = '#333';

    this._wrapText(this.description, 940, 440, 702, 54);
    this._ctx.restore();

    const properties = this
      ._slotRef
      .assignedNodes({ flatten: true })
      .filter((n) => n.nodeType === Node.ELEMENT_NODE && n.nodeName === 'CR-CARD-PROPERTY');
    // Draw the properties
    for (let i = properties.length - 1; i >= 0; i--) {
      this._ctx.save();
      const rowIndex = Math.floor(i / 2);
      this._drawProperty(
        properties[i],
        (rowIndex % 2) === 0,
        ((i % 2) === 0) ? 133 : 721,
        (rowIndex * 120) + 889
      );
      this._ctx.restore();
    }
  }

  public _wrapText(text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
    const blocks = text.split('\n');
    for (const block of blocks) {
      const words = block.split(' ');
      let line = '';
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = this._ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this._ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      this._ctx.fillText(line, x, y);
      y += lineHeight;
    }
  }

  public _fitFontSize(text: string, fontFamily: string, maxWidth: number, startSize: number, minSize: number) {
    let fontSize = startSize;
    this._ctx.font = `${fontSize}px "${fontFamily}"`;
    while ((fontSize > minSize) && (this._ctx.measureText(text).width > maxWidth)) {
      fontSize--;
      this._ctx.font = `${fontSize}px "${fontFamily}"`;
    }
    return fontSize;
  }

  public _drawProperty(property, darkBackground: boolean, x: number, y: number) {
    this._ctx.translate(x, y);
    // Background
    this._ctx.save();
    this._ctx.fillStyle = darkBackground ? '#C2D3DB' : '#FDFEFE';
    this._ctx.beginPath();
    this._ctx.rect(0, 0, 567, 110);
    this._ctx.fill();
    this._ctx.restore();
    // Title
    this._ctx.save();
    this._ctx.textAlign = 'left';
    this._ctx.textBaseline = 'hanging';
    this._ctx.fillStyle = '#333';
    this._fitFontSize(property.title, 'Supercell Magic', 440, 40, 1);
    this._ctx.fillText(property.title, 109, 16);
    this._ctx.fillStyle = 'white';
    this._ctx.strokeStyle = 'black';
    this._ctx.shadowColor = 'black';
    this._ctx.lineWidth = 4;
    this._ctx.shadowOffsetY = 4;
    this._fitFontSize(property.value, 'Supercell Magic', 440, 48, 1);
    this._ctx.strokeText(property.value, 109, 57);
    this._ctx.fillText(property.value, 109, 57);
    this._ctx.restore();
    // Info button
    if (property.showInfoButton) {
      this._ctx.drawImage(this._info, 485, 18, 65, 67);
    }
    // Icon background
    if (property.showIconBackground) {
      this._ctx.save();
      this._ctx.fillStyle = '#575E62';
      this._ctx.beginPath();
      this._ctx.moveTo(13, 8);
      this._ctx.lineTo(96, 8);
      this._ctx.quadraticCurveTo(102, 8, 102, 14);
      this._ctx.lineTo(102, 97);
      this._ctx.quadraticCurveTo(102, 103, 96, 103);
      this._ctx.lineTo(13, 103);
      this._ctx.quadraticCurveTo(7, 103, 7, 97);
      this._ctx.lineTo(7, 14);
      this._ctx.quadraticCurveTo(7, 8, 13, 8);
      this._ctx.fill();
      this._ctx.restore();
    }
    // Icon
    if (property.icon in this._icons) {
      this._ctx.drawImage(this._icons[property.icon], 2, 3, 105, 105);
    }
  }

  /** @private */
  private connectedCallback() {
    this._canvasRef = this.shadowRoot.querySelector<HTMLCanvasElement>('canvas');
    this._slotRef = this.shadowRoot.querySelector<HTMLSlotElement>('slot');
    this._ctx = this._canvasRef.getContext('2d');
    this._slotRef.addEventListener('slotchange', console.log);
  }

  /** @private */
  private attributeChangedCallback(name: CRCardObservedAttribute, oldValue: string, newValue: string) {
    if (oldValue === newValue) {
      return;
    }
    this.draw();
  }
}

window.customElements.define('cr-card', CRCard);
