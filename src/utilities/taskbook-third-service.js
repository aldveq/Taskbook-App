import axios from 'axios';
import { getFormattedTaskData } from './utilities';
export class TaskbookThirdService {
    constructor(token) {
        this.token = token;
        this.axios = this.createInstance(token);
    }

    createInstance(token) {
        const axiosInstance = axios.create({
            baseURL: 'http://headlesscms.local/wp-json/wp/v2',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return axiosInstance;
    }

    async getTasksbooks() {
        try {
            const res = await this.axios.get('/tasks');
            const tasksArray = res.data.map(d => {
                return getFormattedTaskData(d);
            });
            return tasksArray;
        } catch (error) {
            return error;
        }
    }

    async getSingleTask(id) {
        try {
            const res = await this.axios.get(`/tasks/${id}`);
            return getFormattedTaskData(res.data);
        } catch(error) {
            return error;
        }
    }
}