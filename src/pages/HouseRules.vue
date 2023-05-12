<template>
    <q-page class="q-pa-md">
        <div class="full-width row">
            <q-input
                v-model="taskCreate.name"
                class="col"
                label="Create Rule"
                outlined
            />
            <q-btn
                class="q-ml-md"
                icon="mdi-plus"
                color="primary"
                unelevated
                @click="create()"
            />
        </div>

        <div class="full-width q-mt-md">
            <task-table
                :pagination="paginationTable"
                :tasks="tasks"
                :loading="loadingTable"
                @delete="deleteAction"
                @edit="editAction"
                @changePage="changePage"
            />
        </div>
        <div class="full-width q-mt-md flex flex-center">
            <q-pagination
                v-model="current"
                :max="paginationTable.total_pages"
                direction-links
                @update:model-value="getTasks()"
            />
        </div>
    </q-page>
    <dialog-edit
        :show-dialog="dialogEdit"
        :task="taskEdit"
        :loading="loadingEdit"
        @close="dialogEdit = false;"
        @edit="editTask"
    />
    <dialog-delete
        :show-dialog="dialogDelete"
        :task="taskDelete"
        :loading="loadingDelete"
        @close="dialogDelete = false;"
        @delete="deleteTask"
    />
</template>

<script>
import {defineComponent} from 'vue';
import {useTaskStore} from "stores/task-store";
import TaskTable from "components/TaskTable.vue";
import DialogDelete from "components/DialogDelete.vue";
import DialogEdit from "components/DialogEdit.vue";

const taskStore = useTaskStore();

export default defineComponent({
    name: 'HouseRules',
    components: {
        DialogEdit,
        DialogDelete,
        TaskTable,
    },
    data() {
        return {
            current: 1,
            taskStore,
            tasks: [],
            loadingTask: false,
            loadingTable: false,

            taskDelete: {},
            dialogDelete: false,
            loadingDelete: false,

            taskEdit: {},
            dialogEdit: false,
            loadingEdit: false,

            taskCreate: {
                name: '',
                active: 1,
            },
            createError: false,

            paginationTable: {},
        };
    },

    methods: {
        getTasks() {
            this.loadingTable = true;
            if(this.current === 1) {
                this.taskStore.listTask().then((res)=>{
                    this.paginationTable = res.data.data.pagination;
                    this.tasks = res.data.data.entities;
                    this.loadingTable = false;
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                this.taskStore.paginationTask(this.current)
                    .then((res) => {
                        this.paginationTable = res.data.data.pagination;
                        this.tasks = res.data.data.entities;
                        this.loadingTable = false;
                    }).catch((err) => {
                        console.log(err);
                })
            }
        },

        editAction(task) {
            this.dialogEdit = true;
            this.taskEdit = {
                name: task.name,
                id: task.id,
                active: task.active,
            };
        },

        editTask(task) {
            this.loadingEdit = true;
            const taskEdit = {
                house_rules: {
                    name: task.name,
                    active: task.active,
                }
            };

            this.taskStore.updateTask({
                id: task.id,
                task: taskEdit
            }).then((res) => {
                this.loadingEdit = false;
                this.dialogEdit = false;
                this.$q.notify({
                    message: res.data.message,
                    timeout: 1500,
                    icon: 'mdi-plus',
                    type: 'positive',
                });
                this.getTasks();
            }).catch((err) => {
                this.loadingEdit = false;
                console.log(err);
            })
        },

        deleteAction(task) {
            this.taskDelete = task;
            this.dialogDelete = true;
        },

        deleteTask(id) {
            this.loadingDelete = true;
            this.taskStore.deleteTask(id)
                .then((res) => {
                    this.loadingDelete = false;
                    this.dialogDelete = false;

                    this.$q.notify({
                        message: res.data.message,
                        timeout: 1500,
                        icon: 'mdi-plus',
                        type: 'positive',
                    });

                    this.getTasks();
                }).catch((err) => {
                    this.loadingDelete = true;
                    console.log(err)
            })
        },

        create() {
            if(this.taskCreate.name.length === 0) {
                this.$q.notify({
                    message: 'Error creating task, Name field is empty',
                    timeout: 1500,
                    icon: 'mdi-alpha-x-circle-outline',
                    type: 'negative',
                });
            } else {
                const task = {
                    house_rules: {
                        name: this.taskCreate.name,
                        active: this.taskCreate.active,
                    }
                }

                this.taskStore.createTask(task)
                    .then((res) => {
                        this.$q.notify({
                            message: res.data.message,
                            timeout: 1500,
                            icon: 'mdi-plus',
                            type: 'positive',
                        });
                        this.getNewTask(res.data.data.id);
                    }).catch((err) => {
                        console.log(err)
                })
            }

        },

        getNewTask(id) {
            this.taskStore.showTask(id)
                .then((res) => {
                    this.tasks.unshift(res.data.data);
                }).catch((err) => {
                    console.log(err);
            })
        },
    },

    mounted() {
        this.getTasks();
    }
})
</script>
