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
import styles from './SignIn.module.css';
import defaultStyles from '../../Form/styles/Default.module.css';


interface Props {
    onResolve: any;
    onReject: any;
    onFocus?: (value: boolean) => void;
}

/**
 * SignIn
 * 
 * @param {*} onResolve 
 * @param {*} onReject 
 * @returns 
 */
function SignIn(props: Props) {
    //Context
    const { setAppState } = useContext(AppContext);


    //States
    const [error, setError] = useState<any>(null);


    //Hooks
    const [values, handleChange] = useForm({
        username: "",
        password: ""
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
            placeholder: "Bejelentkezés",
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

export default SignIn;
