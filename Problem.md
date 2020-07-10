# ICS-Evo Email Verifier

[]: # (In the paragraph below describe the task)

The development team of ICS-Evo implemented a library to check if a string can be an email address or not. An email address satisfies all of the constraints below:

1. All characters belong to alphabet letters (lower and uppercase), numbers, ".", "@", "-", and "_".
2. There should be exactly one "@" (the part before "@" is called local-part and the part after that is a domain).
3. The local-part and domain cannot be empty.
4. There should be no two consecutive dots
5. The domain name can be divided into several parts by ".". The last part consists of 2 to 4 alphabet letters.
6. All emails should be affiliated with UCI. In other words, the one before the last part of the domain should be "uci". Please note that the domain is case insensitive.
7. The email should not be already registred in the database.


### Test Case Input Format
[]: # (Define the format of each test case input)

Each test case consists of one string of characters.

### Test Case Output Format
[]: # (Define the format of each test case output, usually a multiple choice)
The output should be either "Valid" (showing the input string is a valid email) or "Invalid".

### Existing Database
[]: # (If the task under test has a database, you can provide a snapshot of the database here)

The following emails are already registered:

- root@uci.edu
- admin@uci.edu

### Examples
[]: # (In the table below provide some examples)

| # | Input | Output | Note |
|---|-------|--------|------|
| 1 |johndoe@uci.edu| Valid |      |
| 2 |12.34@uci.edu| Valid |      |
| 3 |j@uci.edu| Valid||
| 4 |john?doe@uci.edu| Invalid | Constraint 1 |
| 5 |john@doe@uci.edu| Invalid | Constraint 2 |
| 6 |@uci.edu| Invalid | Constraint 3 |
| 7 |johndoe@| Invalid | Constraint 3 |
| 8 |john..doe@uci.edu| Invalid | Constraint 4 |
| 9 |johndoe@uci.e| Invalid | Constraint 5 |
| 10 |johndoe@gmail.com| Invalid | Constraint 6 |
| 11 |admin@uci.edu| Invalid | Constraint 7 |


### How to submit

To test this functionality, you can use the tool below. Each row represents a test case, and you can add more test cases by clicking "Add Row." By clicking on "Run Tests," all test cases will be executed by the implemented code. If the expected output and the actual output of the system matches, then the corresponding row will become green, otherwise it becomes red.

Once you finished testing, click on "Test Cases" to download your test suite and don't forget to upload it on Canvas (HW4).

If you have any question or any problem using the tool, please ask on Piazza or send me an email "TA at uci dot edu".



