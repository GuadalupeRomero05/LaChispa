import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const useAlumno = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoAlumno = {
      nombre,
      apellido,
      email,
      telefono,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
      await firebase.firestore().collection("alumnos").delete(nuevoAlumno);
      alert("Alumno registrado exitosamente");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
    } catch (error) {
      console.error("Error al registrar al alumno: ", error);
    }
    }
  };