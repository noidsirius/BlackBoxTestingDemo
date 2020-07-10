$(document).ready(function () {
  $('#clear_results_btn').hide()
  var counter = 0
  function addRow () {
    var newRow = createNewRow(counter)
    $('table.order-list').append(newRow)
    counter++
  }
  addRow(counter)
  $('#addrow').on('click', function () {
    addRow(counter)
  })

  $('table').addClass('table')
  $('table.order-list').on('click', '.ibtnDel', function (event) {
    $(this).closest('tr').remove()
  })
})
function createNewRow (id) {
  var newRow = $('<tr>')
  var cols = ''
  cols += '<td class="test-input">' + createInputForm(id) + '</td>'
  cols += '<td class="test-output">' + createOutputForm(id) + '</td>'
  cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>'
  newRow.append(cols)
  return newRow
}
var saveData = (function () {
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.style = 'display: none'
  return function (data, fileName) {
    var blob = new Blob([data], {type: 'text/plain'}),
      url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
}())

function clearRows () {
  $('table.order-list').find('tr').removeClass('table-success').removeClass('table-danger')
  $('#clear_results_btn').hide()
}

function runTests () {
  clearRows()
  $('table.order-list').find('tbody').children().each(function () {
    var inputValues = readInputValues($(this).find('.test-input'))
    var outputValues = readOutputValues($(this).find('.test-output'))
    if (doesTestPass(inputValues, outputValues)) {
      $(this).addClass('table-success')
    } else {
      $(this).addClass('table-danger')
    }
  })
  $('#clear_results_btn').show()
  // $("#grandtotal").text(grandTotal.toFixed(2));
}

function generateTCs () {
  data = ''
  $('table.order-list').find('tbody').children().each(function () {
    inputValues = readInputValues($(this).find('.test-input'))
    outputValues = readOutputValues($(this).find('.test-output'))
    data += inputValues
    data += ','
    data += outputValues
    data += '\n'
  })
  saveData(data, 'TestCases.txt')
}
