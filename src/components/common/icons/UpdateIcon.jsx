import PropTypes from 'prop-types';

const UpdateIcon = ({className, fill, width, height}) => {
    return (
        <svg className={className} fill={fill} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width={width} height={height} ><g id="Outlined"><path d="M20,12c0,4.411-3.589,8-8,8s-8-3.589-8-8c0-2.52,1.174-4.768,3-6.235V3.353C4.016,5.085,2,8.309,2,12c0,5.514,4.486,10,10,10s10-4.486,10-10S17.514,2,12,2v2C16.411,4,20,7.589,20,12z"/><polygon points="2,2 9,2 9,9 "/></g></svg>

    )
}

UpdateIcon.propTypes = {
    fill: PropTypes.string
}

export default UpdateIcon;