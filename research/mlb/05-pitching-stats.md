# Pitching statistics
Level: intermediate
Applies to: rules of the 2026 edition (S1, Rule 9); glossary pages accessed 2026-10-29; real example = 2025 regular season (S95, MLB Stats API). Citation: `[S1 R9.16(a), p.146]` = source, rule, PDF page (printed page = PDF page - 12). Glossary = secondary source. Prerequisite: note 04 (hits, at-bats, walks) and note 01 (innings, outs).

## 1. Innings pitched (IP) and the ".1 / .2" notation
**Plain version.** Each out is one third of an inning.
- Rule: "the Official Scorer shall count each putout as 1/3 of an inning." Examples: a starter replaced with one out in the sixth gets 5 1/3 innings; a reliever who retires two batters gets 2/3 of an inning; a starter replaced with none out in the sixth gets 5 innings, with a note of the batters faced in the sixth. [S1 R9.02(c)(1) Comment, p.123] If a relief pitcher enters and his team makes a successful appeal play for one out, he is credited 1/3 inning. [S1 R9.02(c)(1) Comment, p.123]
- Glossary: IP is the number of innings a pitcher remains in the game; each out recorded is one third; pickoffs and caught stealings count; a double play is worth two thirds; no credit if the batter reaches on an error because no out was recorded. [S78]
- The ".1 / .2" notation: the sources I read write fractions as 1/3 and 2/3 (rulebook) and do not describe a decimal-style notation. The Stats API prints innings as "187.2" and "195.1". [S95] I checked it by calculation: Paul Skenes's reported ERA 1.97 is reproduced only if "187.2" means 187 2/3 innings (9 x 41 / 187.667 = 1.966). [S95; computed here] So in the feed ".1" = one out (1/3) and ".2" = two outs (2/3). This reading is my inference; no source states the notation. (UNVERIFIED as a stated rule.)

## 2. Earned runs vs unearned runs; runs allowed
**Plain version.** An earned run is a run the pitcher is held responsible for; a run that scored only because of a fielding error (or a passed ball) is unearned.
- Rule: "An earned run is a run for which a pitcher is held accountable. In determining earned runs, the Official Scorer shall reconstruct the inning without the errors ... and passed balls, giving the benefit of the doubt always to the pitcher." An intentional walk counts like any other walk for this purpose. [S1 R9.16, p.146]
- An earned run is charged every time a runner reaches home with the aid of safe hits, sacrifice bunts, a sacrifice fly, stolen bases, putouts, fielder's choices, bases on balls, hit batters, balks or wild pitches before fielding chances have been offered to put out the offensive team. A wild pitch is solely the pitcher's fault and contributes to an earned run like a walk or a balk. [S1 R9.16(a), p.146]
- No run is earned when scored by a runner who reaches first on a muffed foul fly, on interference/obstruction/shift violation, or because of any fielding error; or whose presence on the bases was prolonged by an error if he would have been put out by errorless play; or whose advance was aided by an error, passed ball or defensive interference if the run would not have scored without that help. [S1 R9.16(b)-(d), p.147] An error by a pitcher counts like an error by any other fielder. [S1 R9.16(e), p.148]
- Relief pitchers: a reliever is not charged with any run (earned or unearned) scored by a runner who was on base when he entered; each pitcher is charged for the number of runners he put on base, not for the individual runners. [S1 R9.16(g) and Comment, p.148]
- Glossary: earned run = a run that scores without the benefit of an error or a passed ball; if there are no errors or passed balls, all runs are earned. [S81] Unearned run: scored because of an error or passed ball; it does not count against ERA but it can hurt a pitcher's chance to win. [S82] Inherited runners who score against a relief pitcher are not charged to his ERA. [S88] A run charged to a pitcher in general ("runs allowed") includes unearned runs. [S30]

**Worked examples (rulebook).**
1. Peter retires Abel and Baker (two outs). Charlie reaches first on an error. Daniel and Edward homer. Peter retires Frank. Three runs score, "no earned runs are charged to Peter, because Charlie should have been the third out of the inning, as reconstructed without the error." [S1 R9.16(a) Comment (1), p.146]
2. Peter retires Abel; Baker triples; a wild pitch to Charlie lets Baker score; Peter retires Daniel and Edward. One run, earned, because the wild pitch contributes. [S1 R9.16(a) Comment (2), p.146]
3. With two out, Abel reaches on a shortstop's error, Baker homers, Charlie strikes out: two runs, none earned. [S1 R9.16(a) Comment (3), p.147]
4. Same, but Abel reaches on catcher's interference: two runs, one (Baker's) earned, because it is unknown whether Abel would have made an out. [S1 R9.16(a) Comment (4), p.147]

## 3. Earned run average (ERA)
- Rule: "multiply the total earned runs charged against such pitcher by 9, and divide the result by the total number of innings he pitched, including fractions of an inning." [S1 R9.21(e), p.155] Rule's example: 9 1/3 innings and 3 earned runs = 2.89 (3 x 9 / 9 1/3). [S1 R9.21(e) Comment, p.155] (The PDF text prints the fraction as "91/3"; read as 9 and 1/3, which gives 27 / 9.333 = 2.893.)
- Glossary: 9 x earned runs / innings pitched; "ERA is the most commonly accepted statistical tool for evaluating pitchers"; flaws: great defensive plays are not taken into account, ballpark and league (DH) affect it, and it is less effective for relievers. [S70] Credited to Henry Chadwick in the 19th century. [S70]
- Who wins the ERA title: the pitcher with the lowest ERA who has pitched at least as many innings as the number of games scheduled for each club (162 innings in a 162-game season; 161 2/3 does not qualify). [S1 R9.22(b) and Comment, p.157] The glossary states the same as 1.0 IP per scheduled game. [S64]
Example (2025 Paul Skenes, Pittsburgh, S95): 41 ER x 9 / 187 2/3 IP = 1.966 = 1.97. The feed reports 1.97 (rank 1 in the qualified pool sorted by ERA ascending). [S95; computed here]
How to read: the glossary gives no good/bad ERA thresholds. (UNVERIFIED if added.) The only sourced numbers: ERA+ 100 = league average (note 06).

## 4. WHIP
- Glossary: (walks + hits) / innings pitched; hit batsmen, errors and fielder's-choice runners are not counted; lower is generally better; it does not distinguish a home run from a walk. [S71] Coined 1979 by Daniel Okrent (called "innings pitched ratio" at first). [S71]
- Not an official Rule 9 pitching stat (opponent batting average and WHIP are not Official stats under Rule 9). [S64; compare list in S1 R9.02(c), p.122-123]
Example (2025 Skenes): (136 H + 42 BB) / 187.667 = 0.948 = 0.95; feed: 0.95. [S95; computed here]

## 5. Strikeouts, walks and the per-nine rates
- Strikeout (pitcher's K): the credit side of the batter's strikeout (R9.15, see note 04). [S1 R9.15, p.145; S19] Walk (BB): a pitcher's control stat as well as a hitter's eye stat. [S20]
- **K/9** = strikeouts / innings x 9. [S90] **BB/9** = walks / innings x 9. [S91] **K/BB** = strikeouts / walks. [S92] **H/9** = hits / innings x 9 (it counts outs recorded without at-bats, such as double-play outs). [S93] **HR/9** = home runs / innings x 9. [S94]
- Rate by batters faced: K rate = strikeouts / batters faced [S114]; walk rate = walks / batters faced [S115]. Batters faced = plate appearances against the pitcher (runs + runners left on base + outs also gives it). [S85; rulebook: "Total number of batters faced," S1 R9.02(c)(2), p.123]
- Glossary notes on K/9: starters have lower K/9 than relievers; many successful pitchers get by with lower K/9 by inducing ground balls or soft contact. [S90]
Example (2025 Skenes, S95): K/9 = 216 x 9 / 187.667 = 10.36; BB/9 = 42 x 9 / 187.667 = 2.01; K/BB = 216 / 42 = 5.14; H/9 = 136 x 9 / 187.667 = 6.52; HR/9 = 11 x 9 / 187.667 = 0.53; batters faced 733. Each matches the feed. [S95; computed here] (Skenes allowed 11 HR; the feed's HR/9 0.53.)
Second example, same pull: Tarik Skubal, 195 1/3 IP, 2.21 ERA, 0.89 WHIP, 241 K, 33 BB, K/9 11.10, K/BB 7.30, 13-6, 1 complete game, 1 shutout. [S95]
How to read: no sourced thresholds for good K/9, BB/9 etc. (the glossary compares only starters vs relievers).

## 6. Wins, losses, no-decisions, winning percentage
**Plain version.** The win goes to the pitcher whose team takes a lead that it never gives up while he is in the game, with a five-inning minimum for starters.
- Rule (win): credited to the pitcher whose team assumes a lead while he is in the game, or during the inning on offense in which he is removed, and does not relinquish the lead. [S1 R9.17(a), p.151] When the score is tied the game becomes "a new contest" for the winning pitcher. [S1 R9.17(a) Comment, p.151-152]
- A starter must complete five innings of a game of six or more innings (four innings of a five-inning game); otherwise the win goes to the only relief pitcher or the most effective one in the scorer's judgment. [S1 R9.17(b), p.152] The relief pitcher should pitch at least one complete inning or pitch when a crucial out is made to be credited. [S1 R9.17(b) Comment, p.152]
- A relief pitcher who is ineffective in a brief appearance should not get the win if a later reliever helps keep the lead; "generally ... brief and ineffective" = pitches less than one inning and allows two or more earned runs. [S1 R9.17(c) and Comment, p.152-153]
- Loss: the pitcher "responsible for the run that gives the winning team a lead that the winning team does not relinquish." [S1 R9.17(d), p.153] Glossary: a starter does not necessarily get the loss when his team loses; if his team ties or takes the lead later, the loss goes to the pitcher who put the go-ahead run on base. [S73] Wins and losses used in combination are the win-loss record. [S73] Glossary on wins: pitcher of record when his team takes the lead for good, with the five-inning exception. [S72]
- Winning percentage = wins / (wins + losses). [S1 R9.21(a), p.155 (percentage of games won and lost); S89 (pitchers)] Example in the glossary: 3-2 = .600. [S89]
- Relief win = any win by a non-starter. [S84]
Example (2025): Skenes went 10-10 with a 1.97 ERA; Skubal 13-6 with 2.21. [S95] (These records are shown to illustrate that W-L and ERA are different measures. The glossary says win-loss was seen as inadequate by early statisticians (ERA origin, S70), and that starters pitch fewer innings today, S73.)

## 7. Saves, blown saves, holds, save opportunities
- **Save (rule):** the scorer credits a save to a pitcher who meets all four: (a) he is the finishing pitcher in a game won by his team; (b) he is not the winning pitcher; (c) he is credited with at least 1/3 inning; and (d) one of: (1) he enters with a lead of no more than three runs and pitches at least one inning; (2) he enters, regardless of the count, with the potential tying run on base, at bat or on deck (one of the first two batters he faces); or (3) he pitches at least three innings. [S1 R9.19, p.153-154] Glossary: same three conditions; a pitcher cannot receive a save and a win in the same game; saves became official in 1969. [S74]
- **Save opportunity (SVO):** every time a reliever records a save or a blown save. [S75]
- **Blown save (BS):** a reliever enters in a save situation and allows the tying run to score; the run need not be charged to him; the pitcher can still get a win, loss or no-decision. [S76]
- **Hold (HLD):** a reliever enters in a save situation, records at least one out, and maintains the lead for the next reliever (lead of three runs or less, or tying run on deck/at bat/on base). Cannot get a win or save in the same game; more than one reliever can get a hold; it is possible to get a hold and a loss in the same game. [S77] The hold is not an official Rule 9 statistic: it is not in the rulebook's list of pitcher records (R9.02(c), p.122-123) (checked). Invented in the 1980s by John Dewan and Mike O'Donnell. [S77]
- Games finished (GF): last pitcher for his team, not the starter. [S87] Games started (GS): first pitcher to throw a pitch for his team. [S86]
- Quality start (QS): starter pitches at least six innings and allows three earned runs or fewer; coined by a sportswriter in 1985. [S83] Not in Rule 9. [checked R9.02(c) and R9.17-9.19]

## 8. Complete game and shutout
- **Complete game (CG)** (glossary): the pitcher pitches the entire game for his team regardless of length; if the game is shortened by rain or goes to extra innings it counts if he was the only pitcher to appear for his team. [S79] The rulebook text read has no separate CG rule; its use is inside the shutout rule. [S1 R9.18, p.153]
- **Shutout** (rule): "a statistic credited to a pitcher who allows no runs in a game. No pitcher shall be credited with pitching a shutout unless he pitches the complete game, or unless he enters the game with none out before the opposing team has scored in the first inning, puts out the side without a run scoring and pitches the rest of the game without allowing a run." Combined shutouts get a notation. [S1 R9.18, p.153] Glossary: a pitcher who throws nine shutout innings is not credited if the game goes into extra innings and he leaves; a shutout is also always a win. [S80] (Check of the "also a win" claim: the glossary says it; the rule does not state it.)
Example (2025): Skubal 1 complete game, 1 shutout; Skenes 1 complete game, 0 shutouts. [S95]

## 9. Other pitcher counts on the official report
Rule 9.02(c) lists for each pitcher: innings pitched, batters faced, batters officially at bat against him, hits, runs, earned runs, home runs, sacrifice hits, sacrifice flies, walks, intentional walks, hit batters, strikeouts, wild pitches, balks. [S1 R9.02(c), p.122-123] Plus the names of the winning and losing pitchers, starting and finishing pitchers, and the pitcher credited with a save. [S1 R9.02(d), p.123-124] Wild pitch and passed ball: wild pitch charged to the pitcher when a legally delivered ball touches the ground or home plate before reaching the catcher and is not handled; passed ball charged to the catcher on a ball that should have been held with ordinary effort. [S1 R9.13, p.143-144] Glossary: [S52], [S51].

## Source conflicts
1. Glossary (win needs "five innings in a traditional game of nine innings or longer") vs rule (five innings of a game of six or more, four of a five-inning game). Rule wins. [S72; S1 R9.17(b), p.152]
2. Glossary says shutouts always come with a win; the rule does not say it. Reported as the glossary's statement.
3. No conflict on ERA, save or earned-run definitions (glossary and rule agree).

## Open questions / UNVERIFIED
- The ".1/.2" notation is inferred from the Stats API numbers and arithmetic, not stated in any source.
- No sourced thresholds for "good" ERA, WHIP, K/9, BB/9. The glossary names none.
- Rule 9.16(h)-(i) (several pitchers in one inning; runs charged to the team) was only partly read (S1 p.148-151); examples (g) read. Rule 9.17-9.19 read in full.
- The rulebook has no standalone complete-game rule in the pages read.
- "Qualified" in the Stats API pull is assumed to follow Rule 9.22; the feed does not say.
