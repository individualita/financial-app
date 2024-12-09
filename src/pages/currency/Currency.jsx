import { useState, useEffect } from 'react';

//Services and utilities
import fetchData from '../../services/fetchApi';

//Components
import UpdateIcon from '../../components/common/icons/UpdateIcon';
import ErrorMessage from '../../components/common/errormessage/ErrorMessage';
import Spinner from '../../components/common/spinner/Spinner';
import CurrencyList from './components/currencyList/CurrencyList';

//styles
import styles from './currency.module.scss';

const Currency = () => {
    //states
    const [currencyData, setCurrencyData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    // Manage loading and error states
    const setError = () => setIsError(true);
    const startLoading = () => setIsLoading(true);
    const finishLoading = () => setIsLoading(false);

    // Handle the successful fetching of currency data
    const handleCurrencyDataLoad = (data) => {
        //вытаскиваем объекты которые нам нужны
        const {USD, CNY, EUR, PLN} = data.Valute;
        
        setCurrencyData({
            date: data.Date,
            valute: {USD, CNY, EUR, PLN} //кладем только то что нужно.
        });
    };

    // Fetch currency data from API
    const fetchCurrencyData = async () => {
        try {
            startLoading();

            const data = await fetchData('https://www.cbr-xml-daily.ru/daily_json.js')
                                    .then(handleCurrencyDataLoad);
                                
        } catch(error) {
            setError()
            console.error('Error loading currency data:', error);

            
        } finally {
            finishLoading(); 
        }

    };

    // Fetch data when component is mounted
    useEffect(() => {
        fetchCurrencyData();

    }, []);


    // Render error message or spinner if needed
    const errorMessage = isError? <ErrorMessage /> : null;
    const spinner = isLoading? <Spinner /> : null;

    return (
        <section className={styles.currency}>
            <div className="currency__header">
                <button onClick={fetchCurrencyData} className={styles.updateButton} aria-label="Update currency data" type="button">
                    <UpdateIcon fill={isLoading? 'gray' : 'black'} width={'18px'}/>
                </button>
                {errorMessage}
                {spinner}

                <CurrencyList currencyData={currencyData}/>
            </div>

            <div className={styles.update}>
                <span>Last update:</span> <br />{currencyData ? currencyData.date.slice(0,16).replace('T', ' ') : "Not updated yet"}
            </div>
        </section>
    )
}


export default Currency;