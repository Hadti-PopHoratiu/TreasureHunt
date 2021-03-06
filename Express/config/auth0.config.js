module.exports = (app) => {
    const jwt = require('express-jwt');
    const jwtAuthz = require('express-jwt-authz');
    const jwksRsa = require('jwks-rsa');

    // Authentication middleware. When used, the
    // Access Token must exist and be verified against
    // the Auth0 JSON Web Key Set
    const checkJwt = jwt({
        // Dynamically provide a signing key
        // based on the kid in the header and 
        // the signing keys provided by the JWKS endpoint.
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `https://dev-4x7wliba.eu.auth0.com/.well-known/jwks.json`
        }),

        // Validate the audience and the issuer.
        //audience: 'http://localhost:3000',
        issuer: 'https://dev-4x7wliba.eu.auth0.com/',
        algorithms: ['RS256']
    });

    return checkJwt;
}