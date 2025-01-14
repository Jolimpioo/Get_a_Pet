import Pet from "../models/Pet.js";
import mongoose from "mongoose";

// helpers
import getToken from "../helpers/get-token.js";
import getUserByToken from "../helpers/get-user-by-token.js";

const ObjectId = mongoose.Types.ObjectId;

class PetController {
  // create a pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;
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
      res.status(422).json({ message: "A cor é obrigatória!" });
    }

    if (images.length == 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
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

    images.map((image) => {
      pet.images.push(image.filename);
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

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getAllUserPets(req, res) {
    // get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getAllUserAdoptions(req, res) {
    // get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
    }

    res.status(200).json({
      pet: pet,
    });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido!" });
      return;
    }

    // check if pet exists
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if logger user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    // validate ownership
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }
    await Pet.findByIdAndDelete(id);
    res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;

    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    const updatedData = {};

    // check if pet exists
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if logger user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    // validate ownership
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    } else {
      updatedData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória!" });
      return;
    } else {
      updatedData.age = age;
    }

    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório!" });
      return;
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória!" });
      return;
    } else {
      updatedData.color = color;
    }

    if (images.length == 0) {
      res.status(422).json({ message: "A imagem é obrigatória!" });
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    /*if ((!images || images.length === 0) && !pet.images.length === 0) {
      res.status(422).json({ message: "A imagem é obriogatória!" });
      return;
    } else if (images && images.length > 0) {
      updatedData.images = images.map((image) => image.filename);
    } else {
      updatedData.images = pet.images;
    }*/

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    // check if exists
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita com o seu próprio Pet!",
      });
    }

    //check if user gas already scheduled a visit
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para este Pet!",
        });
        return;
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);
    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}.`,
    });
  }
  static async concludeAdoption(req, res) {
    const id = req.params.id;

    // check if exists
    const pet = await Pet.findById(id);

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado!" });
      return;
    }

    // check if logger user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    // validate ownership
    if (pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({
        message:
          "Houve um problema em processar a sua solicitação, tente novamente mais tarde!",
      });
      return;
    }
    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: "Parabéns! O ciclo de adoção foi finalizado com sucesso!",
    });
  }
}

export default PetController;
