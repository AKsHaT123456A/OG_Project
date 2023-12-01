import { Box, Stack, Button, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMatchStore } from '../store/store';
import { VisuallyHiddenInput, uploadFile } from './constant';
import LabelInput from './SetUp/LabelInput';
import BoxHeader from './SetUp/BoxHeader';
import LabelSelect from './SetUp/LabelSelect';



const SetUp = () => {
  const { setUp, updateSetUp } = useMatchStore();


  const [fileSelected, selectFile] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectFile(file);
      uploadFile(file);
    }
  };


  useEffect(() => {
    if (fileSelected !== "") {
      updateSetUp({
        ...setUp,
        wellbore: {
          name: "BB-xxx",
          created: "Oct-18-2023",
          lastRevised: "Oct-19-2023",
        },
        well: {
          name: "BB-xxx",
          governmentId: "",
          lastRevised: "09-15-2023",
        },
        slot: {
          name: "Slot #1",
          gridNorthing: "2631471.29",
          gridEasting: "766149.86",
          latitude: "N23 46 27.6398",
          longitude: "E53 36 41.4215",
          north: "0.00N",
          east: "0.00E"
        },
        installation: {
          name: "AD-xx_BB-xxxx",
          easting: "766149.86",
          northing: "2631471.29",
          mapName: "Nahrwan 1967 / UTM zone 39N",
          northAlignment: "Grid"
        },
        field: {
          name: "AD-xx_BB-xxxx",
          easting: "772508.0413",
          northing: "2647983.798",
          mapName: "Nahrwan 1967 / UTM zone 39N",
          northAlignment: "Grid"
        },
        additional: {
          units: "feet",
          verticalSectionAzimuth: "",
          surveyReferencePoint: "Rotary Table"
        }
      },)
    }
  }, [fileSelected])

  return (
    <Box mt={2.5} component="div">

      <Stack alignItems={{ md: "center", xs: "space-between" }} justifyContent={'space-between'} spacing={4} direction={{ md: 'row', xs: 'column-reverse' }}>
        <Typography variant='h5' fontWeight={500} width={'100%'} >
          {
            (fileSelected === "") ? "Import Well Plan" : "Current Well Plan"
          }
        </Typography>
        <Stack direction={{ sm: 'row', xs: 'row-reverse' }} width={'100%'} justifyContent={{ sm: "flex-end", xs: "space-between" }} alignItems='center' gap={{ sm: 8, xs: 2 }} alignSelf={{ sm: "flex-end", xs: "flex-start" }}>
          {
            (fileSelected !== "") && <Typography variant='h5' fontWeight={500} color="#009B4D">{fileSelected.name.split('.')[0].slice(0, 16)}.xlsx</Typography>
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

              <LabelInput fieldName="name" fieldLabel="Name" fieldStatus={fileSelected === ""} fieldValue={setUp.wellbore.name} fieldType="text" />

              <LabelInput fieldName="created" fieldLabel="Created" fieldStatus={fileSelected === ""} fieldValue={setUp.wellbore.created} fieldType={(setUp.wellbore.created === "") ? 'date' : 'text'} />

              <LabelInput fieldName="lastRevised" fieldLabel="Last Revised" fieldStatus={fileSelected === ""} fieldValue={setUp.wellbore.lastRevised} fieldType={(setUp.wellbore.lastRevised === "") ? 'date' : 'text'} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Well" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldName="name" fieldLabel="Name" fieldStatus={fileSelected === ""} fieldValue={setUp.well.name} fieldType="text" />

              <LabelInput fieldName="governmentId" fieldLabel="Government Id" fieldStatus={fileSelected === ""} fieldValue={setUp.well.governmentId} fieldType="text" />

              <LabelInput fieldName="lastRevised" fieldLabel="Last Revised" fieldStatus={fileSelected === ""} fieldValue={setUp.well.lastRevised} fieldType={(setUp.well.lastRevised === "") ? 'date' : 'text'} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Slot" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldName="name" fieldLabel="Name" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.name} fieldType="text" />

              <LabelInput fieldName="gridNorthing" fieldLabel="Grid Northing" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.gridNorthing} fieldType="text" />

              <LabelInput fieldName="gridEasting" fieldLabel="Grid Easting" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.gridEasting} fieldType="text" />

              <LabelInput fieldName="latitude" fieldLabel="Latitude" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.latitude} fieldType="text" />

              <LabelInput fieldName="longitude" fieldLabel="Longitude" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.longitude} fieldType="text" />

              <LabelInput fieldName="north" fieldLabel="North" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.north} fieldType="text" />

              <LabelInput fieldName="east" fieldLabel="East" fieldStatus={fileSelected === ""} fieldValue={setUp.slot.east} fieldType="text" />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Installation" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldName="name" fieldLabel="Name" fieldStatus={fileSelected === ""} fieldValue={setUp.installation.name} fieldType="text" />

              <LabelInput fieldName="easting" fieldLabel="Easting" fieldStatus={fileSelected === ""} fieldValue={setUp.installation.easting} fieldType="text" />

              <LabelInput fieldName="northing" fieldLabel="Northing" fieldStatus={fileSelected === ""} fieldValue={setUp.installation.northing} fieldType="text" />

              <LabelInput fieldName="mapName" fieldLabel="Map Name" fieldStatus={fileSelected === ""} fieldValue={setUp.installation.mapName} fieldType="text" />

              <LabelSelect fieldName="northAlignment" fieldLabel="North Alignment" fieldStatus={fileSelected === ""} fieldValue={setUp.installation.northAlignment} fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Field" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldName="name" fieldLabel="Name" fieldStatus={fileSelected === ""} fieldValue={setUp.field.name} fieldType="text" />

              <LabelInput fieldName="easting" fieldLabel="Easting" fieldStatus={fileSelected === ""} fieldValue={setUp.field.easting} fieldType="text" />

              <LabelInput fieldName="northing" fieldLabel="Northing" fieldStatus={fileSelected === ""} fieldValue={setUp.field.northing} fieldType="text" />

              <LabelInput fieldName="mapName" fieldLabel="Map Name" fieldStatus={fileSelected === ""} fieldValue={setUp.field.mapName} fieldType="text" />

              <LabelSelect fieldName="northAlignment" fieldLabel="North Alignment" fieldStatus={fileSelected === ""} fieldValue={setUp.field.northAlignment} fieldArray={["Grid", "True", "Magnetic"]} />

            </Stack>
          </Stack>
        </Paper>

        <Paper square={false} elevation={0} sx={{
          border: "1px solid #a8a4a48f"
        }}>
          <Stack direction='column' alignItems={'stretch'} width={'100%'}>

            <BoxHeader boxHead="Additional" />

            <Stack display={'grid'} padding={{ md: "20px 28px", sm: "20px 20px", xs: "20px 18px" }} gridTemplateColumns={{ lg: "1fr 1fr 1fr 1fr", md: "1fr 1fr 1fr", sm: "1fr 1fr" }} gap={4}>

              <LabelInput fieldName="units" fieldLabel="Units" fieldStatus={fileSelected === ""} fieldValue={setUp.additional.units} fieldType="text" />

              <LabelInput fieldName="verticalSectionAzimuth" fieldLabel="Vertical Section Azimuth" fieldStatus={fileSelected === ""} fieldValue={setUp.additional.verticalSectionAzimuth} fieldType="text" />

              <LabelSelect fieldName="surveyReferencePoint" fieldLabel="Survey Reference Point" fieldValue={setUp.additional.surveyReferencePoint} fieldArray={["Rotary Table"]} fieldStatus={fileSelected === ""} />

            </Stack>
          </Stack>
        </Paper>

      </Stack>
    </Box>
  )
}




export default SetUp