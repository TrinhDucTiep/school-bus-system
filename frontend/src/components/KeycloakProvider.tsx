"use client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak, { initOptions } from '../config/keycloak';

const KeycloakProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
            LoadingComponent={<div>Loading...</div>}
            onEvent={async (event, error) => {
                console.log('onKeycloakEvent', event, error);
                if (event === 'onAuthSuccess') {
                    console.log('onAuthSuccess');
                } else if (event === 'onAuthError') {
                    console.log('onAuthError');
                } else if (event === 'onAuthLogout') {
                    console.log('onAuthLogout');
                }
            }}
        >
            {children}
        </ReactKeycloakProvider>
    );
};

export default KeycloakProvider;
