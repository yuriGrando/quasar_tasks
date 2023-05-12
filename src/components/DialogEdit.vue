<template>
    <q-dialog
        v-model="showDialogFlag"
        class="text-secondary"
    >
        <q-card class="q-pa-md">
            <q-input
                label="Name"
                v-model="task.name"
                outlined
            />

            <q-toggle
                v-model="taskActive"
                @update:model-value="activeAction()"
                label="Active"
                color="green"
            />

            <q-separator spaced />
            <div class="q-mt-md flex justify-end">
                <q-btn
                    label="Cancel"
                    flat
                    dense
                    color="secondary"
                    class="q-mr-md"
                    @click="$emit('close')"
                />

                <q-btn
                    label="Edit"
                    unelevated
                    :loading="loading"
                    color="primary"
                    @click="$emit('edit', task)"
                />
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: 'DialogEdit',
    props: {
        task: {
            type: Object,
            required: true,
        },
        showDialog: {
            type: Object,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        }
    },
    computed: {
        showDialogFlag: {
            get() {
                return this.showDialog;
            },
        },

        taskActive() {
            return this.task.active === 1;
        }
    },
    data() {
        return {

        };
    },

    methods: {
        activeAction() {
            if(this.task.active === 1) {
                this.task.active = 0;
            } else {
                this.task.active = 1;
            }
        },
    },
}

</script>

<style scoped>

</style>
