export async function downloadFileFromBucket(prefix: string) {
    // console.log('downloadFileFromBucket prefix', prefix);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    const response = await fetch('/api/bucket/download/' + prefix, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // console.log('downloadFileFromBucket data', response);
    const { url: file_url } = await response.json();
    // console.log('file_url', { file_url });
    return window.open(file_url, '_blank');
    // return window.location.replace(file_url);
}

export async function foxgloveFileFromBucket(prefix: string) {
    // console.log('downloadFileFromBucket prefix', prefix);
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

    const response = await fetch('/api/bucket/download/' + prefix, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    // console.log('downloadFileFromBucket data', response);
    const { url: file_url } = await response.json();
    // console.log('file_url', { file_url });
    // console.log({"a":encodeURIComponent(file_url)});

    return window.open(`https://foxglove.citros.io/?ds=remote-file&ds.url=${encodeURIComponent(file_url)}`, '_blank');
    // return window.location.replace(file_url);
}

export async function foxgloveSocketFromBucket(batchRunId: string, sid: string, port = 9090) {
    // ros bridge
    let file_url = `wss://proxy.citros.io?p=${port}&sid=${sid}&batch=${batchRunId}`;
    window.open(`https://foxglove.citros.io/?ds=rosbridge-websocket&ds.url=${encodeURIComponent(file_url)}`, '_blank');
}

export async function foxgloveSocketFGBFromBucket(batchRunId: string, sid: string, port = 8765) {
    // foxglove bridge
    let file_url = `wss://proxy.citros.io?p=${port}&sid=${sid}&batch=${batchRunId}`;
    window.open(`https://foxglove.citros.io/?ds=foxglove-websocket&ds.url=${encodeURIComponent(file_url)}`, '_blank');
}