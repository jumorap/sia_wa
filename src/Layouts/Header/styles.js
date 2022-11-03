const styles = {
    logo: {
        height: '11vh',
        width: 'auto',
        position: 'relative',
        top: '3.5vh',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
    bar: {
        backgroundColor: 'var(--blueSeoul)',
        justifyContent: 'center',
        paddingBottom: '7.5vh',
        height: '15vh',
        display: 'flex',
        zIndex: 10,
        flexWrap: "wrap",
    },
    contentBar: {
        transition: 'all 0.5s ease',
        '& a': {
            width: '12.2vw',
            display: 'inline-block',
        },
        '& .logoType': {
            display: 'contents',
            backgroundColor: '#FFF'
        },
        '& .burgerMenu': {
            display: 'none',
        },
        '& .burgerMenu:active': {
            transform: 'rotate(360deg)',
        },
        '@media (max-width: 800px)': {
            '& a': {
                display: 'none',
            },
            '& .burgerMenu': {
                display: 'block',
            }
        },
    },
    contentBarResponsive: {
        transition: 'all 0.5s ease',
        backgroundColor: 'var(--blueSeoul)',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 15,
        // Align to center
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: '2vh',
        borderBoxSize: 'border-box',
        '& a': {
            // List
            display: 'block',
            width: '100%',
            textAlign: 'center',
            margin: '10px',
        },
        '& .logoType': {
            display: 'none',
        },
        '& .burgerMenu:active': {
            transform: 'rotate(360deg)',
        },
    },
    burgerMenu: {
        transition: 'all 0.5s ease',
        position: 'absolute',
        top: '4.8vh',
        left: '4vh',
        fontSize: '2rem',
        cursor: 'pointer',
    },
}

export default styles
