function createInputForm (id) {
  name = 'test_input' + id;
  return `<div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon3">Email: </span>
              </div>
              <input type="text" class="form-control" name="${name}"/>
            </div>
          </div>`;
}

function createOutputForm (id) {
  name = 'ev' + id;
  return `<div class="form-group">
            <select class="form-control" name="${name}">
              <option>Valid</option>
              <option>Invalid</option>
            </select>
          </div>`
}

function readInputValues(inputHTML){
  return inputHTML.find('input[name^="test_input"]').val()
}

function readOutputValues(outputHTML){
  return outputHTML.find('select[name^="ev"] option:selected').text();
}

function doesTestPass (inputValues, outputValues) {
  return (validateEmail(inputValues) == (outputValues == "Valid" ? true : false))
}

function validateEmail (sEmail) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  return sEmail.toLowerCase().includes('uci') && filter.test(sEmail)
}
