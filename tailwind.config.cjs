// Design tokens exportados do Stitch.
module.exports = {
  "darkMode": "class",
  "theme": {
    "extend": {
      "colors": {
        "surface-container-highest": "#2d363d",
        "inverse-on-surface": "#283139",
        "outline": "#a28d7a",
        "outline-variant": "#544434",
        "surface-container-high": "#222b32",
        "on-surface": "#dae4ed",
        "error": "#ffb4ab",
        "on-surface-variant": "#dac2ae",
        "on-secondary-fixed": "#151c22",
        "secondary": "#c0c7ce",
        "secondary-fixed": "#dce3eb",
        "primary-fixed": "#ffdcbd",
        "on-error-container": "#ffdad6",
        "tertiary": "#c6c6c7",
        "on-primary-fixed-variant": "#693c00",
        "surface-variant": "#2d363d",
        "tertiary-fixed-dim": "#c6c6c7",
        "on-tertiary-fixed-variant": "#454747",
        "primary-container": "#f39200",
        "background": "#0b141b",
        "on-tertiary-fixed": "#1a1c1c",
        "tertiary-container": "#a8a9a9",
        "on-secondary": "#2a3137",
        "on-secondary-container": "#afb6bd",
        "on-error": "#690005",
        "surface-bright": "#313a42",
        "inverse-primary": "#8a5100",
        "on-tertiary-container": "#3c3e3e",
        "secondary-fixed-dim": "#c0c7ce",
        "on-primary": "#492900",
        "surface-container-low": "#141d24",
        "surface-tint": "#ffb86e",
        "on-tertiary": "#2f3131",
        "tertiary-fixed": "#e2e2e2",
        "surface-container": "#182128",
        "on-primary-fixed": "#2c1600",
        "on-background": "#dae4ed",
        "on-primary-container": "#5c3400",
        "surface": "#0b141b",
        "error-container": "#93000a",
        "primary-fixed-dim": "#ffb86e",
        "primary": "#f39200",
        "on-secondary-fixed-variant": "#41484e",
        "surface-container-lowest": "#060f16",
        "surface-dim": "#0b141b",
        "secondary-container": "#41484e",
        "inverse-surface": "#dae4ed"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "stack-gap-lg": "48px",
        "container-max": "1280px",
        "section-padding-vertical": "120px",
        "stack-gap-md": "24px",
        "stack-gap-sm": "12px",
        "gutter": "32px"
      },
      "fontFamily": {
        "body-lg": [
          "Hanken Grotesk"
        ],
        "body-md": [
          "Hanken Grotesk"
        ],
        "label-caps": [
          "Hanken Grotesk"
        ],
        "display-lg": [
          "Libre Caslon Text"
        ],
        "headline-md": [
          "Libre Caslon Text"
        ],
        "headline-sm": [
          "Libre Caslon Text"
        ],
        "display-lg-mobile": [
          "Libre Caslon Text"
        ]
      },
      "fontSize": {
        "body-lg": [
          "18px",
          {
            "lineHeight": "1.6",
            "fontWeight": "400"
          }
        ],
        "body-md": [
          "16px",
          {
            "lineHeight": "1.6",
            "fontWeight": "400"
          }
        ],
        "label-caps": [
          "12px",
          {
            "lineHeight": "1.2",
            "letterSpacing": "0.1em",
            "fontWeight": "700"
          }
        ],
        "display-lg": [
          "56px",
          {
            "lineHeight": "1.1",
            "letterSpacing": "-0.02em",
            "fontWeight": "400"
          }
        ],
        "headline-md": [
          "40px",
          {
            "lineHeight": "1.2",
            "fontWeight": "400"
          }
        ],
        "headline-sm": [
          "28px",
          {
            "lineHeight": "1.3",
            "fontWeight": "400"
          }
        ],
        "display-lg-mobile": [
          "36px",
          {
            "lineHeight": "1.2",
            "fontWeight": "400"
          }
        ]
      }
    }
  },
  "content": [
    "./index.html",
    "./assets/app.js"
  ],
  plugins: [require("@tailwindcss/forms")]
};
