import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Services and utilities
import {fetchData} from '../../services/fetchApi';

import { fetchCurrency } from '../../slices/currencySlice';

import { STATUSES } from '../../constants/statuses';

//data
import flagIconsData from '../../data/flagIconsData';

//Components
import UpdateIcon from '../../components/common/icons/UpdateIcon';
import ErrorMessage from '../../components/common/errormessage/ErrorMessage';
import Spinner from '../../components/common/spinner/Spinner';
import CurrencyList from './components/currencyList/CurrencyList';
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
    console.log(currency);
    console.log(transformedCurrency);


    const renderCurrencyList = (data) => {
        if (!data || !data.valute) {
            return null;
        }

        const {valute} = data;

        const currencyEntries = Object.entries(valute);

        return currencyEntries.map((item) => {
            const currencyKey = item[0];
            const currencyValue = item[1];
            
            return (
                <ul>
                    <CurrencyListItem key={currencyKey} currencyValue={currencyValue} flagIconsData={flagIconsData}/>
                </ul>
            )
            
        }); 


    }

    // Render error message or spinner if needed
    const errorMessage = currencyLoadingStatus === STATUSES.REJECTED && <ErrorMessage /> ;
    const spinner = currencyLoadingStatus === STATUSES.PENDING && <Spinner /> ;

    return (
        <section className={styles.currency}>
            <h1>currency</h1>
            {errorMessage}
            {spinner}
            {renderCurrencyList(transformedCurrency)}
        </section>
    )
}


export default Currency;