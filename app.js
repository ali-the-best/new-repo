const express = require("express");

const app = express();

var pdf = require("pdf-creator-node");

const fs = require('fs');

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use(express.static('pdfs'));

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile('index.html')
})
fs.readdir('./pdfs',(err, files) => {
  if(err){
    console.log(err)
  }
  for (let file of files) {
    app.get(`/${file}`, (req, res) => {
      res.download(file);
    })
  }
})

app.post('/', (req, res) => {

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
      .catch(err => console.log(err))
      .then(() => {
        let link = `${name}.pdf`;
        console.log(link)
        res.send(link)
        setTimeout( () => {
          fs.unlink('./pdfs/' + link, function (err) {            
            if (err) {                                                 
                console.error(err);                                    
            }                                                                                
        });    
        },3 * 60 * 1000);
      })
})
// process.env.PORT || 
app.listen(3000)