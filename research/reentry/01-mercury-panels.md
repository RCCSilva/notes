# Mercury cabin panels (partial: overview only)
Level: basic
Applies to: Reentry game, Project Mercury module, manual undated (accessed 2026-10-29) [S1]

Status: wrapped up early by instruction. Panel overview and feasibility are done. The full per-control table was NOT completed. Tags: **game behavior** = from the game manual; **real spacecraft** = only where the manual says so.

## Panels the manual shows [S1 pp.21-27]
The manual says the cabin has a single seat, a window, a control panel with all fuses, instruments and switches, and a hatch [S1 p.21] (game behavior). Drawings, one per PDF page, all raster images with no text layer [S1 pp.21-27]:
- p.21 FULL PANEL OVERVIEW: three sections side by side, left to right: the fuse panel (left, slanted right edge), the "control mode & systems" panel (tilted, center-left), the main panel (center and right), plus a small temperature panel at the far right (SUIT TEMP, CABIN TEMP, COOLER handles).
- p.22 MAIN PANEL.
- p.23 CONTROL MODE & SYSTEMS PANEL.
- p.24 MAIN POWER CONTROL/FUSE PANEL.
- p.25 SATELLITE CLOCK (detail, labelled callouts).
- p.26 EARTH PATH INDICATOR (detail, labelled callouts).
- p.27 PERISCOPE DIAGRAM (detail, labelled callouts).

The manual says the capsule is modelled after the real Mercury Familiarization Manual SEDR 104 (5/20/1962) [S1 p.6] (the manual says so), and that not all components are simulated; some are simplified or placeholders [S1 p.6] (game behavior).

## Control types and how the game operates them [S1 pp.10-13] (game behavior)
- Trigger button, protected: left click removes the cover, right click replaces it, a second left click executes; turns red once executed; irreversible [S1 p.10].
- Switch: positions left/middle/right or up/middle/down; left click moves left or up, right click moves right or down [S1 pp.10-11].
- Fuse switch: up = fuse No. 1, middle = OFF (disconnects the system), down = fuse No. 2; normally fuse 1 is used [S1 p.11].
- Selector (rotary): right click moves right (counterclockwise), left click moves left (clockwise) [S1 p.11].
- Pull ring: left click pulls, executes an irreversible function [S1 p.11].
- Handle selector: left click pushes in, right click pulls out; two positions [S1 p.12].
- Gauge: one or more needles; some have a selector choosing the source [S1 p.12].
- Satellite clock handle (acts like a selector): OFF (default), SEC up/down, MIN up/down; changes TIME TO RETROGRADE by 1 s or 1 min per 0.5 s cycle held [S1 pp.12-13].
- Temperature selectors: set 1 to 7, 7 = maximum cooling, 1 = minimum [S1 p.13].
- Blood pressure START / STOP: like a trigger button but reusable; leave on 30 s [S1 p.13].

## Controls identified from the drawings (labels read visually; NOT cross-checked against text)
Labels below were read by eye from the page images (S1 pp.21-27). No text layer exists, so a misreading is possible; legible-but-small items are marked "small". Behavior is given only where the manual text I read states it, with the page.

### Main panel (p.22), left half (flight instruments)
- Upper left: round dial (label too small to read, UNVERIFIED), with a black dot below it.
- Below it: CONTROL FUEL gauge, AUTO / MAN, 0-100 percent (twin needles) [S1 p.46 says the CONTROL FUEL gauge monitors systems A and B fuel] (game behavior).
- Below: DESCENT 10 FT/SEC gauge. ALT (1000 FT) gauge, large, lower left.
- Top center: attitude indicator in a rounded rectangle with ROLL (left), PITCH (right), YAW (bottom) dials, and a center square [S1 p.47: colors roll white, pitch pink, yaw yellow; center arrows show rates] (game behavior).
- Right of it: TIME ZERO push button (round, with a small lever above it); function not found in the text I read.
- Center: Earth Path Indicator (left) and Satellite Clock (right); see p.25-26 below.
- Below them: the periscope display with RETRACT light, altitude/drift/reticle knobs (p.27).
- Bottom left: LIGHT TEST toggle; MANEUVER toggle OFF/ON [S1 p.48: MANEUVER switch can power down the gyros] (game behavior).
- A blank white oval at lower left (purpose unknown).

### Main panel (p.22), right half (ECS, power, comms)
- Top row gauges: CABIN PRESSURE (PSIA), CABIN AIR.
- Second row: SENSOR TEMP, STEAM VENT TEMP, SUIT ENVIRONMENT (three dual-needle gauges).
- Third row: CABIN O2 (PSI), OXYGEN (percent, dual needle). [S1 p.35 says the ECS panel has 7 gauges.]
- Fourth row: DC VOLTS, DC AMPS gauges; AC VOLTS gauge lower; a rotary selector below DC VOLTS (labels unreadable) [S1 p.? voltmeter selector, see Open questions].
- WARN LIGHTS DIM/BRIGHT toggle; AUDIO OFF/TONE toggle [S1 p.42 says a switch next to the CABIN PRESS light mutes its tone] (game behavior).
- Warning light buttons with a small toggle to their right: CABIN PRESS, O2 EMER, EXCESS SUIT H2O, EXCESS CABIN H2O, FUEL QUAN, RETRO WARN, RETRO RESET. [S1 pp.37, 39, 46 describe CABIN PRESS, EXCESS H2O and FUEL QUAN warning lights.]
- SUIT FAN toggle (No.2 / NORM / No.1) and CABIN FAN toggle (OFF / NORM) [S1 p.40-41: NORM = ECS controls; No.1 primary fan, No.2 backup; CABIN FAN OFF turns the cabin fan off] (game behavior).
- Toggles: ASCS AC BUS (STBY / NORM / OFF), STBY BTRY (ON / OFF), ISOL BTRY (STBY / NORM), AMMETER (BYPASS / NORM / PWR OFF), FANS AC BUS (STBY / NORM / OFF), AUDIO BUS (EMER / NORM), STBY AC AUTO button, INLET VALVE PWR (BYPASS / NORM) handle. [S1 p.41 says a switch on the electrical panel connects the FANS AC BUS to standby power; S1 p.? STBY/ISOL battery behavior, not yet located.]
- Fuse-switch style rocker blocks, far right: SUIT FAN / ENVIR CONT, RETRO JETT / RETRO MAN, PRO-GRAM / BLOOD PRESS, each with small HI / OFF / #2 legends (small).
- BLOOD PRESS START / STOP round buttons [S1 p.13].
- VOX PWR knob (RECORD / TRAN & RECORD / OFF).
- Bottom: COMM AUDIO (KEY button, HF / UHF / CMD levers, UHF UP / NORM), UHF SELECT (LO PWR / HI PWR), TRANSMIT (HF / OFF / UHF), BEACON (GRND COMD / CONT).

### Satellite clock (p.25) [S1 pp.12-13]
Labelled in the drawing: TIME OF DAY (analog clock face with WIND knob), TELELIGHT labelled "5 MIN TO RETROGRADE", RETROGRADE TIME digital readout (HRS:MIN:SEC), TIME FROM LAUNCH digital (HRS:MIN:SEC), TIME TO RETROGRADE digital (HRS:MIN:SEC), RETROGRADE TIME RESET HANDLE with positions MIN/SEC/OFF/SEC/MIN and INC/DEC arrows. Handle behavior is in "Control types" above (game behavior).

### Earth Path Indicator (p.26)
Drawing labels: POSITION RELATIVE TO EARTH, LANDING AREA, ORBIT TIME dial, POLAR (E-W) knob, INCLINATION DEGREES dial, ORBIT (E-W) knob, WIND knob. No behavior text found in the pages I read (UNVERIFIED).

### Periscope (p.27)
Drawing labels: RETRACT pilot light, ALTITUDE knob and ALTITUDE INDICATOR, DRIFT knob, RETICLE knob (OFF), SUN-MOON index finger-grip control, DRIFT SCALE, SUN-MOON INDEX SCALE, MOON INDEX INDICATOR, SUN INDEX INDICATOR, SUN-MOON BEARING INDEX MARK, true horizontal pitch index, reticles (5 drift, 5 deg pitch, 5 deg roll, crossline, 3 retro attitude, 4 earth-sky camera view, altitude), horizon image, sky. Operation is in manual section X (pp.68-73), NOT read.

### Control mode & systems panel (p.23) (labels read by eye)
- Top right column, top to bottom: ABORT (large round, top); LAUNCH CONTL toggle (READY / OFF); a water-seal-regulator pull handle ("PULL TO WATER SEAL REGULATOR"); PRESS REG lever handles; then labelled indicator boxes JETT TOWER, SEP CAPSULE, RETRO SEQ, RETRO ATT, FIRE RETRO, JETT RETRO, RETRACT SCOPE, .05G, DROGUE, SNORKEL, MAIN, RESERVE, LANDING BAG, each with a round protected trigger button or pull ring on the left (JETT TOWER, SEP CAPSULE: lever handles). Toggles: RETRO ATT (AUTO / BYPASS), RETRACT SCOPE (AUTO / MAN), LANDING BAG (AUTO / OFF / MAN).
- Middle strip: SQUIB (ARM / OFF) toggle, AUTO RETRO JETT (ARM / OFF) toggle. Text: AUTO RETRO JETT must be armed and squibs armed for automatic retro jettison [S1 pp.57, ~60 partly read] (game behavior).
- ASCS MODE SELECT row: three toggles: NORM / FLY BY WIRE / AUX DAMP; AUTO / RATE COMD; GYRO NORM / FREE / GYRO CAGE. [S1 pp.47-52 describe these three switches as ASCS, RSCS (AUTO-RATE COMD) and GYRO.]
- CLOSE VISOR box with two T-handles: DECOMP (pull to dump, push to close) and REPRESS (pull to repress, push to reset) [S1 p.36, 42: decompress / repress T-handles on the left panel] (game behavior).
- MANUAL black label with push/pull handles; ROLL, YAW, PITCH white handles (pull OFF, push ON). [S1 p.49: MANUAL handle switches between direct manual thrusters and automatic; three white handles cut automatic fuel per axis; manual pull = DIRECT, push = RATE COMD per p.51] (game behavior).
- ATTITUDE SELECT toggle (RETRO / RE-ENT); RETRO DELAY toggle (NORM / INST) [S1 p.~60 text lines on RETRO DELAY, not page-verified].
- PHOTO LIGHTS (ON / OFF), CABIN LIGHTS (BOTH / LH ONLY / OFF), TLM-LO FREQ (ON / OFF), RESCUE box with AUTO / MAN lever.

### Fuse panel (p.24) (labels read by eye)
Five rows of fuse rocker switches. Legend: #1 up, OFF middle, #2 down. A note on the page says the #2 position of the gray-shaded switches has a solid conductor instead of a second fuse, to ensure continuity in these essential circuits (the page says gray is for illustration only) [S1 p.24] (real spacecraft design note as printed in the manual's drawing).
- Row 1 (7): [blank], EMER CAP SEP CONTL (gray), EMER ESCAPE RCKT, TOWER SEP CONTL (gray), EMER TOWER SEP, EMER TOWER JETT, EMER POSGRD.
- Row 2 (6): AUX BCN, NO.1 RETRO RCKT, NO.2 RETRO RCKT, NO.3 RETRO RCKT, EMER RETRO SEQ (gray), EMER RETRO JETT.
- Row 3 (5): ASCS OSG, EMER OSG, EMER DROGUE DEPLOY (gray), EMER MAIN DEPLOY (gray), RESERVE DEPLOY.
- Row 4 (4): EMER RESERVE DEPLOY (gray), EMER LAND BAG (gray), EMER RESCUE AIDS (gray), PERI SCOPE.
- Row 5 (3): ANT SWITCH, COMD RCVR A, TLM HI-FREQ.
Fuse behavior: [S1 p.11]. Fuse text section is S1 pp.61-63 (NOT read).

## Feasibility for a panel engine
Clear enough to reproduce as SVG:
- Fuse panel (p.24): large, clean line art, legible labels, clear row/slot boundaries, regular grid. Best candidate. Gray = solid-conductor flag is explicit.
- Control mode panel (p.23): large and legible, clear boxes and toggles; hand-traceable. Label positions (ROLL/YAW/PITCH, MANUAL) are rotated text.
- Satellite clock (p.25), Earth path indicator (p.26): large callouts, clear boundaries, labels legible; dial tick text partly small. Gauge faces' interior art (maps) would be simplified.
- Periscope (p.27): good callouts, but the reticle field is complex; reproduce as simplified.
Not clear enough:
- Main panel (p.22), 1608x1160 raster at roughly 220 ppi: gauge dial numbers and tick labels, and the tiny legends beside the right-hand rocker blocks and the rotary selectors, are too small or noisy (halftone texture) to read reliably. Positions of controls are clear, but scale values (e.g. gauge ranges) are not.
- Full overview (p.21) is too low-res for labels; use only for layout and relative placement of the panels.
- The drawings are raster only, with no vector text; every label must be transcribed by hand.
Extra source needed: NASA Mercury Familiarization Manual SEDR 104 [S1 p.6 link: https://www.ibiblio.org/mscorbit/document.html], for gauge scales, switch positions, and higher-resolution panel drawings. Also in-game screenshots or confirmed permission for redistributing the drawings (license gap above).

## Source conflicts
None found yet.

## Open questions / UNVERIFIED
- Function of TIME ZERO button, the blank oval, the unlabeled upper-left dial, and the rotary selector under DC VOLTS.
- Behavior text for the electrical system (S1 pp.~57-63: STBY/ISOL battery, inverters, lights, fuses), communication (pp.64-67), navigation aids (pp.68-77), sequencer (pp.55-56 of printed numbering vs PDF offset) and checklists: not read. The PDF page for these sections may be offset from the table of contents numbers (UNVERIFIED).
- Page cites marked "~" or "p.?" are not verified.
- Panel positions in the drawings were described from my own visual reading and not independently checked.
- License for reuse of the drawings.
