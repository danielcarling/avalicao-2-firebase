<template>
  <v-text-field v-model="note.content" @keyup.enter="addNote" v-if="!isEditing">
    <template v-slot:append>
      <v-btn @click="addNote">
        <v-icon color="black"> mdi-note-plus </v-icon>
      </v-btn>
    </template>
  </v-text-field>
  <v-text-field v-model="editedNoteContent" @keyup.enter="addNote" v-else>
    <template v-slot:append-inner>
      <v-icon class="cursor-pointer" @click="cancelEdit" color="black">
        mdi-close </v-icon>
    </template>
    <template v-slot:append>
      <v-btn @click="confirmEdit">
        <v-icon color="black"> mdi-trash-can </v-icon>
      </v-btn>
    </template>

  </v-text-field>
  <v-select v-model="visibility" :items="['public', 'private']" />
</template>

<script>
import { ref } from 'vue';

const isEdit
</script>