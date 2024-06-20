//React
import { useContext } from 'react';

//Context
import { UserContext } from '../../context/User';

//Onsen UI
import { Page } from 'react-onsenui';

//Components
import Content from './Content';
import Toolbar from '../../components/Toolbar';
import Container from '../../components/Container';
import Unauthorized from '../../components/Unauthorized';

//Interfaces
import ToolbarButton from '../../interfaces/ToolbarButton';


/**
 * Props
 * 
 */
interface Props {
    navigator: any;
}


/**
 * Editor
 * 
 * @returns 
 */
function Prepare(props: Props) {
    //Context
    const { userState } = useContext(UserContext);


    //Toolbar gombok
    const toolbarButtons: Array<ToolbarButton> = [
        {
            icon: "fa-times",
            onClick: () => props.navigator.popPage()
        }
    ];


    /**
     * renderedComponent
     */
    const renderedComponent = userState.userdata ? <Content /> : <Unauthorized />;


    return (
        <Page>
            <Container stretch>
                {/* Toolbar */}
                <Toolbar
                    fixed={true}
                    text="title_page_prepare"
                    buttons={toolbarButtons} />

                {/* Tartalom */}
                {renderedComponent}
            </Container>
        </Page>
    )
}

export default Prepare;
