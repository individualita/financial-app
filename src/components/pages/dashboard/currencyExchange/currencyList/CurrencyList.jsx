import PropTypes from 'prop-types';

//components
import CurrencyListItem from './currencyListItem/CurrencyListItem';

//data
import flagIconsData from "../../../../../data/flagIconsData";

//styles
import styles from './currencyList.module.scss';


const CurrencyList = ({currencyData}) => {
    // Return null if currencyData or valute is not available
    if (!currencyData || !currencyData.valute) {
        return null;
    }

    // Destructure valute from currencyData for easier access
    const {valute} = currencyData;

    const renderCurrencyList = () => {

        // Convert the 'valute' object into an array of [key, value] pairs
        const currencyEntries = Object.entries(valute);

        return currencyEntries.map((item) => {
            const currencyKey = item[0];
            const currencyValue = item[1];
            
            return (
                <CurrencyListItem key={currencyKey} currencyValue={currencyValue} flagIconsData={flagIconsData}/>
            )
            
        }); 
    
    };

    return (
        <ul className={styles.list}>
            {renderCurrencyList()}
        </ul>
    )
}



CurrencyList.propTypes = {
    currencyData: PropTypes.shape({
        date: PropTypes.string.isRequired, 
        valute: PropTypes.objectOf(
            PropTypes.shape({
                CharCode: PropTypes.string.isRequired, 
                Value: PropTypes.number.isRequired     
            })
        ).isRequired 
    }),
};

export default CurrencyList;