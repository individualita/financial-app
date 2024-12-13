import { useNavigate } from 'react-router-dom';


const BackButton = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Возвращает на предыдущую страницу
    };

    return (
        <button onClick={goBack}>{'<'}</button>
    )
}


export default BackButton;