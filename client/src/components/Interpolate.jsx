import { Box, Stack, Paper } from '@mui/material';
import PathTable from './InterpolatePath/PathTable';
import BoxHeader from './SetUp/BoxHeader';

const Interpolate = () => {
  return (
    <Box mt={3} mb={6}>
      <Paper square={false} elevation={0} sx={{
        border: "1px solid #a8a4a48f"
      }}>
        <Stack direction='column' alignItems={'stretch'} width={'100%'}>
          <BoxHeader boxHead="Interpolate Surveys" />
          <Box>
            <PathTable />
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Interpolate