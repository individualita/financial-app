import { Routes, Route, useLocation } from "react-router-dom";
import About from '../more/components/about/About';
import MoreMenu from '../more/components/moreMenu/MoreMenu';
import Contact from '../more/components/contact/Contact';
import Notfoundpage from '../notfoundpage/Notfoundpage';


const More = () => {

    const location = useLocation();
    const currentLocation = location.pathname;
    const currentSection = currentLocation.split('/').pop();


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