import { Box, Stack, Button, Typography, Paper } from '@mui/material';
import { useMatchStore } from '../store/store';
import { VisuallyHiddenInput, uploadFile } from '../store/constant';
import LabelInput from './SetUp/LabelInput';
import BoxHeader from './SetUp/BoxHeader';
import LabelSelect from './SetUp/LabelSelect';
import CircularProgress from '@mui/material/CircularProgress';
import LabelDateInput from './SetUp/LabelDateInput';



const SetUp = () => {
  const { setUp, updateSetUp } = useMatchStore();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      updateSetUp({ ...setUp, loading: true, enteries: false, uploadFile: file.name })
      const data = await uploadFile(file);
      if (data) {
        updateSetUp({
          ...data.setup, loading: false, enteries: true,
          additional: {
            Units: "",
            VerticalSectionAzimuth: "",
            SurveyReferencePoint: ""
          },
          uploadFile: file.name
        });
      } else {
        updateSetUp({
          wellbore: {
            Name: "",
            Created: "dd-mm-yy",
            LastRevised: "dd-mm-yy",
          },
          well: {
            Name: "",
            GovernmentId: "",
            LastRevised: "dd-mm-yy",
          },
          slot: {
            Name: "",
            GridNorthing: "",
            GridEasting: "",
            Latitude: "",
            Longitude: "",
            North: "",
            East: ""
          },
          installation: {
            Name: "",
            Easting: "",
            Northing: "",
            MapName: "",
            NorthAlignment: ""
          },
          field: {
            Name: "",
            Easting: "",
            Northing: "",
            MapName: "",
            NorthAlignment: ""
          },
          additional: {
            Units: "",
            VerticalSectionAzimuth: "",
            SurveyReferencePoint: ""
          },
          enteries: false,
          loading: false,
          uploadedFile: ""
        });
        alert('File not supported!');
      }
    }
  };

  return (
    <Box mt={2.5} component="div">

      <Stack alignItems={{ md: "center", xs: "space-between" }} justifyContent={'space-between'} spacing={4} direction={{ md: 'row', xs: 'column-reverse' }}>
        <Typography variant='h5' fontWeight={500} width={'100%'} >
          {
            (!setUp.enteries) ? "Import Well Plan" : "Current Well Plan"
          }
        </Typography>
        <Stack direction={{ sm: 'row', xs: 'row-reverse' }} width={'100%'} justifyContent={{ sm: "flex-end", xs: "space-between" }} alignItems='center' gap={{ sm: 8, xs: 2 }} alignSelf={{ sm: "flex-end", xs: "flex-start" }}>
          {
            (setUp.enteries) && <Typography variant='h5' fontWeight={500} color="#009B4D">{setUp.uploadFile}</Typography>
          }
          {
            (setUp.loading) && <CircularProgress size={28} />
          }

          <Button variant="contained" onClick={() => document.getElementById('fileInput').click()}>
            Select File
            <VisuallyHiddenInput id="fileInput" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          </Button>
        </Stack>
      </Stack>

      <Stack component='div' my={6} direction='column' spacing={4} >

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Wellbore" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.wellbore.Name} fieldName="setUp.wellbore.Name" />

              <LabelDateInput fieldLabel="Created" fieldStatus={!setUp.enteries} fieldValue={(setUp.wellbore.Created.includes('T')) ? setUp.wellbore.Created.split('T')[0] : (setUp.wellbore.Created)} fieldName="setUp.wellbore.Created" />

              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={(setUp.wellbore.LastRevised.includes('T')) ? setUp.wellbore.LastRevised.split('T')[0] : (setUp.wellbore.LastRevised)} fieldName="setUp.wellbore.LastRevised" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Well" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.well.Name} fieldName="setUp.well.Name" />

              <LabelInput fieldLabel="Government Id" fieldStatus={!setUp.enteries} fieldValue={setUp.well.GovernmentId} fieldName="setUp.well.GovernmentId" />

              <LabelDateInput fieldLabel="Last Revised" fieldStatus={!setUp.enteries} fieldValue={(setUp.well.LastRevised.includes('T')) ? setUp.well.LastRevised.split('T')[0] : (setUp.well.LastRevised)} fieldName="setUp.well.LastRevised" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Slot" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Name} fieldName="setUp.slot.Name" />

              <LabelInput fieldLabel="Grid Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.GridNorthing} fieldName="setUp.slot.GridNorthing" />

              <LabelInput fieldLabel="Grid Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.GridEasting} fieldName="setUp.slot.GridEasting" />

              <LabelInput fieldLabel="Latitude" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Latitude} fieldName="setUp.slot.Latitude" />

              <LabelInput fieldLabel="Longitude" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.Longitude} fieldName="setUp.slot.Longitude" />

              <LabelInput fieldLabel="North" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.North} fieldName="setUp.slot.North" />

              <LabelInput fieldLabel="East" fieldStatus={!setUp.enteries} fieldValue={setUp.slot.East} fieldName="setUp.slot.East" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Installation" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Name} fieldName="setUp.installation.Name" />

              <LabelInput fieldLabel="Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Easting} fieldName="setUp.installation.Easting" />

              <LabelInput fieldLabel="Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.Northing} fieldName="setUp.installation.Northing" />

              <LabelInput fieldLabel="Map Name" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.MapName} fieldName="setUp.installation.MapName" />

              <LabelSelect fieldLabel="North Alignment" fieldStatus={!setUp.enteries} fieldValue={setUp.installation.NorthAlignment} fieldName="setUp.installation.NorthAlignment" fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Field" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Name" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Name} fieldName="setUp.field.Name" />

              <LabelInput fieldLabel="Easting" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Easting} fieldName="setUp.field.Easting" />

              <LabelInput fieldLabel="Northing" fieldStatus={!setUp.enteries} fieldValue={setUp.field.Northing} fieldName="setUp.field.Northing" />

              <LabelInput fieldLabel="Map Name" fieldStatus={!setUp.enteries} fieldValue={setUp.field.MapName} fieldName="setUp.field.MapName" />

              <LabelSelect fieldLabel="North Alignment" fieldStatus={!setUp.enteries} fieldValue={setUp.field.NorthAlignment} fieldName="setUp.field.NorthAlignment" fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Additional" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldLabel="Units" fieldStatus={!setUp.enteries} fieldValue={setUp.additional.Units} fieldName="setUp.additional.Units" />

              <LabelInput fieldLabel="Vertical Section Azimuth" fieldStatus={!setUp.enteries} fieldValue={setUp.additional.VerticalSectionAzimuth} fieldName="setUp.additional.VerticalSectionAzimuth" />

              <LabelSelect fieldLabel="Survey Reference Point" fieldValue={setUp.additional.SurveyReferencePoint} fieldName="setUp.additional.SurveyReferencePoint" fieldArray={["Rotary Table"]} fieldStatus={!setUp.enteries} />

            </Stack>
          </Stack>
        </Paper>

      </Stack>
    </Box>
  )
}




export default SetUp