<template>
  <div class="main">
    <v-text-field v-model="note.content" @keyup.enter="addNote">
      <template v-slot:append>
        <v-btn @click="addNote">
          <v-icon color="black"> mdi-note-plus </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <v-card v-for="note in notes" class="items">
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
          <v-btn @click="noteDelete(note.id)">Delete</v-btn>
          <v-btn @click="noteEdit(note.id)">Edit</v-btn>
        </v-card-actions>
      </div>

      <!-- <v-list>
          <v-list-item v-for="product in products" :key="product.id"
            class="items">
            <v-list-item-title>{{ product.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ product.price }}</v-list-item-subtitle>
          </v-list-item>
        </v-list> -->
    </v-card>
  </div>

  <!-- <v-row>
    <v-col cols="4">
      <v-card title="Público">
        <v-card-text>
          <v-skeleton-loader type="list-item-two-line" v-if="loading" />
          <v-list v-else>
            <v-list-item v-for="product in products" :key="product.id">
              <v-list-item-title>{{ product.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ product.price }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card title="Autenticado">
        <v-card-text>
          <v-text-field v-model="product.name" label="Nome" />
          <v-text-field v-model="product.price" label="Preço" />
          <v-btn block @click="addProduct">Adicionar</v-btn>
          <v-list>
            <v-skeleton-loader type="list-item-two-line" v-if="loading" />
            <v-list-item v-else v-for="product in products" :key="product.id">
              <v-list-item-title>{{ product.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ product.price }}</v-list-item-subtitle>
              <template v-slot:append>
                <v-icon @click="productDelete(product.id)">mdi-delete</v-icon>
              </template>
</v-list-item>
</v-list>
</v-card-text>
</v-card>
</v-col>
<v-col cols="4">
  <v-card title="Dono">
    <v-card-text>
      <v-text-field label="uid" v-model="userStore.user.uid" />
      <v-text-field label="id" v-model="shortBio.id" />
      <v-textarea v-model="shortBio.shortbio" label="Short bio"></v-textarea>
      <v-btn block @click="updateUser">Salvar</v-btn>
    </v-card-text>
  </v-card>
</v-col>
</v-row> -->

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

const shortBio = ref({});

const loading = ref(true);

onMounted(() => {

  onSnapshot(notesCollectionQuery, (snapshot) => {
    notes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    loading.value = false;
  });
  onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    shortBio.value = users.value[0]
  });
});

const noteDelete = async (id) => {
  await deleteDoc(doc(notesCollection, id))
}

const addNote = async () => {
  await addDoc(notesCollection, { ...note.value, user: userStore.user.displayName, date: Date.now() })
  note.value = {}
}

const updateUser = async () => {
  await updateDoc(doc(usersCollection, users.value[0].id), { shortbio: shortBio.value.shortbio })
}

const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
