# Debugging Python Code Using the Python Debugger (pdb) — Level-1

A lab built around *watching your program run one line at a time*. The rule for
the whole sheet: **don't guess what the code does — stop it, step it, and look
at the variables.**

All commands are for the **Ubuntu shell**. The debugger we use is **pdb**, the
debugger that comes built into Python itself — nothing extra to install.

If you finished Task 6 (LLDB for C), you already know the *idea* of this sheet.
Only the commands change, plus a few surprises that come from Python being a
different kind of language. Watch for the **Compare with LLDB** notes.

## What is debugging?

When a program gives a wrong answer, the bug is somewhere in the lines you
wrote — but *which* line? Reading the code again and again is guessing.
A **debugger** removes the guessing: it runs your program in slow motion,
**pausing before every line**, and lets you ask *"what is inside each variable
right now?"*

Think of it like watching a cricket replay frame by frame instead of at full
speed — you see exactly the moment things went wrong.

## The debug loop map (keep this in front of you)

```
 write biggest.py
   │
   ▼
 python3 -m pdb biggest.py    ← start the debugger; program FREEZES at line 1
   │                            (no compile step, no breakpoint needed to start)
   ▼
 n  →  n  →  n ...            ← execute ONE line at a time (step-over)
   │     (after every n: p num1, num2, big — look at the values)
   ▼
 b 6  →  c                    ← optional: jump ahead to a line at full speed
   │
   ▼
 program ends → q             ← leave the debugger
```

One rule for this whole task: we only use **`n`** (next, step-over). pdb also
has `s` (step-in) and `r` (return, step-out) — those only matter once your
programs have *functions you wrote yourself*. We will meet them in **Level-2**,
after you learn to write your own functions.

## Setup (one time)

Check that Python exists:

```
python3 --version
```

Ubuntu ships with Python 3 already installed. If it is somehow missing:

```
sudo apt update
sudo apt install python3
```

There is no separate debugger to install — **pdb is part of Python**. Prove
it:

```
python3 -m pdb --help
```

---

# Concept 1 — No `-g`, no executable: pdb reads your `.py` file directly

### a. What we set up / save in a file

In C, you had to compile with `-g` to give LLDB a map from machine code back
to your lines. Python has no such step for you to do: `python3` reads your
`.py` source file every time you run it, so the map back to your lines and
variable names is **always there**.

Create this file:

```python
# biggest.py
num1 = 7
num2 = 12
big = num1

if num2 > big:
    big = num2

print("biggest =", big)
```

Create a second, tiny file with a deliberate mistake on its **last** line:

```python
# typo.py
print("line 1 ran")
print("line 2 ran")
print("line 3 ran"
```

### b. Task

1. Run `biggest.py` normally:
   ```
   python3 biggest.py
   ```
2. List the folder:
   ```
   ls -l
   ```
   Look for an executable like the `./biggest` you made in Task 6.
3. Run `typo.py`:
   ```
   python3 typo.py
   ```
   **Before you press Enter, predict:** will lines 1 and 2 print before Python
   complains about line 3?

### c. Observation (what you should find)

- `biggest.py` prints `biggest = 12`.
- `ls -l` shows only `.py` files. There is **no executable**. You run (and
  debug) the source file itself.
- `typo.py` prints **nothing** except the error:
  ```
    File "typo.py", line 4
      print("line 3 ran"
           ^
  SyntaxError: '(' was never closed
  ```
  Lines 1 and 2 are perfectly fine, yet they did **not** run. Before running a
  single line, Python checks (compiles) the **whole file**. If any part fails
  that check, nothing runs at all.

**Compare with LLDB:** in C, compiling was a separate command (`clang -g`) that
you ran yourself. In Python, the compile step is hidden inside `python3` and
happens automatically on every run. It still exists, as `typo.py` just proved.

**Takeaway to say out loud:** no `-g` and no executable. pdb works straight
from your `.py` file. But Python still checks the whole file first, so a file
with a syntax error cannot run, and it cannot be debugged either.

---

# Concept 2 — Starting pdb: the program freezes at the first line

### a. What we set up / save in a file

Start the debugger with your program:

```
python3 -m pdb biggest.py
```

`-m pdb` means *"run the module named `pdb`"*. pdb then loads `biggest.py`
and **freezes it before the first line**. You don't need a breakpoint for that.

The screen shows:

```
> /home/you/biggest.py(2)<module>()
-> num1 = 7
(Pdb)
```

The shell prompt has changed to `(Pdb)`. You are now talking to the debugger,
not the shell.

**Compare with LLDB:** LLDB loaded the program and waited; you needed `b main`
and `run` to reach the first line. A Python script has no `main` to begin
from: it simply starts at the top. So pdb freezes at the top for you
automatically.

### b. Task

1. Start pdb with `biggest.py`. Read the first line of output slowly. Find:
   the file name, the line number in `( )`, and the word `<module>`.
2. Look at the line beginning with `->`. Has `num1 = 7` run yet?
3. Ask pdb to show your whole program, with the arrow in it:
   ```
   (Pdb) ll
   ```
   **Note:** `ll` is short for "long list": it shows the whole file. Plain `l`
   (list) shows about 11 lines around the arrow.
4. Quit, then start again. Practise the cycle once more:
   ```
   (Pdb) q
   ```

### c. Observation (what you should find)

- `biggest.py(2)` means *file `biggest.py`, line 2*. Line 1 is a comment, and
  pdb skips comments and blank lines because nothing there runs.
- `<module>` means *"top-level code, not inside any function"*. All our
  Level-1 programs live at module level.
- `ll` prints:
  ```
    1     # biggest.py
    2  -> num1 = 7
    3     num2 = 12
    4     big = num1
    ...
  ```
- The arrow `->` marks the line that is **about to run, and has NOT run
  yet**. The program is frozen *before* line 2, not after it. This is exactly
  the same rule as LLDB's arrow.

**Takeaway to say out loud:** `python3 -m pdb file.py` loads the program and
freezes it at the first real line. The `->` arrow always means "next line to
execute", in pdb just like in LLDB.

---

# Concept 3 — `n` and `p`: one line at a time, eyes on the variables

### a. What we set up / save in a file

Two commands do almost all Level-1 debugging:

| Command | Short | Meaning |
|---------|-------|---------|
| `next` | `n` | Execute exactly the ONE line at the arrow, then freeze again (**step-over**) |
| `p num1, num2, big` | — | Show the current values of the variables you name |
| `display big` | — | Show `big` automatically whenever its value changes |

The rhythm of debugging is a loop you do with your hands:

```
look at the arrow  →  p num1, num2, big  →  n  →  (repeat)
```

**Why not one command for "all variables", like LLDB's `frame variable`?**
pdb's version is `p locals()`. But at module level, it also prints dozens of
Python's own hidden names (`__name__`, `__builtins__`, …) and buries your three
variables in a wall of text. Try it once to see. Naming the variables you care
about is cleaner.

We keep using `biggest.py` from Concept 1. It has an `if`.

### b. Task

1. Start fresh: `python3 -m pdb biggest.py`.
2. Before pressing anything else, look at the variables:
   ```
   (Pdb) p num1, num2, big
   ```
   In Task 6, LLDB showed *garbage* at this moment. Predict what Python will
   show.
3. Now do the rhythm. After **every** `n`, run `p num1, num2, big` and note
   which value changed:
   ```
   (Pdb) n
   (Pdb) p num1, num2, big
   ```
   **Note:** pressing plain **Enter** at the `(Pdb)` prompt repeats the
   previous command, so you can hammer Enter to keep stepping.
4. When the arrow reaches the `if num2 > big:` line, **stop and predict**:
   will the arrow jump *into* the indented block or *over* it? Then press `n`
   once and check.
5. Keep stepping until the program prints `biggest = 12`. Then `q`.
6. Start again, and this time, before any `n`, type:
   ```
   (Pdb) display big
   ```
   Then just step with `n` and watch what pdb tells you on its own.

### c. Observation (what you should find)

- In step 2, **before** `num1 = 7` has run, pdb answers:
  ```
  *** NameError: name 'num1' is not defined
  ```
  **No garbage here.** In C, `int num1;` reserves a box in memory before line 6
  runs, and the box holds whatever leftover bits were already there. A Python
  variable **does not exist at all until the line that assigns it runs**. There
  is no box yet, so there is nothing to show, not even garbage.
- `p num1, num2, big` keeps failing with `NameError` until **all three**
  exist. To watch them appear one at a time, use `p num1` alone after the
  first `n`. It shows `7`.
- After line 4 (`big = num1`) runs, `p num1, num2, big` shows `(7, 12, 7)`.
- At the `if`: `num2 (12) > big (7)` is true, so the arrow moves **into** the
  indented block, onto `big = num2`. One more `n` and `p big` shows `12`. You
  just *watched* an `if` decide.
- Change the experiment: edit `num2 = 3`, save, and start pdb again. This
  time the arrow **skips the indented block entirely** and lands straight on
  the `print` line. The `if` chose the other path, and you saw it.
- On the `print` line, `n` runs the *whole* print. That's why it is called
  step-**over**: `biggest = 12` appears in the middle of your pdb session.
  pdb then shows a `--Return--` line. That is pdb saying *"the module has
  finished its last line."*
- With `display big`, pdb reports changes **by itself**. First it says
  `** raised NameError ... **`, and after `big = num1` runs it says
  `display big: 7  [old: ...]`. It only speaks up when the value changes.

**Takeaway to say out loud:** `n` executes exactly one of *your* lines, and
`p` is the X-ray you take after every step. A Python variable doesn't exist
until its line runs (NameError, not garbage). Watching the arrow at an `if`
shows you the *actual decision*, not the one you assumed.

---

# Concept 4 — Tracing a `while` loop: breakpoints and `c`

### a. What we set up / save in a file

Loops are where eyes-only debugging fails: the same lines run again and again
with *different* values. The debugger shows every lap. Create this file:

```python
# countdown.py
count = 5
total = 0

while count > 0:
    total = total + count
    count = count - 1

print("total =", total)
```

Load it:

```
python3 -m pdb countdown.py
```

This time we also use a **breakpoint**, a marker meaning *"when the running
program reaches this line, freeze."* In pdb you name a breakpoint by its
**line number**:

```
(Pdb) b 6
```

**Compare with LLDB:** `b main` named a *function*. Our Python program has no
functions yet, so we name a *line*. To check line numbers, use `ll`.

### b. Task

1. `ll` to see the line numbers. Confirm that `total = total + count` is
   line 6.
2. Step with `n` until the arrow first reaches `while count > 0:`. Check
   `p count, total` and write the values down.
3. Keep the rhythm going (`n`, then `p count, total`) around the loop. On
   paper, fill a **trace table**, one row every time the arrow lands on the
   `while` line:

   | lap | `count` when at `while` | `total` when at `while` | will it enter the loop? |
   |-----|-------------------------|--------------------------|-------------------------|
   | 1   | 5                       | 0                        | yes / no                |
   | 2   |                         |                          |                         |
   | 3   |                         |                          |                         |
   | ... |                         |                          |                         |

4. **Before each lap**, predict the two values, *then* look. Prediction first,
   `p` second.
5. The important moment is the lap where `count` is `0`. Predict where the
   arrow will go when you press `n` on the `while` line. Then look.
6. `q`, start pdb again, and this time take the fast road:
   ```
   (Pdb) b 6
   (Pdb) b
   (Pdb) c
   (Pdb) p count, total
   (Pdb) c
   (Pdb) p count, total
   ```
   **Note:** `b` alone lists all breakpoints. `c` (continue) means "stop
   stepping and run at full speed until the next breakpoint or the end."
7. When you have seen enough laps, remove the breakpoint and let the program
   finish:
   ```
   (Pdb) clear 1
   (Pdb) c
   ```
8. Type `help n` at the `(Pdb)` prompt and skim what it says. Every pdb
   command documents itself this way.

### c. Observation (what you should find)

- The arrow cycles: `while` → `total = total + count` → `count = count - 1`
  → back to `while`. The *same three lines* run again and again, and you can
  see the loop happen.
- Your trace table fills up as: `count = 5, total = 0` → `count = 4, total = 5`
  → `count = 3, total = 9` → `count = 2, total = 12` → `count = 1, total = 14`
  → `count = 0, total = 15`.
- On the lap where `count` is `0`, the condition `count > 0` is false. `n`
  makes the arrow **jump past the indented block straight to the `print`
  line**. That jump *is* the loop ending, and you watched the exact moment.
- With `b 6` + `c`, every `c` lands you on line 6 again, one lap later:
  first `(5, 0)`, then `(4, 5)`, and so on. That gives one stop per lap
  without stepping through every line.
- After `clear 1` and `c`, `total = 15` prints, and then pdb says:
  ```
  The program finished and will be restarted
  > /home/you/countdown.py(2)<module>()
  -> count = 5
  ```
  **Surprise:** pdb does *not* exit when your program ends. It reloads the
  program and freezes at line 2 again, ready for another run. To leave, type
  `q`.

**Takeaway to say out loud:** a loop is just the arrow travelling in a circle
while the variables change each lap. The trace table you filled by hand *is*
what the debugger shows for free. When a loop misbehaves (runs forever, or
runs one time too many), this is exactly how you catch it.

---

## One-page command reference

| Goal                                   | Command                          | Short |
|----------------------------------------|----------------------------------|-------|
| Start the debugger (freezes at line 1) | `python3 -m pdb file.py`         | —     |
| Show the whole program with the arrow  | `longlist`                       | `ll`  |
| Show ~11 lines around the arrow        | `list`                           | `l`   |
| Execute one line, step-over            | `next`                           | `n`   |
| Show some variables                    | `p count, total`                 | —     |
| Show a variable whenever it changes    | `display total`                  | —     |
| Set breakpoint at a line               | `break 6`                        | `b 6` |
| List all breakpoints                   | `break`                          | `b`   |
| Remove breakpoint number 1             | `clear 1`                        | `cl 1`|
| Run at full speed until next stop      | `continue`                       | `c`   |
| Start the program over from line 1     | `restart`                        | —     |
| Repeat the previous command            | *(just press Enter)*             | —     |
| Help on any command                    | `help n`                         | `h n` |
| Leave the debugger                     | `quit`                           | `q`   |

**The Level-1 rhythm to remember:** `python3 -m pdb file.py` → (`n` → `p …`) × many → `c` → `q`.

**LLDB ↔ pdb side by side:**

| Idea | LLDB (C, Task 6) | pdb (Python, Task 7) |
|------|------------------|----------------------|
| Prepare the program | `clang -g file.c -o file` | *(nothing; the `.py` is the program)* |
| Start the debugger | `lldb ./file` | `python3 -m pdb file.py` |
| Freeze at the start | `b main` then `run` | *(automatic)* |
| One line, step-over | `next` / `n` | `next` / `n` |
| Look at variables | `frame variable` / `v` | `p a, b, c` |
| Before the line runs | garbage value | `NameError` (the variable doesn't exist yet) |
| Breakpoint | `b main` (a function) | `b 6` (a line) |
| Program ends | process exits | pdb restarts it; `q` to leave |

**Coming in Level-2** (after you learn to write functions): `s` (step-in)
and `r` (return, step-out), which let you dive into a function call and
climb back out.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English word | తెలుగు అర్థం |
|--------------|--------------|
| **debugging** | దోష నివారణ — ప్రోగ్రామ్‌లో దాగిన తప్పు (bug)ను వెతికి, సరిచేసే ప్రక్రియ. |
| **debugger** | డీబగ్గర్ — ప్రోగ్రామ్‌ను నెమ్మదిగా, పంక్తి-పంక్తిగా నడిపిస్తూ లోపలి విలువలను చూపించే సాధనం (ఇక్కడ pdb). |
| **pdb** | పీడీబీ — Python లోనే అంతర్నిర్మితంగా వచ్చే డీబగ్గర్; విడిగా install చేయనవసరం లేదు. |
| **module** (`-m`) | మాడ్యూల్ — Python కోడ్ ఉన్న ఒక ఫైల్; `python3 -m pdb` అంటే "pdb అనే మాడ్యూల్‌ను ప్రోగ్రామ్‌గా నడిపించు". |
| **module level** (`<module>`) | మాడ్యూల్ స్థాయి — ఏ ఫంక్షన్ లోపలా కాకుండా, ఫైల్‌లో నేరుగా రాసిన పై-స్థాయి కోడ్. |
| **source file** | మూల ఫైల్ — మనం రాసే `.py` ఫైల్; Python దీన్నే నేరుగా చదివి నడిపిస్తుంది. |
| **syntax error** | వ్యాకరణ దోషం — Python అర్థం చేసుకోలేని విధంగా రాసిన కోడ్ (ఉదా: మూయని బ్రాకెట్); ఇది ఉంటే ఒక్క పంక్తి కూడా నడవదు. |
| **breakpoint** | విరామ బిందువు — "ప్రోగ్రామ్ ఈ పంక్తికి చేరగానే ఆగిపో" అని పెట్టే గుర్తు. |
| **freeze / pause** | స్తంభింపజేయడం — ప్రోగ్రామ్‌ను చంపకుండా, ఉన్నచోటే ఆపి ఉంచడం. |
| **step-over** (`n`) | పంక్తి దాటు — బాణం గుర్తు ఉన్న ఒక్క పంక్తిని మాత్రమే నడిపి, మళ్ళీ ఆగడం. |
| **step-in / step-out** | లోపలికి అడుగు / బయటికి అడుగు — ఫంక్షన్ లోపలికి వెళ్ళడం / బయటికి రావడం. (ఇవి Level-2 లో నేర్చుకుంటాం.) |
| **variable** | చరరాశి — విలువను దాచుకునే పేరు (ఉదా: `count`, `total`). |
| **value** | విలువ — చరరాశిలో ప్రస్తుతం ఉన్న సంఖ్య/సమాచారం. |
| **NameError** | పేరు దోషం — ఇంకా సృష్టించబడని చరరాశిని అడిగినప్పుడు Python ఇచ్చే దోషం; విలువ ఇచ్చే పంక్తి నడవక ముందు చరరాశి అసలు ఉనికిలోనే ఉండదు. |
| **garbage value** | చెత్త విలువ — C లో, విలువ ఇచ్చే పంక్తి నడవక *ముందు* కనిపించే అర్థంలేని సంఖ్య; Python లో ఇది ఉండదు. |
| **display** | ప్రదర్శించు — ఒక చరరాశి విలువ మారిన ప్రతిసారీ pdb తనంతట తానే చూపించేలా చేసే ఆదేశం. |
| **trace / tracing** | జాడ పట్టడం — ప్రోగ్రామ్ ఏ పంక్తి తర్వాత ఏ పంక్తి నడిచిందో, విలువలు ఎలా మారాయో అనుసరించడం. |
| **trace table** | జాడ పట్టిక — ప్రతి మలుపు (lap) వద్ద చరరాశుల విలువలను రాసుకునే పట్టిక. |
| **condition** | షరతు — `if`/`while` లో నిజమా, అబద్ధమా అని తేల్చే ప్రశ్న (ఉదా: `count > 0`). |
| **loop / lap** | మలుపు / చుట్టు — `while` బ్లాక్ లోని పంక్తులు ఒకసారి పూర్తిగా నడవడం. |
| **indented block** | లోపలికి జరిపిన బ్లాక్ — `if`/`while` కింద ఖాళీలతో లోపలికి రాసిన పంక్తులు; C లోని `{ }` పని Python లో indentation చేస్తుంది. |
| **prompt** | ప్రాంప్ట్ — ఆదేశం కోసం ఎదురుచూసే గుర్తు (`(Pdb)` అనేది డీబగ్గర్ ప్రాంప్ట్; shell ప్రాంప్ట్ వేరు). |
| **continue** | కొనసాగించు — పంక్తి-పంక్తి ఆపడం మాని, పూర్తి వేగంతో ముందుకు నడిపించడం. |
| **restart** | మళ్ళీ మొదలుపెట్టు — ప్రోగ్రామ్‌ను ఫైల్ నుండి తాజాగా చదివి, మొదటి పంక్తి నుండి నడిపించడం. |
| **stale code** | పాత కోడ్ — ఫైల్ మారిపోయినా, డీబగ్గర్ ఇంకా నడిపిస్తున్న పాత రూపం. |
| **process** | ప్రక్రియ — నడుస్తున్న ప్రోగ్రామ్; pdb, మన ప్రోగ్రామ్ రెండూ ఒకే Python ప్రక్రియలో నడుస్తాయి. |
| **predict** | అంచనా వేయడం — చూడక ముందే "ఇలా జరుగుతుంది" అని ఊహించి రాయడం; తర్వాత డీబగ్గర్‌తో సరిచూసుకోవడం. |

---

# Questions from the class (Q & A)

These are the Task-6 class questions, asked again for Python. The answers are
**different** this time, and seeing *why* they differ teaches you how Python
works.

## Q1. I removed the colon after `if num2 > big`. pdb printed an error and none of my lines ran. Why?

**Short answer:** Python checks the **whole file** before running even its
first line. A missing colon fails that check (a **syntax error**), so there
is no program to step through.

```
  File "biggest.py", line 6
    if num2 > big
                 ^
SyntaxError: expected ':'
```

The broken line is line 6, yet lines 2–4 (which are fine) never ran either.
It is the same lesson as `typo.py` in Concept 1. On Ubuntu 24.04's Python
3.12, pdb prints the error and drops you straight back at the shell. Newer
Pythons (3.13+) add `Uncaught exception. Entering post mortem debugging` and
show a `(Pdb)` prompt. **Post-mortem** ("after death") is a mode for looking
at a program that has already failed. Here nothing ran, so there is nothing
to step. Type `q`.

```
 THE GATE: only files that pass Python's check can run (or be debugged)

 biggest.py ──► python3 checks whole file ──✗ SyntaxError: expected ':'
                         │
                         ▼
                 not one line runs  →  nothing to step

 biggest.py ──► python3 checks whole file ──✓ ──► pdb freezes at line 2 ✓
```

**Compare with LLDB:** the same gate exists, but it is hidden. In C, the gate
was `clang`. In Python, the gate is inside `python3` and runs every time.

**Takeaway to say out loud:** debugging is for programs that *run but behave
wrongly*. Syntax errors are fixed by reading Python's error message in the
editor.

## Q2. I edited the file while pdb was still running. `ll` shows my new line, but `p` shows the old value. How?

**Short answer:** you are debugging a **ghost**. pdb read and compiled your
file *once*, when it started. Editing the file on disk does not change the
program that is already loaded and running. `ll`, however, reads the file
**fresh from disk** every time, so it shows the new text.

Follow the timeline:

```
 TIME ─────────────────────────────────────────────────────────►

 10:00   python3 -m pdb biggest.py      pdb loads the file: num2 = 12
            └─► the RUNNING program is frozen in memory, from 10:00

 10:05   (pdb still open) you edit biggest.py: num2 = 3, save

 10:06   (Pdb) ll                        shows  num2 = 3    ← disk
         (Pdb) p num2                    shows  12          ← running program
            └─► two different programs: the file on disk,
                and the copy pdb is running
```

This is called **stale code**. It is dangerous because the source on your
screen and the program under the debugger *disagree*. You will step through
lines that "don't match" and see values that make no sense. Newer Pythons
(3.13+) print a warning:
`*** WARNING: file 'biggest.py' was edited, running stale code until the program is rerun`.
Ubuntu 24.04's Python 3.12 stays **silent**.

The fix is one command, which reloads the file and starts again from line 1:

```
(Pdb) restart
```

(Or `q` and start pdb again.) Habit: **after every edit, restart.**

**Compare with LLDB:** in Task 6 the ghost was a *stale executable*, an old
file left on disk after a failed compile. Python has no executable file, but
the ghost comes back in a new form: the old program **still loaded in
memory**.

**Takeaway to say out loud:** pdb runs the code it loaded at start, not the
code you see now. Edit → save → `restart`.

## Q3. What is `pdb`? Is it a program like `lldb`?

**Short answer:** pdb is a **Python module**: an ordinary `.py` file in
Python's standard library, written in Python. `python3 -m pdb` means *"Python,
run the module `pdb` as a program."* Then pdb, in turn, runs *your* file.

Prove it is just a file on disk:

```
python3 -c "import pdb; print(pdb.__file__)"    # e.g. /usr/lib/python3.12/pdb.py
less $(python3 -c "import pdb; print(pdb.__file__)")   # read the debugger's own code!
```

Here is the big difference from LLDB. **There is only ONE process.** With
LLDB, the debugger and your program were two separate processes. With pdb,
one `python3` process runs *both* pdb's code and your code, taking turns:

```
   you type: n, p count, b 6, c ...
        │
        ▼
 ┌──────────────────────────────────────────────┐
 │  ONE process:  python3                       │
 │                                              │
 │   ┌────────────┐  "before every line,       │
 │   │   pdb      │   call me first"            │
 │   │ (pdb.py)   │ ◄──────────────┐            │
 │   └────────────┘                │            │
 │                     ┌───────────┴────────┐   │
 │                     │  your biggest.py   │   │
 │                     └────────────────────┘   │
 └──────────────────────────────────────────────┘
```

- Python lets a program register a function that runs **before every line**.
  pdb registers itself this way. Before each of your lines, pdb gets control,
  checks whether it should stop (a breakpoint, or you pressed `n`), and if so
  shows you the `(Pdb)` prompt.
- Because pdb lives inside the same Python, `p` can evaluate **any Python
  expression**: `p count * 2`, `p total > 10`, `p len("hello")`. pdb is not
  reading raw memory like LLDB. It simply asks Python.
- This is also why your program can't "crash away" from pdb: when your code
  raises an error, the error is still inside pdb's process, and pdb catches
  it and freezes in post-mortem mode, so you can still `p` the variables at
  the moment of the crash.

**Takeaway to say out loud:** the debugger is a program like any other. LLDB
is a separate program that *controls* yours from outside. pdb is Python code
that runs *alongside* yours, inside the same Python. Either way, you are using
programs to inspect programs, and that is the whole craft.
