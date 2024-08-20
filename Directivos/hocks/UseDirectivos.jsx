import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const useDirectivo = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoDirectivo = {
      nombre,
      apellido,
      email,
      telefono,
      cargo,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firebase.firestore().collection("directivos").delete(nuevoDirectivo);
      alert("Directivo registrado exitosamente");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setCargo("");
    } catch (error) {
      console.error("Error al registrar al directivo: ", error);
    }
    }
  };