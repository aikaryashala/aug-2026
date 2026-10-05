# Debugging Python with pdb (Level-1) — Question Bank

Answer these **after** finishing the Task-7 worksheet (Debugging Python Code
Using the Python Debugger (pdb) — Level-1). Write your answers in your
notebook first. The worksheet's rule applies to these questions too: **don't
guess — predict, then verify** by stepping through the programs yourself, but
only *after* writing your prediction down.

The programs referred to below are the worksheet's `biggest.py` (numbers 7
and 12, an `if`), `countdown.py` (`count = 5`, `total = 0`, a `while` loop),
and `typo.py` (three `print` lines, the last one missing its `)`).

---

# Part A — Multiple Choice Questions

Choose the one best option.

**Q1.** In Task 6 you compiled with `clang -g` before debugging. What do you
do to prepare `biggest.py` for pdb?

- (a) Compile it with `python3 -g biggest.py`
- (b) Nothing — pdb works directly from the `.py` source file, which always carries your line numbers and variable names
- (c) Convert it to an executable with `chmod +x`
- (d) Add `import pdb` as the first line

**Q2.** You run `python3 typo.py`. Lines 1 and 2 are correct; line 3 is
missing its closing `)`. What do you see?

- (a) `line 1 ran` and `line 2 ran`, then a SyntaxError for line 3
- (b) Only `line 1 ran`, then a SyntaxError
- (c) Only the SyntaxError — Python checks the whole file before running any line, so nothing prints
- (d) All three lines print; Python fixes the bracket automatically

**Q3.** Immediately after `python3 -m pdb biggest.py`, what state is your
program in?

- (a) Loaded but not started — you must type `run` first
- (b) Frozen before its first real line (`num1 = 7`), waiting for your command
- (c) Already finished — pdb shows you a recording
- (d) Running in the background

**Q4.** What does the `-m` in `python3 -m pdb biggest.py` mean?

- (a) "Run the module named `pdb` as a program" — pdb then runs your file
- (b) "Make an executable"
- (c) "Monitor memory"
- (d) "Multi-line mode"

**Q5.** pdb shows `-> num1 = 7`. What does the arrow mean?

- (a) This line has just finished executing
- (b) This line contains the bug
- (c) This line is **about to run and has NOT run yet**
- (d) This is the line where the program will end

**Q6.** At that first stop (arrow on `num1 = 7`), you type `p num1`. What
does pdb answer?

- (a) A garbage value like `32767`
- (b) `0`
- (c) `None`
- (d) `*** NameError: name 'num1' is not defined` — a Python variable does not exist until the line that assigns it runs

**Q7.** What exactly does `n` do?

- (a) Executes exactly one of your source lines, then freezes again (step-over)
- (b) Jumps to the next breakpoint
- (c) Shows the next line without running anything
- (d) Creates a new variable

**Q8.** The arrow is on `print("biggest =", big)` and you press `n`. What
happens?

- (a) pdb steps into Python's own `print` code
- (b) The whole print runs — `biggest = 12` appears — then pdb shows `--Return--` because the module has finished its last line
- (c) Nothing prints until you quit pdb
- (d) pdb refuses — print cannot be stepped

**Q9.** Why does the worksheet use `p num1, num2, big` instead of
`p locals()`?

- (a) `p locals()` doesn't work in pdb
- (b) `p locals()` changes the variables
- (c) At module level, `p locals()` also prints dozens of Python's own hidden names (`__name__`, `__builtins__`, …), burying your three variables
- (d) `p locals()` only shows one variable

**Q10.** In `biggest.py`, `num2` is `12` and `big` is `7`. The arrow is on
`if num2 > big:`. You press `n`. Where does the arrow go?

- (a) It skips the indented block to the `print`
- (b) Into the indented block, onto `big = num2` — the condition is true
- (c) Back to line 2
- (d) To the end of the program

**Q11.** In `countdown.py`, how do you set a breakpoint on the line
`total = total + count` (line 6)?

- (a) `b main`
- (b) `b total`
- (c) `b 6`
- (d) `break while`

**Q12.** Your program finishes inside pdb. What happens next?

- (a) pdb exits and you're back at the shell
- (b) pdb prints `The program finished and will be restarted` and freezes at the first line again; you type `q` to leave
- (c) pdb crashes
- (d) The terminal closes

**Q13.** You remove the colon after `if num2 > big` (line 6) and start pdb.
It prints `SyntaxError: expected ':'`. Did lines 2–4 run? (Class Q1)

- (a) Yes — Python runs lines until it reaches the broken one
- (b) No — Python checks the whole file first; a syntax error anywhere means not one line runs
- (c) Only line 2 runs
- (d) Yes, but their output is hidden

**Q14.** While pdb is open, you edit `biggest.py` to `num2 = 3` and save. `ll`
shows `num2 = 3`, but `p num2` (after that line runs) shows `12`. Why?
(Class Q2)

- (a) pdb has a bug
- (b) The file didn't save
- (c) pdb is running the stale code it loaded at start; `ll` reads the file fresh from disk, but the running program doesn't change
- (d) Python rounds 3 up to 12

**Q15.** How is pdb different from LLDB as a program? (Class Q3)

- (a) pdb is a hardware feature of the CPU
- (b) pdb is part of the Linux kernel
- (c) pdb is a separate process that controls yours from outside, exactly like LLDB
- (d) pdb is a Python module (`pdb.py`) that runs in the **same** Python process as your program, getting control before every line

---

# Part B — Fill in the Blanks

Write the exact missing word, command, or value.

**Q16.** The Level-1 rhythm: `python3 -m pdb file.py` → ( __________ →
__________ ) × many → `c` → `q`.

**Q17.** The short forms: `next` = __________, `continue` = __________,
`quit` = __________, `longlist` = __________.

**Q18.** Pressing plain __________ at the `(Pdb)` prompt repeats the
previous command — so you can hammer it to keep stepping.

**Q19.** pdb's first output line is `> /home/you/biggest.py(2)<module>()`.
The `2` is the __________ number; `<module>` means the code is at
__________ level, not inside any function.

**Q20.** To have pdb report the value of `big` automatically whenever it
changes, type __________ `big`.

**Q21.** In `countdown.py`, the completed trace table ends with
`count = ______, total = ______` on the final visit to the `while` line —
and the program prints `total = ______`.

**Q22.** `b` with no line number __________ all breakpoints;
`clear 1` __________ breakpoint number 1.

**Q23.** After editing your file during a pdb session, type __________ to
reload the file and start again from line 1.

**Q24.** The two stepping commands saved for Level-2, once your programs
have their own functions: __________ (step-in) and __________ (step-out).

---

# Part C — Scenario Questions

Answer in 2–4 sentences each. Name the pdb commands involved.

**Q25.** Kavya comes from Task 6. She starts `python3 -m pdb biggest.py` and
immediately types `b main` and `run`. Neither does what she expects. Explain
why a Python script has no `main` to break on, why she doesn't need `run`,
and what she should do instead to start stepping.

**Q26.** Sandeep steps to the first line of `biggest.py`, types
`p num1, num2, big`, and gets `NameError: name 'num1' is not defined`. He
thinks his file is broken. Talk him down: why does this happen, how is it
different from the garbage values he saw in LLDB, and what should he see
after three `n`s?

**Q27.** Anusha edits `biggest.py` to `num2 = 3`, saves, starts pdb fresh,
and steps to the `if num2 > big:` line. Ask her the worksheet's question:
predict where the arrow goes on the next `n`. Give the answer, the
reasoning, and what this exercise teaches that re-reading the code cannot.

**Q28.** Fill in the countdown prediction: with `count = 3` instead of 5,
write the full trace table (each visit to the `while` line: `count`,
`total`, enters or not), and state the final printed total. How many times
does the loop body run?

**Q29.** Vamsi keeps pdb open all afternoon. He fixes a bug in his file,
saves, and keeps stepping — but the program still behaves the old way, and
the arrow's line doesn't match what `ll` shows. Diagnose it (Class Q2 has
the name), explain what pdb is actually running, and give the habit (and the
one command) that prevents it.

**Q30.** Ramya runs `ps` in another terminal while pdb is open on her
program. In Task 6 she saw two processes (lldb and her program). This time
she sees only one `python3`. Explain why, using Class Q3's picture.

**Q31.** A program with a `while` loop seems to "hang" when run normally —
suspicion: the loop never ends. Describe, step by step, how to investigate
with the Level-1 pdb toolkit: how to start, which breakpoint to set, what to
check at each stop, and what evidence would confirm the loop condition can
never become false.

**Q32.** Bhargav types `p count > 0` and `p total + count` at a breakpoint
inside the loop, and pdb answers `True` and `9`. "I didn't know you could do
maths in the debugger!" Explain why pdb can evaluate any Python expression
(think of Class Q3), and show how `p count > 0`, typed when the arrow is on
the `while` line, lets you predict the loop's next decision *before*
pressing `n`.
