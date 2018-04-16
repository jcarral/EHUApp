/* eslint-disable */
const flatColors = [
 [26, 188, 156, "#1abc9c", "turquoise"]
  , [46, 204, 113, "#2ecc71", "emerland"]
  , [52, 152, 219, "#3498db", "peter-river"]
  , [155, 89, 182, "#9b59b6", "amethyst"]
  , [52, 73, 94, "#34495e", "wet-asphalt"]
 , [22, 160, 133, "#16a085", "green-sea"]
  , [39, 174, 96, "#27ae60", "nephritis"]
 , [41, 128, 185, "#2980b9", "belize-hole"]
 , [142, 68, 173, "#8e44ad", "wisteria"]
  , [44, 62, 80, "#2c3e50", "midnight-blue"]
  , [241, 196, 15, "#f1c40f", "sun-flower"]
  , [230, 126, 34, "#e67e22", "carrot"]
 , [231, 76, 60, "#e74c3c", "alizarin"]
  , [236, 240, 241, "#ecf0f1", "clouds"]
  , [149, 165, 166, "#95a5a6", "concrete"]
 , [243, 156, 18, "#f39c12", "orange"]
  , [211, 84, 0, "#d35400", "pumpkin"]
  , [192, 57, 43, "#c0392b", "pomegranate"]
  , [189, 195, 199, "#bdc3c7", "silver"]
 , [127, 140, 141, "#7f8c8d", "asbestos"]
];

const cssColors = [
  {
    background: '#e6194b',
    text: 'white',
  },
  {
    background: '#3cb44b',
    text: 'white',
  },
  {
    background: '#ffe119',
    text: 'black',
  },
  {
    background: '#0082c8',
    text: 'white',
  },
  {
    background: '#f58231',
    text: 'white',
  },
  {
    background: '#911eb4',
    text: 'white',
  },
  {
    background: '#46f0f0',
    text: 'black',
  },
  {
    background: '#f032e6',
    text: 'white',
  },
  {
    background: '#d2f53c',
    text: 'black',
  },
  {
    background: '#fabebe',
    text: 'black',
  },
  {
    background: '#008080',
    text: 'white',
  },
  {
    background: '#e6beff',
    text: 'black',
  },
  {
    background: '#aa6e28',
    text: 'white',
  },
  {
    background: '#fffac8',
    text: 'black',
  },
  {
    background: '#800000',
    text: 'white',
  },
  {
    background: '#aaffc3',
    text: 'black',
  },
  {
    background: '#808000',
    text: 'white',
  },
  {
    background: '#ffd8b1',
    text: 'black',
  },
  {
    background: '#000080',
    text: 'white',
  },
];

const colorsSchedule = [
  {
    background: '#E99C3E',
    text: 'black',
  },
  {
    background: '#D867F5',
    text: 'black',
  },
  {
    background: '#E99C3E',
    text: 'black',
  },
  {
    background: '#CCBAF9',
    text: 'black',
  },
  {
    background: '#4A9CD6',
    text: 'white',
  },
  {
    background: '#EC3F2B',
    text: 'black',
  },
  {
    background: '#EC5FB5',
    text: 'black',
  },
  {
    background: '#0082c8',
    text: 'white',
  },
  {
    background: '#e6194b',
    text: 'black',
  },
  {
    background: '#008080',
    text: 'white',
  },
]

export class Color {
  static shadeColor = (color, percent) => {
    const f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
  }

  static blendColors = (c0, c1, p) => {
    const f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
  }

  static randomColor = () => colorsSchedule[Math.floor(Math.random() * colorsSchedule.length)];
  
  static lighten = (hex, lum) => {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }
}
