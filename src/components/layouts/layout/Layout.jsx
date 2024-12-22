import { Outlet, Routes, Route,  useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";

//data 
import plansData from "../../../data/plansData";
import {transactionsData} from "../../../data/transactionsData";

//constants
import { sectionNames } from '../../../constants/sectionNames';

//Components
import Heading from "../../common/heading/Heading";
import TimeDisplay from "../timedisplay/TimeDisplay";
import Home from '../../../pages/home/Home';
import Currency from '../../../pages/currency/Currency';
import Plans from '../../../pages/plans/Plans';
import Menu from '../menu/Menu';
import TransactionModal from '../../../pages/home/components/transactionModal/TransactionModal';
import More from '../../../pages/more/More';
import Notfoundpage from '../../../pages/notfoundpage/Notfoundpage';

//styles
import "./layout.scss";

const Layout = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;
    const currentSection = currentPath.split('/').pop() || 'home';

    // Сопоставление путей с названиями разделов
    const currentSectionName = sectionNames[currentSection] || 'Home';


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