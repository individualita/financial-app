import img from './error404.gif';

const ErrorMessage = () => {
    return (
        <>
            <div className='text-center'>We couldn't load the data. Please refresh the page or try again later.</div>
            <img src={img} alt="error message 404"  style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain',margin: '0 auto'}} />
        </>
    )
}

export default ErrorMessage;