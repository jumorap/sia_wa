import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container } from '@mui/system';
import { DataGrid, GridCellModes } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { Typography } from '@mui/material';


const styles = {
    table: {
        height: 500,
        width: '100%',
        background: "white",
        borderRadius: "5px"
    },

    header: {
        fontWeight: "bold",
        color: "rgba(31, 45, 82)",
        paddingLeft: "10px",
    },

    subheader: {
        color: "rgba(31, 45, 82, 0.8)",
        fontSize: "15px",
        paddingBottom: "10px",
        paddingLeft: "10px",
    }
}

function EditToolbar(props) {
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;

    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
        return;
        }
        const { id, field } = selectedCellParams;
        if (cellMode === 'edit') {
        setCellModesModel({
            ...cellModesModel,
            [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
        });
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field } = selectedCellParams;
        setCellModesModel({
            ...cellModesModel,
            [id]: {
                ...cellModesModel[id],
                [field]: { mode: GridCellModes.View, ignoreModifications: true },
            },
            });
        };

    const handleMouseDown = (event) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
        sx={{
            borderBottom: 1,
            borderColor: 'divider',
            p: 1,
        }}
        >
        <Button
            onClick={handleSaveOrEdit}
            onMouseDown={handleMouseDown}
            disabled={!selectedCellParams}
            variant="outlined"
        >
            {cellMode === 'edit' ? 'Save' : 'Edit'}
        </Button>
        <Button
            onClick={handleCancel}
            onMouseDown={handleMouseDown}
            disabled={cellMode === 'view'}
            variant="outlined"
            sx={{ ml: 1 }}
        >
            Cancel
        </Button>
        </Box>
    );
}

const courseTable = (id_course, name, handleCellKeyDown, cellModesModel, setCellModesModel, cellMode, selectedCellParams, setSelectedCellParams, handleCellFocus) => {
    return (
        <>
            <Typography sx={[styles.header]}>{name}</Typography>
            <Typography sx={[styles.subheader]}>{"Código: " + id_course}</Typography>
            <div style={styles.table}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onCellKeyDown={handleCellKeyDown}
                    cellModesModel={cellModesModel}
                    onCellModesModelChange={(model) => setCellModesModel(model)}
                    components={{
                    Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                    toolbar: {
                        cellMode,
                        selectedCellParams,
                        setSelectedCellParams,
                        cellModesModel,
                        setCellModesModel,
                    },
                    cell: {
                        onFocus: handleCellFocus,
                    },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </div>
        </>
    );
}

EditToolbar.propTypes = {
  cellMode: PropTypes.oneOf(['edit', 'view']).isRequired,
  cellModesModel: PropTypes.object.isRequired,
  selectedCellParams: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }),
  setCellModesModel: PropTypes.func.isRequired,
};

function CalificacionesDoc() {
    const [data, setData] = useState(null);
    const [selectedCellParams, setSelectedCellParams] = React.useState(null);
    const [cellModesModel, setCellModesModel] = React.useState({});

    const handleCellFocus = React.useCallback((event) => {
        const row = event.currentTarget.parentElement;
        const id = row.dataset.id;
        const field = event.currentTarget.dataset.field;
        setSelectedCellParams({ id, field });
    }, []);

    const cellMode = React.useMemo(() => {
        if (!selectedCellParams) {
        return 'view';
        }
        const { id, field } = selectedCellParams;
        return cellModesModel[id]?.[field]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);

    const handleCellKeyDown = React.useCallback(
        (params, event) => {
        if (cellMode === 'edit') {
            // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
            event.defaultMuiPrevented = true;
        }
        },
        [cellMode],
    );

    return (
        <Container sx={{padding: '20px', background: "var(--reallySoftGray)"}}>
            {courseTable("2", "ARQUITECTURA DE SOFTWARE", handleCellKeyDown, cellModesModel, setCellModesModel, cellMode, selectedCellParams, setSelectedCellParams, handleCellFocus)}
        </Container>
    
  );
}

const columns = [
    { field: 'id', headerName: 'Usuario', width: 180, editable: false },
    { field: 'name', headerName: 'Nombres y Apellidos', width: 200, editable: false },
    { field: 'grade1', headerName: 'Nota 1', editable: true},
    { field: 'def', headerName: 'Definitiva', editable: true},
  ];
  
  const rows = [
    {
      id: 1,
      name: randomTraderName(),
      grade1: 4.5,
      def: 4.5
    },
    {
      id: 2,
      name: randomTraderName(),
      grade1: 5,
      def: 5
    },
    {
      id: 2,
      name: randomTraderName(),
      grade1: 5,
      def: 5
    },
  ];

  export default CalificacionesDoc;