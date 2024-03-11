import NextAuth, { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak"
export const authOptions: AuthOptions = {
    providers: [
        // KeycloakProvider({
        //     clientId: process.env.KEYCLOAK_CLIENT_ID,
        //     clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
        //     issuer: process.env.KEYCLOAK_ISSUER
        // })
        KeycloakProvider({
            clientId: "openerp-ui-dev",
            clientSecret: "AIzaSyDWbACfGeZnCaYNOMXDDqzxm4HsqSQLSJg",
            issuer: "https://erp3.soict.ai/iam/realms/OpenERP-Dev",
        })
        // KeycloakProvider({
        //     url: `${config.url.KEYCLOAK_BASE_URL}`,
        //     realm: KC_REALM,
        //     clientId: "openerp-ui-dev",
        // })

        // client_id: openerp-ui-dev
        // redirect_uri: http://localhost:3000/
        // state: 95a82035-3830-4fbd-882b-0a514a351841
        // response_mode: fragment
        // response_type: code
        // scope: openid
        // nonce: 5d95bd3f-e25a-41b3-8bf9-eda04a25a3e8
        // code_challenge: EeL0K7JtKP3G1MsOsC1S7qrvoNcQZPLWDLRKnJ9Use4
        // code_challenge_method: S256
    ]
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }