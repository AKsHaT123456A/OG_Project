
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { useMatchStore } from '../../store/store';
import { formatNumberToTwoDecimalPlaces, getSavedData, postFieldData } from '../constant';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)',
    fontFamily: '\'Ubuntu\', sans-serif',
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeader': {
        fontSize: "0.95rem",
        fontWeight: "1000",
    },
    '& .MuiDataGrid-columnHeaderTitleContainer': {
        alignItems: 'flex-start'
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid #e7e7e6`,
        paddingBlock: '13px',

    },
    '& .MuiDataGrid-columnHeader:last-of-type , .MuiDataGrid-cell:last-of-type': {
        borderRight: `none`,
        paddingRight: '27px',

    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid #e7e7e6`,
    },
    '& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell': {
        borderBottom: 'none'
    },
    '& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell:first-of-type': {
        borderRadius: '0rem 0rem 0rem 0.2rem',
    },
    '& .MuiDataGrid-cell:first-of-type': {
        paddingLeft: '27px',
    },
    '& .MuiDataGrid-row--lastVisible .column-cell': {
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& .MuiDataGrid-cell': {
        fontSize: '15.2px',
        fontWeight: 500,
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 0,
    },
    '& .MuiDataGrid-columnHeaderTitle': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem'
    },

    '& .MuiDataGrid-colCellTitle': {
        fontWeight: 'bold',
        fontSize: '0.95rem',
        lineHeight: '1.4rem',
    },
    '& .MuiDataGrid-colCellTitle, .MuiDataGrid-cell': {
        color:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
    },

    '& .MuiDataGrid-colCellTitleUnits': {
        fontWeight: 'normal',
        fontSize: '0.75rem',
        color: theme.palette.mode === 'light' ? 'lightgray' : 'darkgray',
        lineHeight: '1rem',
    },
    '& .MuiDataGrid-row:hover': {
        backgroundColor: 'transparent'
    },
    '& ::-webkit-scrollbar': {
        width: '4px',
        height: '3px'
    },


    '& ::-webkit-scrollbar-track': {
        background: 'lightgray',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& ::-webkit-scrollbar-thumb': {
        background: '#f1f1f1',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& .empty-cell': {
        backgroundColor: '#f6f6f6',

    },
    '& .last-cellempty': {
        backgroundColor: '#f6f6f6',
        borderRight: 'none',
        borderRadius: '0rem 0rem 0.2rem 0rem'

    },
}));



const columns = [
    { field: 'col1', headerName: '', minWidth: 195, sortable: false, cellClassName: 'first--cell', flex: 1 },
    { field: 'localNorth', headerName: 'Local North', headerUnits: '(ft)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1, editable: true },
    { field: 'localEast', headerName: 'Local East', headerUnits: '(ft)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell', editable: true },
    { field: 'localGridEast', headerName: 'Grid East', headerUnits: '(m)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'Unfrozen--cell', editable: true },
    { field: 'localGridNorth', headerName: 'Grid North', headerUnits: '(m)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'frozen--cell', editable: true },
    { field: 'localLongitude', headerName: 'Longitude', headerUnits: '', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'frozen--cell', editable: true },
    { field: 'localLatitude', headerName: 'Latitude', headerUnits: '', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'frozen--cell', editable: true },
    { field: 'localHoriz', headerName: 'Horiz Uncert 1sd', headerUnits: '(ft)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'frozen--cell', editable: true },
    { field: 'localVert', headerName: 'Vert Uncert 1sd', headerUnits: '(ft)', minWidth: 195, align: 'right', headerAlign: 'center', sortable: false, flex: 1, cellClassName: 'frozen--cell', editable: true },
];

export default function PathTable() {
    const { setUp, setPlannedRows, setLog, lokiRows, updateLokiRows, setSurveyRows, surveyRows } = useMatchStore();
    const handleLokiPlease = () => {
        const {
            localNorthSlotLocation
            , localEastSlotLocation
            , localGridNorthSlotLocation
            , localGridEastSlotLocation
            , localLongitudeSlotLocation
            , localLatitudeSlotLocation
            , localHorizSlotLocation
            , localVertSlotLocation
            , localNorthFacilityReferencePt
            , localEastFacilityReferencePt
            , localGridNorthFacilityReferencePt
            , localGridEastFacilityReferencePt
            , localLongitudeFacilityReferencePt
            , localLatitudeFacilityReferencePt
            , localHorizFacilityReferencePt
            , localVertFacilityReferencePt
            , localNorthFieldReferencePt
            , localEastFieldReferencePt
            , localGridNorthFieldReferencePt
            , localGridEastFieldReferencePt
            , localLongitudeFieldReferencePt
            , localLatitudeFieldReferencePt
            , localHorizFieldReferencePt
            , localVertFieldReferencePt
        } = setUp
        const modifiedRows = [
            { id: "SlotLocation", col1: 'Slot Location', "localNorth": localNorthSlotLocation, "localEast": localEastSlotLocation, "localGridNorth": localGridNorthSlotLocation, "localGridEast": localGridEastSlotLocation, "localLongitude": localLongitudeSlotLocation, "localLatitude": localLatitudeSlotLocation, "localHoriz": localHorizSlotLocation, "localVert": localVertSlotLocation },
            { id: "FacilityReferencePt", col1: 'Facility Reference Pt', "localNorth": localNorthFacilityReferencePt, "localEast": localEastFacilityReferencePt, "localGridNorth": localGridNorthFacilityReferencePt, "localGridEast": localGridEastFacilityReferencePt, "localLongitude": localLongitudeFacilityReferencePt, "localLatitude": localLatitudeFacilityReferencePt, "localHoriz": localHorizFacilityReferencePt, "localVert": localVertFacilityReferencePt },
            { id: "FieldReferencePt", col1: 'Field Reference Pt', "localNorth": localNorthFieldReferencePt, "localEast": localEastFieldReferencePt, "localGridNorth": localGridNorthFieldReferencePt, "localGridEast": localGridEastFieldReferencePt, "localLongitude": localLongitudeFieldReferencePt, "localLatitude": localLatitudeFieldReferencePt, "localHoriz": localHorizFieldReferencePt, "localVert": localVertFieldReferencePt },
        ];
        updateLokiRows(modifiedRows);
    }
    const fetchPlanned = async () => {
        try {
            const idVal = localStorage.getItem('id');
            const data = await getSavedData(`https://og-project.onrender.com/api/v1/getWellPlanned?excelName=${setUp.excelName}&id=${idVal}`);
            if (data.plan.length) {
                setPlannedRows(data.plan)
            }
        } catch (error) {
            console.log('error');
        }

    };
    const fetchLogs = async () => {
        try {
            const idVal = localStorage.getItem('id');
            const data = await getSavedData(`https://og-project.onrender.com/api/v1/allLogs?id=${idVal}`);
            if (data.logs.length) {
                setLog(data.logs);
            }
        } catch (error) {
            console.log('error');
        }
    };


    const getCellClassName = ({ value, field }) => {
        if (!value && field !== 'col9') {
            return 'empty-cell';
        } else if (field === 'col9' && !value) {
            return 'last-cellempty';
        } else if (field === 'col9') {
            return 'last--cell';
        }
        return '';
    };
    const sendData = async (fieldObj) => {
        try {
            const idVal = localStorage.getItem('id');
            const data = await postFieldData(`https://og-project.onrender.com/api/v1/updateFields?excelName=${setUp.excelName}&id=${idVal}`, fieldObj)
            if (data) {
                console.log('success');
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleCellEdit = (params, event) => {
        const head = `${params.field}${params.id}`;
        sendData({ [head]: event.target.value });
    }
    const fetchTie = async () => {
        let tieOnRows = surveyRows;
        try {
            const iVal = localStorage.getItem('id');
            const updateTie = await getSavedData(`https://og-project.onrender.com/api/v1/getTieOnPoint?id=${iVal}&excelName=${setUp.excelName}`)
            if (updateTie.tieOn) {
                const newSurvey = updateTie.tieOn;
                const updatedRow = {
                    "id": 1,
                    "fieldNumber": "Tie On",
                    "md": formatNumberToTwoDecimalPlaces(newSurvey["md"]),
                    "cl": formatNumberToTwoDecimalPlaces(newSurvey["cl"]),
                    "inc": formatNumberToTwoDecimalPlaces(newSurvey["inc"]),
                    "azi": formatNumberToTwoDecimalPlaces(newSurvey["azi"]),
                    "tvd": formatNumberToTwoDecimalPlaces(newSurvey["tvd"]),
                    "ns": formatNumberToTwoDecimalPlaces(newSurvey["ns"]),
                    "ew": formatNumberToTwoDecimalPlaces(newSurvey["ew"]),
                    "dls": formatNumberToTwoDecimalPlaces(newSurvey["dls"]),
                    "vs": formatNumberToTwoDecimalPlaces(newSurvey["vs"]),
                    "comment": ""
                };
                tieOnRows = surveyRows.map((row) => (row.id === updatedRow.id ? updatedRow : row));
            }
        } catch (error) {
            console.log(error);
        }
        setSurveyRows(tieOnRows);
    }
    useEffect(() => {
        if (setUp.enteries) {
            fetchPlanned();
            fetchLogs();
            fetchTie();
            handleLokiPlease();
        }
    }, [setUp.enteries])
    return (
        <Box component={'div'} sx={{ height: '100%', width: '100%' }}>
            <StyledDataGrid
                rowSelection={false}
                disableColumnMenu
                disableColumnFilter
                rows={lokiRows}
                onCellEditStop={handleCellEdit}
                isCellEditable={(params) => (params.field !== 'col1' && setUp.enteries)}
                hideFooter
                rowHeight={42}
                columnHeaderHeight={72}
                columns={columns.map((column) => ({
                    ...column,
                    cellClassName: getCellClassName,
                    renderHeader: (params) => (
                        <div className="MuiDataGrid-columnHeaderTitle">
                            <div className="MuiDataGrid-colCellTitle">{column.headerName}</div>
                            <div className="MuiDataGrid-colCellTitleUnits">{column.headerUnits}</div>
                        </div>
                    ),
                }))}
            />
        </Box>
    );
}