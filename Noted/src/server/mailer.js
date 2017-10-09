var fs = require("fs");
var HOST=require("./defaults.js").HOST;
console.log(HOST)

let CLIENT_ID='592602977299-785mk5vh7v90m06qmvmr8dd2pogmukkk.apps.googleusercontent.com';
let CLIENT_SECRET='9TR8mLarqrFkkitCezsjveuE';
exports.mail = function(req, res) {
  console.log(req.body);
  let mail = req.body;
  const nodemailer = require('nodemailer');

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: 'notedproper@gmail.com',
          clientId: CLIENT_ID,
          clientSecret:  CLIENT_SECRET,
          refreshToken: '1/cTvZTIdDY-D9oe8AMaQ4lBHc-29F1ABAg2yzR2ZnJAUC9iEwDzjJtgedCBtXLtld',
          // accessToken: 'ya29.GlvCBAg8uH4-vN786Vrw6ds5dXeOzVo-me2YwjlKUMSjjDlVv6zNddpKGL60xce6XYEjEbZ-D4pXoMBk9FyF7V--tlZp35sSWJrn2Kf8xRZoXb2dDAi-LVX87fsC',
          
          expires: 3600
      }
  });

  // setup email data with unicode symbols
  let href=HOST+"/verifiedaccount?="+mail.email;
  let mailOptions = {
      from: 'Noted Official<notedproper@gmail.com>', // sender address
      to: mail.email,
      //to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
      subject: 'Noted Account Email Verification ✔', // Subject line
      text: 'Testing with oauth2 access tokens ?', // plain text body
      /*html: `<div>You have created a NOTED Account<br/>
              Click on the link below to verify your account<br/><br/>
              <a href='${href}'>Verify ME!!</a><br/><br/>
            </div>` // html body*/
      html: `<table>
               <tbody>
                  <tr height="32px"></tr>
                  <tr align="center">
                      <td width="32px"></td>
                      <td>
                        <table style="max-width:600px;min-width:400px">
                         <tbody>
                            <tr>
                                <td>
                                  <img src='${HOST}/logoblackclear' align='left' height='auto' width='100px'/>
                                </td>
                            </tr>
                            <tr style="background-color:#b32828;color:white;text-align:center">
                                <td><h2>Noted Account Email Verification ✔</h2></td>
                            </tr>
                            <tr>
                                <td style="border-left: 1px solid #dcdcdc;border-right: 1px solid #dcdcdc;padding:10px">
                                    <div><br/>
                                    Hi <span style='text-align: center;color: #b32828;font-weight: bold'>${mail.name}</span>,<br/><br/>


                                    You have created a NOTED Account<br/>
                                      Click on the link below to verify your account then sign in<br/><br/>
                                      <h2><a href='${href}' style="color: #b32828;font-weight: bold">VERIFY ME!!</a></h2><br/><br/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                              <td>
                                <div style="font-size:9px;color:#999999">
                                  © 2017 NOTED, 
                                </div>
                              </td>
                            </tr>
                         </tbody>
                        </table>
                      </td>
                      <td width="32px"></td>
                  </tr>
                  <tr height="32px"></tr>
               </tbody>
            </table>` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        let data="\n===============SENDMAIL ERROR START===============\n";
           data+=error;
           data+="\n===============SENDMAIL ERROR END===============\n";
        log(data);
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });

  res.send('Email Sent to recepient');
};

function log(data){

  let log="log.txt";
  fs.appendFile(log, data, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("log append!");
  }); 
}
