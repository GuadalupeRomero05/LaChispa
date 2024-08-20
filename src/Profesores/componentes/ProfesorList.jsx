import React, { useState } from "react";

const ProfesorList = ({ profesor, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editProfesor, setEditProfesor] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    matreria:""
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfesor({ ...editProfesor, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editProfesor);
    setEditIndex(null);
  };

  return (
    <ul>
      {profesor.map((profesor, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editProfesor.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="apellido"
                value={editProfesor.apellido}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editProfesor.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editProfesor.telefono}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="materia"
                value={editProfesor.materia}
                onChange={handleEditChange}
                required
              />
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setEditIndex(null)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              {profesor.nombre} {profesor.apellido} - {profesor.email} -{" "}
              {profesor.telefono} - {profesor.materia}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditProfesor(directivos);
                }}
              >
                Editar
              </button>
              <button onClick={() => onDelete(index)}>Eliminar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProfesorList;