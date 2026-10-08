# Learn Any Topic — The Tutor Prompt

An AI chat can answer any question, but reading a long answer is not the same
as **learning**. This sheet gives you one prompt that turns the AI into a
**patient tutor**: it teaches one small idea at a time, asks you a question,
and waits for your answer before moving on.

The rule for the whole sheet: **you do the thinking, the AI only checks it.**

## How the tutor loop works

```
 you fill the placeholders and paste the prompt
   │
   ▼
 tutor asks 2-3 questions     ← finds out what you already know
   │
   ▼
 tutor shows a roadmap        ← 5-8 steps from you to your goal
   │
   ▼
 one small idea + 1 question  ← ~100-150 words, then it STOPS
   │
   ▼
 you answer                   ← in your own words, no copy-paste
   │
   ├── right → next step
   └── wrong → explained a different way, new question
```

---

# Part 1 — The prompt

Copy everything inside the box. Replace the parts in **[square brackets]**
before you send it (Part 2 explains each one).

```
I want to learn **[INSERT TOPIC]** properly, so that I can use it and explain it, not just recognise the words.

About me: I am a beginner in backend development. I already know [WHAT YOU KNOW, e.g. "C programming basics"]. My goal is [GOAL, e.g. "build a small REST API" / "clear interviews"].

Act as a patient tutor who teaches one small idea at a time and checks that I understood it before moving on. I learn best by doing and answering, not by reading long explanations.

How to start:
- Ask me 2-3 quick questions to find out what I already know about this topic.
- Then show me a short roadmap (5-8 steps) from where I am to my goal, and begin with step 1.

How to teach each step:
- Keep it short, roughly 100-150 words, because I lose track in long answers. Go a little over only if a code example needs it.
- Connect the idea to something I already know (my background above, or everyday life). Skip the analogy if it would mislead, and tell me where an analogy breaks down.
- Explain the idea in simple language. Bold each new term and define it the first time you use it.
- Show a tiny example I can run myself, or a simple diagram in text if code doesn't fit.
- End with exactly one question, then stop and wait for my answer. Do not continue until I reply.

About the questions:
- Make me think, not recall. Prefer "what will this code print?", "find the bug", "what happens if we change X?", or "explain this in your own words" over definition questions.
- Don't give hints in the question or reveal the answer early.

When I answer:
- If I'm right, confirm in one line and move on. If I got it right easily, go a bit faster or deeper.
- If I'm wrong, don't just give the answer. Point out the mistake in my thinking, explain it a different way than before, and ask a new question on the same idea.
- If I say "I don't know", give a hint first, not the answer.

Along the way:
- Every 3-4 steps, ask one question that mixes in an earlier idea, so I don't forget it.
- At the end of the roadmap, give me a small mini-task that combines everything, and review my solution.
- Be honest. If my answer is partly right, say exactly which part is wrong instead of praising it.

I can say "simpler", "deeper", "example", or "recap" at any time and you should adjust.
```

---

# Part 2 — The placeholders

There are **three** placeholders in square brackets, and **one sentence** you
should also check. Delete the brackets and the `e.g. ...` hints when you fill
them in.

| Placeholder | What to write | Weak (too vague) | Good (specific) |
|---|---|---|---|
| `[INSERT TOPIC]` | **One** topic, small enough to finish in a few sittings. | `backend` | `HTTP requests and responses` |
| `[WHAT YOU KNOW]` | What you can already *do*, not just what you have heard of. The tutor builds its analogies from this. | `some coding` | `C basics: variables, loops, functions, pointers; Linux shell commands like ls, cd, cat` |
| `[GOAL]` | What you want to be able to do *at the end*. The roadmap is planned backwards from this. | `learn it` | `write a small Python program that calls a public API and prints the result` |

### The sentence to check: "I am a beginner in backend development."

This is not in brackets, but it is still about **you**. If your topic is not
backend (for example, Git or data structures), change it so it is true —
e.g. *"I am a first-year programming student."* A wrong background gives you
wrong analogies.

### Why the placeholders matter

- **Topic too big** (`"web development"`) → the roadmap becomes a list of
  headings and you never go deep. Pick one slice.
- **Background empty** → the tutor cannot connect new ideas to old ones, so
  you get dictionary definitions instead of understanding.
- **Goal missing** → the tutor does not know when to stop, or which parts to
  skip.

---

# Part 3 — Two situations to use it

### Situation 1 — Starting a new topic in the course

You are about to begin backend work and keep hearing "GET", "POST", "status
200", "404". You have seen the words but could not explain them.

```
I want to learn **HTTP requests and responses** properly, so that I can use it and explain it, not just recognise the words.

About me: I am a beginner in backend development. I already know C programming basics (variables, loops, functions) and basic Linux shell commands (ls, cd, cat, man, curl). My goal is to understand what happens when a browser asks a server for a page, so that I can build a small REST API later.
```

(The rest of the prompt stays exactly the same.)

**What to expect:** the tutor may ask whether you have used `curl` before,
then build its examples around commands you can run in your own terminal —
e.g. `curl -i https://example.com` to see a real response with its status
line and headers.

### Situation 2 — Preparing for an interview topic

An interview is two weeks away, and you know recursion is a common question.
You have read about it, but you freeze when asked to trace one by hand.

```
I want to learn **recursion** properly, so that I can use it and explain it, not just recognise the words.

About me: I am a first-year programming student. I already know C programming basics: functions, if/else, loops, and arrays. My goal is to clear interviews: trace a recursive function by hand, and write simple recursive solutions like factorial, sum of an array, and reversing a string.
```

Notice the first line of *About me* was changed — recursion is not a backend
topic.

**What to expect:** questions like *"what will `f(3)` print?"* and *"find the
bug — this function never stops"*, and a final mini-task that you solve and
the tutor reviews.

---

# Part 4 — Using it well

1. **Answer before you scroll.** The tutor is told to stop after each
   question. Write your answer yourself — do not copy the question into
   another chat.
2. **Run every example.** If the tutor shows code, type it and run it. If the
   output differs from what the tutor said, tell it — the AI can be wrong.
3. **Use the control words** whenever you need them:

   | Say | When |
   |---|---|
   | `simpler` | The explanation lost you. |
   | `deeper` | That was easy; you want more detail. |
   | `example` | You need to see it working. |
   | `recap` | You came back after a break, or the chat got long. |

4. **"I don't know" is a valid answer.** You will get a hint, not the
   solution. That is the point.
5. **Long break?** Start a new chat with the same prompt and add:
   *"I have already finished steps 1-3 of the roadmap: ..."*

---

# Your task

1. Pick **one** topic you need to learn this week.
2. Fill in the three placeholders (and check the background sentence).
   Show your filled-in *About me* line to a classmate — can they tell exactly
   what you know and what you want?
3. Run the prompt and complete **at least 3 steps** of the roadmap.
4. Write down, in your own words:
   - the roadmap the tutor gave you,
   - one question you got **wrong**, and what the mistake in your thinking was.
