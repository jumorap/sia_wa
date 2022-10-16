const styles = {
    cards: {
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        boxShadow: 'none',
        borderTop: '1px solid var(--translucentGray)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        boxSizing: "border-box",
        flexFlow: "wrap"
    },
    buttonEdit: {
        backgroundColor: 'var(--blueSeoul)',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'right',
    },
    inputEdit: {
        width: '100%',
    }
}

export default styles
