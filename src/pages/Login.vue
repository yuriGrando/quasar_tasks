<template>
    <div
        class="flex flex-center bg-grey-3 text-secondary q-pa-xl"
        style="height: 100vh"
    >
        <div
            class="text-center full-width"
            :style="!$q.screen.lt.md ? 'max-width: 400px': ''"
        >
            <div>
                <div class="text-h4 text-bold">
                    Welcome!
                </div>
                <div class="text-subtitle2">
                    to House Rules.
                </div>
            </div>
            <div class="q-mt-md">
                <q-input
                    v-model="accessInfo.username.label"
                    outlined
                    error-message="Field cannot be empty"
                    :error="accessInfo.username.error"
                    label="Username"
                    @update:model-value="accessInfo.username.error = false;"
                >
                    <template v-slot:append>
                        <q-icon name="mdi-account" />
                    </template>
                </q-input>
            </div>
            <div class="q-mt-md">
                <q-input
                    v-model="accessInfo.password.label"
                    outlined
                    error-message="Field cannot be empty"
                    :error="accessInfo.password.error"
                    label="Password"
                    :type="isPwd ? 'password' : 'text'"
                    @update:model-value="accessInfo.password.error = false;"
                >
                    <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                    </template>
                </q-input>
            </div>
            <div class="q-mt-md">
                <q-btn
                    color="primary"
                    label="Sign-in"
                    unelevated
                    class="full-width"
                    :loading="loadingBtn"
                    @click="checkErrors"
                />
            </div>
            <q-separator spaced />
            <div class="q-mt-md full-width flex flex-center">
                <div
                    v-for="social in socialMedia"
                    :key="social.name"
                >
                    <q-icon
                        class="q-mx-sm"
                        :name="social.icon"
                        size="sm"
                    />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {useTaskStore} from "stores/task-store";

const taskStore = useTaskStore();
const token = '40fe071962846075452a4f6123ae71697463cad20f51e237e2035b41af0513d8';

const socialMedia = [
    {
        title: 'facebook',
        icon: 'mdi-facebook',
    },
    {
        title: 'instagram',
        icon: 'mdi-instagram',
    },
    {
        title: 'twitter',
        icon: 'mdi-twitter'
    }
]
export default {
    name: 'Login',
    data() {
        return {
            token,
            taskStore,
            socialMedia,

            isPwd: false,
            loadingBtn: false,
            accessInfo: {
                username: {
                    label: '',
                    error: false,
                },
                password: {
                    label: '',
                    error: false,
                },
            }
        };
    },
    methods: {
        login() {
            this.loadingBtn = true;
            this.taskStore.setToken(this.token);
            setTimeout(()=>{
                this.loadingBtn = false;

                this.$q.notify({
                    message: 'Helcome to Quasar Task',
                    timeout: 1500,
                    icon: 'mdi-login',
                    type: 'positive',
                });
                this.$router.push('/');
            }, 1000);
        },

        checkErrors() {
            const username = this.accessInfo.username;
            const password = this.accessInfo.password;

            if(username.label.length > 0 && password.label.length > 0) {
                this.login();
            } else {
                if(username.label.length === 0) {
                    this.accessInfo.username.error = true;
                }

                if(password.label.length === 0) {
                    this.accessInfo.password.error = true;
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
