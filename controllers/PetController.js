import Pet from "../models/Pet.js";

// helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

class PetController {
  // create a pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const available = true;

    // images upload

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatório!" });
    }

    // get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default PetController;
