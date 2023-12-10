import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useMatchStore } from '../../store/store';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useState } from 'react';

export default function LogTable() {
    const { setOpen, logArray } = useMatchStore();
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    const handleButton = (val, idx) => {
        setOpen({ show: true, text: val, id: idx });
    }

    const handleRowClick = (e) => {
        const rowIndex = parseInt(e.currentTarget.getAttribute('data-row-index'));
        setSelectedRowIndex(rowIndex);
      };
    return (
        <TableContainer component={Paper} elevation={0} >
            <Table aria-label="simple table" >
                <TableHead>
                    <TableRow >
                        <TableCell sx={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            fontFamily: '\'Ubuntu\', sans-serif',
                            paddingLeft: 3.5
                        }}>Log Name</TableCell>
                        <TableCell align="right" width={120} sx={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            fontFamily: '\'Ubuntu\', sans-serif',
                        }}>Depth From</TableCell>
                        <TableCell align="right" width={120} sx={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            fontFamily: '\'Ubuntu\', sans-serif',
                        }}>Depth To</TableCell>
                        <TableCell width={200}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logArray.map((row, index) => (
                        <TableRow
                            key={index}
                            hover
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                ':hover': {
                                    cursor: 'pointer'
                                }
                            }}
                            data-row-index={index}
                            onClick={handleRowClick}
                            className={selectedRowIndex === index ? "table-row selected" : "table-row"}
                        >
                            <TableCell component="th" scope="row" sx={{
                                paddingLeft: 3.5,
                                fontSize: '15.2px',
                                fontWeight: 500,
                            }}>
                                {row.naam}
                            </TableCell>
                            <TableCell align="right" sx={{
                                fontSize: '15.2px',
                                fontWeight: 500,
                            }}>{112.23}</TableCell>
                            <TableCell align="right" sx={{
                                fontSize: '15.2px',
                                fontWeight: 500
                            }}>{180.23}</TableCell>
                            <TableCell align="right" sx={{
                                paddingRight: 3.5
                            }}>
                                <Stack direction={'row'} justifyContent={'flex-end'} spacing={3}>
                                    <IconButton color='primary' size='small' onClick={() => handleButton('Edit', index)} sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        }
                                    }}>
                                        <EditOutlinedIcon fontSize='18px' />
                                    </IconButton>
                                    <IconButton color='primary' size='small' onClick={() => handleButton('Remove', index)} sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        }
                                    }}>
                                        <DeleteOutlineOutlinedIcon fontSize='18px' />
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}