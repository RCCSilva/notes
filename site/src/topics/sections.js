// Home-page sections, in display order. They only group the cards on the home: URLs have no section segment.
// Each topic declares `section: '<id>'` in its definition (index.js).
// To add a section (e.g. 'software' or 'industry'): add its id here, then add
// `home.sections.<id>: { title, desc }` to site/src/i18n/messages/{en,es,pt-BR}.js. Sections with no topics are not shown.
export const SECTIONS = ['sports', 'simulators'];
