import React, { useState } from "react";

const DirectivosAdd = ({ onAdd }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoDirectivos = { nombre, apellido, email, telefono,cargo };
    onAdd(nuevoDirectivos);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setCargo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cargo:</label>
        <input
          type="text"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar Preceptor</button>
    </form>
  );
};

export default DirectivosAdd;