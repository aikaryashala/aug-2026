# Equations vs Assignments — Same =, Different Meaning

**Goal.** In maths class you have written lines like `a + 2 = b` for years. Computing borrows the same symbols — letters, numbers, `+`, `=` — but gives one of them a completely different job. This sheet teaches you to read a line the computing way, and to rewrite maths-style lines into computing style. All on paper, as always.

**You need:** a notebook, a pencil, and the state-table method from Task 1.

This sheet is written like a song: one **pallavi** (పల్లవి) — the rule we return to after every verse — and a series of **charanams** (చరణాలు) — verses that each add one new idea.

> **Pallavi — the golden rule of this sheet**
> In maths, `=` states a **fact**: "the two sides are equal."
> In computing, `=` gives an **instruction**: "compute the right side with the current values, then store the result into the name on the left."
> So in computing, read `=` as **"becomes"** — never as "equals".

---

## Charanam 1 — One line, two readings

**a. What we set up**

The very same line can appear in a maths notebook and in a program:

```
b = a + 2
```

In a program it arrives with a line before it:

```
a = 5
b = a + 2
```

**b. Task**

Read `b = a + 2` aloud twice:

- the maths way: "b **equals** a plus 2" — a fact about two quantities;
- the computing way: "b **becomes** a plus 2" — an action to perform.

Then trace the two program lines with a state table.

**c. Observation (what you should find)**

```
line          a     b
a = 5         5     -
b = a + 2     5     7
```

In maths the line does nothing — it only tells you a fact that is true. In computing the line **did something**: it computed `5 + 2` and stored `7` into the box `b`. Same ink, different meaning.

**Takeaway to say out loud:** "In maths `=` states a fact; in computing `=` performs an action — say 'becomes'."

---

## Charanam 2 — The left side must be one box name

**a. What we set up**

In maths these two lines say exactly the same fact:

```
b = a + 2
a + 2 = b
```

**b. Task**

Apply the golden rule to the second line, `a + 2 = b`: compute the right side (that is `b`)… then store the result into the name on the left. But the left side is `a + 2` — **which box** would receive the value? Write your answer in your notebook.

**c. Observation (what you should find)**

There is no box called `a + 2` — that is a calculation, not a name. The instruction needs **exactly one box name** on the left to store into. So computing accepts `b = a + 2` but does not accept `a + 2 = b`.

For the same reason `5 = a` is not allowed: `5` is not a box. Maths can write both orders because it only states; computing must store, so it needs to know exactly which box.

**Takeaway to say out loud:** "Left of `=`: one box name. Right of `=`: the calculation."

---

## Charanam 3 — `a = a + 2`: an impossible fact, an everyday instruction

**a. What we set up**

```
a = 6
a = a + 2
```

**b. Task**

First read line 2 the maths way: "a equals a plus 2." Try to find a number that makes this fact true. Then read it the computing way — "a becomes a plus 2" — and trace both lines.

**c. Observation (what you should find)**

As a maths fact, the line is **impossible** — no number equals itself plus 2. As an instruction it is completely ordinary: right side first with the current value (`6 + 2` is `8`), then store — `a` becomes `8`.

```
a: 6 → 8
```

You traced lines like this all through Task 1. Now you know why they look strange at first sight: your maths eyes read "equals" where computing means "becomes".

**Takeaway to say out loud:** "`a = a + 2` is an impossible fact but a normal instruction."

---

## Charanam 4 — Every multiplication is written

**a. What we set up**

Maths lets multiplication hide between symbols. Computing hides nothing — every multiplication is written with `*`:

| maths | computing |
|---|---|
| `2a` | `2 * a` |
| `3(a + 1)` | `3 * (a + 1)` |
| `ab` | `a * b` |

**b. Task**

Rewrite this maths line in computing style, then trace the three lines:

Maths line: `c = 2a + b`

```
a = 4
b = 3
c = ___________
```

**c. Observation (what you should find)**

```
c = 2 * a + b
```

Trace: `2 * a + b` is `2 * 4 + 3`. Multiplication goes first (Task 1 rule), so it is `8 + 3 = 11` — `c` becomes `11`. The meaning did not change; only the writing did. Computing spells out what maths leaves invisible.

**Takeaway to say out loud:** "In computing, every multiplication is written with `*` — nothing is invisible."

---

## Practice on paper

**P1.** For each line, write **allowed** or **not allowed** (as a computing instruction). Rewrite every not-allowed line so it becomes a correct instruction with the same meaning.

```
b = a + 4
a + 4 = b
a = a * 3
c = 2b
7 = c
```

**P2.** Trace with a state table:

```
a = 4
a = a + 2
b = 2 * a
b = b - a
```

**Check yourself:** P1 — allowed; not allowed (`b = a + 4`); allowed; not allowed (`c = 2 * b`); not allowed (`c = 7`). P2 — `a: 4 → 6`, then `b: 12 → 6`.

If any line surprised you, re-read the charanam it comes from.

---

## One-page reference

| Line | In maths | In computing |
|---|---|---|
| `b = a + 2` | a fact: both sides are equal | an instruction: `b` becomes `a + 2` |
| `a + 2 = b` | the same fact | not allowed — left side must be one name |
| `a = a + 2` | impossible — no number fits | normal — `a` becomes old `a` plus 2 |
| `5 = a` | a fact about `a` | not allowed — `5` is not a box |
| `c = 2a` | `c` equals 2 times `a` | write the `*`: `c = 2 * a` |

**Golden rules**

1. In computing, read `=` as "becomes" — never "equals".
2. Left of `=`: exactly one box name. Right of `=`: the calculation.
3. Right side first, with current values — then store into the left name.
4. Every multiplication is written with `*`.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English | తెలుగు | Meaning |
|---|---|---|
| equation | సమీకరణం | రెండు వైపులా విలువ సమానం అని చెప్పే గణిత వాక్యం |
| assignment | విలువ ఇవ్వడం | కుడి వైపు ఫలితాన్ని ఎడమ వైపు పెట్టెలో పెట్టే ఆదేశం |
| fact | వాస్తవం | నిజమని చెప్పే మాట — అది ఏ పనీ చేయదు |
| instruction | ఆదేశం | కంప్యూటర్ చేయవలసిన ఒక పని |
| becomes | అవుతుంది | కోడ్‌లో `=` ను చదవవలసిన సరైన మాట — "సమానం" కాదు |
| left side | ఎడమ వైపు | ఫలితం చేరే ఒకే ఒక పెట్టె పేరు |
| right side | కుడి వైపు | ముందుగా లెక్కించే భాగం (సమాసం) |
| allowed | అనుమతించబడినది | కంప్యూటింగ్‌లో రాయదగిన లైన్ |
| rewrite | తిరిగి రాయడం | గణిత రూపాన్ని కంప్యూటింగ్ రూపంలోకి మార్చడం |
