import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Import global resources (icons)
import HomeIcon from '../../common/icons/HomeIcon';
import MenuIcon from '../../common/icons/MenuIcon';
import CurrencyIcon from '../../common/icons/CurrencyIcon';
import PlansIcon from '../../common/icons/PlansIcon';


//Import local components
import AddExpenseButton from '../../common/buttons/addExpenseButton/AddExpenseButton';

//Import styles for the current component
import styles from './menu.module.scss';



const Menu = ({handleOpenModal, currentSection}) => {

    const colors =  {
        active: 'var(--color-primary-light)',
        inactive: '#9ca2ad'
    }

    return (
        <nav className={styles.menu}>

            <div className={styles.column}>

                <Link to="/home" className={styles.link} aria-label="Go to the home">
                    <HomeIcon fill={currentSection === 'home'? colors.active: colors.inactive}/>
                    Home
                </Link>

                <Link to="/currency" className={styles.link} aria-label="Go to the currency">
                    <CurrencyIcon fill={currentSection === 'currency'? colors.active: colors.inactive}/>
                    Currency
                </Link>
                
            </div>
            <div className={styles.column}>
                <AddExpenseButton onClick={handleOpenModal} currentSection={currentSection} />
            </div>

            <div className={styles.column}>
                <Link to="/plans" className={styles.link} aria-label="Go to the plans">
                        <PlansIcon fill={currentSection === 'plans' ? colors.active: colors.inactive}/>
                        Plans 
                </Link>

                <Link to="/more" className={styles.link} aria-label="Go to the more">
                        <MenuIcon fill={currentSection === 'more' || currentSection === 'contact' || currentSection === 'about' ? colors.active: colors.inactive}/>
                        More 
                </Link>
            </div>
        </nav>
    )
}

Menu.propTypes = {
    currentSection: PropTypes.string.isRequired,
    handleOpenModal: PropTypes.func.isRequired
}

export default Menu;