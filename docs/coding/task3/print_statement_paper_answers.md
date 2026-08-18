# The Print Statement — Answer Key with Reasoning

Check the **reasoning**, not just the cells. Count the empty cells in your notebook answer against the key's — one wrong space means the answer is wrong, so find *which* cell and *why*.

In Parts B, C, D and F, any program that produces the required output cell for cell is correct; one correct version is shown each time.

---

# Part A — What Exactly Is Printed?

**A1.**

```cells
om namah
```

The quotes are not printed; everything between them is — including the one space between the words, because it was written inside the string.

**A2.**

```cells
shamboshiva
```

`+` glues end to end and adds nothing. Nobody wrote a space, so there is no empty cell.

**A3.**

```cells
shambo  shiva
```

**Two** empty cells — one at the end of `"shambo "`, one at the start of `" shiva"`. `+` glued them side by side without touching either. If you drew one dot, you missed one.

**A4.**

```cells
om siva namah
```

`name` is replaced by its current value `siva`. The spaces around it are written inside the strings: `"om "` ends with one, `" namah"` starts with one.

**A5.**

```cells
I am 12 years old.
```

`age` becomes `12`. Again the spaces around the value live inside the strings: `"I am "` ends with a space, `" years old."` starts with one. Note that `12` is a number in its box but comes out as two ordinary cells.

**A6.**

```cells
6,7.
```

The separator is `","` — a comma **with no space**, so no empty cell after it. The print starts with a variable, which is allowed.

**A7.**

```cells
10 - 20 - 30
```

The separator string `" - "` carries a space on **each side** of the dash — three cells between every pair of values. Compare with A6: an empty cell appears next to a separator only if a space was written inside its quotes.

**A8.**

```cells
namah↵
shiva↵
```

One print, two rows. The first `\n` ends the first row — everything after it continues on a new row. The second `\n` ends the second row.

**A9.**

```cells
om↵
↵
shiva
```

Two Enters side by side make an **empty row** — a row containing only `↵`. And there is no `↵` after `shiva`, because no `\n` was written at the end.

---

# Part B — Does It Match? Fix It.

**B1. Fix:** `print "om " + "shiva"`

As given, the output is `omshiva` — nobody wrote a space. Add it inside a quote: `"om "` (or `" shiva"` — same output).

**B2. Fix:** `print age + " years old."`

As given, the output is `19years old.` — `+` glued `19` straight onto `years`. The space must be written at the start of the string.

**B3. Fix:** `print "The cost of computer is Rs." + cost + " more."`

As given, the output is `The cost of computer is Rs. 20000 more.` — one **extra** empty cell after `Rs.`. The required output has `Rs.20000` with no space. This is the opposite mistake to B1 and B2: too many cells, not too few.

**B4. Correct** — the output is exactly `Ravi and Sita`: the middle string `" and "` carries one space on each side. Nothing to fix.

**B5. Fix:** `print "Sum is " + a + ".\n"`

The cells match up to the full stop, but the required output ends with `↵` — an Enter. Add `\n` inside the final string.

**B6. Fix:** `print "om\n" + "shiva\n"`

As given, the output is `omshiva↵` — one row, because there is no `\n` after `om`. The required output has two rows, so each word needs its own Enter. (`print "om\nshiva\n"` — one string with both Enters — produces the same two rows and is equally correct.)

---

# Part C — Write the Print Statement

**C1.** `print "om " + name + " namah"`

`name` becomes `shambo`, giving `om shambo namah` — one space at the end of `"om "`, one at the start of `" namah"`. No `\n` was asked for, so no `↵`.

**C2.** `print name + " scored " + marks + " marks.\n"`

`name` becomes `Ravi`, `marks` becomes `92`: `Ravi scored 92 marks.↵` — the spaces are carried by `" scored "` and `" marks.\n"`, and the Enter comes from the `\n` at the end.

**C3.** `print "Table of 3: " + a + ", " + b + ", " + c + ".\n"`

The opening string carries the colon **and** the space after it (`"Table of 3: "`); then values alternate with `", "` separators. Output: `Table of 3: 3, 6, 9.↵`

**C4.** `print "namah\nshiva\n"`

One string can hold both Enters: the first `\n` ends the first row after `namah`, the second ends the second row after `shiva`. (`print "namah\n" + "shiva\n"` produces the same two rows and is equally correct.)

**C5.** `print num1 + "\n" + num2 + "\n"`

`"\n"` can be its own little string, glued after each value — just like `", "` was a separator in C3, except this separator is an Enter. Output: `1↵` then `2↵`, each on its own row.

**C6.** `print name + " " + name + " " + name + "\n"`

`name` is read three times — reading a box never changes it. The two `" "` strings supply the empty cells between the words, and `"\n"` supplies the final `↵`. Output: `siva siva siva↵`

**C7.** `print "Super! You scored " + m + " out of " + m + ".\n"`

`m` appears twice — once after `scored`, once after `of`. Two traps: the space **after** `!` lives inside the first string (`"Super! You scored "`), and the full stop plus `\n` close the sentence. Output: `Super! You scored 10 out of 10.↵`

---

# Part D — More Than One Print

**D1.**

```cells
omshiva
```

**One row**, glued together. The first print has no `\n`, so it does not press Enter — the second print continues exactly where the first stopped. No space either: nobody wrote one.

**D2.**

```cells
om namah↵
shiva↵
```

**Two rows from three prints.** The first print (`"om "`) has no `\n`, so the second print continues on the same row — together they make `om namah↵`. The Enter at the end of the second print starts a new row, where the third print writes `shiva↵`.

**D3.**

```
print "1 X " + n + " = " + a + "\n"
print "2 X " + n + " = " + b + "\n"
print "3 X " + n + " = " + c + "\n"
```

A multiplication table, one print per row. The `1`, `2`, `3` and the `X` are letters inside the strings; the real multiplying happened in the assignment lines (`a = 3`, `b = 6`, `c = 9`). Every row must end with `\n` — miss one and two rows merge into one, exactly as in D1.

---

# Part E — Print the Maths Sentence

**E1.** `print a + " + " + b + " = " + c + "\n"`

`c` became `5` in the assignment line. In the print, `" + "` and `" = "` are just three-cell strings — a space, the symbol, a space. Output: `2 + 3 = 5↵`

**E2.** `print a + " / " + b + " = " + c + "\n"`

`c = 20 / 5 = 4` exactly. The `/` in the output is a letter inside `" / "`; the real division already happened above. Output: `20 / 5 = 4↵`

**E3.** `print a + " + " + b + " X " + c + " = " + d + "\n"`

The assignment line uses Task-1 precedence: `b * c` first (`27`), then `+ a` → `d = 29`. The print just reports the whole expression with its answer: `2 + 3 X 9 = 29↵`. Note the code multiplies with `*` but the **output** shows the school-maths `X` — because that is what the string says; writing `" * "` would print `2 + 3 * 9 = 29`, which does not match. Four values, five pieces of string glue — count your cells carefully.

**E4.** `print "Ravi got " + a + " marks. Sita got " + b + " marks.\n"`

The trap: between the two sentences there is a full stop **and then a space** — both live inside the middle string `" marks. Sita got "`. Miss that space and the sentences squash together as `marks.Sita`. Output: `Ravi got 8 marks. Sita got 9 marks.↵`

---

# Part F — Fill the Blanks, Match the Output

**F1.** `a = 4`, `b = 5`

The output starts with `4`, so `a` is `4`; the value after `X` is `5`, so `b` is `5`. Check the last piece: `c = 4 * 5 = 20` ✓ — matches the `20` after `=`. No `\n` in the print, so no `↵` in the output.

**F2.** `a = 12`, `b = 5`

From the output, `a` is `12` and `b` is `5`; check `c = 12 - 5 = 7` ✓. This print **does** end with `"\n"`, which is why the required output ends with `↵`.

---

If a cell of yours disagrees with a cell here, don't just correct it — say out loud which rule you missed: quotes aren't printed, `+` never adds a space, a variable becomes its value, and a row ends only where a `\n` was output.
