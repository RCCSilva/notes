# Advanced metrics (sabermetrics and Statcast), ending in WAR
Level: advanced
Applies to: MLB.com glossary pages accessed 2026-10-29 (secondary sources; Rule 9 does not define any of these stats); real examples from the 2025 regular season via the MLB Stats API (S133, S136) and MLB.com news (S134, S135). Prerequisites: notes 04 (batting) and 05 (pitching). Citation: `[S98]` = glossary page; `[S133]` = Stats API pull.

Reading order (the path to WAR): context first (park factor), then batting value in runs (ISO, BABIP, wOBA, wRAA, wRC+, OPS+), then pitching beyond ERA (ERA+, FIP, xFIP, SIERA), then defense (DRS, UZR, OAA), then context stats (LI, WPA, Game Score, Pythagorean), then Statcast, and finally WAR, which combines these ideas into one number.

Important about sources: the glossary pages are MLB.com editorial text; some say so ("created by the MLB.com editorial staff for fan entertainment and education, and was not officially provided by Major League Baseball", on the ERA+ page [S100]). Rule 9 has none of these stats (its percentage list is games won/lost, AVG, SLG, fielding average, ERA, OBP [S1 R9.21, p.155]).

## A. Hitting beyond OPS

### Isolated power (ISO)
- Definition: raw power, counting only extra-base hits and their type. Formula: (1 x 2B + 2 x 3B + 3 x HR) / AB, or SLG minus AVG. Good for: judging power apart from singles. Glossary example: a player who goes 1-for-5 with a double has ISO .200; a player who goes 2-for-5 with a single and a double has the same .200. [S104]
- Example (2025 Judge): (30 + 2 x 2 + 3 x 53) / 541 = 193 / 541 = .357; SLG .688 - AVG .331 = .357. Counts from S69 (note 04); computed here.

### Batting average on balls in play (BABIP)
- Definition: batting average only on balls put in play, removing home runs and strikeouts. Formula: (H - HR) / (AB - K - HR + SF). Glossary: league average "typically around .300"; extreme values tend to regress toward the mean, but skill matters too (examples: Clayton Kershaw's lifetime .270 BABIP allowed and Mike Trout's .348 BABIP, as of the end of 2019). Example: 2-for-5 with a home run and a strikeout = .333 (1-for-3 on balls in play). [S103]
- Example (2025 Judge): (179 - 53) / (541 - 160 - 53 + 7) = 126 / 335 = .376; the Stats API feed shows .376. [S69; computed here] Read: .376 is above the .300 league figure in the glossary (S103), which the glossary links to possible regression. The glossary does not say how far above is "lucky".

### Weighted on-base average (wOBA)
- Definition: like OBP but weights each way of reaching base by how much it is worth in runs (a double is worth more than a single). Formula: (unintentional BB factor x uBB + HBP factor x HBP + 1B factor x 1B + 2B factor x 2B + 3B factor x 3B + HR factor x HR) / (AB + uBB + SF + HBP), where "factor" is the adjusted run expectancy of the event in the season. Glossary example: in 2014 a home run was worth 2.101 and a walk 0.69; a player who went 1-for-4 with a home run and a walk has wOBA (2.101 + 0.69) / 5 = .558. [S97] The factor values change every season and the glossary does not list the current ones, so the formula cannot be computed here for 2025.
- Example (2025 Judge): the feed shows wOBA .463. [S133] Good for: valuing walks and extra-base hits properly compared with OBP and OPS. [S97]

### Weighted runs above average (wRAA)
- Definition: how many runs a hitter contributed compared with an average player; 0 = league average offensively; it is a counting stat, so more PAs mean more wRAA. Formula: ((wOBA - league wOBA) / annual wOBA scale) x PA. [S105]
- Example (2025 Judge): the feed shows wRaa 82.5. [S133] (The league wOBA and scale are not in the sources, so it is not recomputed here.)

### Weighted runs created plus (wRC+)
- Definition: overall offensive value vs league average, park- and era-adjusted. 100 = league average, 150 = 50% better; each point is one percentage point. Similar to OPS+; a hitter's wRC+ and OPS+ "will almost always look very similar." [S98]
- Glossary examples: Aaron Judge led MLB with a 204 wRC+ in 2025; Barry Bonds 235 in 2001 and 244 in 2002; Babe Ruth 194 for his career. [S98]
- Real example, with two sources: the Stats API feed shows Judge's 2025 wRcPlus = 203.35. [S133] The glossary says 204. These agree after rounding (203.35 would round to 203, the glossary says 204: a small difference, probably a different data refresh or provider; the cause is UNVERIFIED). Report both; the glossary says nothing about decimals.

### OPS+
- Definition: OPS adjusted to the league and park; 100 = league average, 150 = 50% better. Formula: 100 x (OBP/lgOBP + SLG/lgSLG - 1). Example: Miguel Cabrera's .895 OPS in 2014 gave him an OPS+ of 150. [S99]
- Good for: a context-neutral number (ballpark dimensions, altitude). [S99] The league OBP/SLG values are not in the sources, so no worked computation for a 2025 player.

### Runs created (RC)
- Definition (basic formula): TB x (H + BB) / (AB + BB). Invented by Bill James. Example: 377 TB, 195 H, 66 BB, 631 opportunities (AB + BB) = 156 runs created (2014). [S106]

### Park factor
- Definition: runs scored (by a team and its opponents) in a team's home park divided by the runs scored in its road games. Example: 2018 Coors Field: 849 runs at home vs 676 away = park factor 1.271. Good for: whether a stadium favors hitters or pitchers. [S107] It is the reason for the "plus" adjustments above (wRC+ lower at Coors Field than at T-Mobile Park for identical stats, per the wRC+ page). [S98]

## B. Pitching beyond ERA and WHIP

### ERA+
- Definition: ERA normalized to the league and park; 100 = league average, 150 = 50% better. Formula as printed: "League ERA, adjusted for park factors x 100 / ERA." Example: Mariano Rivera's 2.21 career ERA = 205 ERA+ (best all-time per the glossary). Good for: comparing pitchers across parks and seasons. [S100]

### Fielding independent pitching (FIP)
- Definition: like ERA, but only the events the pitcher mostly controls: strikeouts, walks, hit-by-pitches and home runs; balls in play are left out. Formula: ((13 x HR) + (3 x (BB + HBP)) - (2 x K)) / IP + FIP constant, with the constant putting FIP on the scale of league ERA. If a pitcher's average on balls in play is high, his FIP will probably be lower than his ERA. [S101]
- Example (2025 Paul Skenes): 11 HR, 42 BB, 6 HBP, 216 K, 187 2/3 IP. (13 x 11 + 3 x 48 - 2 x 216) / 187.667 = -145 / 187.667 = -0.77. The feed shows FIP 2.362, so the constant implied by the feed is about 3.14 (2.362 + 0.773). The glossary does not print a constant; the 3.14 is a derived number, not a sourced one. His ERA was 1.97. [S136; S95; computed here]

### xFIP
- Definition: FIP with the actual home runs replaced by the expected home runs: fly balls x the league-average HR per fly ball rate. Glossary example: Randy Johnson 2002: 2.66 FIP and 2.44 xFIP (12.9% HR/FB vs 10.7% league); the HR/FB league average was 15.3% in 2019. Good for: indicating future performance rather than past results. [S102]
- Example (2025 Skenes): feed xFIP 3.03 vs FIP 2.36 vs ERA 1.97. [S136; S95] The glossary offers no reading of that gap beyond the definition (xFIP is higher here because it assumes a league-average home-run rate on his fly balls, per S102's description; this is my application, not a sourced statement about Skenes).

### SIERA
- Definition: a pitcher's performance with the factors he can't control removed, but unlike xFIP it considers balls in play and adjusts for their type (grounders and pop-ups vs line drives). [S116] (The page prints a long regression formula, starting 6.145 - 16.986 x (SO/PA) + 11.434 x (BB/PA) ...; I did not copy the rest.)

## C. Defense and context

- **Defensive runs saved (DRS)** and **ultimate zone rating (UZR)**: both estimate how many runs a defender saved from errors, range, outfield arm and double-play ability, using Baseball Info Solutions data; DRS differs only slightly from UZR in the formula. Example: a center fielder who makes a play that is caught 60% of the time gets +0.4; if he misses, -0.6. [S110, S111]
- **Outs above average (OAA)** (Statcast): range-based; how many outs a fielder saved. Outfielders: Catch Probability gives credit +0.25 for a catch of a 75% play and -0.75 if missed. Example: Victor Robles led MLB outfielders with +23 OAA in 2019. Expanded to infielders in 2020 (per the page). [S126]
- **Leverage index (LI)**: importance of a situation, 1.0 = neutral; above 1.0 when the outcome could change the game's result (example: trailing by three, bases loaded, two out in the eighth). [S108]
- **Win probability added (WPA)**: change in the team's win expectancy from one event to the next; formula = win expectancy after minus before. Example: Josh Donaldson's walk-off homer on May 26, 2015 took the Blue Jays from 43% to 100%: WPA 0.57. Stolen bases, caught stealings and pickoffs also change it. [S109]
- **Game Score**: a start-by-start 0-100 number (usually 40-70); 50 is "average," 40 is "replacement level," 80s and 90s are impressive, 100+ is exceptionally rare (9 of 4,858 starts in 2015); Tom Tango's version is the one shown on MLB.com. [S113]
- **Pythagorean winning percentage**: expected win percentage from runs scored and allowed; original formula RS^2 / (RS^2 + RA^2); Baseball-Reference uses an exponent of 1.83. Example: the 2018 Seattle Mariners were 89-73 but allowed 34 more runs than they scored; Baseball-Reference's Pythagorean record was 77-85. [S112]
- **K% and BB% (strikeout and walk rate)**: strikeouts (or walks) divided by batters faced. [S114, S115]

## D. Statcast measurements (since Statcast was implemented Major League wide in 2015, per the pages)
Each: plain definition, then what it is good for.
- **Exit velocity (EV):** speed of the ball off the bat; average EV = sum of all EVs / all batted-ball events. Good for: hard contact gives the defense less time; skill-based and somewhat predictive. [S117]
- **Launch angle (LA):** vertical angle off the bat. Guideline: ground ball under 10 degrees, line drive 10-25, fly ball 25-50, pop up above 50. [S118]
- **Barrel:** batted balls whose comparable hits (EV + LA) led to at least a .500 batting average and 1.500 slugging since 2015; needs at least 98 mph, and the angle window widens above 98 mph (at 116 mph, 8 to 50 degrees). In 2016 barreled balls hit .822 with a 2.386 slugging percentage. [S119]
- **Hard-hit rate:** share of batted balls hit 95 mph or more. In 2018 hard-hit balls were .524 BA / 1.047 SLG / .653 wOBA vs .219 / .259 / .206 for weakly hit balls. [S120]
- **Sweet spot:** launch angle between 8 and 32 degrees. [S127]
- **Expected batting average (xBA), xSLG, xwOBA:** the average of the expected outcome of each batted ball (from comparable EV, launch angle and sometimes sprint speed), with real walks, strikeouts and HBP. Good for: skill without defense and luck. Example: Marcell Ozuna had a .327 wOBA in 2018 but a .359 xwOBA. [S121, S123, S122]
- **Expected ERA (xERA):** xwOBA translated to the ERA scale; "not necessarily predictive," but a much higher xERA than actual ERA should prompt a look at how the pitcher suppressed runs. [S124]
- **Sprint speed:** feet per second in the player's fastest one-second window; a run of at least 30 ft/sec is a "Bolt." [S125]
- **Pop time:** catcher's time from pitch hitting the mitt to the throw arriving at the base on steal or pickoff attempts. [S132] Lead distance (note 03). [S53]
- **Spin rate (rpm)** and **velocity (peak speed from release to the plate)** for pitches. [S128, S129]
- **Squared-up rate** and **blasts** (bat tracking): squared-up = share of the maximum exit velocity possible given swing and pitch speed; a blast = a squared-up ball with a high bat speed. [S130, S131]

## E. WAR (Wins Above Replacement), the endpoint
**Plain version.** WAR is one number that says how many wins a player added to his team compared with a replacement-level player (a readily available Minor League or free-agent fill-in). It combines hitting, baserunning and fielding for position players, and a pitching run measure for pitchers. [S96]

**What it claims to measure.** "How many more wins he's worth than a replacement-level player at his same position." Because the position adjustment is built in, a shortstop and a first baseman with the same overall production get different WARs (the shortstop's is higher, because replacement-level shortstops produce less). [S96] Good for: comparing players at different positions. [S96]

**Formula in the glossary.**
- Position players: (runs above average in batting, baserunning and fielding + adjustment for position + adjustment for league + runs provided by a replacement-level player) / runs per win. [S96]
- Pitchers: different versions use either RA9 or FIP, adjusted for league and ballpark; using league averages, it is determined how many wins the pitcher was worth given his innings. [S96]

**Replacement level (the idea).** The MLB.com article says a team of freely available Minor Leaguers wouldn't win much: "estimates used for WAR peg that number at 48 (roughly a .300 winning percentage)." If player A is replaced by free agent X and the club wins 54, X is worth 6 WAR. [S135, 2019 article]

**Several versions exist (sourced).** fWAR is FanGraphs' calculation; bWAR or rWAR is Baseball-Reference's; WARP is Baseball Prospectus' "Wins Above Replacement Player." The calculations differ slightly (fWAR uses FIP for pitchers, bWAR uses RA9), but all answer the same question. [S96] The 2026 MLB.com article repeats it: "There are two major versions of WAR, one at FanGraphs and one at Baseball-Reference ... they generally are in the same ballpark, they don't line up exactly." [S134] Teams also have their own proprietary versions (the Phillies' "pWAR," the Nationals' "Pentagon"); "there is no clear and established formula for the WAR data that fans and analysts have access to"; in the public sphere there are three sources (bWAR, fWAR, WARP), each with dozens of implementation details. [S135] Front-office quote (Phillies GM Matt Klentak): "WAR puts all players in baseball on the same scale ... if you're looking for a quick and dirty way to get an assessment of a player, that's the way to go." [S135]

**Real examples (2025 and 2026, labeled).**
1. Aaron Judge, 2025 (Stats API, S133): war 10.04. The feed's components: batting 82.71 runs, fielding 6.43, base running -4.15, positional -10.28, league adjustment 2.77, replacement runs 20.68; their sum 98.16 equals the feed's `rar` field (98.16), and 98.16 / 10.04 = 9.77 runs per win. The mapping of those field names to the glossary's terms and the "runs per win" value are my reading of the feed; the feed does not label them. Which WAR version the feed calculates is not stated (UNVERIFIED). [S133; computed here]
2. The MLB.com 10-WAR article lists Judge's 2025 as 10.0 fWAR (and 2024: 11.2 fWAR, 10.9 bWAR), so the two sources agree on about 10 for 2025; and Pete Crow-Armstrong's 2026 regular season as 10.6 fWAR, "blew away the field" (next: Yordan Alvarez and Bobby Witt Jr., 6.8 fWAR), a 3.8-WAR gap. [S134]
3. Pitchers, 2025 (Stats API, S136): Paul Skenes war 6.53 and `ra9War` 8.22; Tarik Skubal war 6.71 and ra9War 7.12. The feed has both a RA9-based and another WAR figure for pitchers, which illustrates the glossary's statement that the pitcher calculation can use RA9 or FIP. Which field matches which website is not stated. [S136; S96]

**How to read a WAR number (sourced ranges).** None found. I searched the glossary page (S96), the 2026 article (S134), the 2019 front-office article (S135) and an MLB.com web search; none gives a scale such as "2 = starter, 5 = All-Star, 8 = MVP". The only numbers they do give are examples: the "10-WAR club" is a short list of players with 10 WAR in a season in the 30-team era (since 1998). [S134] Randy Johnson averaged 9.5 WAR per season over 1999-2002 (Cy Young seasons). [S134] A web search summary mentioned "8.0+ is MVP caliber" and "50-70 career WAR for the average Hall of Famer" from MLB.com; I did not open those pages and cannot confirm them: UNVERIFIED, not for the site.

**Caveats the sources do state.** WAR has multiple versions (S96, S134, S135); it is one distillation of many factors and a "gateway" into sabermetrics (S135); critics call it too simple or too complex (S135).

## Source conflicts
1. Judge 2025 wRC+: 204 (glossary S98) vs 203.35 (Stats API S133). Both reported; the feed is the underlying data, the glossary text is an editorial example.
2. WAR 2025 for Judge: 10.04 (S133) vs 10.0 fWAR (S134): consistent.
3. The glossary describes ERA+ for Rivera as "105 percent better" than average while the formula gives 205; consistent with the "150 means 50% better" reading in the same page. [S100]

## Open questions / UNVERIFIED
- No sourced WAR scale (starter / All-Star / MVP) found. Do not put one on the site until a source is opened.
- Which WAR version the MLB Stats API calculates (not stated). Its field meanings (`rar`, `positional`, `wLeague`, `replacement`) are inferred from the arithmetic.
- The wOBA weights and league values for 2025 (needed to recompute wOBA, wRC+, OPS+, ERA+) are not in the sources.
- The FIP constant is not printed in the glossary; 3.14 for Skenes is derived from the feed.
- Several Statcast pages are dated (2016-2019 examples); today's thresholds may differ; the glossary pages do not state a revision date.
- Pages summarised but not read in full: SIERA formula, OAA infielder section, catch probability, bat tracking details.
