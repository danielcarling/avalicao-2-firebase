<template>
    <div class="d-flex">
        <v-text-field v-model="newNoteContent" v-on:keyup.enter="addNote" />
        <v-btn class="send-button" :disabled="!newNoteContent" @click="addNote">
            <v-icon>mdi-send</v-icon>
        </v-btn>
    </div>

    <div class="note-list" v-for="note in notes">
        <v-card class="mb-5 d-flex align-center pr-3 py-2" :text='note.content'
            variant="tonal">
            <v-btn icon="mdi-pen" color="blue-darken-2" class="mr-3"></v-btn>
            <v-btn @click="deleteNote(note.id)" icon="mdi-trash-can"
                color="red-darken-3" class=""></v-btn>
        </v-card>
    </div>
</template>

<script setup>
// imports
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const notes = ref([
    {
        id: 'id1',
        content: 'This is a note',
        visibility: 'public',
    },
    {
        id: 'id2',
        content: 'This is another note',
        visibility: 'public',
    },
]);




// adicionar nota

const newNoteContent = ref('');

const addNote = () => {
    const newNote = {
        id: uuidv4(),
        content: newNoteContent.value,
        visibility: 'public',
    }
    fetch('https://fmds-crud-d2e11-default-rtdb.firebaseio.com/notes.json',
        {
            method: 'POST',
            body: JSON.stringify(newNote.value)
        })
    // const newNote = {
    //     id: uuidv4(),
    //     content: newNoteContent.value,
    //     visibility: 'public',
    // }
    // newNoteContent.value = '';
    // notes.value.unshift(newNote);
}

// deletar nota

const deleteNote = id => {
    notes.value = notes.value.filter(note => note.id !== id)
}

// editar nota

// const editNote =

</script>

<style scoped>
.send-button {
    height: 55px;
    background-color: rgb(231, 231, 231);
    color: black;
    width: 30px;
    margin-left: 10px;
}

.note-list {
    /* margin-bottom: 20px; */
}
</style>