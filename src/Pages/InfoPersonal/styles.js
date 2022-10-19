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
    },
    typoText: {
        color: 'var(--softGray)',
    },
    typoTitle: {
        fontWeight: "bold",
    },
    typoIconTitle: {
        fontSize: "20px",
    },
    cardsLong: {
        width: "100%",
    },
    cardsShort: {
        width: "50%",
    },
}

export default styles
