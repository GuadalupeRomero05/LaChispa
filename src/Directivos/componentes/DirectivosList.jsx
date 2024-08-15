import React, { useState } from "react";

const DirectivosList = ({ directivos, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editDirectivos, setEditDirectivos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cargo:""
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditDirectivos({ ...editDirectivos, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editDirectivos);
    setEditIndex(null);
  };

  return (
    <ul>
      {directivos.map((directivos, index) => (
        <li key={index}>
          {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="nombre"
                value={editDirectivos.nombre}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="apellido"
                value={editDirectivos.apellido}
                onChange={handleEditChange}
                required
              />
              <input
                type="email"
                name="email"
                value={editDirectivos.email}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="telefono"
                value={editDirectivos.telefono}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="cargo"
                value={editDirectivos.cargo}
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
              {directivos.nombre} {directivos.apellido} - {directivos.email} -{" "}
              {directivos.telefono} - {directivos.cargo}
              <button
                onClick={() => {
                  setEditIndex(index);
                  setEditDirectivos(directivos);
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

export default DirectivosList;