import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Services and utilities
import { fetchCurrency } from '../../slices/currencySlice';

//Constants
import { STATUSES } from '../../constants/statuses';

//Components
import UpdateIcon from '../../components/common/icons/UpdateIcon';
import ErrorMessage from '../../components/common/errormessage/ErrorMessage';
import Spinner from '../../components/common/spinner/Spinner';
import CurrencyListItem from './components/currencyListItem/CurrencyListItem';

//styles
import styles from './currency.module.scss';

const Currency = () => {

    const {currencyLoadingStatus} = useSelector(state => state.currencyReducer);
    const currency = useSelector(state => state.currencyReducer.currency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrency());

    }, [dispatch]);


    const transformCurrency = (data) => {

        if (!data || !data.Valute) {
            return null; // Если данные некорректны, возвращаем null
        }

        const {USD, CNY, EUR, PLN} = data.Valute;

        return {
            date: data.Date,
            valute: {USD, CNY, EUR, PLN}
        }
    }


    const transformedCurrency =  currency ? transformCurrency(currency) : null
    /* 
    transformedCurrency = {
        date: 'string',
        valute: {CNY: {}, EUR: {}, PLN: {}}
    }
    */ 
    

    const renderCurrencyList = (data) => {

        // Return null if currencyData or valute is not available
        if (!data || !data.valute) {
            return null;
        }

        // Destructure valute from currencyData for easier access
        const {valute} = data;

        // Convert the 'valute' object into an array of [key, value] pairs
        const currencyEntries = Object.entries(valute);

        return currencyEntries.map((item) => {
            const currencyKey = item[0]; //EUR, USD, PLN...
            const currencyValue = item[1]; // {}
            
            return (
                <CurrencyListItem key={currencyKey} data={currencyValue} />
            )    
        }); 


    }

    // Render error message or spinner if needed
    const renderSpinner = () => currencyLoadingStatus === STATUSES.PENDING && <Spinner />;
    const renderError = () => currencyLoadingStatus === STATUSES.REJECTED && <ErrorMessage />;


    return (
        <section className={styles.currency}>
            <div className={styles.header}>

                <button onClick={() => dispatch(fetchCurrency())} className={styles.updateButton} aria-label='Update currency data' type='button'>
                    <UpdateIcon fill={currencyLoadingStatus === STATUSES.PENDING? 'gray' : 'black'} width={'18px'}/>
                </button>

                <ul className={styles.list}>
                    {renderCurrencyList(transformedCurrency)}
                </ul>
                {renderError()}
                {renderSpinner()}

            </div>

            <div className={styles.update}>
                <span>Last update:</span> 
                <br />
                {transformedCurrency ? transformedCurrency.date.slice(0,16).replace('T', ' ') : 'Not updated yet'}
            </div>
        </section>
    )
}


export default Currency;