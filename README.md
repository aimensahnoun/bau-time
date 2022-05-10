# BAUTIME
## Clone
After cloning the repo run :

```
npm install

#or

yarn install
```

this will download and install the necessary dependencies in order for the project to run

## Necessary Keys
This project uses [Web3 Storage](https://web3.storage) in order to store all the files and [Supabase](https://supabase.com) as its database and [SendGrid](https://sendgrid.com). All of these tools need API keys in order to grant access and are necessary to the project.

Create a ```.env.local``` file in the root of the project and fill in your API keys in this fashion

```
//PUBLIC
NEXT_PUBLIC_SUPABASE_URL=(SUPABASE URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY=(SUPABASE ANON KEY)
NEXT_PUBLIC_STORAGE_API=(WEB3STORAGE API KEY)

//PRIVATE
SUPABASE_SERVICE_ROLE=(SUPABASE SERVICE ROLE KEY)
SENDGRID=(SENDGRID API)
```


## Run
Before running


In order to run the project the locally run the command:

```
npm run dev

#or

yarn dev
```

