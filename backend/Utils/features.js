import mongoose from "mongoose";

export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
export const connectDB = (uri) => {
  mongoose
    .connect(uri, {
      dbName: "company",
    })
    .then((data) => console.log(`Connect to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
};
