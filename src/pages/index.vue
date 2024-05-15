<template>

  <v-row>
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
  </v-row>

</template>

<script setup>
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import db from '@/plugins/firebase'

const userStore = useUserStore();

const usersCollection = collection(db, 'users');
const productsCollection = collection(db, 'products');
const users = ref([]);
const products = ref([]);
const product = ref({})

const shortBio = ref({});

const loading = ref(true);

onMounted(() => {

  onSnapshot(productsCollection, (snapshot) => {
    products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    loading.value = false;
  });
  onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    shortBio.value = users.value[0]
  }); 
});

const productDelete = async (id) => {
  await deleteDoc(doc(productsCollection, id))
}

const addProduct = async () => {
  await addDoc(productsCollection, { ...product.value })
  product.value = {}
}

const updateUser = async () => {
  await updateDoc(doc(usersCollection, users.value[0].id), { shortbio: shortBio.value.shortbio })
}






</script>
