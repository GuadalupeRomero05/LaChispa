import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const usePreceptores = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [curso, setCurso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoDirectivo = {
      nombre,
      apellido,
      email,
      telefono,
      curso,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firebase.firestore().collection("preceptores").delete(nuevoPreceptor);
      alert("Preceptor registrado exitosamente");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setCurso("");
    } catch (error) {
      console.error("Error al registrar al preceptor: ", error);
    }
    }
  };