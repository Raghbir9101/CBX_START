import nodemailer from 'nodemailer';


function generateOTP(length) {
    let str = "";
    for (let i = 1; i <= length; i++) {
        str += Math.round(Math.random() * 9)
    }
    return str
}


function sendEmails(htmlContent = "", emailArray = [], sub = "") {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'apps@ceoitbox.com',
            pass: 'bdrafmwnojwxijuu'
        }
    });

    emailArray.forEach(email => {
        const mailOptions = {
            from: 'apps@ceoitbox.com',
            to: email,
            subject: sub || 'CBX START',
            html: htmlContent
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(`Error sending email to ${email}: `, error);
            } else {
                console.log(`Email sent to ${email}: ` + info.response);
            }
        });
    });
}

// Example usage:
// const emailList = ['example1@gmail.com', 'example2@gmail.com'];
// const htmlTemplate = '<h1>Your OTP is: 123456</h1>';
// sendEmails(htmlTemplate, emailList);




let userApproveEmail = (userName, userEmail) => {

    return `
        <!DOCTYPE html>
            <html>
            <head>
                <style>
                    /* Reset default margin and padding for email client consistency */
                    body, div, p, h1, a {
                        margin: 0;
                        padding: 0;
                    }
            
                    /* Define your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f3f3f3;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        border: 2px solid #bad900;
                        border-radius: 8px;
                    }
            
                    h1 {
                        color: #bad900;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
            
                    p {
                        color: #333;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
            
                    a {
                        text-decoration: none;
                        color: #007bff;
                    }
            
                    .btn {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #bad900;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                  		margin-bottom:15px;
                  		margin-top:7px;
                        transition: background-color 0.3s;
                    }
            
                   
            
                    .accent-bg {
                 		padding:10px 0;
                 		font-weight:bold;
                  		border-radius:5px;
                    }
            
                    .signature {
                        color: #555;
                        font-style: italic;
                    }
            
                    /* Responsive styles for small screens */
                    @media (max-width: 480px) {
                        .container {
                            padding: 10px;
                        }
            
                        h1 {
                            font-size: 20px;
                        }
            
                        p {
                            font-size: 14px;
                        }
            
                        .btn {
                            padding: 8px 16px;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Your Account is Active!</h1>
                    <p class="accent-bg">Dear ${userName},</p>
                    <p>Your account is now active, and you can successfully start using your instant link through CBXSTART.</p>
                    <p><strong>User Name:</strong> ${userEmail}</p>
                    <p>Regards,</p>
                    <p class="signature">CBXSTART,</p>
                    <p class="signature">Sujit Bhattacharjee</p>
                </div>
            </body>
    </html>`
}

let userCreateEmail = (userName) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                /* Define your CSS styles here */
                body, div, p, h1 {
                    margin: 0;
                    padding: 0;
                }
        
                /* Define your CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f3f3f3;
                }
        
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 2px solid #bad900;
                    border-radius: 8px;
                }
                .accent-bg {
                     padding:7px 0;
                     font-weight:bold;
                      border-radius:5px;
                }
        
                .signature {
                    color: #555;
                    font-style: italic;
                }
        
                h1 {
                    color: #007bff;
                    font-size: 24px;
                    margin-bottom: 20px;
                }
        
                p {
                    color: #333;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
        
              
        
            </style>
        </head>
        <body>
            <div class="container">
                <p class="accent-bg">Dear ${userName},</p>
                <p>You have successfully created an account on our site. Kindly allow us some time to approve your account.</p>
                <p>Thank You for your patience.</p>
                <p>Regards,</p>
                <p class="signature">CEOITBOX</p>
            </div>
        </body>
    </html>
    `
}
let userCreateEmailAdmin = (adminName, userName, userEmail) => {
    return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    /* Define your CSS styles here */
                    body, div, p, h1 {
                        margin: 0;
                        padding: 0;
                    }

                    /* Define your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f3f3f3;
                    }

                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        border: 2px solid #bad900;
                        border-radius: 8px;
                    }

                    .accent-bg {
                        padding:7px 0;
                        font-weight:bold;
                        border-radius:5px;
                    }

                    .signature {
                        color: #555;
                        font-style: italic;
                    }
                    h1 {
                        color: #007bff;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }

                    p {
                        color: #333;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }

                    .user-info {
                        border: 1px solid #ddd;
                        padding: 10px 10px 0px 10px;
                        margin-top: 20px;
                        background-color: #f9f9f9;
                    }
                     .thankYou {
                      margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <p class="accent-bg">Dear ${adminName},</p>
                    <p>A new user has been created and is requesting approval. Please review the user's information and grant the necessary permissions:</p>
                    <div class="user-info">
                        <p><strong>Name:</strong> ${userName}</p>
                        <p><strong>Email:</strong> ${userEmail}</p>
                        <p>
                            Click here
                            <a href="https://start.ceoitbox.com/AdminPanel" target="_blank"> https://start.ceoitbox.com/AdminPanel </a>
                        </p>
                      <p>
                  
                    </p>
                    </div>
                    <p class="thankYou">Thank you for your prompt attention to this request.</p>
                    <p>Regards,</p>
                    <p class="signature">CBXSTART</p>
                </div>
            </body>
            </html>
            `
}


export { sendEmails, userApproveEmail, userCreateEmail, userCreateEmailAdmin }
//  <a href="https://www.CBXSTART.in/users" target="_blank"> https://www.CBXSTART.in/users </a>