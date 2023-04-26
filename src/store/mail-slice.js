import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: 'mail',
    initialState: {receivedMail: [], sentMail: [], viewMail: false, changed: false},
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
            state.changed = !state.changed
        },
        deleteSentMail (state, action) {
            const id = action.payload.id
            state.sentMail = state.sentMail.filter((mail) => mail.id !== id)
            state.changed = !state.changed
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