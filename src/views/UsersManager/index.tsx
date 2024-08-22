//React
import {
    useContext,
} from 'react';

//Context
import { UserContext } from '../../context/User';

//Onsen UI
import {
    Page,
} from 'react-onsenui';

//Components
import Content from './Content';
import Toolbar from '../../components/Toolbar';
import Unauthorized from '../../components/Unauthorized';

//Components
import Container from '../../components/Container';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';


/**
 * Interfaces
 * 
 */
interface Props {
    navigator: any;
}


/**
 * UsersManager
 * 
 * @returns 
 */
function UsersManager({ navigator }: Props) {
    //Context
    const { userState } = useContext(UserContext);


    //Toolbar gombok
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => navigator.popPage()
        }
    ];


    /**
     * renderedComponent
     * 
     */
    const renderedComponent = userState.userdata ? <Content /> : <Unauthorized />;


    return (
        <Page>
            <Container>
                {/* Toolbar */}
                <Toolbar
                    fixed
                    text="title_page_usersmanager"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                {renderedComponent}
            </Container>
        </Page>
    )
}

export default UsersManager;
