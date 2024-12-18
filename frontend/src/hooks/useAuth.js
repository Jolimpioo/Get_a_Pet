import api from "../utils/api.js";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useAtugh() {
  async function register(user) {
    try {
      const data = await api.post("/user/register", user).then((response) => {
        return response.data;
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return { register };
}
