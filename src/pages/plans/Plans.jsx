import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//import global resources
import hiImg from '../../assets/images/plans/hi.png';
import Heading from '../../components/common/heading/Heading';

//import local components
import PlanItem from './components/planItem/PlanItem';
import PlansAddForm from './components/plansAddForm/PlansAddForm';

//functions
import { deletePlan} from '../../slices/plansSlice';

//import styles for the current component
import styles from './plans.module.scss';


const Plans = () => {
    const plans = useSelector(state =>  state.plansReducer.plans);

    const dispatch = useDispatch();

    useEffect(() => {
       localStorage.setItem('plans', JSON.stringify(plans));
    }, [plans]);

    const renderPlansList = (array) => {
        return array.length === 0? (
            <div className={styles.info}>Create your first plan:) 
                <img className={styles.img}src={hiImg} alt="Green cactus says hello." />
            </div> 
        ) : (
            array.map(({_id, ...props})=> {
                return <PlanItem key={_id} deletePlan={() => dispatch(deletePlan(_id))} {...props}/>
            })
        )
    }

    return (
        <section className="plans" aria-labelledby="plans-title">

            <Heading level={3} className={`${styles.subtitle} text-black font-light`}>Keep track of your upcoming expenses and stay prepared for what’s ahead.</Heading>

            <div className={styles.wrapper}>
                {renderPlansList(plans)}

                <PlansAddForm  />
            </div>

        </section>
    )
}



export default Plans;