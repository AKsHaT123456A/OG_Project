
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

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
        fontWeight: "600",
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
        borderRight: `1px solid #e7e7e6`,
        paddingLeft: '28px',
        paddingRight: '28px'

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
    '& .Unfrozen--cell': {
        backgroundColor: '#f2ffff'
    },

    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
        width: '4px' /* Change this value to adjust the width of the scrollbar */
    },


    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
        background: 'lightgray',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& .column-cell': {
        borderRight: "none",
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
        background: '#f1f1f1',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& ::-webkit-scrollbar': {
        width: '4px',
        height: '4px'
    },


    '& ::-webkit-scrollbar-track': {
        background: 'lightgray',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    },
    '& ::-webkit-scrollbar-thumb': {
        background: '#f1f1f1',
        borderRadius: '0rem 0rem 0.2rem 0rem'
    }
}));

const initialRows = [
    { id: 1, col1: 'Tie On', col2: '0.00', col3: '0.00', col4: '193.630', col5: '0.00', col6: '0.00', col7: '0.00', col8: '', col9: '0.00', col10: '' },
    { id: 2, col1: 2, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 3, col1: 3, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 4, col1: 4, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 5, col1: 5, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 6, col1: 6, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 7, col1: 7, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 8, col1: 8, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 9, col1: 9, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 10, col1: 10, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 11, col1: 11, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 12, col1: 12, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 13, col1: 13, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 14, col1: 14, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },
    { id: 15, col1: 15, col2: '', col3: '', col4: '', col5: '', col6: '', col7: '', col8: '', col9: '', col10: '' },

];

const initialColumns = [
    { field: 'col1', headerName: '', width: 105, sortable: false },
    { field: 'col2', headerName: 'MD', headerUnits: '(ft)', minWidth: 115, editable: true, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell' },
    { field: 'colE', headerName: 'CL', headerUnits: '(ft)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell' },
    { field: 'col3', headerName: 'Inc', headerUnits: '(deg)', minWidth: 115, editable: true, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell', },
    { field: 'col4', headerName: 'Azi', headerUnits: '(deg)', minWidth: 115, editable: true, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell', },
    { field: 'col5', headerName: 'TVD', headerUnits: '(ft)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'col6', headerName: 'North', headerUnits: '(ft)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'col7', headerName: 'East', headerUnits: '(ft)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'col8', headerName: 'DLS', headerUnits: '(deg)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'col9', headerName: 'VS', headerUnits: '(ft)', minWidth: 115, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', },
    { field: 'col10', headerName: 'Comment', minWidth: 180, align: 'right', editable: true, headerAlign: 'center', flex: 1, sortable: false, cellClassName: ['Unfrozen--cell', 'column-cell'], },
];


export default function SurveyTable() {
    const [rows, setRows] = useState(initialRows);

    useEffect(() => {
        const allRowsFilled = rows.slice(1).every((row) =>
            Object.values(row).every((value) => value !== '')
        );

        if (allRowsFilled) {
            // If all rows (excluding header and row 1) are filled, add a new empty row
            const newRow = {
                id: rows.length + 1,
                col1: rows[rows.length - 1].col1 + 1,
                col2: '',
                col3: '',
                col4: '',
                col5: '',
                col6: '',
                col7: '',
                col8: '',
                col9: '',
                col10: '',
            };
            setRows((prevRows) => [...prevRows, newRow]);
        }
    }, [rows]);


    return (
        <Box component={'div'} sx={{ height: 702, width: '100%' }}>
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