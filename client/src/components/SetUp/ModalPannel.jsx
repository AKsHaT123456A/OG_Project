import { Button, Box, Modal, Stack, TextField, Typography } from "@mui/material"
import { useMatchStore } from "../../store/store";


const style = {
    position: 'absolute',
    top: '50%',
    borderRadius: '0.5em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3.5,
};

const ModalPannel = () => {
    const { setOpen, open } = useMatchStore();

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div >
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={{
                    xl: 480,
                    sm: 320,
                    xs: 220
                }} >
                    <Stack spacing={2.5}>
                        <Typography id="modal-modal-title" variant="h6" fontWeight="medium" pb={1.2} component="h2">
                            Edit Wellbore
                        </Typography>
                        <TextField
                            name="name"
                            label="Name"
                            id="outlined-size-small"
                            size="small"
                        />
                        <TextField
                            name="created"
                            label="Created"
                            id="outlined-size-small"
                            size="small"
                        />
                         <TextField
                            name="lastRevised"
                            label="Last Revised"
                            id="outlined-size-small"
                            size="small"
                        />
                       
                        <Stack direction="row" justifyContent="flex-end" spacing={1} pt={3}>
                            <Button variant="text" sx={{
                                color: "#0abd61"
                            }} onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" disableElevation disabled>
                                Save
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalPannel