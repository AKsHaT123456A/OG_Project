
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useMatchStore } from '../../store/store';
import { getSavedData } from '../constant';
import { useEffect } from 'react';

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
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid #e7e7e6`,
        paddingLeft: '10px',
        paddingRight: '10px'

    },
    '& .MuiDataGrid-columnHeader:last-of-type , .MuiDataGrid-cell:last-of-type': {
        borderRight: `none`,
        paddingLeft: '10px',
        paddingRight: '10px'

    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
        borderBottom: `1px solid #e7e7e6`,
    },
    '& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell': {
        borderBottom: 'none'
    },
    '& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell:first-of-type': {
        borderRadius: '0rem 0rem 0rem 0.2rem'
    },
    '& .MuiDataGrid-row--lastVisible .column-cell': {
        borderRadius: '0rem 0rem 0.2rem 0rem',
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
    '& .frozen--cell': {
        backgroundColor: '#fafafa'
    },
    '& ::-webkit-scrollbar': {
        width: '4px',
        height: '4px'
    },


    '& ::-webkit-scrollbar-track': {
        background: 'lightgray',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& .column-cell': {
        borderRight: "none",
    },
    '& ::-webkit-scrollbar-thumb': {
        background: '#f1f1f1',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    }
}));


const initialColumns = [
    { field: 'fieldNumber', headerName: '', width: 50, sortable: false, align: 'center', headerAlign: 'center', },
    { field: 'md', headerName: 'MD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell' },
    { field: 'inc', headerName: 'Inc', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'azi', headerName: 'Azi', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'tvd', headerName: 'TVD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'tvdss', headerName: 'TVDSS', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'north', headerName: 'North', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'east', headerName: 'East', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'dls', headerName: 'DLS', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'toolface', headerName: 'Toolface', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'buildrate', headerName: 'Build Rate', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'turnrate', headerName: 'Turn Rate', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'vs', headerName: 'VS', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'comments', headerName: 'Comments', minWidth: 100, align: 'center', headerAlign: 'center', flex: 1, sortable: false, cellClassName: ['frozen--cell', 'column-cell'], },
];


export default function PathTable() {
    const { plannedRows, setUp, setPlannedRows, notEditPlannedRows } = useMatchStore();
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

    useEffect(() => {
        if (setUp.enteries) {
            const fetchDataInterval = setInterval(async () => {
                await fetchPlanned();
            }, 400);

            // Stop the interval after 20 seconds
            const stopIntervalTimeout = setTimeout(() => {
                clearInterval(fetchDataInterval);
            }, 130000);


            return () => {
                clearInterval(fetchDataInterval);
                clearTimeout(stopIntervalTimeout);
            };
        } else {
            setPlannedRows(notEditPlannedRows);
        }
    }, [setUp.excelName]);


    return (
        <Box component={'div'} sx={{ height: 800, width: '100%' }}>
            <StyledDataGrid
                rowSelection={false}
                disableColumnMenu
                disableColumnFilter
                rows={plannedRows}
                pagination
                rowHeight={42}
                columnHeaderHeight={72}
                columns={initialColumns.map((column) => ({
                    ...column,
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