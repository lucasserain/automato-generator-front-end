import api from "./apiConfig"

export default (async function chamaApi(values) {
    api.post('/automatos', values)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      var FileSaver = require('file-saver');
      var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, "hello world.cpp");
  });