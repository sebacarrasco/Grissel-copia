import { useState } from "react";
import { rutTools } from 'prettyutils';

export const useForm = (initialState = {}) => {
    

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ( { target } ) => {
        setValues({
            ...values,
            [target.name]: target.name === "rut" ? rutTools.format(target.value) : target.value
        });
    };

    return [ values, handleInputChange, reset];

};


// Ejemplo de uso
// const initialForm: {
//     property1: "hi",
//     property2: 3
// }
// const [ values, handleInputChange, reset] = useForm(initialForm);