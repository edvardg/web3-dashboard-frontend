import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

const WithAuth = (WrappedComponent: React.ComponentType) => {
    const ComponentWithAuth = (props: any) => {
        const router = useRouter();
        const { accessToken } = useAuthStore();

        useEffect(() => {
            if (!accessToken) {
                router.push('/');
            }
        }, [accessToken, router]);

        return accessToken ? <WrappedComponent {...props} /> : null;
    };

    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default WithAuth;
