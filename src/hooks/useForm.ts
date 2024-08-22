//React
import { useState } from "react";


/**
 * useForm
 * 
 * @param initialValue 
 * @returns 
 */
export const useForm = (initialValue: any) => {
    const [values, setValues] = useState(initialValue);


    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.currentTarget.name]: e.currentTarget.value
        });
    }


    const resetValues = () => {
        setValues(initialValue);
    }


    return [
        values,
        handleChange,
        resetValues
    ];
}