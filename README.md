npm init -y
>> npm install hono @hono/node-server @prisma/client jsonwebtoken bcryptjs 
>> npm install -D typescript tsx @types/jsonwebtoken @types/bcryptjs prisma
>> npx tsc --init
>> npm install dotenv

>> npx prisma init
>> ganti env
>> npx prisma generate
>> npm run build

note : di postman bagian header ditambahkan 
-key : Authorization
-valuenya : Bearer token_login

note tambahan : isi di body di raw 
