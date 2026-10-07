# Relative vs Absolute Paths — Answer Key

Answers for the Task 13 worksheet practice questions (Part 1) and the
question bank (Part 2). All paths are for Ubuntu, with home folder
`/home/rohinibarla` — substitute your own username.

Every answer includes the reasoning. When checking a student's work, check
the **why**, not just the letter. A correct letter with a wrong reason is a
lucky guess.

---

# Part 1 — Worksheet Practice Questions

## Structure 1 — `Kutumbam`

```
~/Kutumbam/
├── Peddamma/{Ravi, Sita}
└── Pinni/{Kiran, Geetha}
```

| # | Move (here → there) | Relative | Absolute |
|---|----------------------|----------|----------|
| 1 | Sita → Geetha *(cousin)* | `cd ../../Pinni/Geetha` | `cd /home/rohinibarla/Kutumbam/Pinni/Geetha` |
| 2 | Kiran → Ravi *(cousin)* | `cd ../../Peddamma/Ravi` | `cd /home/rohinibarla/Kutumbam/Peddamma/Ravi` |
| 3 | Geetha → Kiran *(sibling)* | `cd ../Kiran` | `cd /home/rohinibarla/Kutumbam/Pinni/Kiran` |
| 4 | Ravi → Pinni *(the aunt)* | `cd ../../Pinni` | `cd /home/rohinibarla/Kutumbam/Pinni` |
| 5 | Sita → home | `cd ../../..` | `cd /home/rohinibarla`  (or `cd ~`, or just `cd`) |
| 6 | Ravi → Geetha *(challenge)* | `cd ../../Pinni/Geetha` | `cd /home/rohinibarla/Kutumbam/Pinni/Geetha` |

**Q6 explanation:** two `..` are needed. The first lands on `Peddamma`, the second on `Kutumbam`
(the common grandparent). From there, descend the other branch: `Pinni/Geetha`.

## Structure 2 — `Bharath`

```
~/Bharath/
├── Andhra/{Vijayawada, Tirupati}
└── Telangana/{Hyderabad, Warangal}
```

| # | Move (here → there) | Relative | Absolute |
|---|----------------------|----------|----------|
| 1 | Vijayawada → Tirupati *(sibling)* | `cd ../Tirupati` | `cd /home/rohinibarla/Bharath/Andhra/Tirupati` |
| 2 | Vijayawada → Hyderabad *(cousin)* | `cd ../../Telangana/Hyderabad` | `cd /home/rohinibarla/Bharath/Telangana/Hyderabad` |
| 3 | Warangal → Tirupati *(cousin)* | `cd ../../Andhra/Tirupati` | `cd /home/rohinibarla/Bharath/Andhra/Tirupati` |
| 4 | Hyderabad → Andhra *(state folder)* | `cd ../../Andhra` | `cd /home/rohinibarla/Bharath/Andhra` |
| 5 | Tirupati → Bharath | `cd ../..` | `cd /home/rohinibarla/Bharath` |
| 6 | Warangal → Vijayawada → Hyderabad *(two-step)* | `cd ../../Andhra/Vijayawada` then `cd ../../Telangana/Hyderabad` | `cd /home/rohinibarla/Bharath/Andhra/Vijayawada` then `cd /home/rohinibarla/Bharath/Telangana/Hyderabad` |

**Q6 explanation:** each leg climbs two levels to `Bharath`, then descends into the target state and
city. After the first leg you are *standing in* `Vijayawada`, so the second leg's `..` count is
measured from there — a good reminder that relative paths always restart from `pwd`.

---

# Part 2 — Question Bank

## Part A — Multiple Choice Questions

**Q1. Answer: (c) — `/home/rohinibarla/Kutumbam`.**
The one-line rule: if it starts with `/`, it's absolute. (a) starts with a
name, (b) starts with `..`, (d) is `.` itself — all three are relative,
because all three only mean something once you know where you're standing.

**Q2. Answer: (b) — the parent folder, one step up.**
`.` is "here", `..` is "the folder above here". These two are the building
blocks of every relative move; the family-tree picture works because `..`
literally means "go to the parent."

**Q3. Answer: (b) — prints your current folder.**
`pwd` ("print working directory") answers "where am I?" — path-finding only
makes sense once you know where you stand, which is why the worksheet says
to run it constantly.

**Q4. Answer: (c) — `/home`.**
Every normal user's home is `/home/<username>`, so yours is
`/home/rohinibarla`. (a) `/c/Users` is a Windows / Git Bash idea — Ubuntu
has no drive letters. (b) `/root` is the home of the administrator user
`root` only. (d) There is no `/users` on Ubuntu (and names are case-sensitive, so it isn't `/Users` either).

**Q5. Answer: (b) — `cd ../Sita`.**
Ravi and Sita share the parent `Peddamma`, so they are siblings. One `..`
climbs to `Peddamma`; then step down into `Sita`. Siblings are always
`../<name>` — one up, one down. (c) climbs too far (to `Kutumbam`, which has
no child `Sita`), and (a) looks for a `Sita` *inside* `Ravi`.

**Q6. Answer: (d) — `Kutumbam`.**
Trace it: starting in `Ravi`, the first `..` lands on `Peddamma`, the second
on `Kutumbam` — the common grandparent of Ravi and Kiran. Only from there
can you walk down the other branch: `Pinni` → `Kiran`.

**Q7. Answer: (b) — same from anywhere.**
That is the defining property: an absolute path spells the full chain from
root, so it never depends on your current folder. It's often *longer* than
the relative path (so not (a)), and it never needs `..` (so not (d)).

**Q8. Answer: (c) — jumps back to the previous folder.**
`cd -` is the "undo" of your last move — handy when you're bouncing between
two work areas. Going up one level is `cd ..`; going home is `cd ~` or plain
`cd`.

**Q9. Answer: (d) — goes to your home folder.**
`cd` alone behaves like `cd ~`. It's the quickest way to get back to a known
starting point when you're lost.

**Q10. Answer: (b) — absolute, because it is valid no matter where you are standing.**
The full postal address works from any city in the world; likewise
`/home/rohinibarla/...` works from any current folder. The
relative counterpart in the analogy is "go up one floor, then the second
door" — meaningful only from where you stand. The *reason* matters: (d)'s
"because it is long" is not what makes a path absolute.

**Q11. Answer: (a) — lands you on `Bharath`.**
First `..`: `Vijayawada` → `Andhra`. Second `..`: `Andhra` → `Bharath`. Two
dots-pairs, two steps up. (You may chain as many `..` as there are levels
above you.)

**Q12. Answer: (b) — `No such file or directory`.**
Ubuntu's file system is case-sensitive: `kutumbam` and `Kutumbam` are two
completely different names, and only `Kutumbam` exists. The exact message
is `bash: cd: kutumbam: No such file or directory`. `cd` never creates
folders (that is `mkdir`), and bash prints no "hint" about capitals.

---

## Part B — Fill in the Blanks

**Q13.** starts with **`/`**.
The whole absolute-vs-relative decision is that single first character.

**Q14.** `.` means **here / the current folder**; `..` means **the parent
folder (one step up)**.

**Q15.** **`/home/rohinibarla`**.
`~` is your home folder, which on Ubuntu lives under `/home`. So
`~/Kutumbam` and `/home/rohinibarla/Kutumbam` are the same place.

**Q16.** **siblings**; `cd **..**/<name>`.
Same parent → one step up reaches the shared parent, one step down reaches
the sibling.

**Q17.** `cd **../Kiran**`.
Geetha and Kiran share the parent `Pinni` — siblings, so `../<name>`.

**Q18.** the lowest **common ancestor**; the number of **`..`** (steps up).
Then spell the downward chain of child names to the target. This recipe
solves *every* "here → there" question the tree can pose.

**Q19.** `cd **../../Telangana/Hyderabad**`.
Vijayawada and Hyderabad are cousins: up to `Andhra`, up to `Bharath` (the
common ancestor), then down the other branch `Telangana` → `Hyderabad`.

**Q20.** **`ls`**.
Listing before moving prevents most typos — you copy the folder name you can
see instead of spelling it from memory.

**Q21.** **`/home/rohinibarla/Bharath/Telangana/Warangal`**.
Absolute = the full chain from `/`, no thinking about where you stand.

**Q22.** **`pwd`**.
Seeing the address change before and after each `cd` is what turns the
abstract `..` into something you can watch happen.

---

## Part C — Scenario Questions

**Q23. Anil's overshoot.**
From `Ravi`, the first `..` lands on `Peddamma` and the second on
`Kutumbam` — so `cd ../../Sita` asks for a `Sita` *directly inside
`Kutumbam`*, and no such folder exists there (`Kutumbam`'s children are
`Peddamma` and `Pinni`). Ravi and Sita are **siblings**, not cousins, so one
step up is enough: `cd ../Sita`. Counting the `..` is exactly counting the
steps up to the common ancestor — here, one.

**Q24. Works for Divya, fails for Suresh.**
`Kutumbam/Peddamma/Ravi` is a **relative** path, so it means "starting from
wherever I am now." Most likely Divya is standing in her home folder `~` (the parent
of `Kutumbam` — a new terminal opens there) and Suresh is standing
somewhere else — perhaps he already `cd`-ed into `Bharath`, or inside the
`Kutumbam` tree. Each
should run `pwd` first to see where they stand. Two fixes for Suresh:
(1) move to the right starting point first — `cd ~` (or just `cd`) — then reuse the
relative path; or (2) use the absolute path
`cd /home/<his-username>/Kutumbam/Peddamma/Ravi` (or
`cd ~/Kutumbam/Peddamma/Ravi`), which works from anywhere.

**Q25. Bhavana's not-so-absolute instruction.**
An absolute path is independent of *where you stand*, but not of *which
machine and user* you are — and hers has her own username baked in:
`/home/bhavana/...` doesn't exist on a teammate's laptop, where the home
folder is `/home/<their-name>`. The fix is to route through each person's
own home with `~`: "run `cd ~/Kutumbam`". `~` expands to the right
home folder on every machine, so the instruction becomes portable.

**Q26. Warangal → Tirupati by the recipe.**
Step 1: the lowest common ancestor of `Warangal` (under `Telangana`) and
`Tirupati` (under `Andhra`) is `Bharath`. Step 2: from `Warangal` that is two
steps up, so two `..` — the first lands on `Telangana`, the second on
`Bharath`. Step 3: walk down the other branch: `Andhra`, then `Tirupati`.
Final command: `cd ../../Andhra/Tirupati`.

**Q27. Three dots-pairs from Kiran.**
Start: `/home/rohinibarla/Kutumbam/Pinni/Kiran`. First `..` →
`Pinni`; second `..` → `Kutumbam`; third `..` → `rohinibarla`. You are now in
your home folder `/home/rohinibarla`. Each `..` removes exactly one folder from the
end of the `pwd` — which is why running `pwd` after the move confirms it
instantly.

**Q28. Meghana's lowercase habit.**
Windows is forgiving about capital letters; Ubuntu is not. To Ubuntu,
`kutumbam` and `Kutumbam` are two entirely different names, and only
`Kutumbam` exists — so `ls` shows a folder that her `cd` is not asking for.
The correct command is `cd Kutumbam`, with the capital `K`. The habit that
prevents this: type `cd Ku` and press **Tab** — bash completes the name with
the exact capitalisation that is really on disk. (Copying the name from the
`ls` output works too.)

**Q29. Bouncing with `cd -`.**
After command 1 you are in `/home/rohinibarla/Bharath/Andhra` (the
`~/...` path is absolute-via-home, so it works from `Ravi`). After the first
`cd -` you are back in `Kutumbam/Peddamma/Ravi`, and bash prints
`/home/rohinibarla/Kutumbam/Peddamma/Ravi`. After the second `cd -`
you are in `Andhra` again, and bash prints that path. `cd -` remembers
exactly one thing — the folder you were in before the last move (bash keeps
it in the variable `$OLDPWD`) — so repeated `cd -` bounces you between the
same two places.

**Q30. Ravi → Geetha, both ways.**
Relative: `cd ../../Pinni/Geetha` — two `..` (first lands on `Peddamma`,
second on `Kutumbam`, the common grandparent), then down `Pinni` → `Geetha`.
Absolute: `cd /home/rohinibarla/Kutumbam/Pinni/Geetha`. Starting
from `Sita` instead, the **absolute path is unchanged and still correct** —
that is its whole point. The relative path *happens* to still work from
`Sita` (she is also two levels below `Kutumbam`, so the same two `..` reach
it), but that is luck of the tree, not a property of the path: from
`Peddamma` the two `..` would reach `/home/rohinibarla`, and from `Vijayawada` they
would reach `Bharath` — both have no `Pinni` inside, so the command would
fail. The absolute path never would.
