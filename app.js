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
    let name = (Math.random() * 18324873854367).toString();
    var document = {
        html: requestHtml,
        path: `./pdfs/${name}.pdf`,
        type: "",
      };
    
    pdf
      .create(document, options)
      .then((res) => {
        // res.sendFile('./pdfs/data.pdf' , { root : __dirname});
        let link = `${req.url}/pdfs/${name}.pdf`
        res.download(link);
      })
      .catch((error) => {
        console.error(error);
      });
})

app.listen(process.env.PORT || 3000)