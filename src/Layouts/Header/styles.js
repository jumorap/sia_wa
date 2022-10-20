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
        '& a': {
            width: '20vw',
            display: 'inline-block',
        },
        '& .logoType': {
            display: 'contents',
            backgroundColor: '#FFF'
        },
        '@media (max-width: 800px)': {
            '& a': {
                display: 'none',
            },
        },
    },
}

export default styles
