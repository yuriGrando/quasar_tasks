import { defineStore } from 'pinia';
import { requests } from 'src/api/api';
import axios from "axios";
import { authOptions } from 'src/api/apikey-token';

export const useTaskStore = defineStore('task', {
    state: () => ({
        token: '',
    }),
    getters: {

    },
    actions: {
        setToken(payload) {
            localStorage.setItem('token', payload);
            localStorage.setItem('isAuthenticated', true);
            this.token = payload;
        },

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            this.token = '';
        },

        listTask() {
            return requests.get('/house_rules');
        },

        showTask(id) {
            return requests.get(`/house_rules/${id}`);
        },

        createTask(task) {
            return requests.post('/house_rules', task);
        },

        updateTask(payload) {
            return requests.put(`/house_rules/${payload.id}`, payload.task)
        },

        deleteTask(id) {
            return requests.delete(`/house_rules/${id}`);
        },

        paginationTask(page) {
            return requests.get(`/house_rules?page=${page}`, authOptions());
        }
    },
});
