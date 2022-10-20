import bg from '../../Assets/Images/bg.jpg'


const styles = {
    paperContainer: {
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        filter: 'blur(3px)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        overflow: 'hidden',
        boxSizing: "border-box",
    },
}

export default styles
