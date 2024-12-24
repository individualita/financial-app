import { NavLink } from 'react-router-dom';
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

    const iconColors =  {
        active: 'var(--color-primary-light)',
        inactive: '#9ca2ad'
    }

    return (
        <nav className={styles.menu}>

            <div className={styles.column}>
                <NavLink
                    to='/home'
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                    }
                    aria-label='Go to the home'
                >
                    <HomeIcon fill={currentSection === 'home'? iconColors.active: iconColors.inactive}/>
                    Home
                </NavLink>
                
                <NavLink 
                    to='/currency'
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                    }
                    aria-label='Go to the currency'
                >
                    <CurrencyIcon fill={currentSection === 'currency'? iconColors.active: iconColors.inactive}/>
                    Currency
                </NavLink>

                
            </div>
            <div className={styles.column}>
                <AddExpenseButton onClick={handleOpenModal} currentSection={currentSection} />
            </div>

            <div className={styles.column}>
                <NavLink
                    to='/plans'
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                    }
                    aria-label='Go to the plans'
                >
                    <PlansIcon fill={currentSection === 'plans' ? iconColors.active: iconColors.inactive}/>
                    Plans
                </NavLink>

                <NavLink
                    to='/more'
                    className={({ isActive }) =>
                        isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                    }
                    aria-label='Go to the more'

                >
                    <MenuIcon fill={currentSection === 'more' || currentSection === 'contact' || currentSection === 'about' ? iconColors.active: iconColors.inactive}/>
                    More 
                </NavLink>

            </div>
        </nav>
    )
}

Menu.propTypes = {
    currentSection: PropTypes.string.isRequired,
    handleOpenModal: PropTypes.func.isRequired
}

export default Menu;