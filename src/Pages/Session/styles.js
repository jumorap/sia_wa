const styles = {
    form: {
        mt: 1,
    },
    textHead: {
        color: '#FFF'
    },
    textField: {
        backgroundColor: '#FFF',
        borderRadius: '10px'
    },
    controlLabel: {
        color: '#FFF'
    },
    container: {
        backgroundColor: 'var(--translucentBlueSeoul)',
        borderRadius: '10px',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'all 0.5s ease',
        padding: 8,
        '@media (max-width: 800px)': {
            padding: 5,
        },
        '@media (max-width: 600px)': {
            padding: 2,
            paddingTop: 3,
        }
    },
    button: {
        mt: 3,
        mb: 2,
        fontWeight: 'bold',
        color: 'var(--blueSeoul)',
        backgroundColor: '#FFF',
        border: 1,
        '&:hover': {
            border: 1,
            color: '#FFF',
            backgroundColor: 'var(--blueSeoul)',
            marginColor: '#FFFFFF'
        }
    }
}

export default styles;
