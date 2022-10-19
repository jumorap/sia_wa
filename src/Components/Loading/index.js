import React from "react"
import LoadingIcons from 'react-loading-icons'


const Loading = () => {
    const styles = {
        loading: {
            color: "#FFF",
            fontSize: "110px",
        },
        loadingContainer: {
            position: "absolute",
            top: "45%",
            right: "50%",
            width: "100%",
            alignContent: "center",
            transform: "translate(50%,-50%)"
        }
    }

    return (
        <center style={styles.loadingContainer}>
            <LoadingIcons.ThreeDots style={styles.loading}/>
        </center>
    )
}

export default Loading
