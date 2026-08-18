# The Print Statement — Question Paper

Answer everything **on paper**, using the cell method from the worksheet: write each output on graph paper, one letter or digit per cell; every **space** gets its own cell with a small dot `·` in it; every `\n` gets its own cell drawn as `↵`.

> **The golden rules**
> 1. The output is **exactly** what the program wrote — nothing more, nothing less.
> 2. Quotes are **not** printed. They only mark where a string begins and ends.
> 3. `+` glues — it never adds a space of its own.
> 4. A variable is replaced by its **current value**.
> 5. `print` does **not** press Enter by itself. The screen moves to a new row only where a `↵` is output — so a print with no `\n` at the end leaves the **next** print on the **same row**.

Write your answers in your notebook. Answers are **not** in this paper.

---

# Part A — What Exactly Is Printed?

Write the exact output of each program in cells — every letter, every space, `↵` for every `\n`.

**A1.**

```
print "om namah"
```

**A2.**

```
print "shambo" + "shiva"
```

**A3.**

```
print "shambo " + " shiva"
```

**A4.**

```
name = "siva"
print "om " + name + " namah"
```

**A5.**

```
age = 12
print "I am " + age + " years old."
```

**A6.**

```
num1 = 6
num2 = 7
print num1 + "," + num2 + "."
```

**A7.**

```
a = 10
b = 20
c = 30
print a + " - " + b + " - " + c
```

**A8.**

```
print "namah\nshiva\n"
```

**A9.**

```
print "om\n\nshiva"
```

---

# Part B — Does It Match? Fix It.

Each question gives a **required output** (shown in cells) and a program. If the program already produces that output exactly, write **correct**. If not, write the fixed print statement.

**B1.** Required output:

```cells
om shiva
```

```
print "om" + "shiva"
```

**B2.** Required output:

```cells
19 years old.
```

```
age = 19
print age + "years old."
```

**B3.** Required output:

```cells
The cost of computer is Rs.20000 more.
```

```
cost = 20000
print "The cost of computer is Rs. " + cost + " more."
```

**B4.** Required output:

```cells
Ravi and Sita
```

```
print "Ravi" + " and " + "Sita"
```

**B5.** Required output:

```cells
Sum is 12.↵
```

```
a = 12
print "Sum is " + a + "."
```

**B6.** Required output:

```cells
om↵
shiva↵
```

```
print "om" + "shiva\n"
```

---

# Part C — Write the Print Statement

Write a print statement that produces **exactly** the required output. Any print that produces it cell for cell is correct.

**C1.** Given:

```
name = "shambo"
```

Required output:

```cells
om shambo namah
```

**C2.** Given:

```
name = "Ravi"
marks = 92
```

Required output:

```cells
Ravi scored 92 marks.↵
```

**C3.** Given:

```
a = 3
b = 6
c = 9
```

Required output:

```cells
Table of 3: 3, 6, 9.↵
```

**C4.** No variables given — strings only.

Required output:

```cells
namah↵
shiva↵
```

**C5.** Given:

```
num1 = 1
num2 = 2
```

Required output:

```cells
1↵
2↵
```

A variable may appear in one print as many times as you need — it is only being **read**. Use that in C6 and C7.

**C6.** Given:

```
name = "siva"
```

Required output:

```cells
siva siva siva↵
```

**C7.** Given:

```
m = 10
```

Required output:

```cells
Super! You scored 10 out of 10.↵
```

---

# Part D — More Than One Print

Rule 5 does all the work here: count the rows, and for each row say **why** it ended.

**D1.** What exactly appears on the screen?

```
print "om"
print "shiva"
```

**D2.** What exactly appears on the screen? (Three prints — but how many rows?)

```
print "om "
print "namah\n"
print "shiva\n"
```

**D3.** Given:

```
n = 3
a = 1 * n
b = 2 * n
c = 3 * n
```

Write **three** print statements, one per row, that together produce:

```cells
1 X 3 = 3↵
2 X 3 = 6↵
3 X 3 = 9↵
```

---

# Part E — Print the Maths Sentence

The `+`, `X`, `/`, `=` you see in these outputs are **not** computed — they are letters inside strings. The computing happens in the assignment lines above the print.

**E1.** Given:

```
a = 2
b = 3
c = a + b
```

Required output:

```cells
2 + 3 = 5↵
```

**E2.** Given:

```
a = 20
b = 5
c = a / b
```

Required output:

```cells
20 / 5 = 4↵
```

**E3.** Given:

```
a = 2
b = 3
c = 9
d = a + b * c
```

Required output:

```cells
2 + 3 X 9 = 29↵
```

**E4.** Given:

```
a = 8
b = 9
```

Required output (two sentences on one row — check what sits between them):

```cells
Ravi got 8 marks. Sita got 9 marks.↵
```

---

# Part F — Fill the Blanks, Match the Output

The print statement is already written — the **values** are missing. Fill every `___` so that the program produces the required output exactly.

**F1.**

```
a = ___
b = ___
c = a * b
print a + " X " + b + " = " + c
```

Required output:

```cells
4 X 5 = 20
```

**F2.**

```
a = ___
b = ___
c = a - b
print a + " - " + b + " = " + c + "\n"
```

Required output:

```cells
12 - 5 = 7↵
```

---

When you finish, check yourself against the answer key — and read the **reasoning**, not just the final cells. Count the empty cells in your answer against the key's, one by one. In Part D especially, check *where each row ends and why*.
