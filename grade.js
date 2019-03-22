function readURL(input) {
      $("#is_text").html("-")
      $("#all_valid").html("-")
      $("#all_valid_message").html("")
      $("#has_bug").html("-")
      $("#has_bug_message").html("")
      $("#is_comprehensive").html("-");
      $("#is_comprehensive_message").html("");
      $("#has_12tcs").html("-");
      $("#has_12tcs_message").html("");
      $("#sum").html("-");
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                try
                 {
                   var constraints = [constraint1, constraint2, constraint3, constraint4, constraint5, constraint6];
                   var comprehensive_flags = [false, false, false, false, false, false]
                  uniqueEmails = new Set();
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
                    uniqueEmails.add(address);
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
                    for(var index in constraints){
                      if(constraints[index](address))
                        comprehensive_flags[index] = true
                    }
                  }
                  is_comprehensive = comprehensive_flags.every(function(e){return e});
                  comprehensive_message = ""
                  has_12tcs_score = 0;
                  if (uniqueEmails.size >= 12){
                    has_12tcs_score = 40
                  }
                  else if (uniqueEmails.size == 11) {
                    has_12tcs_score = 35
                  }
                  else if (uniqueEmails.size == 10) {
                    has_12tcs_score = 30
                  }
                  else if (uniqueEmails.size == 9) {
                    has_12tcs_score = 25
                  }
                  if (!is_comprehensive){
                    comprehensive_message = "No invalid example for the constraint(s): ";
                    for(index in comprehensive_flags){
                      m = parseInt(index) + 1;
                      if (comprehensive_flags[index] == false)
                        comprehensive_message += `${m} `;
                      }
                  }

                  $("#is_text").html("30")
                  $("#has_12tcs").html(has_12tcs_score);
                  if(has_12tcs_score < 40)
                    $("#has_12tcs_message").html(Array.from(uniqueEmails).join("<br>"));
                  $("#is_comprehensive").html(is_comprehensive ? "10" : "0");
                  $("#is_comprehensive_message").html(comprehensive_message);
                  $("#has_bug").html(hasBug ? "10" : "0")
                  $("#has_bug_message").html(bugCExample)
                  $("#all_valid").html((oneValid && allValid) ? "10" : "0")
                  $("#all_valid_message").html(allValidCExample +" " + oneValidCExample)
                  total_sum = 0;
                  for(s of ["#is_text","#has_12tcs", "#is_comprehensive", "#has_bug","#all_valid"])
                    total_sum += parseInt($(s).html());
                  $("#sum").html(total_sum);
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

    function constraint1(sEmail){
      var filter = /[^\w-\.@]/;
      return filter.test(sEmail)
    }
    function constraint2(sEmail){
      var at_count = (sEmail.match(/@/g) || []).length;
      return at_count == 0 || at_count > 1
    }
    function constraint3(sEmail){
      var filter1 = /^@((.?)([\w-]+\.)+)([a-zA-Z]{2,4})$/;
      var filter2 = /^([\w-\.]+)@$/;
      return filter1.test(sEmail) || filter2.test(sEmail);
    }
    function constraint4(sEmail){
      return sEmail.toLowerCase().includes("..");
    }
    function constraint5(sEmail){
      var lastPart = sEmail.substr(sEmail.lastIndexOf(".")+1);
      return lastPart.length < 2 || lastPart.length > 4;
    }
    function constraint6(sEmail){
      if (!(sEmail.includes("@") && sEmail.split("@")[1].includes(".")))
        return false
      parts = sEmail.toLowerCase().split("@")[1].split(".")
      return (parts[parts.length-2] != 'uci')
    }


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
