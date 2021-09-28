import axios from 'axios';

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
        const res = await this.axios.get('/tasks');
        return res.data;
    }
}