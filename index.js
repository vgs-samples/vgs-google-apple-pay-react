// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const fs = require("fs");
const path = require("path")
const axios = require('axios')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// Import the express module
const express = require("express");

// Instantiate an Express application
const app = express();

app.use(express.static('build'))

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is runing at port " + process.env.PORT ? process.env.PORT : 3000);
  });

// Create an try point route for the Express app listening on port 4000.
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message "Hello from express server."
app.get('/', (req,res)=>{
    res.sendFile("index.html")
})

app.post('/paymentSession', jsonParser,  async (req, res) => {

  const { appleUrl } = req.body

  // use set the certificates for the POST request
  const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      cert: fs.readFileSync(path.join(__dirname, './apple-pay/certificate_sandbox.pem')),
      key: fs.readFileSync(path.join(__dirname, './apple-pay/certificate_sandbox.key')),
  })

  const response = await axios.post(
      appleUrl,
      {
          merchantIdentifier: 'merchant.verygoodsecurity.demo.applepay',
          initiativeContext: 'vgs-google-apple-pay-react.herokuapp.com',
          initiative: "web",
          displayName: "Very Good Security Demo Account"
      },
      {
          httpsAgent,
      }
  )
  res.send(response.data)
})