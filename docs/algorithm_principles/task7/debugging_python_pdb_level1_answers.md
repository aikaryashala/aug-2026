# Debugging Python with pdb (Level-1) — Answers with Reasoning

Answer key for `debugging_python_pdb_level1_questions.md`. Every answer
includes the reasoning. When checking a student's work, check the **why**,
not just the letter. A correct letter with a wrong reason is a lucky guess.

---

# Part A — Multiple Choice Questions

**Q1. Answer: (b) — nothing to prepare.**
Python runs the `.py` source file itself, so the "map" that `-g` added in C
(line numbers, variable names) is always available. There is no executable
and no flag. `python3 -m pdb biggest.py` is the whole setup.

**Q2. Answer: (c) — only the SyntaxError.**
Before running any line, Python checks (compiles) the whole file. The
unclosed `(` on line 3 fails that check, so lines 1 and 2 never run, even
though they are fine. The compile step still exists in Python. It is just
hidden inside `python3`.

**Q3. Answer: (b) — frozen before the first real line.**
Unlike LLDB, which loaded the program and waited for `b main` and `run`,
pdb freezes the program before its first executable line automatically. It
skips the comment on line 1, so the first stop is line 2. A script has no
`main`; it starts at the top.

**Q4. Answer: (a) — run a module as a program.**
`pdb` is a Python module, a file called `pdb.py`. `-m pdb` tells `python3`
to run that module, and pdb's job is to load and run *your* file under its
control.

**Q5. Answer: (c) — about to run, has NOT run yet.**
This is the same rule as LLDB. The `->` arrow always marks the *next* line to
execute. Getting this wrong inverts every observation you make afterwards.

**Q6. Answer: (d) — NameError.**
In C, `int num1;` reserves memory before the line runs, so you saw garbage.
In Python, a variable is *created* by the assignment itself. Before
`num1 = 7` runs, there is no `num1` at all: no box, so not even garbage.
This follows directly from Q5, because the arrow's line hasn't run yet.

**Q7. Answer: (a) — one source line, then freeze (step-over).**
`n` executes exactly the one line at the arrow and stops again. It's the
only stepping command Level-1 needs. `s` and `r` become relevant when your
programs have their own functions (Level-2).

**Q8. Answer: (b) — the whole call runs, then `--Return--`.**
Step-**over** means the function call is treated as one step, without diving
inside it. So the entire print executes, and `biggest = 12` appears right in
the middle of your pdb session. Because it was the last line, pdb then
reports `--Return--`: the module itself has finished.

**Q9. Answer: (c) — too noisy at module level.**
`p locals()` does work, and it does include `'num1': 7, 'num2': 12, 'big': 7`.
But at module level it also includes `__name__`, `__file__`, `__builtins__`
(with Python's whole copyright text) and more. Naming the variables you care
about gives a clean `(7, 12, 7)`.

**Q10. Answer: (b) — into the block.**
The condition `num2 (12) > big (7)` is true, so the arrow moves into the
indented block, onto `big = num2`. One more `n` and `p big` shows `12`. You
watched an `if` decide. (With `num2 = 3`, the arrow would skip the block
entirely; see Q27.)

**Q11. Answer: (c) — `b 6`.**
pdb breakpoints are usually named by **line number**. `b main` (LLDB's habit)
names a function, and our program has none. Use `ll` first to read the line
numbers.

**Q12. Answer: (b) — pdb restarts it.**
When the program ends, pdb says `The program finished and will be restarted`
and freezes at line 2 again, ready for another run. This surprises everyone
coming from LLDB, where the process simply exits. Leave with `q`.

**Q13. Answer: (b) — no line ran.**
A syntax error anywhere in the file stops the *whole* file from running,
because Python checks everything first. On Python 3.12, pdb then returns
straight to the shell. Newer Pythons enter **post-mortem** mode, which is
meant for inspecting a program that has already failed, and there you type
`q`. Either way there is nothing to step: fix the colon and start again.

**Q14. Answer: (c) — stale code.**
pdb compiled the file once, at start, and the running program is that 10:00
version. `ll` reads the file fresh from disk, so it shows the 10:05 text. The
two disagree, which is exactly why stale code is dangerous. Fix: `restart`.

**Q15. Answer: (d) — a module in the same process.**
`python3 -c "import pdb; print(pdb.__file__)"` shows it is a `.py` file in
the standard library. It runs inside the same `python3` process as your
program and asks Python to call it before every line. LLDB, by contrast, was
a separate process controlling yours from outside.

---

# Part B — Fill in the Blanks

**Q16.** ( **`n`** → **`p …`** ) × many (for example `p num1, num2, big`).
The rhythm: look at the arrow, X-ray the variables, execute one line,
repeat. Predicting before each look makes it stick.

**Q17.** `next` = **`n`**, `continue` = **`c`**, `quit` = **`q`**,
`longlist` = **`ll`**.

**Q18.** plain **Enter**.
The empty command repeats the previous one, so the stepping loop becomes
hammering one key.

**Q19.** the **line** number; **module** level.
`biggest.py(2)` means file `biggest.py`, line 2. `<module>` means top-level
code. All Level-1 programs live there.

**Q20.** **`display`** (as in `display big`).
pdb then announces `display big: 7  [old: ...]` on its own, but only on the
steps where the value changes.

**Q21.** `count = **0**, total = **15**`; the program prints
`total = **15**`.
The table runs from 5 down to 0, and total goes 0, 5, 9, 12, 14, 15: the sum
5+4+3+2+1.

**Q22.** `b` alone **lists** all breakpoints; `clear 1` **removes /
deletes** breakpoint number 1.

**Q23.** **`restart`**.
It reloads the file from disk and freezes at line 1 again. (`q` and starting
pdb again does the same.)

**Q24.** **`s`** (step, step-in) and **`r`** (return, step-out).
They only matter once there are functions of your own to dive into and
climb out of. That is Level-2 material.

---

# Part C — Scenario Questions

**Q25. Kavya's LLDB habits.**
`b main` fails because `main` was a C requirement. Every C program starts
there. A Python script has no `main`: it simply runs from the top line down
(pdb's first output even says `<module>`, meaning top-level code). She
doesn't need `run` either, because pdb has *already* frozen the program
before its first real line. That was the job `b main` + `run` did in LLDB.
To start stepping, she just types `n`. If she wants to jump ahead, she
should use `ll` to find a line number, `b <line>` to plant a breakpoint
there, and `c` to run to it.

**Q26. Sandeep's "broken" file.**
His file is fine. The arrow is *before* `num1 = 7`, so that line hasn't run,
and in Python a variable doesn't exist until its assignment runs. pdb is
correctly saying "there is no `num1` yet". This is the Python version of the
garbage value he saw in LLDB, and an *honest* one: C had already reserved
memory and showed leftover bits, while Python shows that nothing is there at
all. After three `n`s (lines 2, 3 and 4 have run), `p num1, num2, big` shows
`(7, 12, 7)`.

**Q27. Anusha's prediction.**
With `num2 = 3` and `big = 7`, the condition `num2 > big` is `3 > 7`, which
is false. So the arrow **skips the indented block entirely** and lands
straight on the `print` line. `big` stays 7, and the program prints
`biggest = 7`. The reasoning is the same `if` logic as before, with the
opposite outcome. What the exercise teaches: re-reading code shows you the
decision you *assume*, but the debugger shows the decision that *actually
happened*. The arrow's path is the ground truth, and predicting before you
look is how you find the places where your assumption and the program
disagree. (She had to start pdb fresh after the edit. Otherwise she'd be
stepping stale code; see Q29.)

**Q28. Countdown from 3.**
Trace table, one row per visit to `while count > 0:`:

| lap | `count` | `total` | enters? |
|-----|---------|---------|---------|
| 1   | 3       | 0       | yes     |
| 2   | 2       | 3       | yes     |
| 3   | 1       | 5       | yes     |
| 4   | 0       | 6       | **no** — arrow jumps to `print` |

The loop body runs **3 times**, and the program prints `total = 6`
(3+2+1). The final visit with `count = 0` is a visit to the *condition*,
not a lap of the body, and the trace table makes that distinction
impossible to blur.

**Q29. Vamsi's ghost.**
This is **stale code** (Class Q2). When pdb started, it read and compiled
his file once, and the program it is running is that old version, still
loaded in memory. Saving the file changes the disk, not the running
program. `ll` reads the file fresh from disk, so it shows the new text, but
the code that actually runs is the old one. That is why the values make no
sense and the lines don't match. Newer Pythons (3.13+) warn
`running stale code until the program is rerun`, but Ubuntu 24.04's Python
3.12 says nothing. The habit: **after every edit, `restart`** (or `q` and
start pdb again).

**Q30. Only one process.**
pdb is not a separate program controlling hers from outside. It is Python
code (`pdb.py`) running *inside* the same `python3` process as her program.
Python lets pdb register itself to be called before every line, so the two
take turns: her line, pdb's check, her line, pdb's check. In Task 6 there
were two processes: lldb the puppeteer and her program the puppet, with the
OS's permission between them. Here there is one process, and the debugger
lives inside it, so `ps` shows a single `python3 -m pdb ...`.

**Q31. Investigating a hanging loop.**
Start with `python3 -m pdb program.py` (no compile step needed). Use `ll` to
find the first line inside the loop body, then `b <that line>` and `c`.
Every `c` now lands on the same line one lap later. At each stop, print
every variable the loop condition depends on (for example `p count`, or
`display count` so pdb announces it), and record them in a trace table, one
row per lap. The evidence that the loop can never end: the condition's
variables stop changing, or change in the wrong direction, from lap to lap.
For example, the counter that should decrease never does, because the
decrement line is missing, outside the indented block, or updates the wrong
variable. `p count > 0` at each stop shows the condition itself staying
`True` forever. The table turns "it seems to hang" into "here is the lap
where the values stopped moving, and here is the line that should have moved
them." Once you have seen enough, `q` leaves pdb even though the loop is
still unfinished.

**Q32. Maths in the debugger.**
pdb lives *inside* the same Python that runs his program (Class Q3). So when
he types `p <something>`, pdb simply hands that expression to Python to
evaluate, using the program's current variables. Any Python expression
works: `p count * 2`, `p total + count`, `p len("hello")`. At the
breakpoint on line 6 during lap 2, `count` is 4 and `total` is 5. So
`p total + count` shows `9`, the value `total` *will* get when he presses
`n`. When the arrow is **on the `while` line itself**, `p count > 0`
evaluates exactly the condition that line is about to test: `True` means the
next `n` enters the loop body, and `False` means the arrow will jump out to
`print`. (It has to be asked on the `while` line. On line 6, `count` hasn't
been decremented yet, so the answer could be out of date by one lap.) He can
check his prediction with Python itself before pressing `n`, then watch the
arrow confirm it.
