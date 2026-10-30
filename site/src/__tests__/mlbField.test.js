import { describe, it, expect } from 'vitest';
import { DIAG, HOME, FIRST, SECOND, THIRD, PLATE_DIST, MOUND, GRASS_LINE_R, FENCE_ENDS, plateShape, isFair, dist, BAG_CENTERS } from '../topics/mlb/components/field/geometry';
import { POSITIONS } from '../topics/mlb/positions/data';

describe('baseball field geometry (Rule 2.01-2.04)', () => {
  it('the infield is a 90-foot square, with the 127 ft 3 3/8 in diagonals', () => {
    expect(dist(HOME, FIRST)).toBeCloseTo(90, 1);
    expect(dist(FIRST, SECOND)).toBeCloseTo(90, 1);
    expect(dist(SECOND, THIRD)).toBeCloseTo(90, 1);
    expect(dist(THIRD, HOME)).toBeCloseTo(90, 1);
    expect(dist(FIRST, THIRD)).toBeCloseTo(DIAG, 5);
    expect(DIAG).toBeCloseTo(127.28125, 5);
    expect(dist(HOME, SECOND)).toBeCloseTo(DIAG, 5);
  });
  it('pitcher plate 60 ft 6 in from home; grass line radius 95 ft', () => {
    expect(dist(HOME, MOUND)).toBe(PLATE_DIST);
    expect(PLATE_DIST).toBe(60.5);
    expect(GRASS_LINE_R).toBe(95);
  });
  it('home plate: 17 in front, 8.5 in sides, 12 in slanted sides, point at the origin', () => {
    const p = plateShape(1);
    const inch = (a, b) => dist(a, b) * 12;
    expect(p[0]).toEqual([0, 0]);
    expect(inch(p[3], p[2])).toBeCloseTo(17, 5);
    expect(inch(p[2], p[1])).toBeCloseTo(8.5, 5);
    expect(inch(p[0], p[1])).toBeCloseTo(12, 5);
    expect(inch(p[0], p[4])).toBeCloseTo(12, 5);
    expect(p[2][1]).toBeLessThan(0); // the wide edge faces the pitcher
  });
  it('fence meets the foul lines 325 ft from home', () => {
    expect(dist(HOME, FENCE_ENDS[0])).toBeCloseTo(325, 5);
    expect(dist(HOME, FENCE_ENDS[1])).toBeCloseTo(325, 5);
  });
  it('fair territory includes the foul lines; behind home is foul', () => {
    expect(isFair([0, -50])).toBe(true);
    expect(isFair(FIRST)).toBe(true);
    expect(isFair([100, -50])).toBe(false);
    expect(isFair([0, 10])).toBe(false);
  });
  it('first and third bags are inside the infield', () => {
    expect(BAG_CENTERS[0][0]).toBeLessThan(FIRST[0]);
    expect(BAG_CENTERS[2][0]).toBeGreaterThan(THIRD[0]);
  });
  it('every fielder except the catcher is drawn in fair territory', () => {
    POSITIONS.forEach((p) => expect(isFair(p.xy)).toBe(p.id !== 'C'));
  });
});
