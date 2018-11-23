

const endPoints = [
    {
        description: 'Creates new user',
        request: 'POST',
        URI: '/auth/localLogin',
        parameters: {
            autonticate: null,
            query: [],
            body: {
                password: 'password',
                username: 'userName',
            },
        },
        response: {
            user: {},
            JWT: 'token',
        },
    }, {
        description: 'Get user details',
        request: 'GET',
        URI: '/user/',
        parameters: {
            autonticate: 'JWT',
            query: [],
            body: {
                password: 'password',
                username: 'userName'
            }
        },
        response: {
            user: {},
            token: 'JWT'
        }
    }
]


`GET: /user/`  | get user details

`POST: /user/` | create user

`PUT: /user/` | update user details

`DELETE: /user/` | remove user

`GET: /user/recipes/` | get user recipes

`GET: /user/comments/` | get user comments
