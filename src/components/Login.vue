<template>
    <v-app-bar>

        <span class="mr-3">
            {{ userStore.user.displayName }}
        </span>
        <v-spacer />
        <v-btn to="/">Públicas</v-btn>
        <v-btn to="/private">Privadas</v-btn>
        <v-spacer />
        <v-btn v-if="!!userStore.isAuthenticated"
            @click="userStore.signOut">Logout</v-btn>
        <v-btn v-else @click="userStore.signIn">Login</v-btn>
    </v-app-bar>
</template>
<script setup>

import { useUserStore } from '@/stores/user'

const userStore = useUserStore();

</script>