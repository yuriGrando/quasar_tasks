<template>
    <q-dialog
        v-model="showDialogFlag"
        class="text-secondary"
    >
        <q-card class="q-pa-md">
            <div>
                Are you sure you want to delete the task
            </div>
            <div class="text-bold">
                {{task.name}}
            </div>
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
                    label="Delete"
                    unelevated
                    color="primary"
                    :loading="loading"
                    @click="$emit('delete', task.id)"
                />
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    name: 'DialogDelete',
    props: {
        task: {
            type: Object,
            required: true,
        },
        showDialog: {
            type: Boolean,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        showDialogFlag: {
            get() {
                return this.showDialog;
            },
        },
    },
    data() {
        return {

        };
    },
}

</script>

<style scoped>

</style>
