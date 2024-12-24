import PropTypes from 'prop-types';

//data
import { flagIconsData } from '../../../../data/flagIconsData';

import styles from './currencyListItem.module.scss';

const CurrencyListItem = ({ data}) => {
    
    // Find the corresponding flag icon using the CharCode
    const flagIcon = flagIconsData.get(data.CharCode);

    // If a flag icon is found, use its link, otherwise use the placeholder image
    const imgLink = flagIcon? flagIcon.link : placeholderImg;
    
    return (
        <li className={styles.item}>
            <div className={styles.info}>
                <img className={styles.flag} src={imgLink} alt={imgLink? `${data.CharCode} flag` : 'placeholder'} />
                <div className={styles.details}>
                    <div className={styles.code}> {data.CharCode } </div>
                    <div className={styles.subrate}>{`1 ${data.CharCode} = ${data.Value.toFixed(2)} rubles`}</div>
                </div>
            </div>
            
            <div className={styles.rate}>{`${data.Value.toFixed(2)} ₽`}</div>
        </li> 
    )

}


CurrencyListItem.propTypes = {
    data: PropTypes.shape({
        CharCode: PropTypes.string.isRequired, 
        Value: PropTypes.number.isRequired     
    }).isRequired
};

export default CurrencyListItem;