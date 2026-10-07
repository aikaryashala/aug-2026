# Relative vs Absolute Paths — Ubuntu Terminal Worksheet

**For:** `rohinibarla`  ·  **Home:** `/home/rohinibarla`  ·  **Practice area:** `~` (your home folder)
**Tool:** Terminal (bash) on Ubuntu  ·  **Command:** `cd`

> Everywhere you see `rohinibarla`, use **your own** Ubuntu username. Run `whoami` to see it.

---

## 0. Mental model (చిన్న ఆలోచన)

In Ubuntu, the very top of the whole file system is the **root** `/`. There are **no drive
letters** — no `C:`, no `D:`. Everything, on every disk, hangs somewhere under that one `/`.

Every user gets a home folder under `/home`. Yours is `/home/rohinibarla` — which bash also lets
you write as `~`.

Run `pwd` ("**మీరు ఎక్కడ ఉన్నారు** — where are you?") constantly. It prints your current folder.
Path-finding only makes sense once you know where you stand.

- **`.`** → ఇక్కడ (here, the current folder)
- **`..`** → పైన ఉన్న folder (the parent, one step up)
- **`<name>`** → లోపలికి (step down into a child folder)

**Postal analogy.** An *absolute* path is your **full postal address** (House 12, Gandhi Street,
Vijayawada, Andhra, Bharath) — valid no matter where you are standing. A *relative* path is
**"go up one floor, then the second door"** — only meaningful from where you currently stand.

### Look at the top of the tree

```bash
cd /
pwd
ls
```

You will see folders like `bin`, `etc`, `home`, `root`, `tmp`, `usr`. Two of them are easy to mix up:

| Path     | What it is                                              |
| -------- | ------------------------------------------------------- |
| `/`      | the **root** of the whole file system — the very top    |
| `/home`  | where every normal user's home folder lives             |
| `/root`  | the home folder of the *administrator* user, `root` — **not** the top of the tree, and not yours |

### Read your prompt

Ubuntu's prompt already tells you where you are:

```
rohinibarla@ubuntu:~/Kutumbam$
```

`rohinibarla` is the user, `ubuntu` is the machine name, and `~/Kutumbam` is the current folder
(shortened with `~`). `pwd` prints the same place in full: `/home/rohinibarla/Kutumbam`.
A new terminal always opens in your home folder, so the prompt starts as just `~`.

---

## 1. Notes: Absolute vs Relative

|                       | **Absolute path**                | **Relative path**                       |
| --------------------- | -------------------------------- | --------------------------------------- |
| Starts from           | root `/`                         | your current folder (`pwd`)             |
| Begins with           | `/` (e.g. `/home/rohinibarla/...`) | a name, or `.`, or `..`               |
| Same from anywhere?   | **Yes** — never changes          | **No** — depends on where you stand     |
| Building blocks       | the full chain of folder names   | `.`, `..`, and child-folder names       |
| Good when             | you want one address that always works | you are moving "nearby"            |

**One-line rule:** if it starts with `/`, it's absolute. Otherwise it's relative.

> `~/Kutumbam` is a special case: bash replaces `~` with `/home/rohinibarla` *before* running
> the command, so `~/Kutumbam` becomes the absolute path `/home/rohinibarla/Kutumbam`.

---

## 2. Structure 1 — `Kutumbam` (కుటుంబం / family tree)

A family tree is the *perfect* picture for paths, because folders relate exactly like relatives:

- Same parent → **siblings** (అన్నదమ్ములు / అక్కచెల్లెళ్ళు)
- Different parents but same grandparent → **cousins**

Moving between **cousins** is where relative paths get genuinely instructive — you must climb **up**
with `..` to the common ancestor, then come back **down** the other branch.

### Build it

```bash
cd ~
mkdir -p Kutumbam/Peddamma/Ravi
mkdir -p Kutumbam/Peddamma/Sita
mkdir -p Kutumbam/Pinni/Kiran
mkdir -p Kutumbam/Pinni/Geetha
```

`mkdir -p` creates every missing folder along the way, and stays quiet if a folder already exists.

### Picture it

```
/home/rohinibarla/
└── Kutumbam/
    ├── Peddamma/          (పెద్దమ్మ branch)
    │   ├── Ravi/
    │   └── Sita/
    └── Pinni/             (పిన్ని branch)
        ├── Kiran/
        └── Geetha/
```

> Folder names are single ASCII words on purpose: no spaces (which would need quotes) and no
> special characters. **Type the exact capitalisation** — Ubuntu is case-sensitive, so
> `Kutumbam` and `kutumbam` are two different names. `cd kutumbam` fails with
> `No such file or directory`.

### Worked problem A — siblings (same parent)

**You are here → `Ravi`.  Go there → `Sita`.**
`pwd` shows: `/home/rohinibarla/Kutumbam/Peddamma/Ravi`

```bash
# Relative
cd ../Sita

# Absolute
cd /home/rohinibarla/Kutumbam/Peddamma/Sita
```

**Why:** Ravi and Sita share the same parent, `Peddamma`. Step up once (`..` lands you on
`Peddamma`), then step down into `Sita`. **Siblings are always just `../<name>`.**

### Worked problem B — cousins (different parents)

**You are here → `Ravi`.  Go there → `Kiran`.**

```bash
# Relative
cd ../../Pinni/Kiran

# Absolute
cd /home/rohinibarla/Kutumbam/Pinni/Kiran
```

**Why:** Ravi lives under `Peddamma`, Kiran under `Pinni` — they are cousins. Climb up **twice**
to the common grandparent `Kutumbam` (`..` → `Peddamma`, `..` → `Kutumbam`), then come back down
the other branch: `Pinni` → `Kiran`. Notice the absolute path *doesn't care* where you started —
it's the same address every time.

### Practice questions — Structure 1

For each move, write **both** the relative and the absolute command. Run `pwd` before and after.

1. You are in `Sita`. Go to `Geetha`. *(cousin)*
2. You are in `Kiran`. Go to `Ravi`. *(cousin, other direction)*
3. You are in `Geetha`. Go to `Kiran`. *(sibling)*
4. You are in `Ravi`. Go to the `Pinni` folder itself (the aunt, not a cousin).
5. You are in `Sita`. Go all the way back up to your home folder `rohinibarla`.
6. **Challenge:** From `Ravi`, reach `Geetha` with a relative path. How many `..` did you need, and which folder do they land you on?

---

## 3. Structure 2 — `Bharath` (భారత్ / geography)

Same shape, different picture: states are branches, cities are leaves. Two cities in the same state
are siblings; two cities in different states are cousins.

### Build it

```bash
cd ~
mkdir -p Bharath/Andhra/Vijayawada
mkdir -p Bharath/Andhra/Tirupati
mkdir -p Bharath/Telangana/Hyderabad
mkdir -p Bharath/Telangana/Warangal
```

### Picture it

```
/home/rohinibarla/
└── Bharath/
    ├── Andhra/            (ఆంధ్ర)
    │   ├── Vijayawada/
    │   └── Tirupati/
    └── Telangana/         (తెలంగాణ)
        ├── Hyderabad/
        └── Warangal/
```

### Practice questions — Structure 2

1. You are in `Vijayawada`. Go to `Tirupati`. *(sibling cities, same state)*
2. You are in `Vijayawada`. Go to `Hyderabad`. *(cousin — different state)*
3. You are in `Warangal`. Go to `Tirupati`. *(cousin)*
4. You are in `Hyderabad`. Go to the `Andhra` state folder.
5. You are in `Tirupati`. Go up to `Bharath` in a single command.
6. **Two-step:** You are in `Warangal`. First go to `Vijayawada`, then from there go to `Hyderabad`. Write both moves as relative paths.

---

## 4. The reusable recipe (పునరావృతం)

Once a tree exists, you can keep inventing "**here → there**" questions forever. To solve any one:

**Relative path:**
1. Find the **lowest common ancestor** of "here" and "there".
2. Count the steps up to it — that's how many `..` you need.
3. Then spell the downward path of child names to the target.

**Absolute path:**
- Always the full chain: `/home/rohinibarla/<...>` — no counting, no thinking about
  where you stand. Same answer from anywhere.

**Handy `cd` shortcuts to learn alongside:**

| Command   | Meaning                                  |
| --------- | ---------------------------------------- |
| `pwd`     | print where you are now                  |
| `cd ~`    | jump straight home (`/home/rohinibarla`) |
| `cd`      | (alone) also goes home                   |
| `cd -`    | jump back to the **previous** folder (and print it) |
| `cd ..`   | up one level                             |
| `cd /`    | jump to the root of the whole file system |
| `ls`      | look around before you leap              |

> **Tip:** press **Tab** after typing the first few letters of a folder name — bash completes it
> for you, with the exact capitalisation. Fewer typos, less case trouble.

> **Teaching tip:** make students run `pwd` *before and after every `cd`*. Seeing the address change
> turns the abstract `..` into something they can watch happen.

---

When you finish, try the question bank, then check yourself against the answer key.
