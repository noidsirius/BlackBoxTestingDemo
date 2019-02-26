$(document).ready(function () {
  $("#clear_results_btn").hide();
var counter = 0;

$("#addrow").on("click", function () {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<td><input type="text" class="form-control" name="test_input' + counter + '"/></td>';
    cols += '<td><div class="custom-control custom-switch"><input name="ev'+counter+'" type="checkbox" class="custom-control-input" id="customSwitch'+counter+'" checked><label class="custom-control-label" for="customSwitch'+counter+'">Correct</label></div></td>';
    // cols += '<td><input type="text" class="form-control" name="phone' + counter + '"/></td>';

    cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
    newRow.append(cols);
    $("table.order-list").append(newRow);
    counter++;
});



$("table.order-list").on("click", ".ibtnDel", function (event) {
    $(this).closest("tr").remove();
    counter -= 1
});




});
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var blob = new Blob([data], {type: "text/plain"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());
function validateEmail(sEmail) {
      var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      return sEmail.toLowerCase().includes("uci") && filter.test(sEmail);
}

function runOneTest(row) {
  test_input = row.find('input[name^="test_input"]').val()
  ev = row.find('input[name^="ev"]').is(":checked")
  if(validateEmail(test_input) == ev){
    row.addClass("table-success")
  }
  else{
    row.addClass("table-danger")
  }
}

function clearRows() {
  $("table.order-list").find("tr").removeClass("table-success").removeClass("table-danger");
  $("#clear_results_btn").hide();
}

function generateTCs(){
  data = ""
  $("table.order-list").find('tbody').children().each(function () {
    data += $(this).find('input[name^="test_input"]').val();
    data += ',';
    data += $(this).find('input[name^="ev"]').is(":checked");
    data += '\n';
  });
  saveData(data,"TestCases.txt");
}


function runTests() {
  clearRows();
  $("table.order-list").find('tbody').children().each(function () {
    runOneTest($(this))
  });
  $("#clear_results_btn").show()
  // $("#grandtotal").text(grandTotal.toFixed(2));
}
