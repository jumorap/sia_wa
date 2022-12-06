import React, { useState, useEffect } from "react";
import { ListItemText, ListItem, ListItemButton, List, CardContent, Typography, Card, Button, Box } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import styles from "./styles";
import { asignaturesStudents } from "../../../Middleware/Calificaciones/get-api";
import { getFormatToStudents } from "../../../Middleware/Calificaciones/queries";


const formatData = (data) => {
  return JSON.parse(data);
}

const cards = (grades) => {
  let fgrades = formatData(grades);
  let names = Object.keys(fgrades);

  return (
    <List sx={[styles.flexContainer]}>
    {names?.map((name) => {
      return (
        <Card sx={[styles.card]}>
          <CardContent>
            <Typography sx={[styles.typoCard]}>{name+': '+fgrades[name][0]*100+'%'}</Typography>
            <Typography sx={[styles.typoCard]}>{fgrades[name][1]}</Typography>
          </CardContent>
        </Card>
      );
    })}
    </List>
  );
}

function CalificacionesEst() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState({});
  const prof = sessionStorage.getItem("profesor")

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const user = sessionStorage.getItem("USER");

  useEffect (() => {
    if (!data) {
      const query = getFormatToStudents(user)
      asignaturesStudents(query)
        .then((response) => /*setData(response.formatStudents)*/ 
          {
            setData(response)
          }
        )
    }
  }, [data])

  let items = [];
  if (data) {
    items = data.formatStudents
  }
  return (
    <>
      {prof? <Box textAlign='center'><Button variant="outlined" href="/ingreso_calificaciones">INGRESO NOTAS</Button> </Box>: null}
      <List sx={{padding: "30px"}}>
        {items?.map((item) => {
          return (
            <>
              <ListItem>
                <ListItemButton onClick={() => handleClick(item.id)} sx={[styles.list]}>
                    <ListItemText primaryTypographyProps={{fontWeight: "bold", color: "var(--darkBlueSeoul)"}} secondaryTypographyProps={{color: "rgba(31, 45, 82)"}} primary={"CÓDIGO: "+item.id_course}/>
                    {open[item.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                <List component="div" justify="center">
                  <ListItem className="pl-4" sx={{overflow: 'auto'}}>
                    {cards(item.grades)}
                  </ListItem>
                </List>
              </Collapse>
            </>
          );
        })}
      </List>
    </>
  );
}

export default CalificacionesEst;