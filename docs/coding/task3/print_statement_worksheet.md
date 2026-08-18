# The Print Statement — Every Space Counts

**Goal.** Until now our programs only stored values in boxes — nobody could *see* anything. The `print` statement shows text on the screen. Your job on this sheet: predict the output **exactly**, and write print statements that produce a required output **exactly**. One wrong space is a wrong answer — that is not strictness, that is how computing works.

**You need:** a notebook (graph paper is best), a pencil.

**The cell method.** Write every output on graph paper, one letter or digit per cell. A **space gets its own cell too** — leave it empty and put a small dot `·` in it. On this page, outputs appear in the same cell style, so you can check your paper against the screen, cell by cell.

This sheet is written like a song: one **pallavi** (పల్లవి) — the rule we return to after every verse — and a series of **charanams** (చరణాలు) — verses that each add one new idea.

> **Pallavi — the golden rule of this sheet**
> `print` shows **exactly** what you wrote between the quotes — nothing more, nothing less.
> The quotes themselves are **not** printed, and a space fills a cell of output just like a letter does.

---

## Charanam 1 — `print` shows a string

**a. What we set up**

Text inside quotation marks is called a **string**. This program has one line:

```
print "shiva"
```

**b. Task**

Write the output in cells in your notebook. Think: are the quotation marks part of the output?

**c. Observation (what you should find)**

```cells
shiva
```

Five cells — the quotes are **not** printed. They only mark where the string begins and ends, like the walls of a box: the walls hold the value, but the walls are not the value.

**Takeaway to say out loud:** "Quotes are the walls of the text — the walls are not printed."

---

## Charanam 2 — `+` glues two strings

**a. What we set up**

```
print "om" + "shiva"
```

**b. Task**

Predict the output in cells. Does `+` put anything between the two strings?

**c. Observation (what you should find)**

```cells
omshiva
```

Seven cells, no gap. `+` glues the second string to the end of the first — and adds **nothing** of its own. No space appears unless *you* write one.

**Takeaway to say out loud:** "`+` glues; it never adds a space by itself."

---

## Charanam 3 — Spaces live inside quotes

**a. What we set up**

Three prints that differ only in spaces:

```
print "om " + "shiva"
```

```
print "om" + " shiva"
```

```
print "om " + " shiva"
```

**b. Task**

Write the three outputs in cells. Every space gets its own cell with a dot — then **count the empty cells** in each output.

**c. Observation (what you should find)**

```cells
om shiva
om shiva
om  shiva
```

The first two outputs are **identical** — the space can sit at the end of the first string or at the start of the second; the output cannot tell the difference. The third has **two** empty cells, because you wrote two spaces: one inside each string, and `+` glued them side by side.

**Takeaway to say out loud:** "A space fills a cell — count every empty cell."

---

## Charanam 4 — A variable inside a print

**a. What we set up**

A box can hold a string too:

```
name = "shambo"
print "om " + name
```

**b. Task**

Predict the output in cells. What does `print` do when it meets a variable name?

**c. Observation (what you should find)**

```cells
om shambo
```

`print` replaces the variable with its **current value** — the same rule as the right side of `=` in Task 1: names are read, values are used.

**Takeaway to say out loud:** "A variable in a print is replaced by its current value."

---

## Charanam 5 — Numbers print as digits, and the glue rule still applies

**a. What we set up**

```
age = 19
print age + "years old."
```

**b. Task**

Predict the output *exactly*, in cells. Is it properly formatted? If not, fix the print statement.

**c. Observation (what you should find)**

```cells
19years old.
```

Squashed! `+` glued `19` straight onto `years` because no one wrote a space. The fix goes **inside the quotes**:

```
print age + " years old."
```

```cells
19 years old.
```

**Takeaway to say out loud:** "The space your eye wants must be written inside the quotes."

---

## Charanam 6 — Building a whole sentence

**a. What we set up**

A print can alternate strings and variables, glued left to right:

```
cost = 20000
print "The cost of computer is Rs." + cost + " more."
```

**b. Task**

Write the output in cells. Then check these two rejected attempts against the required output — find each mistake by comparing cell by cell:

```
print "The cost of computer is Rs. " + cost + " more."
```

```
print "The cost of computer is Rs." + cost + "more."
```

**c. Observation (what you should find)**

The correct output:

```cells
The cost of computer is Rs.20000 more.
```

The first attempt prints `Rs. 20000` — an **extra** empty cell after `Rs.`. The second prints `20000more.` — a **missing** empty cell before `more.`. Both are wrong, even though every word is right.

One more shape — a print can also **start with a variable**, with small strings as separators between values:

```
num1 = 2
num2 = 3
num3 = 4
print num1 + ", " + num2 + ", " + num3 + "."
```

```cells
2, 3, 4.
```

Each `", "` fills just two cells — a comma and a space — glued between the values.

**Takeaway to say out loud:** "Match the required output cell by cell — spaces included."

---

## Charanam 7 — Do the maths first; print only glues

**a. What we set up**

```
a = 2
b = 3
c = a + b
print "The sum of " + a + " and " + b + " is " + c + "."
```

**b. Task**

Trace the three assignment lines with a state table, then write the output in cells.

**c. Observation (what you should find)**

```cells
The sum of 2 and 3 is 5.
```

Line 3 is ordinary Task-1 arithmetic: `c` becomes `5`. The print line does **no maths** — it only glues pieces of output: string, variable, string, variable, string, variable, string.

**Takeaway to say out loud:** "Compute in assignment lines; print only glues the pieces."

---

## Charanam 8 — `\n`, the Enter

**a. What we set up**

There is one more thing you can put inside a string: the **Enter** — what makes the screen move to a new line. Inside a string it is written `\n`. On paper, give it its own cell and draw it as `↵`.

```
print "shambo\n"
```

**b. Task**

Write the output in cells, drawing the Enter as `↵`. Then write the output of:

```
a = 2
b = 3
c = a + b
print "The sum of " + a + " and " + b + " is " + c + ".\n"
```

**c. Observation (what you should find)**

```cells
shambo↵
```

```cells
The sum of 2 and 3 is 5.↵
```

The `\n` is glued at the end of the string like anything else you write — it just has no shape of its own, so we mark its cell with `↵`.

**Takeaway to say out loud:** "`\n` means press Enter — give it a cell and draw `↵`."

---

## Charanam 9 — `\n` in the middle starts a new row

**a. What we set up**

The Enter does not have to be at the end. Wherever it sits, the screen moves to a new line right there:

```
print "namah\nshiva\n"
```

**b. Task**

How many rows will this output have? Write the output in cells — after a `↵`, the next cell starts on a **new row** of your graph paper.

**c. Observation (what you should find)**

```cells
namah↵
shiva↵
```

One print, two rows. Each `\n` ends its row with `↵`, and whatever follows continues below. Two Enters side by side even make an **empty row**:

```
print "om\n\nshiva"
```

```cells
om↵
↵
shiva
```

**Takeaway to say out loud:** "Wherever `↵` sits, the row ends there — the rest continues below."

---

## Practice on paper

**P1.** Write the exact output of each print in cells (dot every space, `↵` for `\n`):

```
print "om" + "namah"
```

```
print "om " + " namah"
```

```
name = "siva"
print "om " + name + "\n"
```

```
print "om\nnamah"
```

**P2.** Given the lines below, write the print statement that produces exactly `Ravi is 15 years old.↵`

```
name = "Ravi"
age = 15
```

**P3.** Given the lines below, write the print statement that produces exactly `1, 2, 3.`

```
num1 = 1
num2 = 2
num3 = 3
```

**Check yourself:** P1 — `omnamah`; `om  namah` (two empty cells); `om siva↵`; `om↵` then `namah` on the next row. P2 — `print name + " is " + age + " years old.\n"`. P3 — `print num1 + ", " + num2 + ", " + num3 + "."`.

If any space surprised you, re-read the charanam it comes from.

---

## One-page reference

| Rule | Example | Output |
|---|---|---|
| Quotes are not printed | `print "om"` | `om` |
| `+` glues, adds nothing | `print "om" + "shiva"` | `omshiva` |
| Spaces live inside quotes | `print "om " + "shiva"` | `om shiva` |
| A variable becomes its value | `x = 5` then `print x` | `5` |
| Numbers glue like text | `print x + "kg"` | `5kg` |
| `\n` = Enter, drawn `↵` | `print "om\n"` | `om↵` |
| `\n` in the middle = new row | `print "a\nb"` | `a↵` then `b` below |

**Golden rules**

1. Output is exactly what you wrote — nothing more, nothing less.
2. `+` never adds a space; every space is written inside quotes.
3. A variable in a print is replaced by its current value.
4. Compute in assignment lines; print only glues.
5. Check cell by cell on graph paper — a space is an empty cell with a dot.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English | తెలుగు | Meaning |
|---|---|---|
| print | ముద్రించు | తెరపై అక్షరాలను చూపించే ఆదేశం |
| string | అక్షరాల వరుస | quotes (`" "`) మధ్య ఉండే అక్షరాల వరుస |
| quotes | కొటేషన్ గుర్తులు | string ఎక్కడ మొదలై ఎక్కడ ముగుస్తుందో చూపే గుర్తులు |
| output | అవుట్‌పుట్ / ఫలితం | తెరపై కనిపించే అక్షరాలు |
| space | ఖాళీ | పదాల మధ్య ఖాళీ చోటు — అదీ output లో భాగమే |
| cell | గడి | గ్రాఫ్ కాగితంలో ఒక్కో గుర్తుకు ఒక్కో గడి |
| glue / join | కలపడం | `+` తో రెండు ముక్కలను చివర చివరకు అతికించడం |
| newline | కొత్త లైన్ | Enter నొక్కినట్టు — `\n` గా రాసి, `↵` గా గీస్తాం |
