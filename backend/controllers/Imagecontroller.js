import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();
const replicate = new Replicate();
export async function GenerateImage(req, res) {
  try {
    const { prompt } = req.body;
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      {
        input: {
          prompt,
        },
      },
    );

    // To access the file URL:
    console.log(output[0].url());
    const image = output[0].url().href;

    return res.json({ success: true, data: image });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
