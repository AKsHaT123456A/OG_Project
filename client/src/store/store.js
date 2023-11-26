import { create } from 'zustand'

export const useMatchStore = create((set) => ({

    //object variable for setUp Tab
    setUp: {
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
        Field: {
            name: "",
            easting: "",
            northing: "",
            mapName: "",
            northAlignment: ""
        },
        Additional: {
            units: "",
            verticalSectionAzimuth: "",
            surveyReferencePoint: ""
        }
    },

    //variable to update set up tab
    updateSetUp: (newSetUp) => set(state => ({ setUp: newSetUp })),
}))