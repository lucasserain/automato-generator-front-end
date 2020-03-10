import api from "./apiConfig"

export default (async function chamaApi(values) {
    api.post('/automatos', values)
      .then(function (response) {

        var FileSaver = require('file-saver');
        var blob = new Blob([response.data], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "hello world.cpp");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });


  });