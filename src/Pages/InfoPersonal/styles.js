const styles = {
    generalContainer: {
        backgroundColor: "#FFF",
        padding: "20px",
        borderRadius: "10px"
    },
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
        flexFlow: "wrap",
        flexWrap: "wrap",
    },
    buttonEdit: {
        backgroundColor: 'var(--blueSeoul)',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'right',
        border: "none",
        borderBottom: '1px solid var(--translucentGray)',
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
        border: "none",
    },
    cardsShort: {
        flex: "max(250px, 100vw/3)"
    },
}

export default styles
