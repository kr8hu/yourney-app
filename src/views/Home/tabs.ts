//Components
import Explore from "./tabs/Explore";
import Favourites from "./tabs/Favourites";
import Profile from "./tabs/Profile";
import Search from "./tabs/Search";


const tabs = {
    left: [
        {
            id: 0,
            icon: 'fa-compass',
            component: Explore
        },
        {
            id: 1,
            icon: 'fa-search',
            component: Search
        }
    ],
    right: [
        {
            id: 2,
            icon: 'fa-heart',
            component: Favourites
        },
        {
            id: 3,
            icon: 'fa-user',
            component: Profile
        }
    ]
};

export default tabs;
