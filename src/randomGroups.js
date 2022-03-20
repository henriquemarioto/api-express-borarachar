import axios from "axios";
import Streaming from "./models/streaming.js";

const apiEndpoint = "https://api-express-dividecomigo.herokuapp.com";
let users = [
  { email: "email@email.com", password: "123456" },
  { email: "prof@gayle.com", password: "123456" },
  { email: "salma@felicita.com", password: "123456" },
  { email: "adelia@vincent.com", password: "123456" },
  { email: "leatha@lindsay.com", password: "123456" },
  { email: "nora@tremblay.com", password: "123456" },
  { email: "augustus@deon.com", password: "123456" },
  { email: "dr@pacocha.com", password: "123456" },
  { email: "miss@morissette.com", password: "123456" },
  { email: "laury@gwendolyn.com", password: "123456" },
  { email: "ms@homenick.com", password: "123456" },
  { email: "zetta@schmitt.com", password: "123456" },
  { email: "quinten@hermann.com", password: "123456" },
  { email: "devan@bayer.com", password: "123456" },
  { email: "mrs@williamson.com", password: "123456" },
  { email: "reyes@rowe.com", password: "123456" },
  { email: "evert@coby.com", password: "123456" },
  { email: "lazaro@justen.com", password: "123456" },
  { email: "cole@magali.com", password: "123456" },
  { email: "ms@hickle.com", password: "123456" },
];

const streamingsIds = [
  "6234808bd697f0557103abff",
  "6234d9702c602cca71b86d10",
  "6234da472c602cca71b86d13",
  "6234da8e2c602cca71b86d16",
  "6234daaa2c602cca71b86d19",
  "6234dac22c602cca71b86d1c",
  "6234dae92c602cca71b86d1f",
  "6234db7e2c602cca71b86d22",
  "6234db9d2c602cca71b86d25",
  "6234dbb72c602cca71b86d28",
  "6234dbd32c602cca71b86d2b",
  "6234dc232c602cca71b86d2e",
  "6234dc482c602cca71b86d31",
  "6234dc622c602cca71b86d34",
  "6234dc7e2c602cca71b86d37",
  "6234dc9d2c602cca71b86d3a",
  "6234dcbe2c602cca71b86d3f",
  "6234dcdd2c602cca71b86d42",
];

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBoolean() {
  return Math.floor(Math.random() * (1 - 0 + 1)) + 0;
}

async function CreateRandomGroup() {
  try {
    const user = (
      await axios.post(
        `${apiEndpoint}/login`,
        users[randomNumber(0, users.length - 1)]
      )
    ).data;

    console.log(`Este é o user: ${user.id}`);

    const groupName = (await axios.get("https://api.namefake.com/")).data.name;
    const name1 = groupName.split(" ")[0].toLowerCase();
    const name2 = groupName.split(" ")[1].toLowerCase();

    const streaming = await Streaming.findById(
      streamingsIds[randomNumber(0, streamingsIds.length - 1)]
    );
    const members_limit = streaming.profiles;
    console.log(
      streaming.plans[
        randomNumber(
          0,
          streaming.plans.length !== 0
            ? streaming.plans.length - 1
            : streaming.plans.length
        )
      ]
    );

    const group = (
      await axios.post(
        `${apiEndpoint}/groups`,
        {
          name: `${streaming.name} ${name1} ${name2}`,
          members_limit,
          pix_key: "asldd4654d8a7s56asda654",
          pay_day: randomNumber(1, 28),
          account_email: `${name1.replace(".", "")}@${name2.replace(
            ".",
            ""
          )}.com`,
          account_password: "123456",
          searching_for_members: true,
          streaming: {
            streamingId: streaming.id,
            plan: streaming.plans[randomNumber(0, streaming.plans.length - 1)]
              .name,
          },
        },
        { headers: { authorization: `Bearer ${user.token}` } }
      )
    ).data;

    console.log(`Este é o grupo: ${group}`);

    console.log("Created!");
  } catch (error) {
    console.log(error);
  }

  return;
}

for (let i = 0; i < 20; i++) {
  CreateRandomGroup();
}
