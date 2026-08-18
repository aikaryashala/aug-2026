# Variables and Arithmetic — Trace the Values

**Goal.** Read tiny programs and work out, on paper, what value each variable holds after every line. No computer today — your notebook is the computer, and you are the processor.

**You need:** a notebook, a pencil, and the one golden rule below.

This sheet is written like a song: one **pallavi** (పల్లవి) — the rule we return to after every verse — and a series of **charanams** (చరణాలు) — verses that each add one new idea.

> **Pallavi — the golden rule of `=`**
> In code, `=` is not the "equals" of maths. It is an instruction:
> **first compute the right side using the current values, then store the result into the name on the left.**
> Whatever the name held before is thrown away.

---

## Charanam 1 — A name holds a value

**a. What we set up**

```
a = 5
```

**b. Task**

In your notebook, draw a small box, label it `a`, and write the value inside:

```
a
┌───┐
│ 5 │
└───┘
```

**c. Observation (what you should find)**

There is now a name `a`, and it holds `5`. That is the entire program. A **variable** is just a named box that holds one value at a time.

**Takeaway to say out loud:** "A variable is a box with a name; `=` puts a value into it."

---

## Charanam 2 — A new value replaces the old one

**a. What we set up**

```
a = 5
a = 12
```

**b. Task**

Trace it line by line. After line 1, what is in `a`? After line 2?

**c. Observation (what you should find)**

```
a: 5 → 12
```

After line 2, the `5` is gone — completely. A box holds **one** value; storing a new one erases the old one. There is no history inside the box (that's why *you* keep the history in your notebook).

**Takeaway to say out loud:** "Assigning a new value throws the old value away."

---

## Charanam 3 — A variable can use its own value

**a. What we set up**

```
a = 5
a = a + 3
```

**b. Task**

Line 2 looks strange in maths (`a = a + 3` has no solution!). Apply the golden rule instead: compute the right side first with the current value of `a`, then store.

**c. Observation (what you should find)**

Right side first: `a + 3` is `5 + 3`, which is `8`. Then store: `a` becomes `8`.

```
a: 5 → 8
```

**Takeaway to say out loud:** "Right side first with current values — then store into the left side."

---

## Charanam 4 — The same variable, updated again and again

**a. What we set up**

```
a = 6
a = a * 2
a = a - 5
a = a % 4
```

(`%` gives the **remainder** after division: `12 % 4` is `0`, `7 % 4` is `3`.)

**b. Task**

Make a **state table** in your notebook — one row per line, one column per variable:

```
line          a
a = 6         6
a = a * 2     ?
a = a - 5     ?
a = a % 4     ?
```

Fill in every `?` before reading on.

**c. Observation (what you should find)**

```
a: 6 → 12 → 7 → 3
```

Each line only sees the value the previous line left behind. This state table is the method for the whole worksheet — and for the question bank.

**Takeaway to say out loud:** "Trace line by line; each line starts from what the last line left."

---

## Charanam 5 — Division keeps only the whole part

**a. What we set up**

```
a = 17
a = a / 5
```

**b. Task**

What is `a` at the end? (Careful — this is the most common mistake on the whole sheet.)

**c. Observation (what you should find)**

`a` is `3` — **not** `3.4`. With whole numbers, `/` keeps only the **quotient** (how many whole times 5 fits into 17) and drops the rest. The dropped part is exactly what `%` gives you:

```
17 / 5  →  3     (quotient — 5 fits 3 whole times)
17 % 5  →  2     (remainder — 15 used, 2 left over)
```

Check: `5 * 3 + 2 = 17`. The pair `/` and `%` split a number perfectly.

**Takeaway to say out loud:** "`/` gives the quotient, `%` gives the remainder — together they rebuild the number."

---

## Charanam 6 — A second variable

**a. What we set up**

```
a = 9
b = a % 4
a = a - b
```

**b. Task**

Extend your state table to two columns and trace:

```
line          a     b
a = 9         9     -
b = a % 4     ?     ?
a = a - b     ?     ?
```

**c. Observation (what you should find)**

```
a: 9 → 9 → 8
b: 1
```

Line 2 **reads** `a` but does not change it — only the name on the **left** of `=` changes. And `b` got a **copy** of the computed value: changing `a` afterwards does not touch `b`.

**Takeaway to say out loud:** "Only the left side of `=` changes; everyone on the right is only read."

---

## Charanam 7 — Three variables and operator order

**a. What we set up**

```
a = 4
b = 3
c = a + b * 2
c = (a + b) * 2
```

**b. Task**

Trace both values of `c`. Are they the same?

**c. Observation (what you should find)**

```
c: 10 → 14
```

Line 3: `*` happens **before** `+`, so it is `4 + (3 * 2) = 10`. Line 4: brackets go first, so it is `(4 + 3) * 2 = 14`. The order: **brackets first, then `*` `/` `%`, then `+` `-`**.

**Takeaway to say out loud:** "Multiply, divide and remainder go before plus and minus — brackets beat everyone."

---

## Practice on paper

Trace each snippet with a state table. Final states are given below the last snippet — check yourself only **after** finishing all three.

**P1**

```
a = 3
a = a + 4
a = a * 2
```

**P2**

```
a = 20
a = a / 3
a = a % 4
```

**P3**

```
a = 5
b = 2
c = a * b - 4
a = c / 3
```

**Check yourself:** P1 — `a: 3 → 7 → 14`. P2 — `a: 20 → 6 → 2`. P3 — `c = 6`, then `a = 2`, `b` stays `2`.

If any line surprised you, re-read the charanam it comes from — every practice line uses exactly one takeaway.

---

## One-page reference

| Symbol | Name | Example | Result |
|---|---|---|---|
| `=` | assignment (store) | `a = 7` | box `a` now holds 7 |
| `+` | add | `7 + 2` | `9` |
| `-` | subtract | `7 - 2` | `5` |
| `*` | multiply | `7 * 2` | `14` |
| `/` | divide → quotient only | `7 / 2` | `3` (not 3.5) |
| `%` | remainder | `7 % 2` | `1` |

**Golden rules**

1. `=` means: right side first (with current values), then store into the left name.
2. Storing a new value erases the old one — no history in the box.
3. `/` keeps only the whole part; `%` gives what `/` dropped.
4. Brackets first, then `*` `/` `%`, then `+` `-`.
5. Trace line by line in a state table — never in your head.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English | తెలుగు | Meaning |
|---|---|---|
| variable | చరరాశి | విలువను పట్టుకునే, పేరు ఉన్న పెట్టె |
| value | విలువ | పెట్టెలో ప్రస్తుతం ఉన్న సంఖ్య |
| assignment | విలువ ఇవ్వడం | కుడి వైపు ఫలితాన్ని ఎడమ వైపు పేరులో పెట్టడం |
| update | మార్చడం | పాత విలువ పోయి కొత్త విలువ రావడం |
| state | స్థితి | ఒక్కో లైన్ తర్వాత చరరాశుల విలువలు |
| trace | అనుసరించడం | లైన్ వెంబడి లైన్ విలువలను రాయడం |
| quotient | భాగఫలం | భాగించగా వచ్చే పూర్ణ సంఖ్య (`/`) |
| remainder | శేషం | భాగించగా మిగిలిన సంఖ్య (`%`) |
| expression | సమాసం | గుర్తులతో కలిపి రాసిన లెక్క (`=` కుడి వైపు భాగం) |
| precedence | ప్రాధాన్యత | ఏ గుర్తు లెక్క ముందు జరుగుతుందో చెప్పే క్రమం |
