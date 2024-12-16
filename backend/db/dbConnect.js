import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/getapet");
    console.log("Conectou ao MongoDB!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

main();
export default mongoose;
