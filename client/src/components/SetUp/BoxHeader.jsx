import { Box, Typography } from '@mui/material';

const BoxHeader = ({ boxHead }) => {
    return (<Box padding={{ md: "14px 28px", sm: "14px 20px", xs: "14px 18px" }} sx={{
        backgroundColor: "#f1f1f1",
        borderRadius: "0.2rem 0.2rem 0rem 0rem",
        borderBottom: "1px solid #a8a4a48f"
    }} >
        <Typography variant='h5' component='h1' fontWeight={'bold'}>
            {boxHead}
        </Typography>
    </Box>

    )
}

export default BoxHeader