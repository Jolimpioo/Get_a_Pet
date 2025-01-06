import api from "../../../utils/api.js";

import styles from "./AddPet.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* components */
import PetForm from "../../form/PetForm.js";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage.js";

function AddPet() {
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm btnText="Cadastrar Pet" />
    </section>
  );
}

export default AddPet;
