import axios from '../../utils/axios';

export interface ExporterUrlParams {
    tenant?: string;
    repo_name?: string;
    notebook_path?: string;
    notebook_name?: string;
    format?: 'pdf';
    notebook_data?: string;
    job_id?: string;
}

export interface IGetRepositoryRequest extends ExporterUrlParams {
    format?: 'pdf';
}

export interface ExporterResponce {
    id: string;

    attempts?: number;
    created_at?: string | null;
    flags?: string[] | null;
    is_available?: boolean;
    job_queue_id: string | null;
    key?: string | null;
    last_error?: string | null
    locked_at?: string | null;
    locked_by?: string | null;
    max_attempts?: number
    payload?: any;
    priority?: number;
    revision: number;
    run_at?: string;
    task_id?: 103;
    task_identifier?: string;
    updated_at?: string;
}

export interface JobStatus {
    id: string;
    status: 'running' | 'done' | 'error';
    error?: string;
}


export async function exportPDFApi(params: IGetRepositoryRequest): Promise<ExporterResponce> {
    // console.log("exportPDFApi", params)
    const axiosResponse = await axios.post(`/api/worker/nbconvert`, params);

    return axiosResponse.data;
}


export async function exportPDFStatus(job_id: string): Promise<JobStatus> {
    // console.log("exportPDFApi", params)
    const axiosResponse = await axios.post(`/api/worker/jobstatus`, { job_id });

    return axiosResponse.data;
}
