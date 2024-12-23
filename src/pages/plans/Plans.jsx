import PropTypes from 'prop-types';
import { useState } from 'react';

//import global resources
import hiImg from '../../assets/images/plans/hi.png';
import planBackgroundColors from '../../data/planBackgroundColors';
import Heading from '../../components/common/heading/Heading';

//import local components
import PlanItem from './components/planItem/PlanItem';
import PlansForm from './components/plansForm/PlansForm';

//import styles for the current component
import styles from './plans.module.scss';


const Plans = ({plans, addNewPlan, onDeleteNewPlan}) => {
    const [planTitle, setPlanTitle] = useState('');
    const [planContent, setPlanContent] = useState('');
    const [hasError, setHasError] = useState(false);


    //Function to generate a random color from the color array
    const getRandomColor = (colors) => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    // Handle input change for both title and content
    const handleInputChange = (e) => {

        const {name, value} = e.target;

        name === 'title' ? setPlanTitle(value) : setPlanContent(value);
    };

    // Validate form input before submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if(planTitle.trim().length === 0 || planContent.trim().length === 0) {
            setHasError(true);
            return;
        }

        const color = getRandomColor(planBackgroundColors);
        addNewPlan({
            _id: Date.now(),
            title: planTitle,
            content: planContent,
            color: color
        });

        //Reset form fields after submission
        setPlanTitle('');
        setPlanContent('');
        setHasError(false);
    };

    // Automatically resize textarea as the user types
    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const renderPlansList = plans.map((plan) => {
        return (
            <PlanItem key={plan._id} onDeleteNewPlan={onDeleteNewPlan} {...plan}/>
        )
    });


    return (
        <section className="plans" aria-labelledby="plans-title">

            <Heading level={3} className={`${styles.subtitle} text-black font-light`}>Keep track of your upcoming expenses and stay prepared for what’s ahead.</Heading>
            <div className={styles.wrapper}>
                {renderPlansList}
                {plans.length === 0 ? (
                    <div className={styles.info}>Create your first plan:) 
                        <img className={styles.img}src={hiImg} alt="Green cactus says hello." />
                    </div> 
                    ): null}

                <PlansForm  
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    autoResize={autoResize}
                    planTitle={planTitle}
                    planContent={planContent}
                    hasError={hasError}
                />

            </div>
        </section>
    )
}

Plans.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // id может быть числом или строкой
            title: PropTypes.string.isRequired, 
            content: PropTypes.string.isRequired, 
        })
    ).isRequired, 
    addNewPlan: PropTypes.func.isRequired, 
    onDeleteNewPlan: PropTypes.func.isRequired, 
};

export default Plans;