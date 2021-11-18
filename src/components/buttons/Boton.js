import React from 'react';
import { Button } from 'react-bootstrap';
import './Boton.css'

export default function Boton({HandleClick, text, clase}) {
  return (
     <Button onClick={HandleClick} className={clase}>
         {text}
     </Button>
  );
}
