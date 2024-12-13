import {  useLocation , Outlet} from "react-router-dom";



const More = () => {

    const location = useLocation();
    const currentLocation = location.pathname;
    const currentSection = currentLocation.split('/').pop();



    return (
        <section className="more">
            <Outlet />

        </section>
    )
}

export default More;