# SMS Templates — Find What Varies

**Goal.** Every SMS in your phone was printed by a program. The bank, the bus company, the recharge app — none of them type messages by hand. One program prints lakhs of messages a day, and the only thing that changes from customer to customer is a handful of values. On this sheet you will read real-looking SMS messages and work backwards: find what varies, name it well, and write the print statement that generated the message.

**You need:** a notebook, a pencil, and the print-statement rules from Task 3.

This sheet is written like a song: one **pallavi** (పల్లవి) — the rule we return to after every verse — and a series of **charanams** (చరణాలు) — verses that each add one new idea.

> **Pallavi — the golden rule of this sheet**
> In an SMS, the words that are the **same for every customer** live inside quotes; the pieces that **change** are variables.
> Ask of every piece: *"would this change for another customer?"* — and cut the string exactly where the answer becomes yes.

---

## Charanam 1 — Two customers, one program

**a. What we set up**

Two customers received these messages from the same app:

```sms
Hello Ravi, your OTP is 4821.
```

```sms
Hello Sita, your OTP is 9017.
```

**b. Task**

Copy both messages into your notebook, one under the other, and underline every piece where they differ.

**c. Observation (what you should find)**

Only two pieces differ — the name and the number. Everything else is identical, because it came from the same strings in the same program:

```
print "Hello " + CustomerName + ", your OTP is " + Otp + "."
```

Check the gluing: `"Hello "` ends with a space, `", your OTP is "` carries the comma, both spaces, and `"."` closes the sentence — exactly the Task 3 rules.

**Takeaway to say out loud:** "One program, many customers — the changing pieces are the variables."

---

## Charanam 2 — You get only one copy

**a. What we set up**

Usually you cannot compare two copies — you have just one message:

```sms
Your recharge of Rs.199 is successful. New balance: Rs.240.
```

**b. Task**

For each piece of the message ask the pallavi question: *would this change for another customer?* Underline the pieces where the answer is yes.

**c. Observation (what you should find)**

`199` changes (another customer recharges a different amount) and `240` changes (everyone's balance differs). The words — and even `Rs.` — stay:

```
print "Your recharge of Rs." + RechargeAmount + " is successful. New balance: Rs." + Balance + "."
```

Note the space after the first full stop — it lives inside `" is successful. New balance: Rs."`, just like in Task 3.

**Takeaway to say out loud:** "Ask every piece: would you change for another customer?"

---

## Charanam 3 — Name the variable by its meaning

**a. What we set up**

The same value can be named many ways:

```
4821         → A?   Number?   Otp?
889.00       → X?   Amount?   BillAmount?
16-Jun-25    → D?   Date?     JourneyDate?
```

**b. Task**

For each value, say which name tells a stranger *what the value means* — without seeing the SMS.

**c. Observation (what you should find)**

`Otp`, `BillAmount`, `JourneyDate` win. A good variable name answers "what is this value *for*?" — not "what does it look like?". When a name needs two or more words, join them and start each word with a capital letter — a name must be **one word, no spaces**:

```
Booking Date     → not allowed — two words is not a name
BookingDate      → correct
bill amount      → not allowed
BillAmount       → correct
```

**Takeaway to say out loud:** "Name the variable by what the value means, joining words with capitals."

---

## Charanam 4 — Cut exactly at the boundary

**a. What we set up**

A customer received this SMS:

```sms
Your payment of Rs.889.00 is successful on BSNL Portal. Ref Id: FCDR2510166695343.
```

**b. Task**

Two pieces vary: the amount and the reference id. Decide *exactly* where each string ends and each variable begins. Does `Rs.` go with the amount? Does the final `.` go with the reference id?

**c. Observation (what you should find)**

```
print "Your payment of Rs." + BillAmount + " is successful on BSNL Portal. Ref Id: " + ReferenceId + "."
```

`Rs.` is the same for every customer — it stays in the string, and the string cuts immediately after it. The variable holds only `889.00` — the part that varies. Likewise `Ref Id: ` (with its space) stays fixed, and the final `.` is printed by its own little string after the reference id.

**Takeaway to say out loud:** "Cut where the varying begins — punctuation and spaces stay in the strings."

---

## Charanam 5 — Many variables, same method

**a. What we set up**

A customer received this SMS:

```sms
We have received your order OD407321268625838000 amounting to Rs.4166 and it is being processed. You can expect delivery by Fri 14, Feb 2020. You can manage your order at http://fkrt.it/zzBo1ukluN. Thank you!
```

**b. Task**

Walk the message left to right. Underline every piece that would change for another order, and name each one.

**c. Observation (what you should find)**

Four pieces vary — the order id, the amount, the delivery date, and the link:

```
print "We have received your order " + OrderId + " amounting to Rs." + Amount + " and it is being processed. You can expect delivery by " + DeliveryDate + ". You can manage your order at " + OrderLink + ". Thank you!"
```

However long the message, the method never changes: walk left to right, cut at every varying piece, glue with `+`.

**Takeaway to say out loud:** "Walk the message left to right, cutting at every varying piece."

---

## Charanam 6 — The ticket: dense, but the same song

**a. What we set up**

A bus ticket SMS — real ones are this dense:

```sms
TKT NO 78415325,NAME:VINODKUMAR P,HYD-PUNE,SRVC NO:3367(HYD - PUNE) Seats:U15(M)FARE:1902,DOJ:16-Jun-25 05:40PM,HYD-17:40,UID:0032.Helpline Ph:08662570005.www.tsrtconline.in
```

**b. Task**

Underline the varying pieces and name them. Watch for two things: some pieces appear **more than once**, and the helpline number and website are the **same for every ticket**.

**c. Observation (what you should find)**

```
print "TKT NO " + TicketNo + ",NAME:" + PassengerName + "," + FromCity + "-" + ToCity + ",SRVC NO:" + ServiceNo + "(" + FromCity + " - " + ToCity + ") Seats:" + SeatNo + "(" + Gender + ")FARE:" + Fare + ",DOJ:" + JourneyDate + " " + JourneyTime + "," + FromCity + "-" + BoardingTime + ",UID:" + Uid + ".Helpline Ph:08662570005.www.tsrtconline.in"
```

Three things worth saying out loud:

- `FromCity` is printed **three times** and `ToCity` twice — a variable can appear as many times as the message needs (you practised this in the extra questions of Task 3).
- Inside the brackets the route is `HYD - PUNE` (spaces around the dash), outside it is `HYD-PUNE` (no spaces) — the strings `"-"` and `" - "` are different, and the message proves it.
- The helpline and website never change, so they live at the end of the template as plain fixed text — even though they *look* like data. A big number and a web address tempt the eye, but compare with Charanam 5: Flipkart's order link **varied** per order, so it was a variable; TSRTC's website is the same on every ticket, so it is not. **A piece is not a variable because it looks like data — it is a variable because it varies.**

**Takeaway to say out loud:** "However dense the message, it is the same song — and a variable can sing many times."

---

## Practice on paper

**P1.** Write the print statement that generated this SMS:

```sms
Dear Sita, Rs.250 cashback credited to your Paytm wallet.
```

**P2.** Write the print statement that generated this SMS:

```sms
Train 12723 is delayed by 45 mins. Inconvenience regretted.
```

**Check yourself:** P1 — `print "Dear " + CustomerName + ", Rs." + CashbackAmount + " cashback credited to your Paytm wallet."` P2 — `print "Train " + TrainNo + " is delayed by " + DelayMinutes + " mins. Inconvenience regretted."` (Your variable names may differ — they should still say what the value means.)

If a boundary surprised you, re-read the charanam it comes from.

---

## One-page reference

**The method**

1. Read the whole message once.
2. Ask every piece: *would this change for another customer?*
3. A piece is not a variable because it **looks like data** — only because it **varies**. (Phone numbers and links can be fixed; the TSRTC helpline is on every ticket.)
4. Cut the string exactly where a varying piece begins and ends.
5. Name each variable by what the value **means** — one word only, capital at each joined word (`BookingDate`, never `Booking Date`).
6. Punctuation, spaces, `Rs.`, labels like `Ref Id: ` — all stay inside the strings.
7. A variable may appear more than once; print it again wherever it is needed.

| Piece of SMS | Fixed or varying? | Where it goes |
|---|---|---|
| `Your payment of Rs.` | fixed | inside quotes |
| `889.00` | varying | `BillAmount` |
| ` is successful on BSNL Portal. Ref Id: ` | fixed | inside quotes |
| `FCDR2510166695343` | varying | `ReferenceId` |
| `.` | fixed | inside quotes |

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English | తెలుగు | Meaning |
|---|---|---|
| SMS / message | సందేశం | ఫోన్‌కు వచ్చే చిన్న సమాచారం |
| template | మూస | అందరికీ ఒకేలా ఉండే అచ్చు రూపం |
| fixed | స్థిరమైనది | ప్రతి customer కు మారని భాగం |
| varying | మారేది | customer కు customer కు మారే భాగం |
| boundary | సరిహద్దు | స్థిరమైన భాగం, మారే భాగం కలిసే చోటు |
| meaningful name | అర్థవంతమైన పేరు | విలువ దేని గురించో చెప్పే చరరాశి పేరు |
| customer | వినియోగదారు | సేవను వాడుకునే వ్యక్తి |
