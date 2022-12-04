import React , { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from "./styles";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { createGrades, getGrades, updateGrades, getStudents, docAsignatures, listStudents } from "../../../Middleware/Calificaciones/get-api";
import { createGradesQuery, getDocAsignaturesQuery, getFormatStudents, getGradesQuery, updateGradesQuery } from '../../../Middleware/Calificaciones/queries';


function CalificacionesDoc() {
  const [data, setData] = useState(null);
  const [students, setStudents] = useState(null);
  const [asignature, setAsignature] = React.useState('');
  const [asignatureArray, setAsignatureArray] = React.useState(null);
  const valueName = useRef('');
  const valuePer = useRef('');
  const [open, setOpen] = React.useState(false);
  const [confirmation, setConfirmation] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const user = sessionStorage.getItem("USER");

  useEffect (() => {
    const query = getDocAsignaturesQuery(user);
    if (!asignatureArray) docAsignatures(query).then((response) => {

      setAsignatureArray(response.getDocAsignatures)
    })
  }, [asignatureArray])

  const handleSave = () => {
    let dict = {}
    let saveData = {
      id: data[data.length -1].id+100,
      id_course: data[data.length -1].id_course,
      name: valueName.current.value,
      percentage: valuePer.current.value/100,
      grades: ""
    }

    students.map((grade) => {
      dict[grade.id_student] = 0
    })

    saveData['grades'] = JSON.stringify(dict)
    saveData['grades'] = saveData['grades'] .replace(/"/g,"'");
    
  
    const query = createGradesQuery(saveData)
    const getD = getGradesQuery(data[data.length -1].id_course)
    const getS = getFormatStudents(data[data.length -1].id_course)

    createGrades(query)
      .then(() => setOpen(false))
      .then(() => setConfirmation(true))
      .then(() => getGrades(getD).then((response) => setData(response.listGrades)))
      .then(() => getStudents(getS).then((response) => setStudents(response.formatStudents)))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };

  const handleConfClose = () => {
    setConfirmation(false);
  };
  const handleChange = (event) => {
    setAsignature(event.target.value);

    const query1 = getGradesQuery(event.target.value)
    const query2 = getFormatStudents(event.target.value)

    getGrades(query1).then((response) => setData(response.listGrades))
    getStudents(query2).then((response) => setStudents(response.formatStudents))

  };

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      const updatedRows = students

      updatedRows[id]['grades'][field][1] = parseInt(value)

      let dict = {}
      let saveData = {
        id: data?.find( record => record.name === field).id,
        id_course: data[data.length -1].id_course,
        name: field,
        percentage: data?.find( record => record.name === field).percentage,
        grades: ""
      }

      updatedRows.map((grade) => {
        dict[grade.id_student] = grade['grades'][field][1]
      })

      saveData['grades'] = JSON.stringify(dict)
      saveData['grades'] = saveData['grades'] .replace(/"/g,"'");

      const query = updateGradesQuery(saveData)

      updateGrades(query)
        .then(() => setStudents(updatedRows))
        .then(() => setAlertOpen(true))
    },
    [students],
  );

  return (
    <Container sx={{padding: '20px', background: "var(--reallySoftGray)"}}>
      
      <div sx={{background: 'white'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Asignatura</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={asignature}
            label="Asignatura"
            onChange={handleChange}
            sx={{background: 'white'}}
          >
            {
              asignatureArray?.map((asig) => {
                let name = asig.nameCourse.toUpperCase();
                return (
                  <MenuItem value={asig.id_curso}>{name+' | '+asig.id_curso}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
      <div sx={{}}>
        <Button
              variant="outlined"
              sx={[styles.button]}
              onClick={handleOpen}
          >
              Añadir Calificación
          </Button>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Nueva nota</DialogTitle>
              <DialogContent>
              <DialogContentText>
                  Ingrese los siguientes datos para la creación de una nueva nota:
              </DialogContentText>
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="Nombre de la nota"
                  fullWidth
                  variant="outlined"
                  inputRef={valueName}
              />
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="Porcentaje (e.j.: 30.5)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  inputRef={valuePer}
              />
              </DialogContent>
              <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button onClick={handleSave}>Añadir</Button>
              </DialogActions>
          </Dialog>
          <Dialog
            open={confirmation}
            onClose={handleConfClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Se ha guardado correctamente la información"}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleConfClose}>Aceptar</Button>
            </DialogActions>
          </Dialog>
      </div>
      <div style={styles.table}>
          <DataGrid
            rows={formatRows(students)}
            columns={formatColumn(data)}
            onCellEditCommit={handleCellEditCommit}
          />
      </div>
      <Collapse in={alertOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Se ha guardado correctamente la información.
        </Alert>
      </Collapse>
    </Container>
  );
}

/**
 * 
 * Function that gets the information from grades and creates a JSON to fill the columns of the table
 */
 function formatColumn(data) {
  let cols = [
      //{ field: 'id', headerName: 'Usuario', width: 180, editable: false },
      { field: 'name', headerName: 'Estudiante', width: 200, editable: false }
  ]

  if (data) {
      data.map((element) => {
          cols.push({field: element.name, headerName: element.name+' ('+element.percentage*100+'%)', editable: true, width: 150})
      })
  }

  cols.push({ field: 'Definitiva', headerName: 'Definitiva', editable: false})
  return cols
}

/**
* 
* Function that gets the information from students and creates a JSON to fill the rows of the table
*/
function formatRows(students) {
  let rows = []
  let count = 0
  if (students) {
      students.map((student) => {
        let def = 0
          if (typeof student.grades === 'string') {
            let gradesdata = student.grades;
            var dict = JSON.parse(gradesdata.replace(/'/g,'"'));
            student.grades = dict;
          }
          let std = {id: count, name: student['id_student']}
          Object.keys(student['grades']).map((element) => {
              std[element] = student['grades'][element][1]
              def += student['grades'][element][1]*student['grades'][element][0]
          })
          count += 1;

          std['Definitiva'] = def
          rows.push(std)
      })
  }
  else {

  }
  return rows
}

export default CalificacionesDoc;