import { Outlet, Routes, Route,  useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

//data 
import plansData from "../../../data/plansData";
import transactionsData from "../../../data/transactionsData";

//Components
import Heading from "../../common/heading/Heading";
import TimeDisplay from "../timedisplay/TimeDisplay";
import Home from '../../../pages/home/Home';
import Currency from '../../../pages/currency/Currency';
import Plans from '../../../pages/plans/Plans';
import Menu from '../menu/Menu';
import TransactionModal from '../../common/modal/TransactionModal';
import More from '../../../pages/more/More';
import Notfoundpage from '../../../pages/notfoundpage/Notfoundpage';

//styles
import "./dashboard.scss";

const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');

        return savedTransactions? JSON.parse(savedTransactions) : transactionsData;
    });
    
    const [plans, setPlans] = useState(() => {
        const savedPlans = localStorage.getItem('plans');
        return savedPlans ? JSON.parse(savedPlans) : plansData;
    });


    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('plans', JSON.stringify(plans));

    }, [transactions, plans]);

    const location = useLocation();
    const currentPath = location.pathname;
    const currentSection = currentPath.split('/').pop() || 'home';

    // Сопоставление путей с названиями разделов
    const sectionNames = {
        '': 'Home',
        home: 'Home',
        currency: 'Daily Currency Rates',
        plans: 'Plans',
        more: 'More',
        about: 'About',
        contact: 'Contact'
    };

    const currentSectionName = sectionNames[currentSection] || 'Home';



    // Toggle modal state
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const addNewTransaction = (newTransaction) => {
        setTransactions((prev) => {
            return [newTransaction, ...prev];
        });
    }

    const onDeleteTransaction = (id) => {

        setTransactions((currentTransactions => currentTransactions.filter(transaction => transaction._id !== id)))
    }

    const addNewPlan = (newPlan) => {
        setPlans((prev) => {
            return [...prev, newPlan]
        });
    }

    const onDeleteNewPlan = (id) => {
        setPlans((currentPlans => currentPlans.filter(plan => plan._id !==id)));
    };


    return (
        <section className="dashboard">
            <TimeDisplay />
            <Heading level={2}>{currentSectionName}</Heading>
            <Outlet />
            <Routes>
                <Route path="home" element={<Home data={transactions} onDeleteTransaction={onDeleteTransaction} />}/>
                <Route path="currency" element={<Currency />} />
                <Route path="plans" element={<Plans plans={plans} addNewPlan={addNewPlan} onDeleteNewPlan={onDeleteNewPlan} />}/>
                <Route path="more/*" element={<More />} />
                {/* Перенаправление неизвестных путей на /home */}
                {/*<Route path="*" element={<Navigate to="/home" replace />} />*/}
                <Route path="*" element={<Notfoundpage />} />

            </Routes>
            <Menu  currentSection={currentSection} handleOpenModal={handleOpenModal}/>
            {isModalOpen && <TransactionModal handleCloseModal={handleCloseModal} addNewTransaction={addNewTransaction} />}
        </section>
    )
}

export default Dashboard;