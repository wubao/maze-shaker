NEON MAZE / MAZE SHAKER — PWA package (v10)
===========================================

Contents
  index.html                  the whole game (HTML + CSS + JS in one file)
  manifest.webmanifest         PWA metadata (name, icons, colours)
  sw.js                        service worker — offline play + installable
  icons/                       app icons (192 / 512 / 512-maskable / 180 apple-touch)
  music/maze1.mp3              soundtrack #1 (add maze2.mp3, maze3.mp3, … for variety)

The music
  On the first tap/click the game scans music/ for  maze1.mp3, maze2.mp3, …
  (contiguous numbering, up to 16). Each LEVEL is given one of those tracks at
  random. If you fail and RETRY the same level, the same track plays again; when
  you advance to a NEW level you get a fresh random track for it. If no numbered
  files are found it falls back to a single  maze.mp3,  and if that's missing too
  it uses the built-in 8-bit synth.

  To add songs: drop maze2.mp3, maze3.mp3, … next to maze1.mp3 (same folder,
  same naming), then bump the CACHE version string at the top of sw.js so phones
  pick up the new files.

Modes (v10)
  GAME mode (default): the maze size and shape scale automatically with your
    level — small for levels 1-5, then larger, with one circle/hexagon maze in
    every block of 5 levels. No size dropdown is shown in this mode.
  CUSTOM mode: press the Mode button (or the G key) to pick your own maze SIZE
    (6-36) and SHAPE (square / circle / hexagon). Those pickers appear in the
    side panel (where Line speed used to be).

Retry replays the same maze (v10)
  After a loss, "Retry level" rebuilds the EXACT maze you just played — same
  layout, one-way gates, entrance/exit and starting hazard positions — so you
  can re-attempt the same puzzle. "New maze" gives a fresh random one instead.
  (The timed hazard EVENTS afterward are still live, since they react to where
  you actually are; the puzzle you start from is identical.)

Controls
  Steer: tap a maze quadrant / D-pad / arrow keys / WASD.   Stop-go: centre tap or Space.
  MOW box (or shake / B key): trim grass.
  FIRE box (or F key, or shake) when carrying a ball: launch it toward the exit.
  Mode: button or G.   Music: M.   How-to: I.   Account: U.   Credits: C.   Hint: H.
  Pop-ups: every button shows its key; Enter/Space presses the focused one, Tab
  cycles, Esc closes.

Settings (v10)
  Hint route and Line speed now live inside the Account pop-up, under SETTINGS.
  They save with your progress (works for guests too).

Splash / Credits
  The star button opens an animated credits splash drawn in JS on a canvas.

Deploy to GitHub Pages
  1. Upload the CONTENTS of this folder to your repo root — index.html at the top
     level, with icons/ and music/ beside it (don't nest them in an extra folder).
  2. Settings -> Pages -> Build and deployment -> Source: "Deploy from a branch",
     Branch: main, Folder: / (root) -> Save.
  3. Open  https://<your-user>.github.io/<repo>/  — on a phone, browser menu ->
     "Add to Home Screen" to install it.

Notes
  - All paths are RELATIVE, so it works from a project subfolder.
  - A service worker only runs over http/https, so install + offline activate once
    it's on Pages — not when double-clicking the file locally (the game still runs).
  - Real device-shake needs a phone; on iOS tap the on-screen SHAKE box once to
    grant motion access. The SHAKE box and the B key do the same on any device.

============================================================
VERSION HISTORY
  Newest first. Keep this updated: when you ship vN, add a line describing what
  changed from v(N-1). Also bump CACHE in sw.js (e.g. 'neon-maze-v11') so
  installed phones pick up the new build.
============================================================

  v10  - Retry level now REPLAYS the exact maze just played (level state is saved
         on build: grid, one-way gates, entrance/exit, roamer start positions).
       - Added GAME vs CUSTOM mode (Mode button / G key). Maze Size no longer
         shows in Game mode; in Custom you pick size (6-36) AND shape
         (square/circle/hexagon), shown where Line speed used to be.
       - Added a dedicated "FIRE" ball button beside MOW so the ball is usable
         on desktop (also bound to the F key). MOW and FIRE are now separate.
       - Moved Hint and Line speed into Account -> SETTINGS.

  v9   - [your edits — fill in] iteration between the v8 keyboard build and v10.

  v8   - Added small mazes for beginners (6x6, 12x12, 18x18) alongside 24/30/36.
       - Added non-rectangular mazes: CIRCLE and HEXAGON shapes (cells outside the
         shape become an invisible VOID; entrance/exit open on the side extremes).
       - Level-driven sizing: small for levels 1-5, then easing toward the max,
         with one shaped maze in every block of 5 levels (the old "Auto" mode).
       - Full keyboard access for pop-ups: focus jumps to the most-likely button,
         Enter/Space presses it, Tab is trapped inside the pop-up, Esc closes, and
         every button carries a single-key shortcut shown as a key cap.
       - Toolbar shortcuts: M music, I how-to, U account, C credits.

  v7   - PWA packaging: manifest + service worker (installable, offline), app icons.
       - "Maze Shaker": device-shake action (phone) + SHAKE box + B key.
       - Grass that overgrows and blocks tiles (mow with a shake/B, every 15s).
       - Collectible balls: fire one toward the exit; it flashes the route and can
         smash through created walls if you're boxed in.
       - Torch-blob blackout hunter that homes in and collapses your vision.
       - MP3 soundtrack support (music/maze1.mp3 ...) with the 8-bit synth fallback.
       - Animated credits splash; tabbed How-to-play box.

  v6   - [pre-changelog — fill in]
  v5   - [pre-changelog — fill in]
  v4   - Core game baseline: canvas maze (recursive-backtracker), queued-turn
         steering, never-cross-your-line rule, timed hazards (stamps, hedgehogs,
         fire-starters, patchers), one-way gates, per-tier zoom + blackouts,
         built-in ChipAudio synth, local accounts / saved progress.
  v3   - [pre-changelog — fill in]
  v2   - [pre-changelog — fill in]
  v1   - [pre-changelog — fill in]  Initial NEON MAZE prototype.
