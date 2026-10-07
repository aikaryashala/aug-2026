# Relative vs Absolute Paths — Question Bank

Answer these **after** finishing the Task 13 worksheet (Relative vs Absolute
Paths). Write your answers in your notebook first. For every path answer,
also say **why** — name the folders you climb through, out loud.

Assume the two practice trees from the worksheet exist in your home folder:

```
/home/rohinibarla/
├── Kutumbam/
│   ├── Peddamma/
│   │   ├── Ravi/
│   │   └── Sita/
│   └── Pinni/
│       ├── Kiran/
│       └── Geetha/
└── Bharath/
    ├── Andhra/
    │   ├── Vijayawada/
    │   └── Tirupati/
    └── Telangana/
        ├── Hyderabad/
        └── Warangal/
```

You are working in the **Terminal on Ubuntu**. Home is `/home/rohinibarla`,
and both trees sit directly inside it. **Predict first** — verify in
the terminal only after writing your prediction down.

---

# Part A — Multiple Choice Questions

Choose the one best option.

**Q1.** Which of these is an **absolute** path?

- (a) `Kutumbam/Peddamma`
- (b) `../Pinni`
- (c) `/home/rohinibarla/Kutumbam`
- (d) `.`

**Q2.** What does `..` mean in a path?

- (a) The current folder
- (b) The parent folder — one step up
- (c) The home folder
- (d) The root of the file system

**Q3.** What does the `pwd` command do?

- (a) Changes your password
- (b) Prints the folder you are currently standing in
- (c) Lists the files in the current folder
- (d) Jumps to the previous folder

**Q4.** On Ubuntu, under which folder do normal users' home folders live?

- (a) `/c/Users`
- (b) `/root`
- (c) `/home`
- (d) `/users`

**Q5.** You are in `Ravi`
(`/home/rohinibarla/Kutumbam/Peddamma/Ravi`). Which relative path
takes you to `Sita`?

- (a) `cd Sita`
- (b) `cd ../Sita`
- (c) `cd ../../Sita`
- (d) `cd ./Peddamma/Sita`

**Q6.** Still starting in `Ravi`, the move to `Kiran` is
`cd ../../Pinni/Kiran`. Which folder does the second `..` land you on?

- (a) `Peddamma`
- (b) `rohinibarla`
- (c) `Pinni`
- (d) `Kutumbam`

**Q7.** Which statement about an **absolute** path is true?

- (a) It is always shorter than the relative path
- (b) It is the same, and works the same, no matter which folder you are standing in
- (c) It only works when you are inside your home folder
- (d) It must contain at least one `..`

**Q8.** What does `cd -` do?

- (a) Goes up one level
- (b) Goes home
- (c) Jumps back to the **previous** folder you were in
- (d) Deletes the current folder

**Q9.** What does `cd` typed **alone**, with no argument, do?

- (a) Nothing — it prints an error
- (b) Goes up one level
- (c) Stays where you are and prints the path
- (d) Goes to your home folder

**Q10.** In the worksheet's postal analogy, "House 12, Gandhi Street,
Vijayawada, Andhra, Bharath" corresponds to which kind of path — and why?

- (a) Relative, because it names real places
- (b) Absolute, because it is valid no matter where you are standing
- (c) Relative, because you still have to travel there
- (d) Absolute, because it is long

**Q11.** You are in `Vijayawada`. What does `cd ../..` do?

- (a) Lands you on `Bharath`
- (b) Lands you on `Andhra`
- (c) Lands you on `rohinibarla` (home)
- (d) Error — you cannot use `..` twice

**Q12.** You are in your home folder `~` on Ubuntu and type `cd kutumbam` (all
lowercase). What happens?

- (a) It works — bash ignores capital letters
- (b) It fails with `No such file or directory`, because Ubuntu treats `kutumbam` and `Kutumbam` as different names
- (c) It creates a new folder called `kutumbam`
- (d) It works, but prints a warning about capital letters

---

# Part B — Fill in the Blanks

Write the exact missing word, symbol, or command.

**Q13.** One-line rule: if a path starts with __________ it is absolute;
otherwise it is relative.

**Q14.** In a path, `.` means __________ and `..` means __________.

**Q15.** On Ubuntu, `~` is a shortcut for the folder __________ (write the
full absolute path for user `rohinibarla`).

**Q16.** Folders with the **same parent** are called __________, and moving
between them is always `cd ______/<name>`.

**Q17.** You are in `Geetha`. The relative path to her sibling `Kiran` is:
`cd __________`.

**Q18.** The recipe for any relative path: first find the lowest
__________ __________ of "here" and "there"; the number of steps up to it is
the number of __________ you need.

**Q19.** You are in `Vijayawada` and want `Hyderabad`. The relative path is
`cd __________`.

**Q20.** The command __________ lists what is inside the current folder —
"look around before you leap."

**Q21.** The absolute path of the `Warangal` folder is __________.

**Q22.** The worksheet says to run __________ before and after every `cd`,
so you can watch your address change.

---

# Part C — Scenario Questions

Answer in 2–4 sentences each. Name the folders you pass through.

**Q23.** Anil is in `Ravi` and wants to reach `Sita`. He types
`cd ../../Sita` and gets `No such file or directory`. Trace where his path
actually pointed, explain the mistake, and give the correct command.

**Q24.** Two students both type `cd Kutumbam/Peddamma/Ravi`. For Divya it
works; for Suresh it fails with `No such file or directory` — yet the
`Kutumbam` tree definitely exists in the home folder on both machines. What is
the most likely difference between them, and what single command should
each run first to find out? Give Suresh two different ways to fix his
situation.

**Q25.** Bhavana writes helpful notes for her team that say: "to reach the
practice folder, run `cd /home/bhavana/Kutumbam`". Her teammates
report the command fails on their Ubuntu laptops. Why does an absolute
path — which is supposed to "work from anywhere" — fail here? Rewrite the
instruction so it works for every teammate (assume everyone built
`Kutumbam` in their own home folder).

**Q26.** Use the worksheet's recipe to go from `Warangal` to `Tirupati`.
Name the lowest common ancestor, say how many `..` you need and which folder
each one lands on, and write the final command.

**Q27.** `pwd` shows `/home/rohinibarla/Kutumbam/Pinni/Kiran`.
You type `cd ../../..`. Where are you now? Walk through it one `..` at a
time.

**Q28.** Meghana learned paths on a Windows laptop, where `cd kutumbam` (all
lowercase) used to work. On Ubuntu she types the same thing and gets
`No such file or directory`, even though `ls` clearly shows `Kutumbam`. She
says "the folder is right there!". Explain what is going on, give the
correct command, and name one bash habit that stops this mistake from
happening.

**Q29.** You are in `Ravi`. You run `cd ~/Bharath/Andhra`, and then
`cd -`, and then `cd -` again. Where do you end up after each of the three
commands? What does `cd -` print, and what is it actually remembering?

**Q30.** The worksheet's challenge: from `Ravi`, reach `Geetha` with a
relative path. Write the command, state how many `..` you needed and which
folder they land you on — and then write the absolute-path version. Which of
the two would still be correct if you started from `Sita` instead, and why?
