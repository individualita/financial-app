import PropTypes from 'prop-types';

const HomeIcon = ({fill='#9ca2ad'}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="24px" height="24px" fill={fill}><polygon points="41,5 41,10.73 35,6.05 35,5 "/><path d="M48.79,20.62C48.59,20.87,48.3,21,48,21c-0.22,0-0.43-0.07-0.62-0.21L46,19.71V46c0,0.55-0.45,1-1,1H31V29H19v18H5c-0.55,0-1-0.45-1-1V19.71l-1.38,1.08c-0.44,0.34-1.07,0.26-1.41-0.17c-0.34-0.44-0.26-1.07,0.17-1.41l23-17.95c0.37-0.28,0.87-0.28,1.24,0l23,17.95C49.05,19.55,49.13,20.18,48.79,20.62z"/>
        </svg>
    )

}

HomeIcon.propTypes = {
    fill: PropTypes.string
}



export default HomeIcon;

