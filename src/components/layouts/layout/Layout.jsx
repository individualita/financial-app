import { Outlet, useLocation } from 'react-router-dom';
import { useState} from "react";

//constants
import { SECTION_NAMES } from '../../../constants/sectionNames';

//Components
import Heading from "../../common/heading/Heading";
import TimeDisplay from "../timedisplay/TimeDisplay";
import Menu from '../menu/Menu';
import TransactionModal from '../../../pages/home/components/transactionModal/TransactionModal';

//styles
import "./layout.scss";

const Layout = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {pathname} = useLocation();
    const currentSection = pathname.split('/').pop() || 'home';

    // Сопоставление путей с названиями разделов
    const currentSectionName = SECTION_NAMES[currentSection] || 'Home';


  // Handlers for opening/closing the transaction modal
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    

    return (
        <section className="layout">
            <TimeDisplay />
            <Heading level={2}>{currentSectionName}</Heading>
            <Outlet />

            <Menu  currentSection={currentSection} handleOpenModal={handleOpenModal}/>
            {isModalOpen && <TransactionModal handleCloseModal={handleCloseModal}  />}
        </section>
    )
}

export default Layout;