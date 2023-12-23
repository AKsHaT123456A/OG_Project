import { Button, Box, Modal, Stack, TextField, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useMatchStore } from "../../store/store";
import BoxHeader from "../SetUp/BoxHeader";
import { useState } from "react";
import { postLogData } from "../constant";
import CircularProgress from '@mui/material/CircularProgress';


const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '0.5em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const EditNew = () => {
    const { setOpen, open, logArray, setLog, logIndex } = useMatchStore();
    const [form, setForm] = useState({
        logName: logArray[open.id].logName,
        model: logArray[open.id].model,
        error: logArray[open.id].error,
        loading: false,
    })


    const handleClose = () => {
        setOpen({ show: false, text: '', id: -1 });
    }
    const handleSave = async () => {
        setForm({
            ...form,
            loading: true
        })
        const idVal = localStorage.getItem('id');
        const logData = await postLogData(`https://og-project.onrender.com/api/v1/surveyEdit?id=${idVal}`, {
            "logName": logArray[open.id].logName,
            "editLogName": form.logName

        });
        console.log(logData);
        if (logData) {
            const newLog = [...logArray];
            if (newLog[logIndex]) {
                newLog[logIndex]["logName"] = form.logName;
            }
            setLog(newLog);
        } else {
            alert('Log not added.');
        }
        setForm({
            ...form,
            loading: false
        })

        handleClose();
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
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

                            <BoxHeader boxHead="Edit Survey Log" />

                            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gap={2}>

                                <TextField
                                    name="logName"
                                    variant="outlined"
                                    fullWidth
                                    label="Survey Tool Program Name"
                                    inputProps={{ style: { fontSize: 15.2 } }}
                                    size="medium"
                                    value={form.logName}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="model-label">Survey Tool Model</InputLabel>
                                    <Select
                                        name="model"
                                        labelId="model-label"
                                        id="model"
                                        value={form.model}
                                        label="Survey Tool Model"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"ISCWSA MWD"}>ISCWSA MWD</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="error-label">Error Model</InputLabel>
                                    <Select
                                        name="error"
                                        labelId="error-label"
                                        id="error"
                                        value={form.error}
                                        label="Error Model"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"MWD-STD"}>MWD-STD</MenuItem>
                                    </Select>
                                </FormControl>

                                <Stack direction={'row'} mt={2} justifyContent="flex-end" spacing={2}>
                                    <Button variant="text" sx={{
                                        color: "gray"
                                    }} onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" disabled={(form.logName === '' || form.model === '' || form.error === '') ? true : false} sx={{
                                        "&.MuiButtonBase-root:hover": {
                                            bgcolor: "#0abd61"
                                        }
                                    }} onClick={handleSave}> {form.loading ? <CircularProgress size={14} color="secondary" /> : 'Save'}</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </div>
    )
}

export default EditNew