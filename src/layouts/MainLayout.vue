<template>
    <q-layout view="lHh Lpr lFf">
        <q-header >
            <q-toolbar>
                <q-toolbar-title>
                    <div
                        class="flex items-center text-bold"
                    >
                        <q-icon
                            name="mdi-calendar-check-outline"
                            size="md"
                        />
                        <div>
                            House Rules
                        </div>
                    </div>
                </q-toolbar-title>

                <div>
                    <q-avatar
                        icon="mdi-account"
                    >
                        <q-menu>
                            <q-list>
                                <q-item
                                    clickable
                                    v-close-popup
                                    @click="logout"
                                >
                                    <q-item-section>Logout</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-avatar>
                </div>
            </q-toolbar>
            <div class="q-pa-md">
                <div class="text-h4">
                    myRules
                </div>
            </div>
        </q-header>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
import {defineComponent} from 'vue';
import {useTaskStore} from "stores/task-store";

const taskStore = useTaskStore();

export default defineComponent({
    name: 'MainLayout',
    data() {
        return {
            taskStore,
            leftDrawerOpen: false,
        };
    },
    methods: {
        logout() {
            this.taskStore.logout();
            this.$router.push('/login')
        }
    }
})
</script>
