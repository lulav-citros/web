import { useRouter } from 'next/router';
import { useEffect } from 'react';

function JustClose() {
    const router = useRouter();
    useEffect(() => {
        window.close();
    });
    return null;
}

export default JustClose;
