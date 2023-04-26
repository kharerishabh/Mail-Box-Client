import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: {receivedMail: [], sentMail: [], viewMail: false},
    reducers: {
        updateReceivedMail (state, action) {
            state.receivedMail = action.payload.mail
        },
        updateSentMail (state, action) {
            state.sentMail = action.payload.mail
        },
        deleteReceivedMail (state, action) {
            const id = action.payload.id
            state.receivedMail = state.receivedMail.filter((mail) => mail.id !== id)
        },
        viewMailHandle (state, action) {
            const newId = action.payload.id
            const index = state.receivedMail.findIndex((mail) => mail.id === newId)
            state.receivedMail[index].isRead = true
            state.viewMail = !state.viewMail 
        },
        mailHandle (state) {
            state.viewMail = !state.viewMail
        }
    }
})

export const mailAction = mailSlice.actions;

export default mailSlice;