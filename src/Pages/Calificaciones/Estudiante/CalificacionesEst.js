import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ListItem } from "@mui/material";
import styles from "./styles";
import { asignaturesStudents } from "../../../Middleware/Calificaciones/get-api";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";


const formatData = (data) => {
  return JSON.parse(data);
}

const cards = (grades) => {
  let fgrades = formatData(grades);
  let names = Object.keys(fgrades);

  return (
    <List sx={[styles.flexContainer]}>
    {names.map((name) => {
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

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  useEffect (() => {
    if (!data) asignaturesStudents().then((response) => /*setData(response.formatStudents)*/ setData(response))
  }, [data])

  let items = [];
  if (data) {
    items = data
  }
  return (

    <List sx={{padding: "30px"}}>
      {items.map((item) => {
        return (
          <>
            <ListItem>
              <ListItemButton onClick={() => handleClick(item.id)} sx={[styles.list]}>
                  <ListItemText primaryTypographyProps={{fontWeight: "bold", color: "var(--darkBlueSeoul)"}} secondaryTypographyProps={{color: "rgba(31, 45, 82)"}} primary={item.id_course} secondary={"Código: "+item.id}/>
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
  );
}

export default CalificacionesEst;