const express = require("express");

const app = express();

var pdf = require("pdf-creator-node");

const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/',async (req, res) => {

    let requestHtml = req.body.html;

    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        // header: {
        //     height: "45mm",
        //     contents: ''
        // },
        // footer: {
        //     height: "28mm",
        //     contents: {
        //         first: 'Cover page',
        //         2: 'Second page',
        //         default: '',
        //         last: 'Last Page'
        //     }
        // }
    };
    
    var document = {
        html: requestHtml,
        path: "./data.pdf",
        type: "",
      };
    
    pdf
      .create(document, options)
      .then((res) => {
        res.sendFile('./data.pdf' , { root : __dirname});
      })
      .catch((error) => {
        console.error(error);
      });

      

})

app.listen(process.env.PORT || 3000)