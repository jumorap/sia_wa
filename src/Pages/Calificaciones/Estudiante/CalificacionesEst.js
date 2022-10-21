import React, { useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, ListItem } from "@mui/material";

const getCustomOptions = () => {
  const items = [
    {
      id: 1,
      name_course: "Arquitectura de Software",
      grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
    },
    {
      id: 2,
      name_course: "Computación Visual",
      grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
    },
    {
      id: 3,
      name_course: "Sistemas Inteligentes",
      grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
    },
    {
      id: 4,
      name_course: "Trabajo de Grado",
      grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4], "Parcial 4": [0.3,4], "Parcial 5": [0.3,4], "Parcial 6": [0.3,4], "Parcial 7": [0.3,4], "Parcial 8": [0.3,4]}',
    },
  ];
  return items;
};

const styles = {
  list: {
    paddingLeft: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "10px",
    background: "var(--reallySoftGray)",
    boxShadow: 2,
  },

  card: {
    marginRight: "15px",
    width: "150px",
    height: "80px",
    alignItems: "center"
  },
}

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
};

const formatData = (data) => {
  return JSON.parse(data);
}

const items = getCustomOptions();

const table = (grades) => {
  let fgrades = formatData(grades);
  let names = Object.keys(fgrades);
  let values = Object.values(fgrades);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 65 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {names.map((name) => {
              return (
                <TableCell>{name+": "+fgrades[name][0]*100+"%"}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value) => {
            return (
              <TableCell>{value[0]}</TableCell>
            );
          })}
        </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const cards = (grades) => {
  let fgrades = formatData(grades);
  let names = Object.keys(fgrades);

  return (
    <List style={flexContainer}>
    {names.map((name) => {
      return (
        <Card sx={[styles.card]}>
          <CardContent>
            <Typography sx={{display:'flex', justifyContent: 'center'}}>{name+': '+fgrades[name][0]*100+'%'}</Typography>
            <Typography sx={{display:'flex', justifyContent:'center'}}>{fgrades[name][1]}</Typography>
          </CardContent>
        </Card>
      );
    })}
    </List>
  );
}

function CalificacionesEst() {
  const [open, setOpen] = useState({});

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (

    <List sx={{padding: "30px"}}>
      {items.map((item) => {
        return (
          <>
            <ListItem>
              <ListItemButton onClick={() => handleClick(item.id)} sx={[styles.list]}>
                  <ListItemText primaryTypographyProps={{fontWeight: "bold", color: "rgba(31, 45, 82)"}} secondaryTypographyProps={{color: "rgba(31, 45, 82)"}} primary={item.name_course} secondary={"Código: "+item.id}/>
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