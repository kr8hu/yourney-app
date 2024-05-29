//React
import { 
    useEffect, 
    useState 
} from 'react';

//Hooks
import { useForm } from '../../../hooks/useForm';

//Components
import Form from '../../Form';

//Styles
import styles from './Password.module.css';
import defaultStyles from '../../Form/styles/Default.module.css';


/**
 * Props
 * 
 */
interface Props {
    onResolve: any;
    onReject: any;
}


/**
 * Password
 * 
 * @param {*} onResolve 
 * @param {*} onReject 
 * @returns 
 */
function Password(props: Props) {
    //States
    const [error, setError] = useState<any>(null);


    //Hook
    const [values, handleChange] = useForm({
        current: "",
        new: "",
        repeated: ""
    });


    //Hibaellenörzés
    useEffect(() => {
        if (values.current.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg a jelenlegi jelszavad."
            });
        }
        if (values.new.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg az új jelszavad."
            });
        }
        if (values.new !== values.repeated) {
            return setError({
                status: true,
                message: "A megadott jelszavak nem egyeznek."
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
            name: "current",
            type: "password",
            placeholder: "Jelenlegi jelszó",
            value: values.current,
            onChange: handleChange
        },
        {
            name: "new",
            type: "password",
            placeholder: "Új jelszó",
            value: values.new,
            onChange: handleChange
        },
        {
            name: "repeated",
            type: "password",
            placeholder: "Új jelszó ismét",
            value: values.repeated,
            onChange: handleChange
        },
        {
            placeholder: "Módosítás",
            type: "button",
            onClick: () => error.status ? props.onReject(error.message) : props.onResolve(values)
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

export default Password;
