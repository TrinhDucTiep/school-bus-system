'use client';

import Keycloak from 'keycloak-js';

export const initOptions = { pkceMethod: "S256" };

interface KeycloakConfig {
    url: string;
    realm: string;
    clientId: string;
}

const keycloakConfig: KeycloakConfig = {
    url: "https://erp3.soict.ai/iam",
    realm: "OpenERP-Dev",
    clientId: "openerp-ui-dev",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
