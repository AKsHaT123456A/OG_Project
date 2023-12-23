
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useMatchStore } from '../../store/store';
import { formatNumberToTwoDecimalPlaces, formatStringInNumberToTwoDecimalPlaces, postLogData } from '../constant';

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




export default function PathTable() {
    const { interpolateRows, setUp, updateInterpolateRows } = useMatchStore();
    const [call, setCall] = useState(false);
    const [ids, setIds] = useState(-1);
    const apiRef = useGridApiRef();
    const initialColumns = [
        { field: 'index', headerName: '', width: 50, sortable: false, align: 'center', headerAlign: 'center', },
        { field: 'md', headerName: 'MD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'Unfrozen--cell', editable: (setUp.excelName !== "") ? true : false, flex: 1 },
        { field: 'inc', headerName: 'Inc', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
        { field: 'azi', headerName: 'Azi', headerUnits: '(deg)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
        { field: 'tvd', headerName: 'TVD', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
        { field: 'ns', headerName: 'Local N', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
        { field: 'ew', headerName: 'Local E', headerUnits: '(ft)', minWidth: 100, align: 'right', headerAlign: 'center', sortable: false, cellClassName: 'frozen--cell', flex: 1 },
        { field: 'comment', headerName: 'Comments', minWidth: 300, align: 'center', headerAlign: 'center', flex: 1, sortable: false, cellClassName: ['Unfrozen--cell', 'column-cell'], editable: (setUp.excelName !== "") ? true : false },
    ];


    const handleCellEditStop = (params, event) => {

        let updateCell = interpolateRows;
        if (params.field !== 'comment') {
            const val = formatStringInNumberToTwoDecimalPlaces(event.target.value);
            updateCell = interpolateRows.map((sRow, index) => {
                if (index === params.id - 1) {
                    return {
                        ...sRow,
                        [params.field]: val,
                    };
                } else {
                    return sRow;
                }
            });
            setCall(true);
        } else {
            updateCell = interpolateRows.map((sRow, index) => {
                if (index === params.id - 1) {
                    return {
                        ...sRow,
                        [params.field]: event.target.value,
                    };
                } else {
                    return sRow;
                }
            });
            setCall(false);
        }
        updateInterpolateRows(updateCell);
        setIds(params.id - 1);
    };

    const processRowUpdate = async (currentRow) => {
        const idVal = localStorage.getItem('id');
        const data = await postLogData(`https://og-project.onrender.com/api/v1/interpolate?id=${idVal}`, {
            "md": Number(currentRow.md),
            "excelName": setUp.excelName
        });

        let updatedRow;

        if (data && !data.error) {
            updatedRow = {
                "id": currentRow.id,
                "index": currentRow.index,
                "md": formatNumberToTwoDecimalPlaces(data["md"]),
                "cl": formatNumberToTwoDecimalPlaces(data["cl"]),
                "inc": formatNumberToTwoDecimalPlaces(data["inc"]),
                "azi": formatNumberToTwoDecimalPlaces(data["azi"]),
                "tvd": formatNumberToTwoDecimalPlaces(data["tvd"]),
                "ns": formatNumberToTwoDecimalPlaces(data["ns"]),
                "ew": formatNumberToTwoDecimalPlaces(data["ew"]),
                "dls": formatNumberToTwoDecimalPlaces(data["dls"]),
                "vs": formatNumberToTwoDecimalPlaces(data["vs"]),
                "comment": currentRow.comment
            };
        } else {
            updatedRow = { ...currentRow };
        }
        setCall(false);
        const updatedRows = interpolateRows.map((row) => (row.id === currentRow.id ? updatedRow : row));
        console.log(currentRow.id, interpolateRows.length, 'harsh ki jadu')
        if (currentRow.id === interpolateRows.length) {
            const iRow = { id: currentRow.id + 1, index: `${currentRow.id + 1}`, md: '', inc: '', azi: '', tvd: '', ns: '', ew: '', comment: '' };
            updateInterpolateRows([...updatedRows, iRow]);
        } else {
            updateInterpolateRows(updatedRows);
        }

    }


    useEffect(() => {
        if (call) {
            const currentRow = interpolateRows[ids];
            const MaxMd = Number(localStorage.getItem('MaxMd'));
            const MinMd = Number(localStorage.getItem('MinMd'));
            const mdC = Number(currentRow.md);
            console.log(mdC, MaxMd, MinMd);
            if (mdC > MinMd && mdC < MaxMd) {
                if (currentRow.id === interpolateRows.length) {
                    const iRow = { id: currentRow.id + 1, index: `${currentRow.id + 1}`, md: '', inc: '', azi: '', tvd: '', ns: '', ew: '', comment: '' };
                    updateInterpolateRows([...interpolateRows, iRow]);
                    apiRef.current.setCellFocus(currentRow.id + 1, "md");
                }
                processRowUpdate(currentRow);
            } else {
                alert('Value of MD must lie between Maximum md and Minimum md.');
                apiRef.current.setCellFocus(currentRow.id, "md");
            }

        }
    }, [interpolateRows])


    return (
        <Box component={'div'} sx={{ height: 800, width: '100%' }}>
            <StyledDataGrid
                rowSelection={false}
                disableColumnMenu
                disableColumnFilter
                onCellEditStop={handleCellEditStop}
                rows={interpolateRows}
                apiRef={apiRef}
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