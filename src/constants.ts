export const SB_CONSTS = {
  TOP: 0,
  BOT: 480,
  LEFT: -107,
  RIGHT: 747,
  WIDTH: 854,
  HEIGHT: 480,
  SCREENCENTER: { x: 320, y: 240 },
  SCREENTOP: {x: 320, y: 0},
  SCREENBOT: { x: 320, y: 480 },
  SCREENLEFT: { x: 107, y: 240},
  SCREENRIGHT: { x: 747, y: 240 },
  SCREENTOPLEFT: { x: -107, y: 0 },
  SCREENTOPRIGHT: { x: 747, y: 0},
  SCREENBOTLEFT: { x: -107, y: 480},
  SCREENBOTRIGHT: { x: 747, y: 480},
}

export const SECTIONS_TYPES = {
  WHITE: 0,
  BLACK: 1
}


export type AmethystSection = {
  start: number,
  end: number,
  mapper: string,
  type: number
}

export const PJ_CONSTS = {
  BASE_BG: "bg.jpg",
  SPRITES: {
    BG_BLUR: "sb/bgb.jpg",
    BG_BLUR_BW: "sb/bgbbw.jpg",
  },
  COLORS: {
    white: {r: 255, g: 255, b: 255},
    dark: {r: 15, g: 15, b: 15},
    black: {r: 0, g: 0, b: 0},  
  },
  SECTIONS: [
    {start: 20445, end: 39645, mapper: "rentai", type: SECTIONS_TYPES.WHITE },
    {start: 58845, end: 78045, mapper: "rentai", type: SECTIONS_TYPES.WHITE },
    {start: 87645, end: 106845, mapper: "squilly", type: SECTIONS_TYPES.BLACK },
    {start: 126045, end: 135645, mapper: "squilly", type: SECTIONS_TYPES.WHITE },
    {start: 135645, end: 154845, mapper: "aidan", type: SECTIONS_TYPES.WHITE },
    {start: 174045, end: 193245, mapper: "aidan", type: SECTIONS_TYPES.WHITE },
    {start: 214845, end: 234045, mapper: "astronic", type: SECTIONS_TYPES.BLACK },
    {start: 253245, end: 301245, mapper: "frenz", type: SECTIONS_TYPES.WHITE },
  ],
  TICK_TIME: 300
}

