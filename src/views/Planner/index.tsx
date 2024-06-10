//React
import {
    useState,
    useEffect,
    useContext,
} from 'react';

//Context
import { AppContext } from '../../context/App';
import { UserContext } from '../../context/User';
import { DialogContext } from '../../context/Dialog';

//Hooks
import { useForm } from '../../hooks/useForm';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Expandable from './Expandable';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Toolbar from '../../components/Toolbar';
import Section from '../../components/Section';
import Container from '../../components/Container';
import PhotoPicker from '../../components/PhotoPicker';

//Services
import PlanService from '../../services/PlanService';

//Shared
import {
    actionTypes,
    dialogTypes
} from '../../shared/const';

//Interfaces
import Error from '../../interfaces/Error';
import Location from '../../interfaces/Location';
import ToolbarButton from '../../interfaces/ToolbarButton';
import DialogState from '../../interfaces/DialogState';

//Styles
import styles from './Planner.module.css';
import defaultStyles from '../../components/Form/styles/Default.module.css';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
    category: string;
}


/**
 * Planner
 * 
 * @returns 
 */
function Planner({ navigator, category }: Props) {
    //Context
    const { setAppState } = useContext(AppContext);
    const { setDialogState } = useContext(DialogContext);
    const { userState } = useContext(UserContext);


    //State
    const [locations, setLocations] = useState<Array<Location>>([]);
    const [photos, setPhotos] = useState<any>(undefined);
    const [error, setError] = useState<Error>({ status: true, message: "" });
    const [locationError, setLocationError] = useState<Error>({ status: false, message: "" });


    //Hook
    const [values, handleChange] = useForm({
        name: "",
        description: "",
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
     * Toolbar Buttons
     * 
     */
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
     * onSubmit
     * 
     */
    const onSubmit = async () => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            text: error.status ? error.message : locationError.message,
            onClose: () => null
        }

        if (error.status || locationError.status) {
            setDialogState(dialogState);
            return;
        }

        setAppState(actionTypes.app.SET_BUSY, true);
        createPlan();
    }


    /**
     * createPlan
     * 
     */
    const createPlan = async () => {
        let dialogState: DialogState = {
            type: dialogTypes.ALERT,
            closeable: true,
            onClose: () => null
        }

        const payload = {
            ...values,
            locations,
            photos,
            category: category,
            author: userState.userdata.username
        };

        const response = await PlanService.create(payload);
        dialogState.text = response.message;

        setAppState(actionTypes.app.SET_BUSY, false);
        setDialogState(dialogState);
    }



    return (
        <Page>
            <Container
                responsive
                className={styles.container}>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_planner"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                <form className={defaultStyles.container}>
                    {/* Alapadatok */}
                    <Section
                        title="Alapadatok"
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
                                    onChange={handleChange} />
                            </div>

                            {/* Fotók */}
                            <div className={styles.field}>
                                <Text
                                    className={styles.title}
                                    node="planner_title_photo" />
                                <Text
                                    className={styles.text}
                                    node="planner_text_photo" />
                                <PhotoPicker
                                    className={styles.photoPicker}
                                    limit={10}
                                    onChange={(res: any) => setPhotos(res)} />
                            </div>
                        </div>
                    </Section>

                    {/* Részletek */}
                    <Section
                        title="Részletek">
                        <div className={styles.content}>
                            {/* Helyszínek */}
                            <div className={styles.field}>
                                <Text
                                    className={styles.title}
                                    node="planner_title_details" />
                                <Text
                                    className={styles.text}
                                    node="planner_text_details" />
                                <Expandable
                                    onChange={(values: Array<Location>) => setLocations(values)}
                                    onError={setLocationError} />
                            </div>
                        </div>
                    </Section>

                    {/* Feltöltés */}
                    <div className={styles.field}>
                        <Button
                            className={styles.button}
                            onClick={onSubmit}>
                            <Text node="upload" />
                        </Button>
                    </div>
                </form>
            </Container>
        </Page>
    )
}

export default Planner;
