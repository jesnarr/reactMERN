//secure API in server
// npm i express-jwt

const expressJwt = require('express-jwt');

function authJwt()
{
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt(
        {
            secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        }
    ).unless({ //exclude some api routes without  the needs of authentication token
        path:[
            {
                // url:api+'/products' , method: ['GET', 'OPTIONS'] //get products
                //using regex
                url: /\/api\/v1\/products(.*)/ , method: ['GET', 'OPTIONS'] // all under products
                
            },
            {
                // url:api+'/products' , method: ['GET', 'OPTIONS'] //get category
                //using regex
                url: /\/api\/v1\/category(.*)/ , method: ['GET', 'OPTIONS'] // all under products
                
            },
            {
                // url:api+'/products' , method: ['GET', 'OPTIONS'] //get products
                //using regex
                url: /\/public\/uploads(.*)/ , method: ['GET', 'OPTIONS'] // all under products
                
            },
            '/api/v1/users/login',
            '/api/v1/users/register',
            
        ]
    });
}
async function isRevoked(req,payload,done)
{
    if(!payload.isAdmin)
    {
        //reject user if not admin
        done(null,true); 
    }
    // if admin access
    done();
}

module.exports = authJwt;