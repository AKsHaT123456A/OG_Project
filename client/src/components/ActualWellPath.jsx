import { Box, Stack, Paper, Typography, Button } from '@mui/material';
import LogTable from './ActualWellPath/LogTable';
import SurveyTable from './ActualWellPath/SurveyTable';
import BoxHeader from './SetUp/BoxHeader';
import { useMatchStore } from '../store/store';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ActualWellPath = () => {
  const { setOpen, logArray, setUp } = useMatchStore();

  const handleClick = (val) => {
    if (setUp.excelName !== "") {
      setOpen({ show: true, text: val, id: -1 });
    }
  }
  return (
    <Box mt={2.5} component="div" mb={6}>
      <Stack direction={'column'} spacing={5}>
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
                  Survey Tool Program
                </Typography>
                <Button variant="contained" size="small" onClick={() => handleClick('Add')}
                  sx={{
                    'border': 'none',
                    ':hover': {
                      background: '#0abd61'
                    },
                    position: 'absolute',
                    right: 0,
                    fontSize: '14px'
                  }}>
                  Add New Log
                </Button>

              </Stack>
            </Box>
            {
              (logArray.length)
                ?
                <Box >
                  <LogTable />
                </Box>
                :
                <Stack direction={'row'} alignSelf={'flex-start'} alignItems={'center'} spacing={1} px={4} py={2}>
                  <InfoOutlinedIcon fontSize='small' />
                  <Typography sx={{
                    fontSize: '15.2px',
                    fontWeight: 400
                  }} >Create a new Survey Log to start posting Surveys.</Typography>
                </Stack>
            }

          </Stack>
        </Paper>
        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Actual Surveys" />
            <Box>
              <SurveyTable />
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}

export default ActualWellPath