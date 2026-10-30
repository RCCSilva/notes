# Batting statistics
Level: intermediate
Applies to: rules of the 2026 edition (S1, Rule 9 "The Official Scorer"); glossary pages accessed 2026-10-29; real example = 2025 regular season (S69). Citation: `[S1 R9.21(b), p.155]` = source, rule, PDF page (printed page = PDF page - 12). Glossary pages are secondary sources (mlb.com). Real-example numbers come from the MLB Stats API (S69), which can be revised later.

How to use this note: the official scorer decides what is a hit, at-bat, RBI, etc. (Rule 9). The formulas for the "percentage records" are in Rule 9.21. Glossary pages explain the same ideas in plain words.

## 1. Plate appearance vs at-bat
**Plain version.** A plate appearance (PA) is every completed turn at bat. An at-bat (AB) is a plate appearance minus the turns that end in a walk, hit by pitch, sacrifice, or an interference/obstruction award.

- Rule: "No time at bat shall be charged" when a player (A) hits a sacrifice bunt or sacrifice fly, (B) is awarded first base on four called balls, (C) is hit by a pitch, or (D) is awarded first base because of interference, obstruction or shift restriction violation. [S1 R9.02(a)(1), p.121]
- Glossary at-bat: reaching base by fielder's choice, hit or error (not catcher's interference), or being put out on a non-sacrifice. At-bats are the denominator of batting average and slugging. [S31]
- Glossary plate appearance: each completed turn batting, regardless of the result. [S32] PAs decide who qualifies for the batting title; at-bats are not used for that. [S32] A batter gets no PA if a runner is thrown out on the bases to end the inning while he is at bat, or if the game-winning run scores on a balk, wild pitch or passed ball while he is at bat. [S32]
- Rulebook version of "plate appearances" (for the batting title): "Total appearances at the plate shall include official times at bat, plus bases on balls, times hit by pitcher, sacrifice hits, sacrifice flies and times awarded first base because of interference, obstruction, or shift restriction violation." [S1 R9.22(a), p.156] So PA = AB + BB + HBP + SH + SF + interference awards. (The rulebook gives this as the count for the qualification rule; it has no separate "plate appearance" definition. Searched Rule 9 and Definitions.)

Example (2025, S69): Aaron Judge had 541 AB, 124 BB, 7 HBP, 0 sacrifice bunts, 7 sacrifice flies = 679, and the feed reports 679 plate appearances. [S69; sum computed here]

## 2. Hits, singles, doubles, triples, home runs, total bases
- A **hit** (base hit) is credited to a batter who reaches base safely under the conditions of R9.05; for example, reaching first or later base safely on a fair ball that settles on the ground, touches a fence before a fielder, or clears the fence; or on a fair ball hit so hard or slowly that no fielder can make a play; or on an unnatural bounce. [S1 R9.05(a)(1)-(3), p.127-128] The scorer "shall always give the batter the benefit of the doubt." [S1 R9.05(a) Comment, p.128] No hit when the batter is a forced runner put out by his batted ball or is out on a fielder's choice in which the fielder handles the ball and puts out a preceding runner (batter charged with an at-bat, no hit). [S1 R9.05(b), p.128-129]
- Glossary: a hit is the batter hitting the ball into fair territory and reaching base without an error or fielder's choice; four types (single, double, triple, home run), all counted equally for batting average. [S56]
- Value of the hit: it is a one-base hit if the batter stops at first, two-base if at second, three-base if at third, a home run if he touches all bases and scores. [S1 R9.06(a), p.129] Examples in the rule: runner on first, batter hits to right, the throw to third is unsuccessful and the batter takes second: the batter gets a one-base hit (single). [S1 R9.06 Comment (1), p.130] Runner on second, fair fly, runner holds up, batter takes second: two-base hit. [S1 R9.06 Comment (2), p.130]
- Glossary pages for the types: single [S22], double [S23], triple [S24], home run [S25]. Extra-base hit = any hit that is not a single. [S63]
- **Total bases (TB)**: one for a single, two for a double, three for a triple, four for a home run; only hits count (stolen bases do not). [S61] The rulebook's report lists "Total bases on safe hits." [S1 R9.02(a)(8), p.122]
  Example (2025 Judge, S69): 179 H, 30 2B, 2 3B, 53 HR so 179-30-2-53 = 94 singles; TB = 94 + 2(30) + 3(2) + 4(53) = 94+60+6+212 = 372. The feed reports 372. [S69; computed here]

## 3. Runs, RBI
- **Run (R)**: credited when a player crosses the plate to score; how he reached base does not matter. [S30] (Rule of scoring a run: S1 R5.08, p.51; see note 03.) Rulebook report lists "Number of runs scored." [S1 R9.02(a)(2), p.121]
- **RBI** (rule): credited for every run that scores (1) unaided by an error and as part of a play begun by the batter's safe hit (including a home run), sacrifice bunt, sacrifice fly, infield out or fielder's choice; (2) by the batter becoming a runner with the bases full (base on balls, hit batter, interference, obstruction, shift violation); or (3) when, before two are out, an error is made on a play on which a runner from third ordinarily would score. [S1 R9.04(a), p.127] No RBI when the batter grounds into a force double play or reverse-force double play, or when a fielder is charged with an error for muffing a throw at first that would have completed a force double play. [S1 R9.04(b), p.127]
- Glossary says the same in plain words (no RBI on a run scoring from an error or a double play; yes for a bases-loaded walk or hit-by-pitch; RBI on outs that score a run). It also says RBI, home runs and batting average form the offensive Triple Crown. [S62]
- Judgment call: whether a run scored when a fielder holds the ball or throws to the wrong base is an RBI is up to the scorer; if the runner keeps going an RBI is ordinarily given, if he stops and takes off when he notices the misplay it is a fielder's choice. [S1 R9.04(c), p.127]
Example (2025): Judge, 114 RBI, 137 runs scored. [S69]

## 4. Batting average (AVG)
**Plain version.** Hits divided by at-bats, written as a decimal like .331.
- Rule: "divide the total number of safe hits (not the total bases on hits) by the total times at bat, as defined in Rule 9.02(a)." [S1 R9.21(b), p.155]
- Glossary: hits divided by at-bats, a number between .000 and 1.000; league-wide average in recent years "typically hovered around .250." [S57] It does not include walks or hit-by-pitches and does not value extra-base hits more than singles. [S57] History: in 1887 walks counted as hits for one season. [S57]
- Not in the hits: sacrifices and walks are not at-bats, so they do not lower AVG. [S1 R9.02(a)(1), p.121; S65 for sac flies]
Example (2025 Judge, S69): 179 H / 541 AB = 0.3309 = .331. The feed reports .331. [S69; computed here] Read: .331 is above the ".250" league figure of the glossary (S57 says that is the typical recent league level; it does not name that season). Interpretation only, not a sourced threshold.

## 5. On-base percentage (OBP)
**Plain version.** How often a batter reaches base, counting hits, walks and hit-by-pitches.
- Rule: "divide the sum of hits, bases on balls and times hit by pitch by the sum of at-bats, bases on balls, times hit by pitch and sacrifice flies." Instances of a batter being awarded first base on interference/obstruction/shift violation are ignored. [S1 R9.21(f) and Comment, p.155]
- Glossary: OBP "refers to how frequently a batter reaches base per plate appearance"; times on base are hits, walks and hit-by-pitches, not errors, fielder's choices or a dropped third strike; sacrifice bunts are removed from the equation. [S58] Official stat since 1984. [S58]
Example (2025 Judge): (179 + 124 + 7) / (541 + 124 + 7 + 7) = 310 / 679 = 0.4566 = .457. The feed reports .457. [S69; computed here]
Conflict: the glossary says "per plate appearance" while the rule's denominator leaves out sacrifice bunts and interference awards (the two agree for Judge because he has neither). The rule wins (it is the definition used for official records).

## 6. Slugging percentage (SLG)
**Plain version.** Total bases per at-bat; it rewards extra-base hits.
- Rule: "divide the total bases of all safe hits by the total times at bat." [S1 R9.21(c), p.155]
- Glossary formula: (1B + 2B x 2 + 3B x 3 + HR x 4) / AB; it does not include walks or hit-by-pitches; "one of the best evaluators of power." [S59]
Example (2025 Judge): 372 TB / 541 AB = 0.6876 = .688. Feed: .688. [S69; computed here]

## 7. OPS (on-base plus slugging)
- Glossary: OPS adds on-base percentage and slugging percentage to get one number; it is meant to combine how well a hitter can reach base with how well he hits for average and power. [S60] Same page: Babe Ruth's career OPS 1.164 ranks first all-time, Ted Williams 1.116, Lou Gehrig 1.079 (as printed). [S60]
- Rule 9 does not define OPS (searched R9.21, p.155; only percentage of games, AVG, SLG, fielding average, ERA, OBP). OPS is therefore a derived stat, not an official scoring stat. [S1 R9.21, p.155]
Example (2025 Judge): .4566 + .6876 = 1.1442; the feed prints 1.145, because it adds the rounded .457 and .688. [S69; computed here] (Small rounding difference; the feed's figure is the published one.)
Read: no sourced thresholds in the glossary for "good" OPS. (UNVERIFIED if needed.)

## 8. Other basic batting counting stats
- **Walk (BB)**: four pitches out of the strike zone not swung at; the batter gets first base. [S20] Rule: scored whenever a batter is awarded first base because of four balls; if the fourth ball touches him it is a hit batter. [S1 R9.14(a), p.144] Intentional walk: pitcher purposely throws wide, or the manager informs the umpire of the intention to walk the batter. [S1 R9.14(b),(d), p.145] The glossary adds that since 2017 the manager can signal an intentional walk without four pitches. [S67] Judge 2025: 124 BB. [S69]
- **Hit by pitch (HBP)**: awarded first base; not a hit, but counts for OBP. [S21]
- **Strikeout (K/SO)**: scored when the batter is put out by a third strike caught by the catcher, by a third strike not caught with a runner on first before two outs, when he becomes a runner because a third strike is not caught, or when he bunts foul on third strike (unless a foul fly is caught). [S1 R9.15(a), p.145] If a batter leaves with two strikes and the substitute completes a strikeout, the strikeout and the time at bat are charged to the first batter. [S1 R9.15(b), p.145] Glossary: a strikeout is still credited even if the batter reaches first on a dropped third strike. [S19] Judge 2025: 160 K. [S69]
- **Sacrifice fly (SF)**: a fly out that lets a runner score; the batter gets an RBI, not an at-bat; it does count in OBP. [S65; S1 R9.02(a)(1), p.121; R9.21(f), p.155] **Sacrifice bunt (SH)**: not an at-bat, not counted in OBP. [S66] Rule: sacrifice bunt when before two are out the batter advances runners with a bunt and is put out at first (full text of R9.08 not read for this note). [S1 R9.08(a), p.134]
- **Stolen bases (SB)** and **caught stealing (CS)** are on the batter's report; see note 03 for the R9.07 credit rules. [S1 R9.02(a)(9),(18), p.122; R9.07, p.132-134] Stolen-base percentage = steals divided by attempts; the glossary adds that "as a general rule of thumb" a base stealer with an SB% of 75 or higher is typically helping his team. [S68] (A rule of thumb from the glossary, not an official threshold.) Judge 2025: 12 SB, 5 CS (SB% = 12/17 = 70.6%, computed here). [S69]
- Other counts on the rulebook's batter report: runs batted in, two-base hits, three-base hits, home runs, total bases, sacrifices, bases on balls, intentional walks, times hit by pitch, strikeouts, grounded into double plays. [S1 R9.02(a), p.121-122]

## 9. Who wins the batting title (qualification)
- Rule: the batting, slugging or on-base percentage champion is the player with the highest figure, provided he has at least as many plate appearances as the number of games scheduled for each club multiplied by 3.1 (Major League). [S1 R9.22(a), p.156] Example in the rule: 162 games x 3.1 = 502.2, rounded to 502 plate appearances. [S1 R9.22(a) Comment, p.156]
- Tie-break style rule: a player with fewer plate appearances still wins if his average would be the highest after being charged with the missing plate appearances as additional at-bats (no hits). Example: Abel .362 (181 hits in 500 AB, 502 PA); Baker 490 PA, 440 AB, 165 H = .375; adding 12 at-bats gives 165/452 = .365, still above .362, so Baker is the champion. [S1 R9.22(a) Comment, p.156-157]
- Qualification counts scheduled games, so cancelled games still count; the glossary also applies 3.1 PA per game to those categories and states that opponent batting average and WHIP are not official Rule 9 pitching stats. [S64]
- The rulebook has no tie-breaker for two players with the exact same average (searched R9.22; none found).

## 10. Worked example, full line (Aaron Judge, 2025 regular season, S69)
G 152, PA 679, AB 541, H 179, 2B 30, 3B 2, HR 53, BB 124, HBP 7, SF 7, K 160, TB 372, R 137, RBI 114, SB 12, CS 5, AVG .331, OBP .457, SLG .688, OPS 1.145. Source: https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&season=2025&sportId=1&limit=3&sortStat=battingAverage&playerPool=qualified&order=desc (accessed 2026-10-29). Other two rows in the same pull: Bo Bichette (.311, 181 H, 582 AB), Jacob Wilson (.311, 151 H, 486 AB). [S69]
Check: AVG 179/541 = .331, OBP 310/679 = .457, SLG 372/541 = .688. All reproduced here from the counts. Judge was first by average among qualified players in that feed (sorted by batting average; "qualified" = the feed's own definition, which is not shown; it is presumably Rule 9.22 but this is UNVERIFIED).

## Source conflicts
1. OBP wording (glossary "per plate appearance") vs R9.21(f) formula: rule wins (see section 5).
2. OPS shown by the feed (1.145) vs OBP + SLG from the counts (1.1442): the feed adds rounded OBP and SLG. Both reported.
3. Hits and at-bats: glossary and Rule 9 agree. No other conflict found.

## Open questions / UNVERIFIED
- No sourced thresholds for what is a "good" AVG, OBP, SLG or OPS (the glossary gives only the typical league batting average of about .250, S57). Anything beyond that is not on the site.
- Whether the Stats API "qualified" pool uses Rule 9.22 exactly (not stated).
- Full text of R9.08 (sacrifices), R9.10-9.12 (assists, double plays, errors) not read for this note.
- Not found in Rule 9: a definition of OPS, a tie-breaker for equal averages.
