const moongose = require("mongoose");

async function connectDB() {
  try {
    await moongose
      .connect(process.env.MONGO_URI)
      //   {  
      //     useNewUrlParser: true,
      //     useUnifaiedTopology: true,
      //   }
      .then(() => console.log("Connected to DB"))
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
