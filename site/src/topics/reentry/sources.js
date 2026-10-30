// Mirrors research/reentry/sources.md. "p." = PDF page (printed numbers differ in the Gemini manual).
export const SOURCES = {
  S1: {
    short: 'Mercury game manual',
    title: 'Project Mercury Flight Manual (Reentry game manual)',
    url: 'https://reentrygame.com/gamemanuals/ProjectMercuryGameManual.pdf',
    page: (p) => `#page=${p}`,
  },
  S2: {
    short: 'Gemini game manual',
    title: 'Project Gemini Flight Manual (Reentry game manual, last updated 1 December 2025)',
    url: 'https://reentrygame.com/gamemanuals/ProjectGeminiGameManual.pdf',
    page: (p) => `#page=${p}`,
  },
  S6: {
    short: 'NASA Gemini SEDR 300 Vol II',
    title: 'Project Gemini Familiarization Manual SEDR 300, Vol II: Rendezvous and Docking Configurations (spacecraft GT-5 to GT-12)',
    url: 'http://prdownloads.sourceforge.net/mscorbaddon/GeminiManualVol2.pdf?download',
    page: (p) => `#page=${p}`,
  },
  S7: {
    short: 'NASA Gemini SEDR 300 Vol II suppl.',
    title: 'Project Gemini Familiarization Manual SEDR 300, Vol II supplement, section 8 (Guidance and Navigation)',
    url: 'http://prdownloads.sourceforge.net/mscorbaddon/GeminiManualVol2Sec2.pdf?download',
    page: (p) => `#page=${p}`,
  },
  S9: {
    short: 'NASA Gemini SEDR 300 Vol II suppl. (NTRS)',
    title: 'NASA NTRS 20160009472, Project Gemini Familiarization Manual SEDR 300, Vol II supplement (separate scan)',
    url: 'https://ntrs.nasa.gov/api/citations/20160009472/downloads/20160009472.pdf',
    page: (p) => `#page=${p}`,
  },
  S8: {
    short: 'NASA Gemini SEDR 300 Vol I (GT-3/4/7)',
    title: 'Project Gemini Familiarization Manual SEDR 300, Vol I: Long Range and Modified Configurations (spacecraft GT-3, 4, 7: a different configuration)',
    url: 'http://prdownloads.sourceforge.net/mscorbaddon/GeminiManualVol1.pdf?download',
    page: (p) => `#page=${p}`,
  },
  // Orbit basics (research/reentry/sources.md, S10-S21). Web pages have no PDF page: `href` builds the link.
  S10: {
    short: 'NASA, Basics of Space Flight',
    title: 'NASA Science, Basics of Space Flight (JPL), chapter 3: Gravity & Mechanics',
    url: 'https://science.nasa.gov/learn/basics-of-space-flight/chapter3-4/',
    href: (ch) => `https://science.nasa.gov/learn/basics-of-space-flight/chapter${ch}/`,
  },
  S11: {
    short: 'NASA, Basics of Space Flight ch.4',
    title: 'NASA Science, Basics of Space Flight, chapter 4-1 (Trajectories)',
    url: 'https://science.nasa.gov/learn/basics-of-space-flight/chapter4-1/',
  },
  S12: {
    short: 'ESA, Types of orbits',
    title: 'ESA, Types of orbits',
    url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits',
  },
  S13: {
    short: 'NASA Earth Fact Sheet',
    title: 'NASA NSSDCA, Earth Fact Sheet (last updated 15 November 2024)',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html',
  },
  S14: {
    short: 'NASA NSSDCA, MA-6',
    title: 'NASA NSSDCA, Mercury-Atlas 6 spacecraft page',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1962-003A',
  },
  S15: {
    short: 'NASA SP-45 Mercury summary',
    title: 'NASA SP-45, Mercury Project Summary Including Results of the Fourth Manned Orbital Flight, May 1963',
    url: 'https://ntrs.nasa.gov/api/citations/19630012071/downloads/19630012071.pdf',
    page: (p) => `#page=${p}`,
  },
  S16: {
    short: 'NASA SP-6 MA-7 results',
    title: 'NASA SP-6, Results of the Second U.S. Manned Orbital Space Flight, May 24, 1962 (MA-7)',
    url: 'https://www.nasa.gov/wp-content/uploads/2026/01/ma07-tec.pdf',
    page: (p) => `#page=${p}`,
  },
  S17: {
    short: 'NASA Gemini IV mission report',
    title: 'NASA MSC-G-R-65-3, Gemini Program Mission Report, Gemini IV',
    url: 'https://ntrs.nasa.gov/api/citations/19670095754/downloads/19670095754.pdf',
    page: (p) => `#page=${p}`,
  },
  S18: {
    short: 'NASA Gemini X mission report',
    title: 'NASA MSC-G-R-66-7, Gemini Program Mission Report, Gemini X',
    url: 'https://ntrs.nasa.gov/api/citations/19750067644/downloads/19750067644.pdf',
    page: (p) => `#page=${p}`,
  },
  S19: {
    short: 'NASA SP-4203 On the Shoulders of Titans',
    title: 'Hacker & Grimwood, NASA SP-4203, On the Shoulders of Titans: A History of Project Gemini (1977)',
    url: 'https://www.nasa.gov/wp-content/uploads/2023/03/sp-4203.pdf',
    page: (p) => `#page=${p}`,
  },
  S20: {
    short: 'NASA orbital mechanics course',
    title: 'NASA NTRS 20205003902, Introduction to Orbital Mechanics and Spacecraft Attitudes for Thermal Engineers (course slides; slide number = PDF page)',
    url: 'https://ntrs.nasa.gov/api/citations/20205003902/downloads/Introduction%20to%20Orbital%20Mechanics%20and%20Spacecraft%20Attitudes%20for%20Thermal%20Engineers%20CHARTS%20PDF.pdf',
    page: (p) => `#page=${p}`,
  },
  S21: {
    short: 'NIST SI guide, conversions',
    title: 'NIST, Guide for the Use of the International System of Units (SI), Appendix B.8 (conversion factors)',
    url: 'https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8',
  },
};

export function resolveRef([id, at, page]) {
  const s = SOURCES[id];
  // Web sources: `page` (if any) picks the web page through s.href and is not shown as a PDF page.
  if (s.href) return { label: [s.short, at].filter(Boolean).join(' · '), href: s.href(page ?? '3-4'), title: s.title };
  return {
    label: [s.short, at, page && `p.${page}`].filter(Boolean).join(' · '),
    href: page && s.page ? s.url + s.page(page) : s.url,
    title: s.title,
  };
}
