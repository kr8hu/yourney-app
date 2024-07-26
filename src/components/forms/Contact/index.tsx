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
import styles from './Contact.module.css';
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
 * Contact
 * 
 * @param {*} onResolve 
 * @param {*} onReject 
 * @returns 
 */
function Contact(props: Props) {
    //States
    const [error, setError] = useState<any>(null);


    //Hook
    const [values, handleChange] = useForm({
        message: ""
    });


    //Hibaellenörzés
    useEffect(() => {
        if (values.message.length === 0) {
            return setError({
                status: true,
                message: "Nem töltötted ki az üzenet mezőt."
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
            name: "message",
            type: "textarea",
            placeholder: "Üzenet",
            value: values.message,
            onChange: handleChange
        },
        {
            placeholder: "Küldés",
            type: "button",
            onClick: () => error.status ? props.onReject(error.message) : props.onResolve(values.message)
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

export default Contact;
