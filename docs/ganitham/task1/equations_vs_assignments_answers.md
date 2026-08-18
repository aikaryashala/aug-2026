# Equations vs Assignments — Answers with Reasoning

Check the **reasoning**, not just the word or number. If your answer matched but your reason didn't, treat it as wrong and redo the question.

---

# Part A — Allowed or Not?

**A1. Allowed** — Left of `=` is one box name (`b`); right is a calculation (`a + 3`). Reads as "b becomes a plus 3."

**A2. Not allowed** — The left side is `a + 3`, a calculation, not a box name. There is no box to store into. Rewrite: `b = a + 3`.

**A3. Allowed** — As a maths fact "a equals a times 2" would be strange, but as an instruction it is ordinary: right side first with the current `a`, then store — `a` becomes double its old value.

**A4. Not allowed** — `9` is not a box; nothing can be stored into it. The box belongs on the left: `c = 9`.

**A5. Not allowed** — `2b` hides a multiplication, and computing writes every multiplication with `*`. Rewrite: `c = 2 * b`.

**A6. Allowed** — One box name on the left (`c`), a calculation on the right (`a * b - 4`), every multiplication written. Nothing to fix.

**A7. Not allowed** — `3(a + 1)` hides the multiplication between `3` and the bracket. Rewrite: `b = 3 * (a + 1)`.

**A8. Not allowed** — The left side `a - 1` is a calculation, not a box name. The calculation belongs on the right, the box on the left: `a = a - 1` ("a becomes old a minus 1").

---

# Part B — Rewrite Maths as Computing

**B1. `c = 2 * a + b`** — The box `c` is already on the left; only the hidden multiplication `2a` needs its `*`.

**B2. `b = a + 5`** — The lone box name `b` moves to the left; the calculation `a + 5` moves to the right. The meaning is unchanged.

**B3. `c = 3 * (a + b)`** — Write the `*` between `3` and the bracket. The brackets stay — they still say "add first."

**B4. `b = 2 * a`** — Two fixes in one line: the box `b` moves to the left, and `2a` becomes `2 * a`.

**B5. `c = a * b + 4`** — `ab` is `a` times `b`, so write `a * b`.

**B6. `c = 4 * (b - 1)`** — The box `c` moves to the left, and the hidden multiplication before the bracket gets its `*`.

---

# Part C — Trace the States

**C1.**

```
line          a
a = 4         4
a = a + 4     8
a = a + 4     12
```

Each line reads the current `a` and adds 4: `4 + 4 = 8`, then `8 + 4 = 12`. Same instruction twice, different result each time — because the box's contents changed in between.

**C2.**

```
line          a
a = 3         3
a = a * a     9
a = a - 4     5
```

`a * a` uses the same current value twice: `3 * 3 = 9`. Then `9 - 4 = 5`. As maths facts, lines 2 and 3 would be impossible; as instructions they are routine.

**C3.**

```
line          a
a = 10        10
a = a / 3     3
a = a * 5     15
```

`10 / 3` keeps only the quotient: 3 fits 3 whole times into 10, so `a` becomes `3` (not 3.33…). Then `3 * 5 = 15`.

**C4.**

```
line          a     b
a = 5         5     -
b = 2 * a     5     10
a = b + a     15    10
```

Line 2 only **reads** `a`: `2 * 5 = 10` goes into `b`. Line 3 uses the current values of both: `10 + 5 = 15` goes into `a`, and `b` keeps its `10`.

**C5.**

```
line          a     b
a = 14        14    -
b = a % 4     14    2
a = a / b     7     2
```

`14 % 4`: `4 * 3 = 12`, remainder `14 - 12 = 2`, stored into `b`. Then `a = a / b` is `14 / 2 = 7`. Note line 2 doesn't change `a` — only the left-side name changes.

**C6.**

```
line          a     b     c
a = 2         2     -     -
b = 3         2     3     -
c = a * b     2     3     6
c = c * c     2     3     36
c = c / 4     2     3     9
```

`c` is built (`2 * 3 = 6`), squared with its own current value (`6 * 6 = 36`), then divided: `36 / 4 = 9` exactly. `a` and `b` are only read after their first lines, so they never change.
