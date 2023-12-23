import { Button, Box, Modal, Stack, Paper, Typography } from "@mui/material"
import { useMatchStore } from "../../store/store";
import BoxHeader from "../SetUp/BoxHeader";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react";
import { DeleteLogData, formatNumberToTwoDecimalPlaces, getSavedData } from "../constant";


const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '0.5em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const DelNew = () => {
    const { setOpen, open, logArray, setLog, surveyRows, setSurveyRows, surveyNotEditRows, setUp } = useMatchStore();
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setOpen({ show: false, text: '', id: -1 });
    }
    const handleDelete = async () => {
        setLoading(true);
        const idVal = localStorage.getItem('id');
        const logData = await DeleteLogData(`https://og-project.onrender.com/api/v1/deleteALog?id=${idVal}`, {
            "logName": logArray[open.id].logName,
        });
        if (logData) {
            const updatedLogArray = [
                ...logArray.slice(0, open.id),
                ...logArray.slice(open.id + 1),
            ];
            setLog(updatedLogArray);
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
            setSurveyRows([tieOnRow, ...surveyNotEditRows])

        } else {
            alert('Log not Deleted.');
        }
        handleClose();
        setLoading(false);
    }
    return (
        <div >
            <Modal
                open={open.show}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={{
                    xl: 480,
                    sm: 320,
                    xs: 220
                }} >
                    <Paper square={false} elevation={0} sx={{
                        border: "1px solid #a8a4a48f"
                    }}>
                        <Stack direction='column' alignItems={'stretch'} width={'100%'}>

                            <BoxHeader boxHead="Delete Survey Log" />

                            <Stack display={'grid'} mt={2} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gap={2}>

                                <Typography variant="subtitle1">All surveys associated with this Survey Log will be deleted. Are you sure?
                                </Typography>

                                <Stack direction={'row'} mt={2} justifyContent="flex-end" spacing={2}>
                                    <Button variant="text" sx={{
                                        color: "gray"
                                    }} onClick={handleClose}>Cancel</Button>
                                    <Button variant="text" sx={{
                                        color: "#0abd61",
                                        fontWeight: "600",
                                    }} onClick={handleDelete}> {loading ? <CircularProgress size={14} /> : 'Confirm'}</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </div>
    )
}

export default DelNew