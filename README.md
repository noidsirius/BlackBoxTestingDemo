# BlackBoxTestingDemo
This is a HTML tool for black box testing a simple function. The initial motivation of this work was a homework assignment for the course INF43 in department of Informatics at University of California, Irvine. 

## Setup
Write the problem description in `Problem.md`, then convert it to an HTML and add it to the `index.html`. You will ended up with a file like `index-compiled.html` that has the black box testing tool and the task description. Then you need to write 5 JS functions in `script.js`:

- `createInputForm`: This should return a HTML form that represent the input test case. The parameter is an integer to distinguish the test cases.
- `createOutputForm`: This should reutrn a HTML form that represent the output of the test case. The parameter is an integer to distinguish the test cases.
- `readInputValues` and `readOutputValues`: given the jquery element of the input/output, it returns the JS values of input/output.
- `existingDataBase`: returns the entries in the database. This is required if the task under test depends on some existings data
- `doesTestPass`: given an input and output of the task; determines if the output is correct or not.

Once you're done with the `script.js` and `index-compiled.html`, upload them in your openlab public html directory `/home/USER/public_html/INF43/`. The address should be accessible in `http://ics.uci.edu/~USER/INF43/`. 
