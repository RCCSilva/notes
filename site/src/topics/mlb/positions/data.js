// Where each position is drawn, in feet (see components/field/geometry.js). SCHEMATIC: the rules do not fix where fielders stand
// (except the catcher behind the plate and the limits in Rule 5.02); the spots follow the MLB glossary's descriptions (S33-S41).
// group: which slide highlights it.
export const POSITIONS = [
  { id: 'P', xy: [0, -60.5], group: 'battery', src: 'S41' },
  { id: 'C', xy: [0, 16], group: 'battery', src: 'S33' },
  { id: '1B', xy: [70, -79], group: 'infield', src: 'S34' },
  { id: '2B', xy: [22, -104], group: 'infield', src: 'S35' },
  { id: 'SS', xy: [-26, -104], group: 'infield', src: 'S36' },
  { id: '3B', xy: [-57, -75], group: 'infield', src: 'S37' },
  { id: 'LF', xy: [-130, -250], group: 'outfield', src: 'S38' },
  { id: 'CF', xy: [0, -300], group: 'outfield', src: 'S39' },
  { id: 'RF', xy: [130, -250], group: 'outfield', src: 'S40' },
];
