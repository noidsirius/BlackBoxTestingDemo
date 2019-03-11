function readURL(input) {
      $("#all_valid").html("-")
      $("#has_bug").html("-")
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                try {
                  allValid = true
                  hasBug = false
                  oneValid = false
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
                    } else{
                      oneValid = true
                    }
                    if(validateEmail(address) != correctValidEmail(address)){
                      hasBug = true
                    }
                  }
                  $("#is_text").html("30")
                  $("#has_bug").html(hasBug ? "10" : "0")
                  $("#all_valid").html((oneValid && allValid) ? "10" : "0")
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
          var filter = /^([\w-\.]+)@(([\w-]+\.)+)([a-zA-Z]{2,4})$/;
          if (filter.test(sEmail) == false)
            return false
          if (sEmail.toLowerCase().includes(".."))
            return false
          parts = sEmail.toLowerCase().split("@")[1].split(".")
          if (parts[parts.length-2] != 'uci')
            return false
          return true
    }
