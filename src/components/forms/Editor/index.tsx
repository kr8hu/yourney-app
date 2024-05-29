//React
import {
    useState,
    useEffect,
} from 'react';

//Hooks
import { useForm } from '../../../hooks/useForm';

//Components
import Text from '../../Text';
import Button from '../../Button';
import Section from '../../Section';

//Interfaces
import Post from '../../../interfaces/Post';
import Error from '../../../interfaces/Error';

//Styles
import styles from './Editor.module.css';
import defaultStyles from '../../../components/Form/styles/Default.module.css';


/**
 * Props
 * 
 */
interface Props {
    initialValues: Post;
    onResolve: any;
    onReject: any;
}


/**
 * Editor Form
 * 
 * Bejegyzés szerkesztése űrlap
 * 
 * @param param0 
 * @returns 
 */
function Editor({ initialValues, onResolve, onReject }: Props) {
    //States
    const [error, setError] = useState<Error>({ status: true, message: "" });


    //Hook
    const [values, handleChange] = useForm({
        name: initialValues.name,
        description: initialValues.description,
    });


    //Effects
    useEffect(() => {
        if (values.name.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg a programterv nevét."
            });
        }
        if (values.description.length === 0) {
            return setError({
                status: true,
                message: "Nem adtad meg a programterv leírását."
            });
        }
        else {
            return setError({
                status: false,
                message: ""
            });
        }
    }, [values]);


    /**
     * submitForm
     * 
     */
    const submitForm = () => {
        if (error.status) {
            onReject(error.message);
            return;
        }

        onResolve(values);
    }


    return (
        <form className={defaultStyles.container}>
            {/* Alapadatok */}
            <Section
                title="Programterv"
                className={styles.container}>
                <div className={styles.content}>
                    {/* Megnevezés */}
                    <div className={styles.field}>
                        <Text
                            className={styles.title}
                            node="planner_title_name" />
                        <Text
                            className={styles.text}
                            node="planner_text_name" />
                        <input
                            className={styles.input}
                            name="name"
                            type="text"
                            maxLength={64}
                            placeholder="Programterv neve"
                            defaultValue={initialValues.name}
                            onChange={handleChange} />
                    </div>

                    {/* Leírás */}
                    <div className={styles.field}>
                        <Text
                            className={styles.title}
                            node="planner_title_description" />
                        <Text
                            className={styles.text}
                            node="planner_text_description" />
                        <textarea
                            className={styles.input}
                            name="description"
                            maxLength={500}
                            rows={5}
                            placeholder="Programterv leírása"
                            defaultValue={initialValues.description}
                            onChange={handleChange} />
                    </div>
                </div>
            </Section>

            {/* Feltöltés */}
            <div className={styles.field}>
                <Button
                    className={styles.button}
                    onClick={submitForm}>
                    <Text node="upload" />
                </Button>
            </div>
        </form>
    )
}

export default Editor;
