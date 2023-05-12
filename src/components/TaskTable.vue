<template>
    <q-table
        :rows="tasks"
        :columns="columns"
        row-key="name"
        flat
        :loading="loading"
        hide-header
        hide-bottom
        rows-per-page-options="0"
    >
        <template #body="props">
            <q-tr
                :props="props"
            >
                <q-td
                    key="state"
                    :props="props"
                >
                    <q-badge
                        :color="props.row.active === 1 ? 'green' : 'red'"
                    >
                    </q-badge>
                </q-td>
                <q-td
                    key="name"
                    :props="props"
                >
                    {{props.row.name}}
                </q-td>
                <q-td
                    key="actions"
                    :props="props"
                >
                    <q-icon
                        name="mdi-pencil"
                        color="secondary"
                        class="q-mr-md"
                        size="xs"
                        @click="edit(props.row)"
                    />

                    <q-icon
                        name="mdi-delete"
                        color="red"
                        size="xs"
                        @click="deleteTask(props.row)"
                    />
                </q-td>
            </q-tr>
        </template>
    </q-table>
</template>

<script>
import DialogDelete from "components/DialogDelete.vue";

const columns = [
    {name: 'name', label: 'Name', field: 'name', align: 'left'},
    {name: 'state', label: 'State', field: 'state', align: 'left'},
    {name: 'actions', label: '', field: 'actions', align: 'right'},
];
export default {
    name: 'TaskTable',
    components: {DialogDelete},
    props: {
        tasks: {
            type: Array,
            required: true,
        },
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            tasksSelected: [],
            columns,
        };
    },

    methods: {
        edit(task) {
            this.$emit('edit', task)
        },

        deleteTask(task) {
            this.$emit('delete', task)
        },
    }
}

</script>

<style scoped>

</style>
