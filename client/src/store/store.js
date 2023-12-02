import { create } from 'zustand'

export const useMatchStore = create((set) => ({


    open: false,
    setOpen: (sopen) => set(state => ({ open: sopen })),




    //object variable for setUp Tab
    setUp: {
        uploadedFile: "",
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
    },
    //variable to update set up tab
    updateSetUp: (newSetUp) => set(state => ({ setUp: newSetUp })),
}))