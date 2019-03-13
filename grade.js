function readURL(input) {
      $("#is_text").html("-")
      $("#all_valid").html("-")
      $("#all_valid_message").html("")
      $("#has_bug").html("-")
      $("#has_bug_message").html("")
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                try
                 {
                  allValid = true
                  allValidCExample = ""
                  hasBug = false
                  bugCExample = " No bug revealing test case found"
                  oneValid = false
                  oneValidCExample = " No test case found"
                  for(var s of e.target.result.split("\n")){
                    if(s == "")
                      continue
                    address = s.substr(0,s.lastIndexOf(","))
                    outputStr = s.substr(s.lastIndexOf(",")+1)
                    if (outputStr != "true" && outputStr != "false"){
                      continue
                    }
                    isCorrect = outputStr == "true"
                    if(correctValidEmail(address) != isCorrect) {
                      allValid = false
                      allValidCExample = ` The validity of <b>${address}</b> should be <b>${correctValidEmail(address)}</b> but it's <b>${isCorrect}</b>.`

                    } else{
                      oneValid = true
                      oneValidCExample = ""
                    }
                    if(validateEmail(address) != correctValidEmail(address)){
                      hasBug = true
                      bugCExample = ""
                    }
                  }
                  $("#is_text").html("30")
                  $("#has_bug").html(hasBug ? "10" : "0")
                  $("#has_bug_message").html(bugCExample)
                  $("#all_valid").html((oneValid && allValid) ? "10" : "0")
                  $("#all_valid_message").html(allValidCExample +" " + oneValidCExample)
                  alert("Graded")
                }
                catch(error){
                  alert("Problem with the file. Please contact me (Navid).");
                }
            }
            reader.readAsText(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });

    function validateEmail(sEmail) {
          var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
          return sEmail.toLowerCase().includes("uci") && filter.test(sEmail);
    }

    function correctValidEmail(sEmail) {
          var filter = /^([\w-\.]+)@((.?)([\w-]+\.)+)([a-zA-Z]{2,4})$/;
          if (filter.test(sEmail) == false)
            return false
          if (sEmail.toLowerCase().includes(".."))
            return false
          parts = sEmail.toLowerCase().split("@")[1].split(".")
          if (parts[parts.length-2] != 'uci')
            return false
          return true
    }
