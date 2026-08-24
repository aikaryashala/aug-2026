# Variables and Arithmetic — Answers with Reasoning

Check the **reasoning**, not just the letter or number. If your answer matched but your trace didn't, treat it as wrong and redo the snippet.

---

# Part A — Multiple Choice

**A1. B) 9** — Trace: `a: 5 → 7 → 9`. Each `a = a + 2` reads the current value and adds 2. (D is what you'd get by gluing digits together — arithmetic never does that.)

**A2. C) 14** — Trace: `a: 10 → 7 → 14`. Line 2 subtracts first (`10 - 3 = 7`); line 3 doubles what line 2 left behind (`7 * 2 = 14`). Order of lines matters.

**A3. C) 49** — Right side first: `a * a` is `7 * 7 = 49`, then stored. A variable multiplied by itself is squaring, using the *same current value* twice.

**A4. B) 3** — `17 / 5` with whole numbers keeps only the quotient: 5 fits 3 whole times into 17. The `.4` is dropped, not rounded — that's why C) 4 is wrong too.

**A5. D) 2** — `17 % 5` is the remainder: `5 * 3 = 15`, and `17 - 15 = 2`. Check with A4: quotient 3, remainder 2, and `5 * 3 + 2 = 17`.

**A6. A) 8** — Line 2 only **reads** `a` to compute `b` (`b` becomes 12). Only the name on the left of `=` changes, and in line 2 that name is `b`, not `a`.

**A7. B) 6** — `b = a` copies the value 6 into `b`. When `a` later becomes 20, `b` keeps its own copy. Boxes are copied, never linked.

**A8. C) 54** — Trace: `a: 2 → 6 → 18 → 54`. Each line triples the previous state. Stopping one line early gives A) 18 — trace all the lines.

**A9. B) 14** — `*` before `+`: `2 + (3 * 4) = 2 + 12 = 14`. Reading left to right gives the wrong A) 20.

**A10. A) 20** — Brackets first: `(2 + 3) * 4 = 5 * 4 = 20`. Same numbers as A9, different answer — brackets change the order.

**A11. C) 2** — `%` belongs with `*` and `/`, so it goes before `+`: `(9 % 4) + 1 = 1 + 1 = 2`. If you did `9 % (4 + 1)` you got 4 — precedence, not left-to-right.

**A12. B) 0** — Right side first with current values: `a - a` is `5 - 5 = 0`, then stored. Any number minus itself is 0.

**A13. D) 0** — Trace: `a: 100 → 10 → 1 → 0`. The last step is `1 / 10`: 10 fits **zero** whole times into 1, so the quotient is 0. Integer division can reach 0 and stay there.

**A14. A) 6** — `*` before `-`: `(3 * 3) - 3 = 9 - 3 = 6`, stored into `b`. `a` is only read.

---

# Part B — Fill in the Blanks

**B1. 9** — `4 + 5 = 9`. Trace: `a: 4 → 9`.

**B2. 3** — `12 / 4 = 3` (quotient). Confirm with the given next state: `3 * 5 = 15` ✓.

**B3. 2** — `20 % 6`: `6 * 3 = 18`, remainder `20 - 18 = 2`.

**B4. 20** — `a = a + a` doubles: `5 → 10 → 20`.

**B5. 1** — `b = 9 - 2 = 7`, then `c = 7 % 3`: `3 * 2 = 6`, remainder `1`.

**B6. `*`** — Need `6 ? 5 = 30`; only `6 * 5` gives 30. (`+` gives 11, `-` gives 1, `/` gives 1, `%` gives 1.)

**B7. 4** — Work backwards: end 9, last line added 1, so before it 8; the line before doubled, so start `8 / 2 = 4`. Forward check: `4 → 8 → 9` ✓.

**B8. quotient (the whole part)** — `15 / 2` is 7 because 2 fits 7 whole times; the half is dropped. The dropped part is the remainder, `15 % 2 = 1`.

**B9. 1** — `7 % 2`: `2 * 3 = 6`, remainder `1`. `b` stays 2.

**B10. 1** — `a: 10 → 7 → 4 → 1`. Three subtractions of 3 remove 9 in total.

---

# Part C — Trace the States

**C1.**

```
line          a
a = 4         4
a = a + 6     10
a = a / 2     5
a = a * 3     15
```

`10 / 2 = 5` exactly, so nothing is dropped here; the final `5 * 3 = 15`.

**C2.**

```
line          a
a = 25        25
a = a % 7     4
a = a * a     16
a = a + 5     21
```

`25 % 7`: `7 * 3 = 21`, remainder 4. Then `4 * 4 = 16`, and `16 + 5 = 21`. (The 21 appearing twice is coincidence — one was `7*3`, the other is the answer.)

**C3.**

```
line          a     b
a = 8         8     -
b = 3         8     3
a = a - b     5     3
b = a + b     5     8
```

Line 4 uses the **new** `a` (5) and the old `b` (3): `5 + 3 = 8`. Each line reads the current state, not the original values.

**C4.**

```
line          a     b
a = 30        30    -
b = a / 7     30    4
a = a % 7     2     4
```

`30 / 7 = 4` (quotient) and `30 % 7 = 2` (remainder): `7 * 4 + 2 = 30`. Note line 2 doesn't change `a` — `a` is only read there.

**C5.**

```
line          a     b     c
a = 2         2     -     -
b = 5         2     5     -
c = a * b     2     5     10
c = c - a     2     5     8
c = c / b     2     5     1
```

The last line is the trap: `8 / 5 = 1` — quotient only, the `.6` is dropped.

**C6.**

```
line          a
a = 9         9
a = a * 2     18
a = a + 2     20
a = a / 4     5
```

`20 / 4 = 5` exactly. If you got 4 you divided 18 — trace every line before dividing.

**C7.**

```
line          a     b     c
a = 6         6     -     -
b = 6         6     6     -
c = a + b     6     6     12
a = c % 5     2     6     12
b = b / a     2     3     12
```

`12 % 5`: `5 * 2 = 10`, remainder 2 — so `a` becomes 2. Then `b = 6 / 2 = 3`. The divisor was a computed value; tracing correctly is what kept it from surprising you.

**C8.**

```
line          a
a = 1         1
a = a + 2     3
a = a * a     9
a = a - 4     5
a = a % 3     2
```

Four updates, four operators: `1 → 3 → 9 → 5 → 2`. Last step: `5 % 3`: `3 * 1 = 3`, remainder 2.

---

**Pattern to notice across your mistakes:** almost every wrong answer comes from one of three habits — doing lines in your head instead of a state table, treating `/` like calculator division, or going left-to-right instead of `*` `/` `%` first. Fix the habit, not the one answer.
