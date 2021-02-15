const nodemailer = require("nodemailer");
const express = require("express");
const ejs = require("ejs");
const app = express();

app.get("/sendMail", async (req, res) => {
    //transporter
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f9b231efaa5f38",
          pass: "2bf76715720af1"
        }
      });
      // Quem vai receber
      let message = await transport.sendMail({
          from: "<pessoateste@email.com>",
          to: "teste@email.com",
          subject: "teste com Nodemailer",
          text: "Simplismente sou foda!!",
          html: "<p style=color: green> Diogo é muito foda </p>"

      });
    
    
    res.send("Enviou");

});

app.get("/html", async (req, res) =>{
    
    const email = "/email.ejs";
    ejs.renderFile(__dirname + email, function (err, data) {
        if(err) console.log(err); else{
            var transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "f9b231efaa5f38",
                  pass: "2bf76715720af1"
                }
              });
        }

        let mailOptions = {
            from: "<pessoateste@email.com>",
            to: "teste@email.com",
            subject: "teste com Nodemailer",
            text: "Simplismente sou foda!!",
            html: data
        }
            transport.sendMail(mailOptions, function (err, info) {
                if(err) console.log(err); else{ console.log("Menssagem enviada"); }
            });
   
    });
    
    
    res.send("html enviado");
});



app.listen(3000,()=> {
    console.log("Rodando na porta 3000...");
});
