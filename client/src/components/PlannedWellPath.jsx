import { Box, Stack, Typography, Paper } from '@mui/material';
import PathTable from './PlannedWellPath/PathTable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const PlannedWellPath = () => {

  return (
    <Box mt={3} mb={6}>
      <Paper square={false} elevation={0} sx={{
        border: "1px solid #a8a4a48f"
      }}>
        <Stack direction='column' alignItems={'stretch'} width={'100%'}>
          <Box padding={{ md: "14px 28px", sm: "14px 20px", xs: "14px 18px" }} sx={{
            backgroundColor: "#f1f1f1",
            borderRadius: "0.2rem 0.2rem 0rem 0rem",
            borderBottom: "1px solid #a8a4a48f"
          }} >
            <Stack direction={{ sm: 'row', xs: 'column' }} sx={{
              position: 'relative'
            }} spacing={4} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='h5' component='h1' fontWeight={600}>
                Planned Surveys
              </Typography>
              <Stack direction={'row'} alignSelf={'flex-start'} alignItems={'center'} spacing={1}>
                <InfoOutlinedIcon fontSize='small'/>
                <Typography sx={{
                  fontSize: '15.2px',
                  fontWeight: 400
                }} >You can change Planned Well Path by uploading another Well Plan from Setup Tab.</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <PathTable />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default PlannedWellPath