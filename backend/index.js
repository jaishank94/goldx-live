const fs = require("fs");
const { parse } = require("csv-parse");

/* import moralis */
const Moralis = require("moralis-v1/node");

/* Moralis init code */
const serverUrl = "https://u5f2rxnhcxxu.usemoralis.com:2053/server";
const appId = "JwInEj4IWDcFpgwQk5Qutm4KBFt1Wv5JCqsNMktJ";
// const masterKey = "";

const SaveData = async (data) => {
  await Moralis.start({ serverUrl, appId });

  if (data.length > 0) {
    for (let dt of data) {
      const Dapps = Moralis.Object.extend("Dapps");
      const newObject = new Dapps();
      newObject.set("name", dt[0].trim().toUpperCase());
      newObject.set("website_url", dt[1].trim());
      newObject.set("logo", dt[2].trim());
      newObject.set("tag", dt[3].split(","));
      newObject.set("short_description", dt[4].trim());
      newObject.set("full_description", dt[4].trim());
      newObject.set("type", dt[5].split(","));
      newObject.set("handle", dt[0].trim().replace(/[^A-Z0-9]+/gi, "_"));
      newObject.set("status", "Work in Progress");
      newObject.set("priority", parseInt(dt[7]));
      newObject.set("status", "IN-ACTIVE");
      let response = await newObject.save();

      console.log("hewe1");
    }
  }
  console.log("hewe", data);
};

let storeData = [];
fs.createReadStream("./data.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", async function (row) {
    // console.log(row);
    // await SaveData(row);
    storeData.push(row);
  })
  .on("end", function () {
    console.log("finished", storeData.length);
  })
  .on("error", function (error) {
    console.log(error.message);
  });

SaveData(storeData);
