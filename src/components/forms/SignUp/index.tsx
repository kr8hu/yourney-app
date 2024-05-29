//React
import {
    useContext,
    useEffect,
    useState
} from 'react';

//Context
import { AppContext } from '../../../context/App';

//Hooks
import { useForm } from '../../../hooks/useForm';

//Components
import Form from '../../Form';

//Shared
import { actionTypes } from '../../../shared/const';

//Styles
import styles from './SignUp.module.css';
import defaultStyles from '../../Form/styles/Default.module.css';


interface Props {
    onResolve: any;
    onReject: any;
    onFocus?: (value: boolean) => void;
}

/**
 * SignUp
 * 
 * @param {*} onResolve 
 * @param {*} onReject 
 * @returns 
 */
function SignUp(props: Props) {
    //Context
    const { setAppState } = useContext(AppContext);


    //States
    const [error, setError] = useState<any>(null);


    //Hooks
    const [values, handleChange] = useForm({
        username: "",
        password: "",
        repeatedPassword: "",
        email: ""
    });


    //Hibaellenörzés
    useEffect(() => {
        if (values.username.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg a felhasználónevet."
            });
        }
        if (values.password.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg a jelszót."
            });
        }
        if (values.repeatedPassword.length === 0) {
            return setError({
                status: true,
                message: "Nem ismételted meg a jelszót."
            });
        }
        if (values.repeatedPassword !== values.password) {
            return setError({
                status: true,
                message: "A megadott jelszavak nem egyeznek."
            });
        }
        if (values.email.length === 0) {
            return setError({
                status: true,
                message: "Nem adtál meg e-mail címet."
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
            name: "username",
            type: "text",
            placeholder: "Felhasználónév",
            value: values.username,
            onChange: handleChange
        },
        {
            name: "password",
            type: "password",
            placeholder: "Jelszó",
            value: values.password,
            onChange: handleChange
        },
        {
            name: "repeatedPassword",
            type: "password",
            placeholder: "Jelszó ismét",
            value: values.repeatedPassword,
            onChange: handleChange
        },
        {
            name: "email",
            type: "text",
            placeholder: "E-mail cím",
            value: values.email,
            onChange: handleChange
        },
        {
            placeholder: "Regisztráció",
            type: "button",
            onClick: () => handleSubmit()
        }
    ];


    /**
     * handleSubmit
     * 
     */
    const handleSubmit = () => {
        setAppState(actionTypes.app.SET_BUSY, true);

        if (error.status) {
            props.onReject(error.message);
        } else {
            props.onResolve(values);
        }
    }


    return (
        <div className={styles.container}>
            <Form
                className={defaultStyles.container}
                fields={fields}
                onFocus={props.onFocus} />
        </div>
    )
}

export default SignUp;
