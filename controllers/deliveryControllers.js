const Delivery = require("../models/delivery");
// const OpenAI = require("openai");
const { link } = require("../routes/deliveryRoutes");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

exports.getAll = async (req, res) => {
    try {
      const allDelivery = await Delivery.find({});
      res.status(200).json(allDelivery);
    } catch (err) {
      res.status(500).json(err.message);
    }
  };


exports.create = async (req, res) => {
  try {
    const newDelivery = await Delivery.create(req.body);
    const linkToPay = "https://www.bitpay.co.il/app/share-info?i=170560323445_19eHEbit"
    client.messages
      .create({
        body: ` בקשה לאיסוף חבילה מספר ${req.body.packageNumber}  לכתובת ${req.body.address} התקבלה! \n לתשלום: ${linkToPay} \n לאחר התשלום המשלוח יצא לדרך!  `,
        from: "+13612044166",
        to: req.body.phoneNumber,
      })
      .then((message) => console.log(message))
      .catch(err => console.log(err));
      
    res.status(200).json(newDelivery);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// function getFirstParagraph(message) {
//   const paragraphs = message.split(/\n\s*\n/);

//   if (paragraphs.length > 0) {
//     return paragraphs[0].trim();
//   } else {
//     return "";
//   }
// }

// exports.chatReq = async (req, res) => {
//   let message = getFirstParagraph(req.body.message);
//   message =
//     message +
//     `// from this message  return json file with {fullName, packageNumber(4 digit and hebrew! letter!), location} return only! the json`;
//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//       temperature: 0,
//       max_tokens: 1000,
//     });
//     res.status(200).json(response);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };
