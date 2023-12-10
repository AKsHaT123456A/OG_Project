import { Box, Stack, Paper, Typography, Button } from '@mui/material';
import LogTable from './ActualWellPath/LogTable';
import SurveyTable from './ActualWellPath/SurveyTable';
import BoxHeader from './SetUp/BoxHeader';
import { useMatchStore } from '../store/store';
import AddIcon from '@mui/icons-material/Add';

const ActualWellPath = () => {
  const { setOpen } = useMatchStore();

  const handleClick = (val) => {
    setOpen({ show: true, text: val, id: -1 });
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
                <Typography variant='h5' component='h1' fontWeight={'bold'}>
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
            <Box >
              <LogTable />
            </Box>
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