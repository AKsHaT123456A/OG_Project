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
import { useEffect } from 'react';
import { formatNumberToTwoDecimalPlaces, getSavedData } from '../constant';

export default function LogTable() {
    const { setOpen, logArray, logIndex, setLogIndex, surveyRows, setSurveyRows, surveyNotEditRows, setUp } = useMatchStore();

    const handleButton = (val, idx) => {

        setOpen({ show: true, text: val, id: idx });
    }

    const handleRowClick = (e) => {
        const rowIndex = parseInt(e.currentTarget.getAttribute('data-row-index'));
        setLogIndex(rowIndex);
    };

    const fetchSurveys = async () => {
        let tieOnRow = { ...surveyRows[0] };
        const iVal = localStorage.getItem('id');
        const updateTie = await getSavedData(`https://og-project.onrender.com/api/v1/getTieOnPoint?id=${iVal}&excelName=${setUp.excelName}`)
        if (updateTie.tieOn) {
            const newSurvey = updateTie.tieOn;
            tieOnRow = {
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
        }
        const data = await getSavedData(`https://og-project.onrender.com/api/v1/allSurveys?logName=${logArray[logIndex].logName}&id=${iVal}`);
        if (data.surveys.length) {
            let updatedRows = [];
            data.surveys.map((sdata, index) => {
                let updated;
                updated = {
                    key: index + 2,
                    "id": index + 2,
                    "fieldNumber": Number(sdata.fieldNumber),
                    "md": formatNumberToTwoDecimalPlaces(sdata["md"]),
                    "inc": formatNumberToTwoDecimalPlaces(sdata["inc"]),
                    "azi": formatNumberToTwoDecimalPlaces(sdata["azi"]),
                    "tvd": formatNumberToTwoDecimalPlaces(sdata["tvd"]),
                    "ns": formatNumberToTwoDecimalPlaces(sdata["ns"]),
                    "ew": formatNumberToTwoDecimalPlaces(sdata["ew"]),
                    "dls": formatNumberToTwoDecimalPlaces(sdata["dls"]),
                    "vs": formatNumberToTwoDecimalPlaces(sdata["vs"]),
                    "cl": formatNumberToTwoDecimalPlaces(sdata["cl"]),
                    "comment": ""
                }
                updatedRows = [...updatedRows, updated];
            })
            const getSurveyRows = surveyNotEditRows.slice(updatedRows.length);
            if (getSurveyRows.length === 0) {
                const iRow = { id: updatedRows.length + 2, fieldNumber: updatedRows.length + 1, md: '', inc: '', azi: '', tvd: '', ns: '', ew: '', vs: '', dls: '', cl: '', comment: '' };
                setSurveyRows([tieOnRow, ...updatedRows, iRow]);
            } else {
                setSurveyRows([tieOnRow, ...updatedRows, ...getSurveyRows]);
            }
        } else {
            setSurveyRows([tieOnRow, ...surveyNotEditRows]);
        }


    };

    useEffect(() => {
        if (logIndex !== -1) {
            fetchSurveys();
        }
    }, [logIndex])
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
                            className={logIndex === index ? "table-row selected" : "table-row"}
                        >
                            <TableCell component="th" scope="row" sx={{
                                paddingLeft: 3.5,
                                fontSize: '15.2px',
                                fontWeight: 500,
                            }}>
                                {row.logName}
                            </TableCell>
                            <TableCell align="right" sx={{
                                fontSize: '15.2px',
                                fontWeight: 500,
                            }}>{(Number(row.usedFrom)) ? formatNumberToTwoDecimalPlaces(row.usedFrom) : " "}</TableCell>
                            <TableCell align="right" sx={{
                                fontSize: '15.2px',
                                fontWeight: 500
                            }}>{(Number(row.usedBy)) ? formatNumberToTwoDecimalPlaces(row.usedBy) : " "}</TableCell>
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