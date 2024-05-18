<template>
  <div class="main">
    <v-text-field v-model="note.content" @keyup.enter="addNote"
      v-if="!isEditing">
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
          <v-icon color="black"> mdi-note-edit </v-icon>
        </v-btn>
      </template>

    </v-text-field>
    <v-select v-model="visibility" :items="['Pública', 'Privada']" />

    <v-card v-for="note in notes" class="items">
      <div
        v-if="note.visibility === 'private' && note.userId === userStore.user.uid">
        <div class="d-flex note-header">
          <v-img class="ml-3 rounded-circle" max-height="50" max-width="50"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png" />
          <v-card-title>{{ uppercaseFirstLetter(note.user.toLowerCase())
            }}</v-card-title>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
        </div>
        <div>
          <v-card-text>{{ note.content }}</v-card-text>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
          <v-card-actions>
            <v-btn @click="noteDelete(note.id)">
              <v-icon color="red"> mdi-delete </v-icon>
            </v-btn>
            <v-btn @click="editNote(note.id)">
              <v-icon color="blue"> mdi-pencil </v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import {
  collection, addDoc,
  onSnapshot, deleteDoc,
  doc, updateDoc,
  query, orderBy
} from 'firebase/firestore';
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import db from '@/plugins/firebase'

const userStore = useUserStore();

const usersCollection = collection(db, 'users');
const notesCollection = collection(db, 'notes');

const notesCollectionQuery = query(notesCollection, orderBy('date', 'desc'));

const users = ref([]);
const notes = ref([]);
const note = ref({})
const isEditing = ref(false);
const editedNoteContent = ref('');

const visibility = ref('Pública');

const shortBio = ref({});

const loading = ref(true);

const load = async () => {
  onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    shortBio.value = { shortbio: users.value[0].shortbio }
  });

  onSnapshot(notesCollectionQuery, (snapshot) => {
    notes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    loading.value = false;
  });
}

onMounted(() => {
  load();
});

const noteDelete = async (id) => {
  await deleteDoc(doc(notesCollection, id))
}

const addNote = async () => {
  await addDoc(notesCollection, {
    ...note.value, user: userStore.user.displayName.toLowerCase(),
    date: Date.now(),
    visibility: visibility.value === 'Pública' ? 'public' : 'private',
    userId: userStore.user.uid
  })
  note.value = {}
}

const updateUser = async () => {
  await updateDoc(doc(usersCollection, users.value[0].id), { shortbio: shortBio.value.shortbio })
}

const editNote = (id) => {
  editedNoteContent.value = notes.value.find(note => note.id === id).content;
  isEditing.value = true;
  note.value = notes.value.find(note => note.id === id);
}

const confirmEdit = async () => {
  await updateDoc(doc(notesCollection, note.value.id), { content: editedNoteContent.value })
  isEditing.value = false;
  note.value = {}
}

const cancelEdit = () => {
  isEditing.value = false;
  note.value = {}
}

const uppercaseFirstLetter = (string) => {
  const words = string.split(' ');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
}

</script>

<style>
.main {
  max-width: 800px;
  margin: 0 auto;
}

.text-field {
  display: flex;
  align-items: center;
}

.items {
  margin-top: 20px;
  padding: 10px;
}
</style>
