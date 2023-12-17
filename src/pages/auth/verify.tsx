import { useRouter } from 'next/router';
import { useAuthContext } from '../../auth/useAuthContext';
import { useEffect } from 'react';

function VerifyUser() {
    const { verify } = useAuthContext();
    const router = useRouter();
    const id = router.query.id as string;
    console.log('VERIFY_USER: ');

    useEffect(() => {
        if (!id) return;
        try {
            verify(id);
        } catch (err) {
            console.log('Error verificating user', err);
        }
    }, [verify, id]);

    return null;
}

export default VerifyUser;
