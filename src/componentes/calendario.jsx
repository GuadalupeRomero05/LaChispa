import React, { useState } from 'react';
import Calendar from 'react-calendar';

const calendario = () => {
  const [value, onChange] = useState(new Date());

  return   
 (
    <Calendar onChange={onChange} value={value} />
  );
};

export default calendario;
