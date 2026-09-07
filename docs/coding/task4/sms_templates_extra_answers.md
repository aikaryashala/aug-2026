# SMS Templates — Extra Answers with Reasoning

Check the **reasoning**, not just the line. Variable names may differ from yours — that is fine if they say what the value means. The strings must match **exactly**: every space, comma, colon, and full stop.

---

# Part D — Bank Alerts

**D1.**

```
print "A/c " + AccountNo + " debited by Rs." + Amount + " on " + Date + " at " + MerchantName + ". Avl bal: Rs." + Balance + "."
```

Five variables. `Vizag Central` varies — another customer swipes at a different shop — so the shop is `MerchantName`, and its value happens to contain a space, which is fine. `Rs.` (both times) and the labels stay in the strings.

**D2.**

```
print "Rs." + Amount + " transferred from A/c " + FromAccount + " to A/c " + ToAccount + " on " + Date + ". Ref No " + RefNo + ". Avl bal: Rs." + Balance + "."
```

The teaching point: **two values of the same kind need two different names.** Both `XX3401` and `XX8266` are account numbers, but they mean different things in this message — one money leaves, one money enters. `FromAccount` and `ToAccount` say which is which; calling them `AccountNo1` and `AccountNo2` loses the meaning.

**D3.**

```
print "A/c " + AccountNo + " credited with Rs." + Amount + " from " + SenderName + " on " + Date + " by " + TransferMode + ". Ref No " + RefNo + "."
```

Same transfer, seen from the receiving bank — notice the `Ref No` value is identical to D2's. `IMPS` is marked varying here (`TransferMode`) because the same template also announces NEFT and UPI credits. If you kept `by IMPS.` fixed, that is a defensible reading too — a bank *could* have a separate IMPS-only template — but then the string must be `" on " + Date + " by IMPS. Ref No "` with exactly those spaces.

---

# Part E — Train Tickets: Visakhapatnam ⇄ Hyderabad

**E1.**

```
print "PNR:" + PnrNo + ",TRN:" + TrainNo + " " + TrainName + ",DOJ:" + JourneyDate + "," + FromStation + "-" + ToStation + ",DEP:" + DepartureTime + ",ARR:" + ArrivalTime + "," + PassengerName + ",AGE:" + Age + "," + SeatNo + " " + BerthType + ",FARE:" + Fare + ".Happy Journey-IRCTC"
```

Thirteen variables, walked left to right. The composite pieces split at their own boundaries:

- `12728 GODAVARI EXP` is `TrainNo + " " + TrainName` — for another train both change, and the space between them is template.
- `VSKP-HYB` is `FromStation + "-" + ToStation` — the dash is template, as in the main bank's tickets.
- `S9-42 LOWER` is `SeatNo + " " + BerthType` — the dash inside `S9-42` belongs to the seat's *value*; the space before `LOWER` is template.
- `.Happy Journey-IRCTC` is the same for every passenger — fixed tail text.

**E2.**

```
print "PNR " + PnrNo + " CONFIRMED. Coach " + CoachNo + ", Berth " + BerthNo + ", " + FromCity + " to " + ToCity + ", " + JourneyDate + "."
```

`CONFIRMED` stays fixed — this template exists to announce confirmation, so it says the same word to everyone. The route splits into `FromCity` and `ToCity` around the fixed `" to "`.

**E3.**

```
print "Train " + TrainNo + " " + TrainName + " from " + FromCity + " to " + ToCity + " is delayed by " + DelayMinutes + " mins. Expected departure " + NewDepartureTime + " from platform " + PlatformNo + "."
```

Seven variables. Note this is the return train (`12727`, Hyderabad → Visakhapatnam) — the same cities as E1, swapped, which is exactly why they must be *variables*: the template serves both directions. The space after `mins.` lives inside `" mins. Expected departure "`.

---

# Part F — Registrations

**F1.**

```
print "Dear " + StudentName + ", your registration for AP EAMCET is successful. Reg No: " + RegNo + ", Exam centre: " + CentreName + ", " + CentreCity + ", Date: " + ExamDate + " " + ExamTime + ". Hall ticket at cets.apsche.ap.gov.in"
```

`AP EAMCET` is fixed — this board sends SMS only about its own exam. The website at the end *looks like data* but is the same for every student — fixed, exactly like the TSRTC helpline in the worksheet. The centre splits into `CentreName` and `CentreCity` around the fixed `", "`.

**F2.**

```
print "Dear " + VoterName + ", your voter registration is approved. EPIC No: " + EpicNo + ", Part No: " + PartNo + ", Polling Station: " + PollingStation + ", " + City + ". Verify at voters.eci.gov.in"
```

Five variables. `EPIC No: `, `Part No: `, `Polling Station: ` are fixed labels with their spaces. The polling station's value (`ZPHS Madhurawada`) contains a space — values may. `voters.eci.gov.in` is the same for every voter in India — fixed.

**F3.**

```
print "Dear " + ApplicantName + ", your RTA appointment for driving licence test is booked at " + OfficeArea + ", " + City + " on " + AppointmentDate + " " + AppointmentTime + ". Application No: " + ApplicationNo + ". Bring original documents."
```

Six variables. `driving licence test` is fixed in this template (an RTA appointment SMS for licence tests); the office splits into `OfficeArea` and `City`. The closing advice `Bring original documents.` is the same for everyone — fixed, with the space after the previous full stop carried by `". Bring original documents."`.
