import axios from 'axios';

export class TaskbookThirdService {
    constructor(token) {
        this.token = token;
        this.axios = this.createInstance(token);
    }

    createInstance(token) {
        const axiosInstance = axios.create({
            baseURL: 'https://headlesscms.local/wp-json/wp/v2',
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
                return {
                    id: d.id,
                    title: d.title.rendered,
                    outcome: d.cmb2.taskbook_rest_metabox.taskbook_outcome,
                    post_level:  d.cmb2.taskbook_rest_metabox.taskbook_post_level,
                    pre_level: d.cmb2.taskbook_rest_metabox.taskbook_pre_level,
                    prediction: d.cmb2.taskbook_rest_metabox.taskbook_prediction,
                    status: d.task_status,
                    content: d.content.rendered,
                    date_created: d.date,
                    date_modified: d.modified,
                }
            });
            return tasksArray;
        } catch (error) {
            return error;
        }
    }
}