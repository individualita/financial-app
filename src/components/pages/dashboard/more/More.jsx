import { Routes, Route, useLocation } from "react-router-dom";
import About from "./about/About";
import MoreMenu from "./moreMenu/MoreMenu";
import Contact from "./contact/Contact";
import Notfoundpage from "../../notfoundpage/Notfoundpage";

import styles from './more.module.scss';

const More = () => {

    const location = useLocation();
    const currentLocation = location.pathname;
    const currentSection = currentLocation.split('/').pop();
    //const modern = currentSection[0].toUpperCase() + currentSection.slice(1);
    //console.log(modern);
    console.log(currentSection)

    return (
        <section className="more">

            <Routes>
                <Route path=""element={<MoreMenu />}/>
                <Route path="about" element={<About /> }/>
                <Route path="contact" element={<Contact /> }/>
                <Route path="*" element={<Notfoundpage />} />
            </Routes>
        </section>
    )
}

export default More;