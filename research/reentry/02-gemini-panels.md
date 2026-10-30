# Gemini cabin panels
Level: basic
Applies to: Reentry game, Project Gemini module, manual "LAST UPDATED: 1. December 2025" [S2 p.2]

Source S2 = Gemini game manual (see sources.md). All page numbers are PDF pages. Tags: **game behavior** = stated by the game manual; **real spacecraft** = only where the manual itself says so (it rarely does). Labels "as printed" were read by eye from page images (there is no text layer in the pictures), so a misread is possible; unreadable items are marked UNVERIFIED.

Coverage: priority (1) main instrument panel area (center upper/lower assemblies, commander and pilot instruments) and (2) switch / circuit-breaker panels are only PARTLY done, because the manual does not draw the commander, pilot, left, right or overhead panels in close-up (see "Not done" and "Feasibility").

## Key structural finding: what the manual actually shows
- Unlike the Mercury manual, there are no per-panel overview pages. There is ONE overview drawing (Fig 2.3.1, "Main panels of the Gemini Spacecraft, from SEDR 300, Vol 2") [S2 p.20] and then close-up in-game screenshots of individual controls scattered through the system chapters (mostly 3D renders, not line art) [S2 pp.31-143].
- The manual says the panels are divided into 7 sections: far left and far right panels plus the overhead panels are mostly circuit breakers and system power control; far-left has circuit breakers and squib control for launch, ascent and radio; the overhead panel has fuses and switches for thrusters, thruster logic, lights etc.; the far-right panel has fuses and switches for batteries, docking, encoder etc. [S2 p.20] (game behavior).
- Main panels consist of 4 sections: center panel, center pedestal panel, commander's panel, pilot's panel [S2 p.20].
  - Commander's panel: IVI displays, a flight director and attitude indicator (FDAI), event timer, gauges for the launch vehicle stages [S2 p.20].
  - Pilot's panel: another FDAI, the OBC input and display unit, fuel cell control, auxiliary tape memory controls, mission-specific controls [S2 p.20].
  - Center panel: communication equipment controls, elapsed time system, ECS controls [S2 p.20].
  - Center pedestal: maneuvering controls and mode switches, computer mode control [S2 p.21].
- The overview drawing (read by eye, [S2 p.20]) has numbered callouts: 1 secondary O2 control handle (command pilot side); 2 abort control; 3 left switch and circuit breaker panel; 4 main instrument panel (command pilot); 5 main instrument panel, center console (upper assy); 6 overhead switch and circuit breaker panel; 7 main instrument panel (pilot); 8 right switch and circuit breaker panel; 9 secondary O2 control handle (pilot side); 10 main instrument panel, center console (lower assy); 11 water management panel; 12 center console; 13 suit temperature panel. Also an "encoder controller" and details E, F, G, H, J, K; the page footer says "S/C 8 & UP". Upper ECS pull handles are labelled O2 HIGH RATE RECOCK, CABIN VENT, SNORKEL, CABIN RECIRC, WATER SEAL, CABIN VENT CHECK VALVE [S2 p.20]. Spatial layout from the drawing: left switch/breaker panel far left; commander's panel left of center; center console (upper, then lower, narrowing toward the bottom) in the middle; pilot's panel right of center; right switch/breaker panel far right; overhead panel top right; hand-controller and handles around the edges.

## Control types and how the game operates them [S2 pp.9-11] (game behavior)
- Protected button: cover opens with left click, closes with right click; applies to all cover types [S2 p.9].
- Trigger button: pressed once to activate; some are irreversible, some can be pressed at any time [S2 p.9].
- Switch: vertical or horizontal; vertical pushed up with left click, down with right click; horizontal left with left click, right with right click; two or three positions [S2 p.9].
- Selector (rotary): right click = rightwards (counterclockwise), left click = leftwards (clockwise) [S2 p.10].
- Pull handle: pulled down with left click (activates), pushed up with right click (deactivates) [S2 p.10].
- Computer buttons: work like trigger buttons [S2 p.10].
- Gauges: circular and vertical types; some have a selector choosing the source [S2 p.10].
- Status lights: lit = on or needs attention. Sequencer push-light buttons are unlocked by opening a small black protection handle on the left, then pressing; closing the handle locks them. Example: SEP SPCFT unlocked, IND RETRO ADD locked [S2 p.11].
- Switch-lights in the sequencer illuminate amber when an action is expected; green when done (per the individual cites below) [S2 p.91].

## Center console, upper assembly (the "main ECS panel" area), Fig 4.6.1 [S2 p.31 image; text pp.31-36]
Image: 3D render, 863x814, all labels legible. Layout and controls, top to bottom:

Row 1 (top):
| Label as printed | Type / positions | Location | Function (game behavior) | Page |
|---|---|---|---|---|
| SUIT FAN | toggle; labels OFF, NO 1, NO 1&2 | top left | Always placed to NO 1 & 2 but can be controlled in emergencies/failures; can also be placed in No. 1 and No. 2 and use breakers to control fans | p.31 img, p.35 |
| PRIMARY: PUMP A, RES LO, PUMP B | two toggles ON/OFF and 3 round lights above them (pump A, RES LO, pump B) | top, left of center | Each loop has two pumps; both pumps in both circuits ON during the mission; a light per pump lit when operating; RES LO lit when coolant reservoir is low | p.31, p.36 |
| EVAP PRESS | round light, top center | top center | Lights when evaporator pressure is above 4.0 psig, off below | p.31, p.36 |
| SECONDARY: PUMP A, RES LO, PUMP B | same as primary | top, right of center | same as primary | p.31, p.36 |
| RAD FLOW (FLOW / BYPASS) | toggle | row 1, center-left | FLOW in orbit; BYPASS for the first 30-45 min (radiators hot in ascent/initial orbit) | p.31, p.36 |
| EVAP HEAT (ON? / OFF) | toggle | row 1, center | Energizes the evaporator heater to heat water in the evaporator before dumping. Top label not legible (UNVERIFIED) | p.31, p.36 |
| EVAP MAX FLOW / NORM | toggle | row 1, center-right | Labels read by eye; function not described in the text I read (UNVERIFIED) | p.31 |
| O2 HI RATE | guarded toggle (cover) at far right, ON/OFF | row 1, far right | Enables high-rate oxygen flow manually; normal operation restored by OFF and the O2 HIGH RATE RECOCK handle | p.31, p.35 |

Row 2:
- JETT FAIRING: round covered push button, left edge. In the sequence, pressed after SSECO to jettison sensor covers (horizon sensors, antenna, rendezvous radar) [S2 p.97] (game behavior).
- SEP SPCFT: square switch-light below it; lit amber then pressed to separate from the launch vehicle, turns green when successful [S2 p.97].
- TEMP indicator (vertical gauge, cabin and suit needles, degrees F): dual indicator of cabin and suit-circuit temperature [S2 p.34].
- PRESS indicator (vertical dual gauge, labels CABIN PRESS psig and P CO2 SUIT mmHg): cabin pressure (psi) and CO2 amount in the suit inlet (mmHg) [S2 p.34].
- SEC O2 indicator (vertical dual gauge, LEFT/RIGHT, PSIA x100): pressure in the two secondary oxygen containers [S2 p.34].
- Annunciator lights, right column: O2 HIGH RATE (lit when high-rate valve open [S2 p.35]); RCS HTR, RCDR TAPE (function not found in text, UNVERIFIED); then ECS HTRS (lit if ECS heaters manually activated [S2 p.35]); FC1 dP, FC2 dP (out-of-tolerance delta pressure lights for fuel cell 1 and 2 [S2 p.113]).

Row 3 (middle):
- IND RETRO ATT: switch-light, left. Amber at Tr-256; pressing it (green) places FDI needles and inertial platform to BEF mode [S2 pp.99-100].
- BTRY PWR: switch-light; illuminated at Tr-256 to remind batteries must be turned on (amber), green when connected [S2 p.114].
- RCS: switch-light; green when pressed and energized, enables RCS rings A and B; activating it disables OAMS for the rest of the mission [S2 pp.68, 100].
- SEP OAMS LINE: switch-light; at Tr-30 amber; pressing closes OAMS propellant lines and disables OAMS, turns green [S2 pp.100-101].
- CRYO gauge (vertical dual gauge; QUANT % scale 0-100 and PSIA 0-1000, with red band marking where thermal pressurization may be discontinued): monitors quantity and pressure of cryogenic substances [S2 p.34]. Selector below it with positions OFF / O2 / H2 [S2 p.34 text: "OFF, Oxygen and Hydrogen"].
- A START/STOP guarded toggle with a HOURS-MIN-SEC drum counter and a DECR/INCR black handle in the center. Text describes a "mission elapsed time digital clock" that can be adjusted, started and stopped [S2 p.62], but the manual does not label this specific group as that clock (mapping UNVERIFIED).
- H2 VAC TANK (OPEN / CLOSED toggle): vents the area between inner and outer wall of the RSS H2 tank to space when OPEN; keep CLOSED otherwise [S2 p.111].
- TDA CONTROL: RIGID / OFF / STOP toggle and UNDOCK / OFF toggle [S2 pp.31 img, 123]. RIGID-OFF-STOP: activates the rigidize system; STOP stops power to the rigid mooring device. UNDOCK: undocks from the TDA as backup to the command link [S2 p.123].
- PROP gauge (vertical, "PROPELLANT"; scales labelled; left side psi/temperature per text) and a rotary selector at lower right (labels include OAMS, RCS, A (X10), B (X10), REG/F, EXP: partly illegible, UNVERIFIED). With selector in OAMS the PROP indicator shows propellant temperature and tank pressure; RCS ring positions show RCS propellant [S2 pp.65-66].

Row 4 (bottom of this crop):
- CRYO HEATERS: two guarded toggles O2 and H2 (AUTO / OFF / ON). AUTO energizes/de-energizes the heaters automatically; manual by OFF and ON [S2 p.35].
- Lower right: a handle (PULSE / SQUIB? labels cut off), UNVERIFIED.
- Below this crop the panel continues with BEACON CONTROL (see Comm panel).

## Upper ECS panel (pull handles), Fig 4.6.2 [S2 p.32 image; text pp.32-33]
Five pull handles with printed labels: CABIN RECIRC, SNORKEL, CABIN VENT, WATER SEAL, O2 HIGH RATE RECOCK [S2 p.32 image]. The panel is just above the main ECS panel [S2 p.31].
- CABIN AIR RECIRC: controls the recirculation valve admitting cabin air into the suit circuit for odor and CO2 removal, without decompressing the cabin [S2 p.32].
- SNORKEL: cabin air inlet for entry of air and ventilation during landing and post-landing [S2 p.32].
- CABIN VENT: opens the cabin outflow valve to decompress in emergencies and ventilate during landing [S2 p.33].
- WATER SEAL: makes the capsule watertight in landing by closing the relief valves [S2 p.33].
- O2 HIGH RATE RECOCK: manually returns the oxygen high-rate valve to closed, restoring normal flow and re-enabling a high-rate start [S2 p.33].
- Cabin repressurize knob: re-pressurizes after depressurization [S2 p.35]. The manual says the suit flow was "realistically" controlled by controls on the lower center pedestal between the seats, and is automatic in the game (real spacecraft, as stated by the manual) [S2 p.35]; pre-launch suit flow adjustment is "not simulated" [S2 p.37].

## Center console, lower assembly: communication panel [S2 p.143 image 1047x747; text pp.142-143]
Image: 3D render, fully legible grid of labels. Left block, three columns:
- Column 1 (left): MODE selector (rotary: UHF, INT, HF, HF DF); three thumbwheel digit displays labelled UHF, INT, HF (show "2 1 0" in the image); SILENCE toggle (NO 1 / NO 2).
- Column 2 (middle): UHF thumbwheel (labelled S Q); UHF toggle (OFF / NO 1 / NO 2, guarded); HF thumbwheel (S Q); HF toggle (OFF / ADPT / RNTY); KEYING toggle (VOX / PTT / CONT INT PTT).
- Column 3: MODE selector (same positions), thumbwheels UHF / INT / HF, RECORD toggle (OFF / CONT / MOM).
Right block:
- BEACON CONTROL: RESC toggle (ON / W/O LT); S-BAND toggle (CONT / CMD); C-BAND toggle (CONT / CMD); guarded by a common bar.
- TM CONTROL: CALIB toggle (NO 1 / NO 2); SBY TM toggle (R/T / D/T); T/M toggle (R/T & ACQ / CMD / R/T-D/T).
- Bottom row: TAPE PLYBK toggle (CONT / CMD / RESET); ANT SEL toggle (RNTY / ADPT); HF ANT toggle (EXT / OFF / RET).
Behavior in the text (game behavior): the communication system is controlled by the lower center panel [S2 p.142]. At insertion set HF ANT to EXT (extends in one minute), then OFF; S-BAND and C-BAND in CMD; HF is selected with HF select to RNTY and MODE switch 1 or 2 to HF; UHF is primary in orbit, HF needed after re-entry; before adapter separation set T/M CONTROL to R/T & ACQ and ANT SEL to RNTY; HF is retracted (can take over a minute) [S2 p.143]. The manual notes that the C-key menu has circular radio buttons below the radio panel [S2 p.12].
Open: function text for SILENCE, KEYING, RECORD, CALIB, SBY TM, TAPE PLYBK, RESC is not given in the text I read (UNVERIFIED).

## Power monitor and battery switches [S2 pp.107-113]
- Power system monitor [S2 p.107 text; images pp.107, 113]: a delta pressure indicator, three dual vertical-readout ammeters and an AC/DC voltmeter; two selectors choose what to monitor [S2 p.107]. Image labels: scales O2 P (psi), 1A, 1B/1C, 2A/2B, 2C (0-25), DC/AC VOLTS (about 20-30); a rotary labelled "dP SELECT" with positions OFF, H2, H2O (several on each side); a second rotary below the voltmeter with positions 1A, 1B, 1C, 2A, 2B, 2C, C, S2, S1, M, BT (read by eye).
  - Ammeters monitor individual fuel cell stack currents 1A to 2C; voltmeter shows fuel cell stack voltage, common control bus voltage, OAMS squib 1 and 2 voltage, IGS inverter output voltage, main bus voltage and battery tests, per the selector [S2 p.113]. Mapping of C/S1/S2/M/BT letters to those items is plausible but not stated (UNVERIFIED).
  - The delta pressure indicator shows O2 vs H2 and O2 vs H2O differential pressure; out-of-tolerance lights FC1/FC2 illuminate at limits [S2 p.113].
- MAIN BATTERIES switches 1-4 (toggles, ON / OFF / TEST printed; TEST appears under 1-3) and SQUIB BATTERIES switches 1-3 (ON / OFF / UMB) [S2 pp.109-110 images], on the pilot's circuit breaker panel [S2 p.109]. Test: monitor selector in BT, battery switch in TEST, voltmeter shows battery voltage; only one battery in TEST at a time [S2 p.109]. Squib switches are at UMB (umbilical) initially, ON when the crew enters and for the rest of the mission [S2 p.110].
- Fuel cell controls on the pilot's panel: for each fuel cell, three switches control the stack power (1A, 1B, 1C; 2A, 2B, 2C) and one controls the fuel cell power [S2 p.107]. Individual switch images not shown.
- Other switches named in text (no close-up read): BUS TIE (normally OFF; ties main bus to common control and OAMS squib bus) [S2 p.111]; O2 PURGE, H2 PURGE and X-OVER [S2 p.112]; RETRO PWR, RETRO JETT, four RETRO ROCKET SQUIBs, BOOST-INSERT squib, LANDING squib (ARM/SAFE) [S2 pp.93, 112].
- CRYO gauge selector: displays RSS reactants [S2 p.114].

## Commander and pilot instrument panels [S2 pp.20-22, 49-51, 62, 94-96, 65]
Only partly shown in close-up. Items identified:
- FDAI (flight director and attitude indicator), two, one each side [S2 pp.21, 51]. Line drawing "Flight Director Indicator" and "Flight Director Controller" with REF selector (PLAT / RDR / CMPT) and MODE selector (RATE / MIX / ATT) [S2 p.50]. REF selects RADAR, PLATFORM or COMPUTER; MODE selects rate, pointer direction or mix; a scale selector HI/LO sets needle sensitivity; the sphere is always slaved to platform gimbals [S2 p.49]. The in-game crop shows a SCALE RANGE HI / LO knob at lower left of the indicator [S2 p.51 img].
- IVI (incremental velocity indicator): three digit axes (longitudinal, lateral, vertical) [S2 p.74]; lights +FWD / AFT / L / R / UP / DN are mentioned in the text [S2 pp.82, 85]. IVI schematic only [S2 p.75]. No in-game close-up read.
- PROP QTY gauge (vertical, 0-100) on the commander panel [S2 p.65 text "indicator on the commander panel shows the propellant quantity left"; image p.65].
- Event timer (image p.62): STBY / STOP toggle (left), MIN SEC drum display, UP / DN toggle with arrow (right), INCR / DECR selector handle (bottom; ticks 1 s, 10 s, 1 min). Function switch in STBY activates the clock, STOP stops it; with STBY, UP counts up, middle pauses, DN counts down; the selector at INCR/DECR ticks adjusts by 1 s, 10 s, 1 min [S2 p.62].
- Other clocks: Accutron clock (GMT, command pilot, battery) and mechanical clock (GMT, date, stopwatch, pilot) [S2 pp.62-63]; electronic timer shows time to retrograde (Tr), time to equipment reset (Tx), and elapsed time from lift-off [S2 pp.61-62].
- Launch-vehicle gauges (commander panel, image p.94): ABORT label and lights; LONG-ACCEL circular gauge (scale about -6 to 21); lights ATT RATE, SEC GUID, ENGINE I (two), ENGINE II; vertical gauges FUEL 1 / OXID and FUEL 2 / OXID. A small covered toggle labelled "SAFE" below ABORT is partly hidden (UNVERIFIED) [S2 p.94 img]. Cited behavior: pre-launch lights extinguished; abort must be executed if ABORT light, any ENGINE I indicator, or ATT RATE illuminates after lift-off [S2 pp.93-94]; STAGE I/II needles show propellant, ENGINE I lights red when pressure below 68 percent after shutdown [S2 p.96]; LONGITUDINAL ACCELEROMETER rises with acceleration [S2 p.95].
- Altimeter: three needles; long thin needle with triangle = x10000 ft, short needle x1000, long needle x100 [S2 p.96] (example in the manual reads 13490 ft).
- Range/range-rate meter and radar lights/switches: LOCK ON light; RADAR switch OFF/STBY/ON (STBY warms up for 60 s; ON tries to connect with target); RADAR PWR switch (right circuit breaker panel) [S2 pp.55-56, 54]; Radar Range indicator [S2 p.56].
- Horizon scanner controls: SCANNER light (lit if horizon not detected; normal for 90 s after covers jettison); SCANNER switch PRI / OFF / SEC; SCAN HTR switch [S2 pp.53-54 image, text]. FAIRING JETT button on the main console [S2 p.53 img].
- OBC controls on the pilot's panel [S2 p.20] and center pedestal (computer mode) [S2 p.21]; see next section.
- g-force gauge, 10.6K and 40K lights, landing buttons: see Landing.

## Computer controls and MDIU [S2 pp.70-74]
- COMPUTER ON/OFF toggle: turns computer and power unit on; 20 s self-check, MDIU digits roll until done [S2 pp.70-71]. Seven-position mode switch loads modules from AUX tape; the image labels six positions: PRE LN, ASC, CTCH UP, RNDZ, TD PRE, RE ENT [S2 p.70 img] (the seventh position is not visible: UNVERIFIED; p.21 says the OBC has 6 modules). PRE LN and ASC are pre-loaded; others need 7-10 minutes loading [S2 p.71].
- START (red button): starts the loaded module. RESET (red button): resets after a routine or malfunction. COMP light (green when calculating/running); MALF light (malfunction) [S2 p.71]. Layout from image: COMP and MALF lights across the top, mode selector center, START left, RESET right, ON/OFF toggle lower left [S2 p.70 img].
- AUX tape: RUN light green while loading [S2 p.21]; manual mode shows tape position on the IVIs, wind/rewind [S2 p.76].
- MDIU [image p.74, text pp.71-72]: PWR toggle (ON/OFF), seven drum digits (first two ADDRESS, last five MESSAGE), buttons READ OUT, CLEAR, ENTER, and a keypad 7 8 9(overbar) / 4 5 6 / 1 2 3 / ZERO. First two keys address memory, last five digits are the value; 9 as first value digit means negative [S2 p.71]. READ OUT fetches the message at the address; ENTER enters a message; CLEAR resets display and keyboard without touching data [S2 p.72]. The manual's memory map lists addresses (e.g. #$09, #$11, #$19, #$25-27, #$83) [S2 pp.86-87].

## Center pedestal [S2 pp.43-46, 51]
Text-only; no close-up of the pedestal appears except the computer area above and the overview drawing. Content named:
- ACME mode selector, seven modes: Horizon Scan, Rate Command, Direct, Pulse, Re-entry rate command, Re-entry, Platform [S2 p.43]. Mode details M1-M5d: Direct (M1), Pulse (M2), Rate Command (M3), Horizon Scan (M4), Re-entry (M5, "not yet supported in Reentry"), Re-entry/Rate command (M5d), Platform [S2 pp.44-45].
- PLATFORM (IMU) mode selector: OFF, CAGE, SEF, ORB RATE, BEF, CAGE, FREE (with the explanations on p.46) [S2 p.46]; ACC light (accelerometer malfunction), ATT light (attitude gyro malfunction), RESET switch [S2 p.51].
- OAMS control switches (see next); hand controllers (attitude and translation joysticks) [S2 p.9].
- Overview drawing shows the center console (item 12) as a long vertical console with a large rotary and a handle [S2 p.20 img] (what these are is not described: UNVERIFIED).

## Thruster control switches [S2 p.100 image; text pp.64-68, 100]
Image: PROP MOTOR VALVES panel: OAMS toggle (OPEN / CLOSED) and RCS A, B toggles (OPEN / CLOSED); CNTL PWR panel: OAMS toggle (ON / OFF) and RCS A, B toggles (ACME / OFF / DIRECT). Text: the OAMS is enabled by the OAMS control panel; both switches must be UP [S2 p.64]; the first opens the OAMS propellant valves [S2 p.65]; OAMS CNTL PWR powers the thruster control lines [S2 p.65]; RCS switches sit next to the OAMS switches [S2 p.67]; RCS RING A and RING B switches set to ACME [S2 p.100].

## Sequence system lights and switches [S2 pp.91-102]
Switch-lights on the main center panel (amber = action expected; pressing proceeds irreversibly) [S2 p.91]. Named ones: JETT FAIRING, SEP SPCFT (p.97); IND RETRO ATT, BTRY PWR, RCS (amber at Tr-256) [S2 pp.99-100, 114]; SEP OAMS LINE, SEP ELEC, SEP ADPT, ARM AUTO RETRO (amber at Tr-30) [S2 pp.100-101]; JETT RETRO (amber about 45 s after retrofire; jettisons the retro section, index bar and scanners) [S2 p.101]. Nine sequence lights tested with SEQ LIGHTS TEST switch [S2 p.93]. Pre-launch states: BOOST-INSERT and RETRO ROCKET SQUIB switches ARM; RETRO and LANDING switches SAFE [S2 p.93]. A manual retro fire signal is given 1 s after the automatic one [S2 p.91]. Positions of these lights on the panel are visible only in the low-res overview and in the p.31 crop for the six listed there.

## Landing controls [S2 pp.135-138]
- LANDING (squib) switch: arms the common control bus for landing/post-landing; powers two barometric switches for the 40K and 10.6K warning lights [S2 p.135].
- HI-ALT DROGUE button (about 50,000 ft): deploys the drogue [S2 p.135]. PARA button (10,600 ft): deploys the pilot chute, which removes the R&R section and deploys the main [S2 pp.135-136]. LDG ATT button: puts the capsule in splashdown attitude via main chute lines [S2 pp.137-138]. PARA JETT button: jettisons the main chute after splashdown [S2 pp.137-138].
- Image p.135: two round lights labelled 40K and 10.6K under "PRE-MAIN", and a red covered button "EMERG 10.6K" at lower left (function not described in the text I read: UNVERIFIED) [S2 p.135 img].

## Docking controls [S2 pp.120-127]
- Index bar extend switch on the right/pilot circuit breaker panel: set to INDEX EXTEND until extended, then OFF; cannot be retracted [S2 p.120].
- Exterior light switch to DOCK: spotlight on top of the spacecraft [S2 p.120].
- TDA CONTROL RIGID/OFF/STOP and UNDOCK switches (center upper panel, above) [S2 p.123].
- EMER REL covered button: cuts the latches; disables re-docking [S2 pp.122-123]. ENGINE switch ARMs the target vehicle engine when docked [S2 p.123]. ARM STOP switch (ARM/STOP) arms/stops the Agena PPS [S2 p.127].
- Encoder: two numbered wheels (0-7) and a binary switch (0/1) that transmits and returns to center; encoder circuit breaker must be ON; three-digit command, e.g. 2-5-1 [S2 pp.57-58]. Command list [S2 pp.59-60, 128-130].
- TDA display panel (on Agena side): lights DOCK (green), RIGID (green), PWR (green), MAIN (red/green), ARMED (amber), SEC HI, SEC LO, ATT (green); clocks MAIN TIME, SEC TIME; ATT GAS gauge [S2 p.126].

## Not done
- Individual circuit breakers and switches on the left (3), right (8) and overhead (6) panels: the manual shows them only in the overview drawing (illegible) and in a few crops (battery switches, thruster switches). Their full list is not in the manual text I read, except those named above. Overhead panel names OAMS/RCS thruster logic items only by description (p.20).
- Suit temperature panel (13), water management panel (11), secondary O2 handles (1, 9), abort control (2), hand controllers, encoder controller: named in the overview but not described with legible labels.
- Commander's and pilot's panels as a whole, and the pedestal: no close-up image of the whole panel.
- Chapter V (guidance) and the checklists (pp.145-147) are described only briefly; the in-game checklists themselves are not in the PDF.

## Feasibility for a panel engine (Gemini)
- Page offsets: verified (see sources.md "Page numbering"): printed page numbers differ from PDF pages by 0 (to PDF p.23), then +3 and +4; the table of contents is not reliable for PDF pages.
- Clean enough to reproduce as SVG (from the close-up renders, all legible): the communication panel (p.143), the main ECS panel (p.31), the power monitor with dP SELECT and voltmeter selectors (p.107/113), the battery switch strip (pp.109-110), the computer + MDIU group (pp.70, 74), the event timer (p.62), the thruster switch panel (p.100), the propellant quantity gauge (p.65), the upper ECS handles (p.32). These are 3D screenshots, not line art: shapes must be traced by hand, but control boundaries and printed labels are clear.
- Clean line drawings (NASA-origin, per captions): the FDAI and controller (p.50), horizon sensor details (p.53), radar details (p.56).
- Not clear: the overview Fig 2.3.1 (p.20): 1446x865 raster; panel outlines and callouts are usable for layout, but individual labels on the left, right and overhead panels are too small to read. Those three panels, the commander's and pilot's panels, and the pedestal have no legible close-up in the manual.
- Perspective: several crops are taken at angles (p.31 upper ECS crop, p.51 FDAI), so measurements would be approximate.
- Extra source needed: the NASA Project Gemini Familiarization Manual Vol. 2 (SEDR 300 / 200 per the manual; Scribd links in sources.md) for full panel drawings, switch/breaker names for the left, right and overhead panels, and exact scales. The game manual itself gives no layout for the circuit breakers.
- Recommended first prototypes: (1) communication panel (p.143): regular grid, about 25 controls, all labels legible, behavior text in pp.142-143. (2) main ECS panel (p.31, with p.32 handles): richest mix of control types (toggles with guards, vertical gauges, switch-lights, rotary selector), with behavior text in pp.34-36. Also consider the power monitor + battery strip as a third.

## Source conflicts
- The manual names its NASA source as "SEDR 200 - Rendezvous and Docking Configurations (Vol. 2)" in the About section [S2 p.6] but captions every figure "from SEDR 300, Vol 2" [S2 pp.20, 28, 29 etc.]. Not resolved; the manual itself is the only source seen. Neither version number was checked against the NASA document. Treat as UNVERIFIED which designation is right.
- Cabin pressure: 5.1 psia in orbit [S2 pp.30, 37]; relief valve bleeds to 5.5 psi at launch [S2 p.37]. Different phases, not a conflict.
- The ECS section cites "5.2.1" figure numbering inside chapter VIII [S2 p.106] (caption numbering mistake in the manual, immaterial).

## Open questions / UNVERIFIED
- Which NASA document designation is correct (SEDR 200 vs 300), and whether Scribd copies are redistributable. Vol 2 omits guidance chapter (confidential) [S2 p.6].
- Function of EVAP MAX FLOW, RCS HTR, RCDR TAPE, SILENCE/KEYING/RECORD, CALIB/SBY TM, TAPE PLYBK, EMERG 10.6K, the "SAFE" toggle by ABORT, the START/STOP + INCR/DECR clock group, PROP selector positions, and the seventh computer mode position.
- Real positions and names of every breaker on panels 3, 6, 8.
- License for reusing the manual's images (the manual says its images are NASA public domain [S2 p.7], but the in-game renders are not NASA images, so unclear).
