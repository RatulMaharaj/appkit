import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "json");
    //Read the json data file data.json
    const fileContents = JSON.parse(
      await fs.readFile(jsonDirectory + `/inv_${id}.json`, "utf8")
    );
    //Return the content of the data file in json format
    res.status(200).json(fileContents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
