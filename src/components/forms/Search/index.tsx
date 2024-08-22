//React
import { useEffect, useState } from 'react';

//Hooks
import { useForm } from '../../../hooks/useForm';

//Components
import Form from '../../Form';

//Styles
import styles from './Search.module.css';
import defaultStyles from '../../Form/styles/Default.module.css';


/**
 * Interfaces 
 * 
 */
interface Props {
    onResolve: any;
    onReject: any;
}


/**
 * Search
 * 
 * @param {*} onResolve 
 * @param {*} onReject 
 * @returns 
 */
function Search(props: Props) {
    //States
    const [error, setError] = useState<any>(null);

    //Hook
    const [values, handleChange] = useForm({
        search: ""
    });


    //Hibaellenörzés
    useEffect(() => {
        if (values.search.length === 0) {
            return setError({
                status: true,
                message: "Adj meg egy kifejezést, ami alapján keresni szeretnél."
            });
        }
        else {
            return setError({
                status: false,
                message: ""
            });
        }
    }, [values]);


    //Mezők
    const fields = [
        {
            name: "search",
            type: "text",
            placeholder: "Keresés...",
            value: values.search,
            onChange: handleChange
        },
        {
            placeholder: "Keresés",
            type: "button",
            onClick: () => error.status ? props.onReject(error.message) : props.onResolve(values.search)
        }
    ];


    return (
        <div className={styles.container}>
            <Form
                className={defaultStyles.container}
                fields={fields} />
        </div>
    )
}

export default Search;
