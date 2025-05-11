import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.post('/send-message', (req, res) => {
  const { selected } = req.body;

  const flexMessage = {
    "type": "bubble",
    "size": "micro",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "image",
          "url": `https://d2cva83hdk3bwc.cloudfront.net/${selected}`
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": `"${selected}"`,
              "size": "10px",
              "wrap": true,
              "align": "center"
            }
          ]
        }
      ]
    }
  }

  const payload = {
    to: 'U2e9f8492969cc79fc1fc6a834d0048a3',
    messages: [
      {
        type: 'flex',
        altText: 'selected rally movement bag',
        contents: flexMessage,
      },
    ],
  };

  fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer BqfA+9vOsVJL6Qd4s0Or72MnZ8U+E5pK6sXMBFOxX4IxMSGT+Pjy+hk8cz9jCarrUsDVIxokHlsdZVu6cEdlsLp/NP6jF6WOJbY02iHcA1z782zeMsrTBisDglNdghIn/mQINge2Wl5XIqHqJoJAeAdB04t89/1O/w1cDnyilFU=',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        res.status(200).send('Message sent successfully!');
      } else {
        res.status(response.status).send('Error sending message');
      }
    })
    .catch((error) => {
      res.status(500).send('Error sending message');
    });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));