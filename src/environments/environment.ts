// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'AIzaSyCv6vphbcDpQpKhmXJj7lz9hd5stDSZNWQ',
        authDomain: 'golf-manager-dev.firebaseapp.com',
        databaseURL: 'https://golf-manager-dev.firebaseio.com',
        projectId: 'golf-manager-dev',
        storageBucket: 'golf-manager-dev.appspot.com',
        messagingSenderId: '287439132059'
    }
};
