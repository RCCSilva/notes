# Orbit basics: navigating in orbit (for a small interactive simulation)
Level: basic
Applies to: ideal (two-body) orbits around Earth. Real-mission numbers: Mercury 1962-63 and Gemini 1965-66. Sources accessed 2026-10-29.

How to read this note.
- `[S10]`...`[S21]` are in `sources.md`. "PDF p." = PDF page (printed page in brackets where it differs).
- **COMPUTED** = arithmetic done by the researcher with the sourced formulas and constants (not a statement copied from a source). Each is labelled, and the inputs are cited.
- Conversions used: 1 nautical mile (nmi) = 1852 m exactly, 1 ft = 0.3048 m exactly [S21 "mile, nautical", "foot (ft)"].
- Mission altitudes in NASA documents are in nautical miles above the Earth. Which Earth radius NASA used is not stated in the documents I read (see Open questions).

---

## 1. What an orbit is

**Simple version.** An orbit is a fall that keeps missing the ground. Throw something hard enough sideways and, as it falls, the Earth curves away underneath it.

- NASA's picture is Newton's cannon. Fire a cannonball and it follows an arc and falls to Earth. Pack in more gunpowder so it goes faster and farther, and at some speed "it falls completely around Earth! We can say it has achieved orbit." [S10 ch.3-4 "How Orbits Work"]
- ESA's definition: an orbit is "the curved path that an object in space follows around another object due to gravity" [S12 "Types of orbits"].
- Why speed matters: to stay up, the spacecraft must be above the thin air and fast sideways. NASA says in practice you don't want to be below about 150 km above Earth's surface, and the rocket must speed the spacecraft "to the neighborhood of 30,000 km/hr (about 19,000 mph)" [S10 ch.3-4 "Orbiting a Real Planet"].
- ESA's numbers for low Earth orbit (LEO): altitude "under 2000 km", satellites generally do not fly below 180 km, speed "approximately 7.8 km per second", about 90 minutes per orbit [S12 "Types of orbits"].
  - 7.8 km/s is about 28,100 km/h (COMPUTED: 7.8 x 3600). NASA's 30,000 km/h is "the neighborhood", so the two agree to within the rounding NASA chose. No real conflict.
- Period example from NASA: the space shuttle's orbit at about 200 km "used to be about 90 minutes" [S10 ch.3-4]. A higher orbit is slower and has a longer period (see section 5, Kepler's third law).

**Real examples (speed and period).**
- Mercury-Atlas 7 (Aurora 7, 24 May 1962, Carpenter): at the end of the launch burn the altitude was 527,859 ft, the speed 25,717 ft/s, perigee 86.87 nmi, apogee 144.06 nmi, period 88 min 32 s, inclination 32.55 degrees [S16 Table 3-I, PDF p.33 (printed 28)].
  - 25,717 ft/s = 7,838.5 m/s (COMPUTED).
- Gemini IV (June 1965): inertial velocity 25,746 ft/s at 369.7 s after launch, giving a 87.6 x 152.2 nmi orbit [S17 sec.4, PDF p.79]. Period of that orbit 88.90 min [S17 Table 4-III, PDF p.93 (printed 4-15)].
- Gemini VI-A (15 Dec 1965): speed 7,830 m/s at engine cutoff; orbit 161 x 259 km [S19 PDF p.307 (printed 286)].

**Common misconception (sourced).**
- "Weightless" does not mean "no gravity". NASA: occupants feel weightless because they fall at the same rate as the craft; "gravity is still dominant, but some of its familiar effects are not apparent on orbit." Terms such as "weightless" and "microgravity" are imprecise [S10 ch.3-4 "Freefall"].
- Orbit does not obey everyday habits: "Speed and motion in orbit do not conform to Earth-based habit, except at very close ranges" [S19 PDF p.269 (printed 248)] (this is about rendezvous, see section 6).

---

## 2. Apogee and perigee; altitude vs distance from Earth's center

**Simple version.** An orbit is usually an oval (ellipse), not a circle. The point where you are closest to Earth is **perigee**, the farthest point is **apogee**.

- ESA: "The point farthest from Earth in an elliptical orbit is the apogee, and the point closest is the perigee." [S12 "Types of orbits", transfer-orbit section]
- NASA: periapsis and apoapsis are the generic words; a prefix names the body: perigee/apogee for Earth, perihelion/aphelion for the Sun [S10 ch.3-4 "A Periapsis by Any Other Name"].
- Another NASA course defines periapsis as the location of minimum orbit altitude, apoapsis as the location of maximum orbit altitude, and the semimajor axis as half the distance from apoapsis to periapsis [S20 slide 34, PDF p.34].
- A circle is an ellipse with eccentricity zero [S10 ch.3-1 "Eccentricity"].
- The speed changes around an ellipse: NASA says a comet on a very elongated orbit moves many times faster at its closest point than at its farthest, and the area swept out stays constant for equal times [S10 ch.3-3 "Kepler's Laws"]. (For the Earth case, the simulation can show the two speeds from the vis-viva formula, section 5.)

**Altitude vs distance from the center (matters for the simulator).**
- The formulas use the distance from the center of the Earth. Mission documents quote altitude above the surface. NASA's course example: altitude d = a - r_e, with r_e (Earth's radius) about 6378.14 km [S20 slide 95, PDF p.95]. For an orbit around the planet's center, the radius at a point is the Earth radius plus the altitude there.
- Earth radius values (NASA): equatorial 6378.137 km, volumetric mean 6371.000 km [S13].
- Example (COMPUTED, using 6378.137 km): MA-7 perigee altitude 86.87 nmi = 160.88 km, so its distance from the center is 6539.0 km; apogee 144.06 nmi = 266.80 km altitude = 6644.9 km from the center.

**Real example orbits (numbers as printed in the documents).**

| Mission | Perigee x apogee | Period | Inclination | Source |
|---|---|---|---|---|
| Mercury MA-6 (Friendship 7, 20 Feb 1962, Glenn) | 86.9 x 140.9 nmi | not found in S15 (see Open questions) | not read | [S15 PDF p.21 (printed 12)] |
| Mercury MA-7 (Aurora 7, 24 May 1962) | 86.87 x 144.06 nmi | 88 min 32 s | 32.55 deg | [S16 PDF p.33 (printed 28)] |
| Mercury MA-8 (3 Oct 1962) | 86.9 x 152.8 nmi | not read | not read | [S15 PDF p.22 (printed 13)] |
| Mercury MA-9 (15-16 May 1963) | 87.2 x 144.2 nmi | not read | not read | [S15 PDF p.22 (printed 13)] |
| Gemini IV, at insertion | 87.6 x 152.2 nmi (final postflight) | 88.90 min | 32.53 deg | [S17 Table 4-III, PDF p.93] |
| Gemini IV, 2nd rev (after station keeping) | 90.4 x 159.9 nmi | 89.08 min | 32.53 deg | [S17 PDF p.93] |
| Gemini IV, 61st rev | 86.1 x 136.5 nmi | 88.53 min | 32.53 deg | [S17 PDF p.93] |
| Gemini VI-A at insertion | 161 x 259 km | not read | not read | [S19 PDF p.307] |

- Cross-check: NASA's NSSDCA page for MA-6 says "an altitude of about 260 km" and a maximum velocity "in excess of 28,000 km/hour" [S14]. 140.9 nmi = 260.9 km (COMPUTED), consistent.
- Gemini IV's table shows the orbit shrinking over 4 days (apogee 152.2 -> 136.5 nmi, period 88.90 -> 88.53 min) while perigee stayed near 86-90 nmi [S17 PDF p.93]. The cause (air drag) is not stated in the table: UNVERIFIED as an explanation here. NASA says only that the thin upper atmosphere eventually degrades the orbit, usually over months or years [S10 ch.3-4 "Orbiting a Real Planet"] (paraphrase).
- Mercury was designed with a minimum lifetime of 36 hours for a 24-hour mission [S15 PDF p.130 (printed 121)]. Had MA-9 not used retrorockets, its orbital lifetime would have been about 4.7 days [S15 PDF p.133 (printed 124)].

**Common misconception.** No source states one for this section.

---

## 3. Velocity vector, prograde / retrograde burns, and the opposite-side effect

**Simple version.** Your velocity has a size (speed) and a direction. In orbit that direction is "along the path". A burn along the direction of travel is **prograde** (NASA Gemini documents say "posigrade"); against it is **retrograde**.

- Source for the vector idea: in the NASA course slides velocity is the rate of change of the position vector, v = dr/dt [S20 slide 45, PDF p.45]. The plain-words definition above is the researcher's wording of that, not a quoted definition (UNVERIFIED as a quote). No official plain-language definition of "velocity vector" was found.
- Real usage: Gemini X called its burns "420 ft/sec posigrade" and "340 ft/sec retrograde" [S18 PDF p.345-346]. Gemini IV's crew read the incremental velocity indicator (IVI) as "20 ft/sec forward, 11 ft/sec right, and 5 ft/sec down" after insertion [S17 sec.7.1.2.3, PDF p.276]. This shows burns are described as components in a direction (forward = along the path).

**The non-obvious rule (sourced).** A burn at one point changes the altitude on the OPPOSITE side of the orbit.
- NASA, "The Key to Space Flight": "A spacecraft's apoapsis altitude can be raised by increasing the spacecraft's energy at periapsis." Likewise: "A spacecraft's periapsis altitude can be raised by increasing the spacecraft's energy at apoapsis"; decreasing energy at apoapsis lowers the periapsis; decreasing energy at periapsis lowers the apoapsis [S10 ch.3-4 "The Key to Space Flight"; same two statements in S11 ch.4-1].
  - Speeding up (prograde) adds energy; slowing down (retrograde) removes it. That link is the NASA wording "increasing/decreasing energy"; the course slides show orbit energy depends on speed and distance: E = v^2/2 - mu/r [S20 PDF p.50]. Speed is the part the pilot changes.
- **Real example 1: Gemini VI-A.** Over New Orleans, 94 minutes after launch, Schirra fired the thrusters to speed up by 4 m/s. "The perigee remained the same, but the acceleration kicked the apogee up to 272 kilometers" (from 259 km) [S19 PDF p.307 (printed 286)].
  - COMPUTED check: +4 m/s at perigee of a 161 x 259 km orbit gives apogee altitude 272.7 km with the formulas of section 5. Matches.
- **Real example 2: Gemini X (Agena engine firings; NASA tables).** All from [S18 PDF p.345-346, 354-355]:
  - 420 ft/s posigrade: orbit became 160.2 x 413.6 nmi (perigee stays 160.2; apogee goes way up).
  - then 340 ft/s retrograde: orbit 160.2 x 206.8 nmi (apogee lowered back).
  - 856 ft/s posigrade (after landing): "to raise apogee to 750 nautical miles", result 208.6 x 750.5 nmi (before this the orbit had been 206.9 x 208.9 nmi after the earlier 3.5 ft/s retrograde thrust "to lower perigee").
  - 886 ft/s retrograde "to lower the apogee": result 190.2 x 208.7 nmi (note the other side came down too: the old apogee 750 nmi collapsed).
  - 32.2 ft/s retrograde "to circularize the orbit at 190 nautical miles": result 190.2 x 190.2 nmi.
  - COMPUTED check: formulas of section 5 give 427 ft/s for the 420 case from a circular 160.2 nmi start (start orbit not read, so not exact), 853 ft/s for the 856 case from a circular 207.9 nmi start, and an apogee/perigee of 190.7 nmi for the 886 retro at perigee. These agree with NASA within about 1-2 percent.
- Mercury-era sentence about size: "As the velocity is increased above orbital velocity the apogee increases approximately 1 mile for every 2 feet per second" [S15 PDF p.133 (printed 124)].
  - COMPUTED check: +2 ft/s at perigee of the MA-6 orbit raises apogee by about 1.1 nmi (1.3 statute miles) with the formulas of section 5. Matches "about 1 mile".

**Consequences to show in the simulator** (all supported above): a prograde burn at perigee raises apogee and leaves perigee where it was; a retrograde burn at apogee lowers perigee; a burn at the "wrong" place changes both sides a little (Gemini X 886 ft/s example: both sides moved).

**Other burn directions.**
- **Normal (out of the orbit plane) burns** change the tilt (inclination), not the size. NASA course: a plane change is used to change inclination; speed change needed is dv = 2 v sin(theta/2) for tilt angle theta [S20 slides 156-157, PDF p.156-157]. Real: Gemini VI-A's Schirra "turned his spacecraft 90 degrees to the right (southward) and ignited the thrusters to push Gemini VI-A into the same plane as Gemini VII" [S19 PDF p.307 (printed 286)].
- **Radial burns** (toward or away from Earth): no plain source found for their effect. Gemini IV's guidance corrected an "excessive radial velocity of 25 ft/sec" at insertion [S17 PDF p.130], but no definition or effect is given there. Leave radial burns out of the lesson (Open questions).

**Common misconception (sourced).**
- Intuition from the ground says "to go farther, push harder in a straight line". NASA history: "To catch something on the ground, one simply moves as quickly as possible in a straight line... As Gemini IV showed, that will not work in orbit." [S19 PDF p.269 (printed 248)] (see section 6).

---

## 4. Retrofire and re-entry: how a retro burn lowers perigee into the atmosphere

**Simple version.** To come home, slow down with rockets pointing forward. Less speed means the orbit's far side drops, until the lowest point of the new path is inside the atmosphere. The air then finishes the job.

- Mercury design rule: the spacecraft "must carry a retrorocket system capable of providing the necessary impulse to bring the vehicle out of orbit"; the reentry itself was to be by "drag braking only" [S15 PDF p.49 (printed 40)].
- Mercury hardware: three solid retrorockets, "any two of which would effect a safe reentry" [S15 PDF p.50 (printed 41)]. Nominal thrust 1,000 lb each, burning about 10 s each (Table 3-III) [S15 PDF p.62 (printed 53); same table in S16 PDF p.8].
- Physics statement from NASA: decreasing energy at apoapsis lowers the periapsis; "In practical terms you don't generally want to be less than about 150 kilometers above surface of Earth" for staying in orbit [S10 ch.3-4]. NASA also says that removing energy at periapsis can be done with thrusters or with atmospheric drag (aerobraking) (paraphrase of the same page).
- **Real example: Gemini IV retrofire (7 June 1965).** Because the on-board computer had failed, the crew flew an open-loop reentry [S17 sec.6.1.2.3, PDF p.240]:
  - A first retro-direction burn with the small attitude thrusters (OAMS), planned for a velocity change of 128 ft/s retrograde and 2 min 40 s [S17 PDF p.240]. Reconstruction after the flight found about 134 ft/s [S17 PDF p.89 (section 4.3)]. It gave a theoretical perigee of 42.3 nmi instead of the 45 nmi planned [S17 PDF p.82].
  - 42.3 nmi = 78.3 km (COMPUTED), far below NASA's "about 150 km" minimum for staying up.
  - Equipment adapter separation 97:39:14 g.e.t.; automatic retrorocket firing 97:40:01 (about 1 s early); the rolling reentry had been planned to begin at 400,000 ft; communications blackout 97:44:59 to 97:49:14 (4 min 15 s, COMPUTED); drogue parachute 97:50:53; main parachute 97:52:11; landing 97:56:12 [S17 PDF p.82].
  - The 134 vs 128 ft/s discrepancy is NASA's own reconstruction (thrust about 4.5 percent higher than planned) and contributed about 40 nmi of landing error [S17 PDF p.89]. I could not reproduce the 42.3 nmi perigee from the 128 ft/s figure with a simple at-apogee or at-perigee burn (the burn position in the orbit is not stated in the passages I read), so this example is NOT used for validation.
- **Real example: Mercury MA-7 (Aurora 7).** Retrofire occurred about 3 seconds late and the spacecraft attitude was not held, so it "landed several hundred miles downrange of the planned landing point" [S15 PDF p.22 (printed 13)]. Retrorocket performance was 3 percent lower than nominal, within the allowed -5 percent [S16 PDF p.8].
- **Mercury retro delta-v:** no numeric velocity change for the Mercury retropack was found in S15/S16 (only thrust and burn time). Computing it would need the spacecraft mass, which was not sourced here, so it is left out. Gap (use the Gemini IV and Gemini X burns above as the real retro/burn numbers).
- Mercury analysis about energy: if the speed is increased far above orbital speed, retrofire near perigee would give "excessive heating" and near apogee excessive reentry loads, and beyond a value no safe reentry from any point is possible [S15 PDF p.133 (printed 124)] (paraphrase).

**Common misconception.** None stated for this section in the sources.

---

## 5. Ideal-orbit formulas and constants (with sources)

All formulas are for an ideal two-body orbit (only Earth's gravity, a point mass).

| What | Formula | Source |
|---|---|---|
| Gravitational parameter | mu = G M (mass of the central body) | [S20 slide 44, PDF p.44] |
| Earth GM | 0.39860 x 10^6 km^3/s^2 (= 398,600 km^3/s^2, five significant figures) | [S13] |
| Cross-check from G and M | G = 6.67430e-11 m^3 kg^-1 s^-2 [S20 slide 92, PDF p.92, "from NIST"]; M(Earth) = 5.9722e24 kg [S13]. G x M = 3.98603e14 m^3/s^2 (COMPUTED) = 398,603 km^3/s^2, agrees | S13, S20 |
| Earth radius | equatorial 6378.137 km; volumetric mean 6371.000 km | [S13] |
| Radius from altitude | r = R_earth + altitude (d = a - r_e) | [S20 slide 95, PDF p.95] |
| Energy conserved | v^2/2 - mu/r = constant ("kinetic energy per unit mass" + "gravitational potential energy per unit mass") | [S20 slide 50, PDF p.50] |
| Orbit energy and semimajor axis | E = -mu/(2a) | [S20 slide 154, PDF p.154] |
| Circular speed | v = sqrt(mu/r) | [S20 slide 154] |
| Speed at any point of an ellipse (vis-viva) | v^2 = mu (2/r - 1/a). This is the combination of E = v^2/2 - mu/r with E = -mu/(2a) from the two rows above (NASA's slide 154 writes the speed on the transfer ellipse as sqrt(2 (mu/r1 + E_t))). The name "vis-viva" itself was only seen in search results, not in a source I opened: UNVERIFIED as a name. | [S20 PDF p.50, 154] |
| Semimajor axis from the two apsides | a = (r_apo + r_peri)/2 (half the distance from apoapsis to periapsis; transfer ellipse a_t = (r1 + r2)/2) | [S20 slide 34 and 153, PDF p.34, 153] |
| Orbit shape | r = p/(1 + e cos nu) = a (1 - e^2)/(1 + e cos nu), with p = h^2/mu; so r_peri = a(1 - e) (nu = 0) and r_apo = a(1 + e) (nu = 180 deg). The last two follow by substituting nu; stated as consequence. | [S20 slides 63-64, PDF p.63-64] |
| Angular momentum constant | h = r x v is constant (specific angular momentum) | [S20 slides 51-53, PDF p.51-53] |
| Kepler's third law (period) | T = 2 pi sqrt(a^3/mu), i.e. T^2 = (4 pi^2/mu) a^3. Period depends only on a, so two orbits with the same a have the same period whatever their eccentricity. | [S20 slides 90-91, PDF p.90-91]; words in S10 ch.3-3 ("square of the orbital period ... proportional to the cube of the semi-major axis") |
| Hohmann-type transfer between circular orbits (optional) | dv = v_t - v_1 with v_1 = sqrt(mu/r1), v_t = sqrt(2 (mu/r1 + E_t)), E_t = -mu/(2 a_t); flight time T_t = (1/2) 2 pi sqrt(a_t^3/mu) | [S20 slides 154-155, PDF p.154-155] |
| Plane change | dv = 2 v sin(theta/2) | [S20 slide 157, PDF p.157] |
| Unit conversion | 1 nmi = 1852 m; 1 ft = 0.3048 m | [S21] |

COMPUTED sanity values (mu = 398,600, R = 6378.137 km): circular orbit at 200 km altitude: v = 7.784 km/s, T = 88.5 min; at 400 km: v = 7.669 km/s, T = 92.6 min. NASA/ESA say "about 90 minutes" for about 200 km (shuttle) [S10] and for LEO [S12]: consistent.

**Dependencies on the Earth radius.** The period depends on a = R_earth + mean altitude, so the radius you choose shifts the period slightly. Against the six Gemini IV periods and MA-7 (COMPUTED, formulas above):
- R = 6378.137 km: differences from NASA's printed periods +0.04 to +0.11 min for Gemini IV, +0.24 min for MA-7.
- R = 6371.0 km: differences -0.10 to -0.04 min for Gemini IV, +0.10 min for MA-7.
- Either choice reproduces NASA's periods to within about +/-0.3 min.

---

## 6. (Optional) Gemini rendezvous basics: why catching up means going lower

A good plain source exists: NASA's history of Gemini [S19], which explains the Gemini IV rendezvous failure. Use only if the lesson gets a "rendezvous" teaser.

- Gemini IV (June 1965) tried to station-keep with its spent Titan second stage and failed. The mission report says the crew "pointed the spacecraft at the second stage and thrusted", and later, "At this point, two choices were available: One choice was to retrothrust to a different orbit and to attempt a rendezvous; the other was to force the spacecraft toward the launch vehicle by using the ... OAMS to overcome the relative velocities resulting from the now different orbits. Because of the time constraints ... the brute force method was selected." In the end "they could not close on it with a reasonable amount of fuel" and the exercise was abandoned [S17 section 7.1.2.4.1, PDF p.277]. The crew used up about 115 pounds of propellant in 74 maneuvers over about 80 minutes (about 102 ft/s total) [S17 PDF p.79]; NASA history says they exhausted nearly half their propellant [S19 PDF p.269].
- NASA's explanation: "To catch something on the ground, one simply moves as quickly as possible in a straight line to the place where the object will be... that will not work in orbit. Adding speed also raises altitude, moving the spacecraft into a higher orbit than its target. The paradoxical result is that the faster moving spacecraft has actually slowed relative to the target, since its orbital period, which is a direct function of its distance from the center of gravity, has also increased... The proper technique is for the spacecraft to reduce its speed, dropping to a lower and thus shorter orbit, which will allow it to gain on the target. At the correct moment, a burst of speed lifts the spacecraft to the target's orbit..." [S19 PDF p.269 (printed 248)].
- Real rendezvous: Gemini VI-A (lower orbit, so "nearer to Earth and so moving faster, now lagged only 1175 kilometers behind Gemini VII" after the 4 m/s burn; later "the lower orbiting vehicle gained slowly on its target") [S19 PDF p.307-308 (printed 286-287)]. Over Carnarvon, 3 h 47 min into the flight, the aft thrusters fired for 54 s to add 13 m/s, leaving an almost circular 270 x 274 km orbit [S19 PDF p.308].
- Kepler's third law is the physics behind "lower = shorter period" [S20 PDF p.90]. The same law means a bigger a gives a longer T.

**Common misconception (sourced):** "just point at the target and thrust" does not work in orbit [S19 PDF p.269]. NASA engineer Andre Meyer: the crew, like everyone at MSC, "just didn't understand or reason out the orbital mechanics involved" [S19 PDF p.269].

---

## Simulation spec: 2D Keplerian orbit simulator

State and units
- Position r = (x, y) in km from Earth's center; velocity v = (vx, vy) in km/s. Origin at the center of the Earth. (Plane = orbital plane; normal/radial burns out of scope.)
- Constants: mu = 398,600 km^3/s^2 [S13]; R_earth = 6378.137 km (draw the surface; altitude = |r| - R) [S13, S20 p.95]. 1 nmi = 1.852 km; 1 ft/s = 0.3048 m/s [S21]. Use 6371.0 km only if the lesson needs a "mean Earth" (differences above).

Motion between burns
- Equation of motion: acceleration = -mu r/|r|^3 [S20 slide 44, PDF p.44] (this is the governing equation; see the table in section 5).
- Either integrate it (RK4 with a small step, a few seconds) or propagate the ellipse analytically; either way energy E = v^2/2 - mu/r and h = x vy - y vx must stay constant [S20 slides 50-53]. Use their drift as a self-test (unit test).
- Atmosphere: ignore drag in the ideal model. To show re-entry, end the run when altitude drops below an "entry" altitude. NASA gave the practical orbit floor of about 150 km [S10] (ESA says generally not below 180 km [S12]); Gemini IV's retro orbit with a perigee of 42.3 nmi (78 km) led to reentry [S17 PDF p.82]. Choose the cutoff altitude as a labelled simplification (interpretation); NASA's slides do not give a single "entry interface" altitude in what was read. (Gemini IV planned its rolling reentry to begin at 400,000 ft, about 122 km [S17 PDF p.82]; 400,000 ft = 121.9 km, COMPUTED.)

Burns
- Instantaneous change of speed along the velocity direction: v_new = v + dv * v/|v| (dv > 0 prograde/posigrade, dv < 0 retrograde) [terminology from S18 PDF p.345-346; S19 PDF p.307]. Accept dv in m/s, km/s or ft/s (Gemini documents use ft/s; Gemini VI-A burns in m/s).

Outputs (from the current r and v)
- a = -mu/(2E), E = v^2/2 - mu/r [S20 p.50, 154].
- h = x vy - y vx; p = h^2/mu [S20 p.63]; e from p = a (1 - e^2) [S20 p.64], i.e. e = sqrt(1 - p/a) (algebraic consequence).
- r_peri = a (1 - e), r_apo = a (1 + e) (distance from center) [S20 p.64 evaluated at nu = 0, 180 deg]. Perigee altitude = r_peri - R_earth, apogee altitude = r_apo - R_earth. Show both in km and (optionally) nmi (1 nmi = 1.852 km).
- Period T = 2 pi sqrt(a^3/mu) [S20 p.90]. Speed at any radius: v = sqrt(mu (2/r - 1/a)) (section 5).
- If E >= 0 the path is not closed (parabola/hyperbola: e >= 1 [S20 p.65]); show "not an orbit around Earth". If r_peri < R_earth the path hits the Earth/atmosphere (reentry).

Reference orbits to validate against (inputs from NASA documents; "expected" are the NASA numbers; "model" are COMPUTED with the formulas above, mu = 398,600, R = 6378.137 km)

1. **Mercury MA-7 insertion** [S16 Table 3-I, PDF p.33]. Perigee 86.87 nmi (160.88 km), apogee 144.06 nmi (266.80 km), period 88 min 32 s (88.53 min), insertion speed 25,717 ft/s at altitude 527,859 ft (160.89 km), flight-path angle -0.0004 deg (so insertion is at perigee).
   - Model: perigee speed 7.8388 km/s (NASA 7.8385 km/s), period 88.77 min (NASA 88.53, +0.24).
   - Test: start at r = R + 160.89 km, speed 7.8385 km/s tangential, expect apogee about 266.8 km altitude (+/- a few km).
2. **Gemini IV insertion** [S17 Table 4-III, PDF p.93]. 87.6 x 152.2 nmi, 88.90 min, inclination 32.53 deg. Inertial velocity 25,746 ft/s (7.847 km/s) at spacecraft separation [S17 PDF p.79].
   - Model: period 88.94 min (+0.04), speed at perigee 7.842 km/s (the 25,746 ft/s figure is at a slightly different instant; it is 5 m/s higher than the model, UNVERIFIED reason).
3. **Gemini VI-A burn** [S19 PDF p.307]. Orbit 161 x 259 km; +4 m/s prograde at perigee gives an apogee of 272 km. Model: 272.7 km. Perigee unchanged.
4. **Gemini X burn sequence (Agena PPS/SPS)** [S18 PDF p.345-346, 354-355]. Test pairs "start orbit + burn -> end orbit":
   - 207.9 nmi circular (about 206.9 x 208.9) + 856 ft/s (260.9 m/s) posigrade at perigee -> 208.6 x 750.5 nmi. Model: 853 ft/s needed.
   - 208.6 x 750.5 nmi + 886 ft/s retrograde at perigee -> 190.2 x 208.7 nmi. Model: 190.7 x 208.6 nmi.
   - Use with a tolerance of about 2 percent, because NASA's exact burn points and start orbits are not all listed.

Do NOT use for validation: the Gemini IV 128 ft/s / 42.3 nmi retro example (burn point unknown, not reproducible, see section 4).

---

## Source conflicts
- LEO speed: JPL says "neighborhood of 30,000 km/hr (about 19,000 mph)" [S10]; ESA says about 7.8 km/s (28,100 km/h) [S12]. Not a real conflict: JPL's is a rounded "neighborhood". Winner: use ESA/NASA data computed from mu and r for actual numbers; quote JPL only as "about".
- Gemini IV preretro OAMS burn: planned 128 ft/s vs reconstructed 134 ft/s [S17 PDF p.240 vs p.89]. Both are NASA's. Winner: the post-flight reconstruction (134 ft/s) for what happened; 128 ft/s is what was planned.
- Gemini IV orbit decay table vs the rev-by-rev perigee: not a conflict, only noted.
- No other disagreements found.

## Open questions / UNVERIFIED
- No numeric delta-v for the Mercury retropack found (S15/S16 give thrust 3 x 1,000 lb and 10 s each, not velocity change). A source would be the Mercury Familiarization Manual SEDR 104 (named in [S1 p.6], not downloaded) or the MA-6 "Results" booklet (NASA SP, 204 pages; not located on NTRS).
- MA-6 (Glenn) period not found in the documents opened (S15 gives only perigee 86.9 and apogee 140.9 nmi [S15 PDF p.21]). The full "Results of the First United States Manned Orbital Space Flight" (MSC, 1962) was not obtained; the NTRS record 19620007576 is only Glenn's 57-page summary paper, which has no orbit numbers.
- Which Earth radius/model NASA used when it converted orbit numbers is not stated in the documents read.
- Radial burn effects (and normal burn effects beyond plane change): no plain source found. Left out.
- "Vis-viva" as a name: no opened source uses it. The JPL Mission Planning Guide chapter 7 (blocked 403) appears to contain it; try from a browser. The formula is documented here as the combination of two sourced equations [S20 p.50, p.154].
- NASA's "entry interface" altitude (where re-entry heating starts) was not found as a single number; Gemini IV used 400,000 ft for the start of the planned rolling reentry [S17 PDF p.82] (not the same thing).
- The effect of drag on the Gemini IV orbit table (apogee decay) is not explained in the table: not claimed.
- All S20 equations are read from the OCR text layer of the slide PDF, not checked against slide images.
