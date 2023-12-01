import { create } from 'zustand'

export const useMatchStore = create((set) => ({


    //variable for edit modal for setUp
    open: false,
    setOpen: (sopen) => set(state => ({ open: sopen })),
    //object variable for setUp Tab
    setUp: {
        uploadedFile: "",
        wellbore: {
            name: "",
            created: "",
            lastRevised: "",
        },
        well: {
            name: "",
            governmentId: "",
            lastRevised: "",
        },
        slot: {
            name: "",
            gridNorthing: "",
            gridEasting: "",
            latitude: "",
            longitude: "",
            north: "",
            east: ""
        },
        installation: {
            name: "",
            easting: "",
            northing: "",
            mapName: "",
            northAlignment: ""
        },
        field: {
            name: "",
            easting: "",
            northing: "",
            mapName: "",
            northAlignment: ""
        },
        additional: {
            units: "",
            verticalSectionAzimuth: "",
            surveyReferencePoint: ""
        }
    },

    //variable to update set up tab
    updateSetUp: (newSetUp) => set(state => ({ setUp: newSetUp })),
}))