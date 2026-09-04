# SMS Templates — Answers with Reasoning

Check the **reasoning**, not just the line. Variable names may differ from yours — that is fine if they say what the value means. The strings must match **exactly**: every space, comma, colon, and full stop.

---

# Part A — Spot What Varies

**A1.** Two pieces vary: the customer's name (`Ravi` / `Sita`) and the arrival date (`18-Jul-25` / `21-Jul-25`).

Names: `CustomerName`, `ArrivalDate`. Everything else — including `Dear ` and the final `.` — is identical in both copies, so it is fixed template text.

**A2.** Four pieces vary:

| Piece | Name | Why it varies |
|---|---|---|
| `XX4512` | `AccountNo` | every customer has a different account |
| `5000` | `CreditAmount` | every credit is a different amount |
| `12-Jul-25` | `Date` | credits happen on different days |
| `18450` | `Balance` | every account holds a different balance |

`A/c `, `Rs.` (both times), and `Avl bal: ` are fixed labels — they stay in the strings.

**A3.** Two pieces vary: `299` (`PackAmount`) and `20-Jul-25` (`ExpiryDate`). `Jio` is fixed — Jio sends this SMS about its own packs, so the brand never changes. The whole second sentence is fixed advice, same for everyone.

**A4.** Three pieces vary: `40` (`DiscountPercent`), `Ameerpet` (`BranchName`), `Sunday` (`LastDay`). The `%` sign stays in the string — for every customer the offer is *some* percent, so the sign is fixed and only the number varies. `Trends` is fixed (the store sends its own offers).

---

# Part B — Write the Print Statement

**B1.** `print "Hello " + CustomerName + ", your OTP is " + Otp + "."`

Two variables. `"Hello "` carries the space, `", your OTP is "` carries the comma and both spaces, `"."` closes the sentence.

**B2.** `print "Your Swiggy order " + OrderNo + " will arrive in " + MinutesToArrive + " mins."`

`Swiggy` is fixed — Swiggy sends its own messages. The strings carry the spaces on both sides of each variable.

**B3.** `print "Your recharge of Rs." + RechargeAmount + " is successful. New balance: Rs." + Balance + "."`

The boundary: `Rs.` stays in the string both times, and the space after the first full stop lives inside `" is successful. New balance: Rs."`.

**B4.** `print "A/c " + AccountNo + " debited by Rs." + DebitAmount + " on " + Date + ". Avl bal: Rs." + Balance + "."`

Four variables. Note `". Avl bal: Rs."` — full stop, space, label, and `Rs.` all in one fixed string between the two amounts.

**B5.** `print "Dear " + PatientName + ", your appointment with Dr. " + DoctorName + " is confirmed for " + AppointmentDate + " at " + AppointmentTime + "."`

The subtle boundary: `Dr. ` (with its space) is **fixed** — every appointment is with some doctor, so the title stays in the string and only the name `Rao` varies.

**B6.**

```sms
Dear Kiran, your electricity bill for June is Rs.1240. Pay by 25-Jul-25 to avoid late fee.
```

The reverse direction: replace each variable with its value and glue. Check the boundaries you have been writing all sheet: `Rs.` glued straight onto `1240`, space after the full stop carried by `". Pay by "`.

---

# Part C — The Big Tickets

**C1.**

```
print "PNR:" + PnrNo + ",TRN:" + TrainNo + ",DOJ:" + JourneyDate + "," + FromStation + "-" + ToStation + "," + PassengerName + "," + SeatNo + ",FARE:" + Fare + ",DEP:" + DepartureTime + ".Happy Journey-IRCTC"
```

Nine variables, walked left to right: `PNR:` `TRN:` `DOJ:` `FARE:` `DEP:` are fixed labels (each with its comma); `SC-TPTY` splits into `FromStation + "-" + ToStation`; the seat `S6-34` is one value (`SeatNo`) — the dash inside it belongs to the *value*, not the template. `.Happy Journey-IRCTC` is the same for every ticket.

**C2.**

```
print "Booking ID:" + BookingId + "," + MovieName + "," + TheatreName + ",Screen " + ScreenNo + ",Seats:" + SeatNos + "," + ShowDate + " " + ShowTime + ".Total Rs." + TotalAmount + ".Enjoy the movie!"
```

The interesting variable is `SeatNos`: its value is `D12,D13` — a **comma inside the value**. The template cannot split it into fixed text, because another customer books one seat or three. Date and time are glued with a plain `" "` between them.

**C3.**

```
print "PNR:" + PnrNo + "," + FlightNo + " " + FromCity + "-" + ToCity + "," + PassengerName + ",Seat " + SeatNo + ",DOJ:" + JourneyDate + ",DEP:" + DepartureTime + ",Gate " + GateNo + ".Fly IndiGo, web check-in at goindigo.in"
```

`6E-345 HYD-BLR` is three variables and two little strings: `FlightNo + " " + FromCity + "-" + ToCity`. The dash between cities is template (every route is written city-dash-city); the `6E-345` dash is inside the flight number's value. `,Seat ` and `,Gate ` carry their spaces; the closing `.Fly IndiGo, web check-in at goindigo.in` is fixed for every passenger.
