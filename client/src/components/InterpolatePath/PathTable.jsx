
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';

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
    },
    '& .Unfrozen--cell': {
        backgroundColor: '#f2ffff'
    },
}));

const initialRows = [
    { id: 1, col1: '1', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 2, col1: '2', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 3, col1: '3', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 4, col1: '4', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 5, col1: '5', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 6, col1: '6', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 7, col1: '7', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 8, col1: '8', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 9, col1: '9', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 10, col1: '10', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 11, col1: '11', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 12, col1: '12', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 13, col1: '13', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 14, col1: '14', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 15, col1: '15', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 16, col1: '16', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 17, col1: '17', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 18, col1: '18', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 19, col1: '19', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },
    { id: 20, col1: '20', col2: '0.02', col3: '0.00', col4: '193.630', col5: '0.02', col6: '0.00', col7: '0.02', col8: '0.002', col9: '0.00', col10: '0', col11: '0.5', col12: '0', col13: '0', col14: 'this is comment' },

];

const initialColumns = [
    { field: 'col1', headerName: '', width: 50, sortable: false, align: 'center', headerAlign: 'center', },
    { field: 'col2', headerName: 'MD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell', editable: true, flex: 1 },
    { field: 'col3', headerName: 'Inc', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
    { field: 'col4', headerName: 'Azi', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
    { field: 'col5', headerName: 'TVD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
    { field: 'col7', headerName: 'Local N', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
    { field: 'col8', headerName: 'Local E', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
    { field: 'col14', headerName: 'Comments', minWidth: 300, align: 'center', headerAlign: 'center', flex: 1, sortable: false, cellClassName: ['Unfrozen--cell', 'column-cell'], editable: true },
];


export default function PathTable() {
    const [rows, setRows] = useState(initialRows);


    return (
        <Box component={'div'} sx={{ height: 800, width: '100%' }}>
            <StyledDataGrid
                rowSelection={false}
                disableColumnMenu
                disableColumnFilter
                rows={rows}
                hideFooter
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