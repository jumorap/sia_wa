const styles = {
    list: {
      display: "flex",
      flexDirection: "column",
      borderRadius: "10px",
      background: "var(--reallySoftGray)",
      boxShadow: 2,
      width: "100%"
  
    },
  
    card: {
      display: "flex",
      flexDirection: "row",
  
      width: "100%",
      height: "auto",
      // alignItems: "center"
  
    },
  
    CardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'space-between',
      width: "100%",
  
    },
  
    card_left: {
      display: "flex",
      flexDirection: "column",
      width: "80%"
    },
  
    card_right: {
      display: "flex",
      flexDirection: "column",
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
      // flexWrap: "wrap",
      
    },
  
    infoBasica: {
      display: "flex",
      flexDirection:"row",
      width: "100%",
  
      marginTop: "30px",
      marginBottom: "15px",
  
      paddingTop: "20px",
      paddingBottom: "20px",
    },
  
    infoBasica_left: {
      display: "flex",
      flexDirection:"column",
      width: "60",
    },
  
    infoBasica_right: {
      display: "flex",
      flexDirection:"row",
      width: "100%",
      // flexWrap: "wrap",
      justifyContent: "space-around",
  
  
      paddingTop: "5px",
      paddingBottom: "5px",
    },
  
    infoBasica_right_card: {
        display: "flex",
        flexDirection: "column",
        width: "30",
        justifyContent: "center",
        alignItems: "center",
    },
  }

  export default styles