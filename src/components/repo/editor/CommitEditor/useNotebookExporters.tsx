import { useCallback, useState } from 'react';
import { exportPDFApi, exportPDFStatus, ExporterUrlParams, ExporterResponce, JobStatus } from '../../exporter.api';

export function useNotebookExporters() {
    const PDFExporter = useCallback(
        async (params: ExporterUrlParams) => {
            // check that there are no jobs running already.
            const job_id = localStorage.getItem('job:nbconvert:id');
            if (job_id) {
                params.job_id = job_id;
                return;
            }

            let responce: ExporterResponce = await exportPDFApi(params);

            // console.log('useNotebookExporters', responce);

            if (responce) {
                localStorage.setItem('job:nbconvert:id', responce.id);
            }
        },
        [exportPDFApi]
    );

    const JobStatusUpdater = useCallback(
        async () => {
            const job_id = localStorage.getItem('job:nbconvert:id');
            if (!job_id) {                            
                return true; // no job running
            }

            let responce: JobStatus = await exportPDFStatus(job_id);

            // console.log('JobStatusUpdater', responce);

            if (responce.status == 'done') {
                localStorage.removeItem('job:nbconvert:id');
                return false;
            }
            if (responce.status == 'error') {
                localStorage.removeItem('job:nbconvert:id');
                console.error(responce.error);
                return false;
            }
            return true;        
        },
        [exportPDFStatus]
    );

    return {
        PDFExporter,
        JobStatusUpdater,
    };
}
