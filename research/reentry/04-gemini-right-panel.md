# Gemini pilot's right switch and circuit breaker panel (the game's "FAR-RIGHT" panel)
Level: intermediate
Applies to: real spacecraft per NASA SEDR 300 Vol II (GT-5 to GT-12; drawing Fig 3-5 sheet 2 is marked "S/C 8 & UP") [S6]; game: Reentry Gemini manual updated 1 Dec 2025 [S2].

Sources: S6 = NASA-GeminiManualVol2.pdf, S7 = Vol2 Sec2 (guidance supplement, pages marked CONFIDENTIAL, downgraded), S9 = NTRS Vol2 supplement, S2 = game manual (see sources.md). All pages are PDF pages; the NASA printed page or figure number is in brackets. Method as in 03: the drawing was read on page images (450 dpi crops); text claims were found in the OCR text and the key ones checked on the page image (marked "OCR only" when not). Tags: **NASA document (real spacecraft)** versus **game behavior**. "Not stated" means I searched S6, S7, S9 (OCR plus page checks) and found no sentence; the OCR is noisy, so a missed hit is possible.

## Which NASA panel is it
- NASA name: **"RIGHT SWITCH AND CIRCUIT BREAKER PANEL"**, item 8 in "Figure 3-5 Instrument Panels and Displays". Sheet 1 is "S/C 5 & 6 ONLY" (S6 PDF 57, printed 3-21; its right panel has a different layout); sheet 2 is "S/C 8 & UP" (S6 PDF 58, printed 3-22). The panel sits at the far right of the cabin, right of item 7, "MAIN INSTRUMENT PANEL (PILOT)" [S6 PDF 58]. Utility receptacles are "immediately aft of the left and right switch/circuit breaker panels" [S6 PDF 60 (3-24), as in 03]. A separate "AUX RECP" socket with a coiled cord is drawn at its right edge (not in the game photo; function not stated).
- The encoder controller (the 3-digit dials) is a separate unit "located below and slightly aft of the right switch/circuit breaker panel" [S7 PDF 305, 317 (8-287)]; Fig 3-5 shows it as its own item "ENCODER CONTROLLER" [S6 PDF 58].
- Game wording: S2 p.20 (overview, Fig 2.3.1 = the same drawing as S6 Fig 3-5 sheet 2): "the far-right panel has fuses and switches for controlling the batteries, docking, encoder and so on". S2 p.109 says the batteries "are operated from the Pilots circuit breaker panel" and S2 p.120 calls it "the right/pilot circuit breaker panel". **Resolution: same panel.** NASA's name is "right switch and circuit breaker panel"; "pilot's" is the game's loose name (it is the panel beside the pilot's main instrument panel). The squib ARM/SAFE switches (BOOST-INSERT, RETRO, LANDING ...) are on the LEFT panel, not here [S6 PDF 125 (5-7)]. The game's overview and NASA agree; only the "pilot's" wording is imprecise, not wrong in substance.
- What NASA says lives on this panel (electrical power section): "The MAIN BATTERIES switches, SQUIB BATTERIES switches, BUS TIE switches, agena BUS ARM switch, FUEL CELL CONT, FCAP ... and FC O2 and H2 regulator and heater circuit breakers are located on the right switch/circuit breaker panel" [S6 PDF 124-125 (5-6, 5-7), page image checked]. The fuel cell SECTION power, PURGE, X-OVER and stack switches are on the pilot's main ("right instrument") panel, not here [S6 PDF 124].

## Where the clean drawing is
1. **S6 PDF 58 (Fig 3-5 sheet 2, printed 3-22)**: the only full drawing of this panel with every label. Drawn at a slight angle (about 7 to 10 degrees tilt), all labels legible at 450 dpi crop. There is no flat/front view of the right panel anywhere I found (the left panel has one in Fig 4-1; the right does not).
2. S6 PDF 57 (sheet 1, S/C 5 & 6): older layout, not used.
3. Small, low-detail views: S7 PDF 304 (Fig 8-75, printed 8-274: shows "ENCODER CIRCUIT BREAKER" pointing at the ENCDR cell and the AGENA CONTROL block) and S7 PDF 233 (Fig 8-54, printed 8-202: close-up of the SCAN HTR toggle, "Detail C"); S7 PDF 402 (Fig 8-109, printed 8-373: the RCS HTR ON/OFF toggle, "RIGHT SWITCH AND CIRCUIT BREAKER PANEL").
4. Detail J on S6 PDF 58 (marked "S/C 9 & 12 ONLY"): INDEX EXTEND / OFF / EVA BARS EXT, a variant of one switch. The game photo carries the "EVA BARS EXT" version.

## Layout (S6 PDF 58, S/C 8 & UP drawing; the game photo matches cell for cell except as noted)
The panel is two blocks: a wide LEFT block (4 rows) and a narrow RIGHT block (4 stacked groups), side by side. Every control is drawn with the same hex-nut toggle symbol; **the drawing does not say which cells are breakers and which are switches**. The text names some of them (see "Type" column below). No row summary like the left panel's ("three rows of breakers and one of switches") exists for the right panel (searched: not stated).

Left block:
- Row 1 (9 cells, 8 toggles): [blank cell] | AUX TAPE | SEQ INST | CALIB | BIO MED INST | DCS PWR | FC O2 & H2 (group: REG, HTR) | SCAN HTR.
- Row 2 (9 toggles): RADAR PWR | ACME INV | RCS HTRS (A, B) | TAPE RCDR (PWR, CNTL) | FUEL CELL (CNTL 1, CNTL 2) | FC ΔP.
- Row 3 (7 toggles): ATT IND | AC POWER (wide cell, one toggle) | BIO MED RCDR (1, 2) | RCS HTR | BUS TIE (1, 2).
- Row 4 (7 toggles): MAIN BATTERIES (1, 2, 3, 4) | SQUIB BATTERIES (1, 2, 3).
Right block, top to bottom:
- AGENA CONTROL: four toggles PWR | SQUIB 1 | SQUIB 2 | CNTL (the group title spans all four; SQUIB spans 1 and 2).
- ENCDR (ON over OFF) beside EXT LTS (round knob).
- EMER REL (round covered button, left) beside INDEX EXTEND (round knob, right).
- ENGINE (toggle, ARM over STOP) beside BUS ARM (round knob).
Counts: 31 controls in the left block, 10 in the right block (9 toggles/knobs plus the EMER REL button) = 41. The photo's guard wires are not in the NASA drawing; the drawing instead has two thin vertical rails at the right block (purpose not stated: UNVERIFIED). The blank cell at the left of row 1 is in the NASA drawing too.

Photo corrections from the NASA drawing: "SEQ INST" is "SEQ INST" (not SEO); "RCDR ON/OFF" in the right column is **ENCDR** (encoder), hidden by a wire; the "EMER REL?" is EMER REL; "ENGINE ARM?" is ENGINE ARM (and STOP at the bottom); "FC ΔP" is "FCAP" in the NASA text (FC delta pressure).

## Positions as drawn (S6 PDF 58, 450 dpi crop)
| Control | Positions drawn (top to bottom or around the knob) |
|---|---|
| MAIN BATTERIES 1, 2, 3 | ON (top), OFF (middle), TEST (bottom). Battery 4: no position labels visible on the panel crop; Fig 5-4 draws ON / OFF / TEST for all four [S6 PDF 127 (5-9)] |
| SQUIB BATTERIES 1, 2, 3 | ON (top), OFF (middle), UMB (bottom); same on Fig 5-4 [S6 PDF 127] |
| BUS TIE 1, 2 | ON (top), OFF (bottom) |
| BIO MED RCDR 1, 2 | CONT (top), OFF (bottom) |
| RCS HTR | ON (top), OFF (bottom) |
| AC POWER | IGS (top), OFF (middle), ACME (bottom) |
| ATT IND | WITH FDI (top), OFF (middle), W/O FDI (bottom) |
| EXT LTS (knob) | DOCK (top), OFF (right), EVA (bottom) |
| INDEX EXTEND (knob) | INDEX EXTEND (top), OFF (right), POD EJECT (bottom) on S/C 8; EVA BARS EXT (bottom) on S/C 9 and 12 [S6 PDF 58 and Detail J; text S6 PDF 664 (16-25)] |
| ENGINE (toggle) | ARM (top), STOP (bottom) |
| BUS ARM (knob) | DOCK (top), SAFE (right), EXP (bottom); Fig 5-4 calls it "AGENA BUS ARM SWITCH" with EXP / SAFE / DOCK [S6 PDF 127] |
| ENCDR | ON (top), OFF (bottom) |
| All other breakers | No labels on the drawing (the toggle is just up = closed/ON; NASA: breakers placed "to the closed (up) position" [S6 PDF 71 (4-6)], stated for the left panel; assumed the same here: UNVERIFIED) |

Game photo check: the photo reads the same positions (BUS ARM DOCK/SAFE/EXP, EXT LTS DOCK/OFF/EVA, ATT IND WITH FDI / OFF / W/O FDI, INDEX EXTEND OFF / EVA BARS EXT). The photo's "AC POWER IGS / OFF" lacks the third label (ACME, hidden by a wire). Fig 5-4 shows MAIN BATTERIES order ON, OFF, TEST top to bottom.

## Row 1 (left block)
| Label | NASA document (real spacecraft) | Page | Game / agreement |
|---|---|---|---|
| (blank) | Blank cell in the drawing; no label | S6 PDF 58 | photo: blank, agrees |
| AUX TAPE | Label only. (A different "AUX TAPE OFF-ON/RESET" toggle is on the computer panel and runs the auxiliary tape memory [S7 PDF 218, 184].) Whether this breaker powers it: not stated | S6 PDF 58 | game: aux tape memory exists [S2 pp.21, 76]; this breaker not described |
| SEQ INST | Label only. Meaning of "SEQ INST" not stated | S6 PDF 58 | not described |
| CALIB | Label only. NASA says a calibrate signal exists "whenever the CALIB switch in the spacecraft cabin is actuated" (PCM programmer calibration voltage) [S6 PDF 359 (10-37)]; whether that is this cell or the CALIB NO 1 / NO 2 toggle on the center communication panel is not stated | S6 PDF 58, 359 | not described |
| BIO MED INST | Circuit breaker. The bio-med tape recorders get main-bus power "through the BIO-MED INST circuit breaker and the CONT position of the BIO-MED RCDR switch"; the bio-med power supply also gets main-bus power through it | S6 PDF 390 (10-68), image-read OCR | not described. If open: recorders and bio-med power supply lose that feed (follows from the sentence: not stated as a consequence) |
| DCS PWR | Label only. The Digital Command System (DCS) is the ground-to-spacecraft command link, "operational from pre-launch until adapter equipment section separation" [S6 PDF 252-253 (9-8, 9-9)]. A breaker named DCS PWR: not described | S6 PDF 58 | not described |
| FC O2 & H2: REG | Circuit breaker ("regulator and heater circuit breakers" for fuel cell O2 and H2); inoperative on spacecraft 6; named "CRYO O2 and H2" on spacecraft 10-12. What exactly it powers: not stated | S6 PDF 125 (5-7) | not described |
| FC O2 & H2: HTR | as REG: heater circuit breaker | S6 PDF 125 | not described |
| SCAN HTR | "Switch" (Fig 8-54 Detail C). Power for the horizon-sensor head heaters and the SCANNER lamp (28 V dc "supplied through the SCAN HTR switch"). Heaters are thermostatically controlled and run any time the switch is on. Pilot turns it on (with SCANNER PRI-OFF-SEC) pre-launch to energize the primary horizon sensor | S7 PDF 259 (8-228), 236, 233 (8-202) | S2 p.54: "SCAN HTR controls the scanner heater"; agrees |

## Row 2 (left block)
| Label | NASA document (real spacecraft) | Page | Game / agreement |
|---|---|---|---|
| RADAR PWR | Circuit breaker "located on the right switch/circuit breaker panel". Radar standby: switch RADAR PWR breaker ON, then RADAR switch (main console) to STBY; 60 s warm-up, then RADAR to ON; the radar then transmits | S7 PDF 269 (8-238, image-read), S9 PDF 217 (8-216) | S2 p.55: same procedure; but S2 p.55 also says "The RADAR PWR switch controls the radar power circuit breaker" (muddled; same thing) |
| ACME INV | Label only. NASA text: the ACME power inverter converts spacecraft dc to 26 V, 400 Hz ac for the attitude control electronics, horizon sensors, rate gyros, FDI, and the rendezvous radar angular reference, and "the ACME inverter is utilized when the IMU is off" (the IGS inverter is the primary source). The breaker named ACME INV is not described | S7 PDF 41 (8-42), 20 (8-21); S9 PDF 21 | not described. If off: not stated |
| RCS HTRS: A | Label only; presumably one of two heater feeds (not stated) | S6 PDF 58 | not described |
| RCS HTRS: B | as A | S6 PDF 58 | not described |
| TAPE RCDR: PWR | Label only | S6 PDF 58 | not described |
| TAPE RCDR: CNTL | Circuit breaker. With T/M CONTROL on R/T & ACQ, placing it ON pre-launch puts coaxial switch 2 in position 1, connecting the acquisition aid beacon to the diplexer | S6 PDF 257 (9-13, OCR "TAPE RCDR-CTfL") | not described |
| FUEL CELL: CNTL 1 | Circuit breaker. Part of the fuel cell turn-on logic: with FUEL CELL CNTL 1 and CNTL 2 breakers engaged and the SECTION 1 and 2 POWER switches ON, the H2/O2 supply and H2O shutoff valves are energized open | S6 PDF 127 (5-9, Fig 5-4 note 3, image-read); S6 PDF 125 | S2 p.110 says fuel cell section and stack switches go ON before launch; breakers not described |
| FUEL CELL: CNTL 2 | as CNTL 1 (redundant pair) | S6 PDF 127 | same |
| FC ΔP | NASA text calls it "FCAP" (circuit breaker). The FC delta-pressure (FCAP) telelights on the center panel show red "when a malfunction exists" (out-of-tolerance differential pressure). That the FCAP breaker powers those lights is the obvious reading but not stated | S6 PDF 125, 138 (5-20) | S2 p.113: FC1 dP / FC2 dP lights at out-of-tolerance limits; consistent |

## Row 3 (left block)
| Label | NASA document (real spacecraft) | Page | Game / agreement |
|---|---|---|---|
| ATT IND (WITH FDI / OFF / W/O FDI) | Label only. FDI = flight director indicator [guidance text]; what each position does: not stated (searched S6, S7, S9) | S6 PDF 58 | not described: UNVERIFIED |
| AC POWER (IGS / OFF / ACME) | "AC POWER selector". It chooses the source of the 400 Hz ACME power: "An AC POWER switch allows the pilot to select the source of 400 cps ACME power". It also "allows the pilot to turn the IGS inverter on without operating the platform or electronics circuits". The horizon sensor's 26 V ac comes from the IGS or ACME inverter "depending on the position of the ac POWER selector" | S7 PDF 44 (8-45), 54 (8-55), 259 (8-228) | S2 pp.43-46 describes ACME modes and the platform; AC POWER switch not described |
| BIO MED RCDR 1, 2 | Switches. The bio-med recorders run from main-bus power "through the BIO-MED INST circuit breaker and the CONT position of the BIO-MED RCDR switch (1 and 2)". Each recorder runs up to 100 hours at 0.0295 in/s; crew controls them; recorders are removed after the mission to read the tape | S6 PDF 390 (10-68) | not described |
| RCS HTR (ON/OFF) | Switch (right panel). Powers the heaters on the 8 oxidizer solenoid valves of the Re-entry Control System thrusters "to prevent freeze-up" | S7 PDF 402 (8-373, Fig 8-109), 405 (OCR "RCS H_ switch"), 403 | not described. If off: heaters off (the stated purpose is freeze-up prevention; the consequence of leaving it off is not stated) |
| BUS TIE 1, 2 | Switches. Method of connecting the main bus to the OAMS squib buses and the common control bus. "Remain in the OFF position unless the necessity arises where the pilots must use main bus power to fire the squibs" | S6 PDF 136 (5-18); drawn on Fig 5-4 [PDF 127] | S2 p.111: normally OFF; can tie the main bus to the common control and OAMS squib bus if the squib batteries fail; agrees |

## Row 4 (left block)
| Label | NASA document (real spacecraft) | Page | Game / agreement |
|---|---|---|---|
| MAIN BATTERIES 1-4 | Four silver-zinc main batteries (45 A-hr). ON feeds the main bus; **TEST** removes that battery from the bus so its voltage/current can be read (voltmeter selector on BT). Pre-launch ON (redundancy at launch). After booster separation / insertion OFF "to conserve" main battery power (the fuel cells carry the load). At Tr-256 back ON ("must be returned to the ON position ... no automatic switching") because the adapter with the fuel cells will separate; the BTRY PWR light is amber at Tr-256 and green when all are connected. After landing stay ON for recovery | S6 PDF 121 (5-3), 134-137 (5-16 to 5-19), 139 (5-21), 140 (5-22), 142-143 (5-24, 5-25) | S2 pp.109-112 agrees (ON at launch, OFF after insertion, ON again at Tr-256); S2 p.109: test one battery at a time |
| SQUIB BATTERIES 1-3 | Three silver-zinc squib batteries (15 A-hr, high-discharge). Power the common control bus and (batteries 1 and 2) the two OAMS squib buses, which feed the squib buses for BIA, retrograde, landing and agena. UMB (umbilical) on 1 and 2 pre-launch lets external ground power feed the squib buses; crew sets them ON before launch; they stay ON for the whole mission until landing | S6 PDF 121, 134 (5-16), 135 (5-17), 140 (5-22) | S2 pp.110-111: UMB at first, ON when the crew enters; agrees |

## Right block
| Label | NASA document (real spacecraft) | Page | Game / agreement |
|---|---|---|---|
| AGENA CONTROL: PWR | Label only. The text names a "BUS ARM" switch ("agena BUS ARM switch will be used according to the mission requirements") but no "Agena control" breakers | S6 PDF 58, 136 | not described |
| AGENA CONTROL: SQUIB 1, SQUIB 2, CNTL | Label only; not described | S6 PDF 58 | not described |
| ENCDR | Circuit breaker. "The Command Link System is energized by placing the ENCDR circuit breaker in the ON position"; the command link is then usable. When it is turned ON the radar starts being pulsed by the Time Reference System pulse. Pilot enters a 3-digit command (outer dial, inner dial, XMIT binary switch), e.g. 251 = TDA Acquisition Lights ON | S7 PDF 311 (8-281, image-read), 312 (8-282), 304 (8-274) | S2 p.58: encoder breaker must be ON; command example 2-5-1; agrees |
| EXT LTS (DOCK / OFF / EVA) | Switch. In DOCK (called "DOCK LT or EXT LT on spacecraft 8 through 12") it applies main bus power through the CABIN LIGHTS circuit breaker to the dock light, used in the approach phase. EXT LTS also turns on the lights on each EVA handhold that light the adapter area on the dark side of the orbit | S6 PDF 505 (13-11), 664 (16-25) | S2 p.120: "exterior light switch ... DOCK ... spotlight on top of the spacecraft"; agrees. EVA position: not described in S2 |
| EMER REL | Described as "an emergency release switch in the crew station"; pressing it fires pyrotechnic igniters at each of the three docking latch locations, separating the latch receptacles from the spacecraft; the pilots then thrust back out of the cone. "The emergency separation sequence permanently removes the docking capabilities of the spacecraft." Panel location: from the drawing (round covered button) | S6 PDF 511 (13-17), 512 (13-18); drawing S6 PDF 58 | S2 pp.122-123: covered button, cuts latches, disables re-docking; agrees |
| INDEX EXTEND (OFF / POD EJECT, or EVA BARS EXT) | Switch. In the INDEX EXTEND position it applies OAMS squib bus 1 and 2 power to the index bar extend relay coils **through the BUS ARM switch**; the relays fire the index bar's extend igniters. Pilots use the extended bar to line up with the docking cone. The same switch, as INDEX EXTEND-POD EJECT, fires two guillotines that free the EVA handholds and footrest; labeled INDEX EXTEND-EVA BARS EXT on spacecraft 9 and 12. (On the S/C 5 text, a POD EJECT switch on this panel ejects the rendezvous evaluation pod.) | S6 PDF 505 (13-11), 664 (16-25); S7 PDF 323 (OCR 8-293) | S2 p.120: set to INDEX EXTEND until extended, then OFF; the bar cannot be retracted. The EVA BARS function is not described in S2 |
| ENGINE (ARM / STOP) | Switch. With ENGINE in ARM the target vehicle's propulsion systems can be used (attitude changes, orbit changes) while docked; set to STOP at the end of a maneuver. Ground command cannot override pilot-switched functions "such as engine arm" | S6 PDF 509 (13-15) | S2 p.123: ENGINE switch ARMs the target vehicle engine; S2 p.127 calls the Agena PPS arm switch "ARM STOP sw"; agrees |
| BUS ARM (DOCK / SAFE / EXP) | Switch (the "agena BUS ARM switch"). It is in the path that sends OAMS squib bus power to the index bar extend relays (so index bar extend works only through it) and "To Agena circuits" in Fig 5-4. Which position does what: not stated. Meaning of EXP not stated (UNVERIFIED; possibly experiment: nothing says so) | S6 PDF 127 (5-9), 505 (13-11), 136 (5-18) | S2 p.120 does not name BUS ARM; not described |

## Summary of plain-language wording (short)
- MAIN BATTERIES: four main batteries. ON feeds the main bus; TEST checks one battery's voltage (only one at a time) [S6 PDF 134-143; S2 p.109].
- SQUIB BATTERIES: three batteries for the firing circuits; UMB = ground power while on the pad; ON in flight [S6 PDF 134-135].
- BUS TIE: emergency link that lets main power fire the squibs; normally OFF [S6 PDF 136].
- ENCDR: power for the command encoder you use to send codes to the Agena [S7 PDF 311].
- RADAR PWR: first step to switch the rendezvous radar on (then RADAR to STBY) [S7 PDF 269].
- SCAN HTR: keeps the horizon sensor warm [S7 PDF 259].
- RCS HTR: keeps the RCS oxidizer valves from freezing [S7 PDF 402].
- AC POWER: picks which inverter (IGS or ACME) supplies the 400 Hz ac power [S7 PDF 44, 54, 259].
- BIO MED INST / BIO MED RCDR: power and switches for the crew's biomedical tape recorders [S6 PDF 390].
- EXT LTS: dock light and EVA handhold lights [S6 PDF 505, 664].
- INDEX EXTEND: fires the docking index bar out (one way, through BUS ARM); also frees EVA bars [S6 PDF 505, 664].
- EMER REL: emergency docking release; permanent [S6 PDF 511-512].
- ENGINE ARM/STOP: lets you use the Agena engines while docked [S6 PDF 509].
- FUEL CELL CNTL 1/2: control power for fuel cell valves; needed with section power ON [S6 PDF 127].
- Everything else: label only; no NASA explanation found (see below).

## Documented vs not documented
- Documented with a text sentence (function + how): MAIN BATTERIES, SQUIB BATTERIES, BUS TIE, RADAR PWR, ENCDR, BIO MED INST, BIO MED RCDR, SCAN HTR, RCS HTR, AC POWER, EXT LTS, INDEX EXTEND, EMER REL, ENGINE, FUEL CELL CNTL 1/2 (partly).
- Partly: BUS ARM (role in the index bar path, positions' meaning not stated), FC ΔP / FCAP (breaker named, lights described), TAPE RCDR CNTL (one pre-launch use), CALIB (a cabin switch of that name is described; link unproven), DCS PWR (the DCS is described, the breaker is not), FC O2 & H2 REG/HTR (named only), ACME INV (inverter described, breaker not).
- Label only (nothing found): AUX TAPE, SEQ INST, RCS HTRS A and B, TAPE RCDR PWR, ATT IND (WITH FDI / OFF / W/O FDI), AGENA CONTROL PWR / SQUIB 1 / SQUIB 2 / CNTL.
- "What fails if off": stated almost nowhere. Where a sentence says a switch "energizes" something, the consequence of the opposite position is only implied; I wrote "not stated" instead of guessing.

## Source conflicts and notes
- Panel wording: S2 p.109 "Pilots circuit breaker panel" versus NASA "right switch and circuit breaker panel": same panel; NASA wins on the name (see above).
- Squib batteries after landing: NASA S6 PDF 137 (5-19) says "SQUIB BATTERIES switches 1 and 2 to OFF position" (to remove power from the OAMS squib buses), then in the same paragraph "SQUIB BATTERIES switch 1 and the MAIN BATTERIES switches will remain in the ON position". These two sentences conflict inside NASA's text (squib battery 1 is both turned OFF and left ON; image-read). S2 p.112 says "SQUIB BATTERIES 2 and 3 are set to OFF ... switch 1 ... remain ON". The game follows the second NASA sentence. Which is right: unresolved (UNVERIFIED); the game's choice is at least self-consistent.
- Index extend label: S/C 8 drawing "POD EJECT"; S/C 9 and 12 "EVA BARS EXT" [S6 PDF 58 Detail J, 664]; the game photo uses EVA BARS EXT, i.e. the game is a mix of the S/C 8 & UP drawing and the S/C 9/12 switch label.
- S/C 5 and 6 right panel (Fig 3-5 sheet 1, S6 PDF 57) differs; not used. The Fig 8-75 panel (S7 PDF 304) shows a "DOCK LT" label where the S/C 8 & UP drawing shows EXT LTS: a different configuration.
- S6 PDF 125 lists "FUEL CELL CONT" and "FCAP"; the drawing prints "FUEL CELL CNTL 1/2" and "FC ΔP". Same items.
- Game manual p.55 wording "RADAR PWR switch controls the radar power circuit breaker": it is the same control (a breaker); NASA wins ("RADAR PWR circuit breaker").

## Panel drawing: SVG feasibility
- Good: S6 PDF 58 shows all 41 cells and their group boxes (FC O2 & H2, RCS HTRS, TAPE RCDR, FUEL CELL, BIO MED RCDR, BUS TIE, MAIN BATTERIES, SQUIB BATTERIES, AGENA CONTROL) with legible labels at 450 dpi. The grid structure is regular (rows of equal cells, one wide cell each for AC POWER and ATT IND), so a redraw can be built from a clean rectangle grid rather than by tracing; the game photo (same layout, front-on) gives better proportions than the angled NASA drawing.
- Caveats: bilevel scan (about 154 ppi native for the sheet), panel shown at an angle, text partly blurry (the small position labels such as TEST / UMB under batteries are legible but tiny). Battery 4 TEST label is missing on the drawing but present on Fig 5-4. The guard wires in the game photo and the two vertical rails in the drawing should not be treated as NASA facts. The AUX RECP socket and coiled cord at the right edge are outside the panel proper.
- Positions of knob selectors (EXT LTS, INDEX EXTEND, BUS ARM) are round hex-nut knobs with labels around them; toggles use label above/below.
- License: the NASA drawing is NASA/McDonnell material (NTRS copy of the family is "GOV_PUBLIC_USE_PERMITTED" per the coordinator, not re-verified; the ibiblio/SourceForge copy used for Fig 3-5 has no stated license: UNVERIFIED). The game photo is a copyrighted render: layout/label reference only.

## Open questions / UNVERIFIED
- Which cells are circuit breakers and which are switches (drawing is uniform; text covers only some).
- Function of AUX TAPE, SEQ INST, RCS HTRS A/B, TAPE RCDR PWR, ATT IND, AGENA CONTROL (all four), and the exact job of BUS ARM's DOCK / SAFE / EXP positions and of EXP.
- DCS PWR, CALIB, ACME INV, FC O2 & H2 REG/HTR, FC ΔP: only inferred from names; no breaker-specific sentence.
- Battery 4 TEST label (Fig 5-4 says yes; the panel crop shows none).
- Squib battery handling after landing (NASA text internally inconsistent).
- What each position does when "off/open": not stated for almost every control.
- The "AUX RECP" socket beside the panel (label only).
- S9 (NTRS) used only for the radar page (PDF 217) and the AC power description (PDF 21, 44); its date relation to S6/S7 is unchecked, as in 03.
