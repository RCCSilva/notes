// Baseball diamond geometry, in FEET. Home plate's rear point is the origin (0, 0); x grows to the right (toward first base),
// y grows DOWN the screen, so the outfield is at negative y. Numbers: Official Baseball Rules 2026 (S1) Rule 2.01-2.04 and Appendix 1.

/** Rule 2.01: the infield is a 90-foot square. */
export const SIDE = 90;
/** Rule 2.01: home to second base (and first to third) is 127 ft 3 3/8 in. */
export const DIAG = 127 + 3.375 / 12;
const H = DIAG / 2;

export const HOME = [0, 0];
export const FIRST = [H, -H];
export const SECOND = [0, -DIAG];
export const THIRD = [-H, -H];
/** Base path in running order, ending at home. */
export const PATH = [HOME, FIRST, SECOND, THIRD, HOME];

/** Rule 2.04: the pitcher's plate is 60 ft 6 in. from the rear point of home plate; it is 24 in. by 6 in. */
export const PLATE_DIST = 60.5;
export const RUBBER = [2, 0.5];
export const MOUND = [0, -PLATE_DIST];
/** Appendix 1 shows an 18-foot circle at the mound (S1 p.174; S6). Its exact center is not in the notes: drawn around the plate. */
export const MOUND_DIAMETER = 18;
/** Rule 2.01(a): the outer boundary of the infield dirt is a 95-foot radius from the center of the pitcher's plate. */
export const GRASS_LINE_R = 95;

/** Rule 2.03: bases are 18 inches square. */
export const BASE = 1.5;
/** Rule 2.02: home plate (inches): 17 front edge, 8 1/2 sides, 12 slanted sides. */
export const PLATE_IN = { front: 17, side: 8.5, slant: 12 };

/** Rule 2.01 NOTE (a): parks built by a professional club after 1 June 1958: at least 325 ft to the foul-line fences, 400 ft to center. */
export const FENCE_LINES = 325;
export const FENCE_CENTER = 400;
const FL = FENCE_LINES / Math.SQRT2;
/** The drawn fence is a smooth schematic curve (every park differs). It meets the foul lines at 325 ft and reaches 400 ft at center. */
export const FENCE_ENDS = [[-FL, -FL], [FL, -FL]];
export const FENCE_CTRL = [0, -(2 * FENCE_CENTER - FL)];
export const fenceD = `M${-FL} ${-FL} Q${FENCE_CTRL[0]} ${FENCE_CTRL[1]} ${FL} ${-FL}`;

/** Rule 2.01: the foul lines run from home through first and third base; fair territory includes the lines. */
export const isFair = ([x, y]) => y < 0 && Math.abs(x) <= -y + 1e-9;

/** Home plate outline, points in feet, rear point at the origin, the 17-inch edge toward the pitcher. */
export function plateShape(scale = 1) {
  const { front, side, slant } = PLATE_IN;
  const half = front / 2 / 12;
  const depth = Math.sqrt(slant * slant - (front / 2) ** 2) / 12;
  const edge = depth + side / 12;
  return [[0, 0], [half, -depth], [half, -edge], [-half, -edge], [-half, -depth]].map(([x, y]) => [x * scale, y * scale]);
}

/** Bag centers. First and third bags sit inside the infield, second is centered on the corner (Rule 2.03). */
export const BAG_CENTERS = [
  [FIRST[0] - BASE / Math.SQRT2, FIRST[1]],
  SECOND,
  [THIRD[0] + BASE / Math.SQRT2, THIRD[1]],
];

export const VIEWS = {
  full: [-255, -440, 510, 485],
  infield: [-112, -172, 224, 205],
};

export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
