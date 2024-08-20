import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const useProfesores = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [materia, setMateria] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProfesor = {
      nombre,
      apellido,
      email,
      telefono,
      materia,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firebase.firestore().collection("profesores").delete(nuevoProfesor);
      alert("Profesor registrado exitosamente");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setMateria("");
    } catch (error) {
      console.error("Error al registrar al profesor: ", error);
    }
    }
  };