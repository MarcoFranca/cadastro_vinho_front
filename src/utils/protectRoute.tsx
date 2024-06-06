import { useSession, signIn } from 'next-auth/react';
import { JSX, useEffect} from 'react';

export default function protectedRoute(Component: JSX.IntrinsicAttributes) {
    return function ProtectedRoute(props: JSX.IntrinsicAttributes) {
        const { data: session, status } = useSession();
        useEffect(() => {
            if (status === 'unauthenticated') {
                signIn();
            }
        }, [status]);

        if (status === 'loading' || status === 'unauthenticated') {
            return <p>Loading...</p>;
        }
        // @ts-ignore
        return <Component {...props} />;
    };
}
