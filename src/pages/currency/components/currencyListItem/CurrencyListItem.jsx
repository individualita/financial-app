import PropTypes from 'prop-types';

import styles from './currencyListItem.module.scss';

const CurrencyListItem = ({ currencyValue, flagIconsData}) => {
    
    // Find the corresponding flag icon using the CharCode
    const flagIcon = flagIconsData.find(icon => icon.CharCode === currencyValue.CharCode);
    // If a flag icon is found, use its link, otherwise use the placeholder image
    const imgLink = flagIcon? flagIcon.link : placeholderImg;
    
    return (
        <li className={styles.item}>
            <div className={styles.info}>
                <img className={styles.flag} src={imgLink} alt={imgLink? `${currencyValue.CharCode} flag` : 'placeholder'} />
                <div className={styles.details}>
                    <div className={styles.code}> {currencyValue.CharCode } </div>
                    <div className={styles.subrate}>{`1 ${currencyValue.CharCode} = ${currencyValue.Value.toFixed(2)} rubles`}</div>
                </div>
            </div>
            
            <div className={styles.rate}>{`${currencyValue.Value.toFixed(2)} ₽`}</div>
        </li> 
    )

}

CurrencyListItem.propTypes = {
    currencyValue: PropTypes.shape({
        CharCode: PropTypes.string.isRequired, 
        Value: PropTypes.number.isRequired     
    }).isRequired,
    flagIconsData: PropTypes.arrayOf(
        PropTypes.shape({
            CharCode: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired
};

export default CurrencyListItem;