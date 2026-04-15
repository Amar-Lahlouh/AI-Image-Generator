import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};
