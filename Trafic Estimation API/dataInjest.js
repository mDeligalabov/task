import fs from "fs";
import path from "path";
import csv from "csv-parser";

const columnNameMapping = {
  countries: "contries",
  browsername: "browsername",
  platformname: "platformname",
  vertical: "vertical",
};

const data = {
  countries: [],
  browsername: [],
  platformname: [],
  vertical: [],
};

const dataMaps = {
  countries: new Map(),
  browsername: new Map(),
  platformname: new Map(),
  vertical: new Map(),
};

const loadCSV = (fileName, dimension) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join("data", fileName))
      .pipe(csv())
      .on("data", (row) => {
        const key = row[dimension];
        const opps = parseFloat(row["opps"]);
        data[dimension].push({ key, opps });
      })
      .on("end", () => resolve())
      .on("error", (error) => reject(error));
  });
};

export const loadAndTransformAllData = async () => {
  await loadCSV("countries.csv", "countries");
  await loadCSV("browsername.csv", "browsername");
  await loadCSV("platformname.csv", "platformname");
  await loadCSV("vertical.csv", "vertical");

  // Calculate totals for each dimension and populate the data into Maps for faster data extraction
  for (const key in data) {
    const totalCount = data[key].reduce((acc, { opps }) => opps + acc, 0);
    const column = columnNameMapping[key];

    for (const dimensionData of data[key]) {
      const oppsPercent = dimensionData.opps / totalCount;
      dataMaps[key].set(dimensionData.key, oppsPercent);
    }
  }

  console.log("Data loaded successfully");

  return dataMaps;
};
