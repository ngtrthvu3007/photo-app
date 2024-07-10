Photo App

Tech tacks:


NextJS ver 14 (server action)


Postgresql 16


Prisma


Typescript


Ant-design

## Set Up

1 Clone and install this repo by run :
```
git clone https://github.com/ngtrthvu3007/photo-app.git 
cd photo-app
npm install
```
2  Create .env file

 ```
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

3 Create Database
You can create database by using terminal or postgresql client like pgAdmin 4; Table Plus; DBeaver

4 Connect & create the database tables: 


Using terminal or postgresql client to connect database before run 
```
npx prisma db push
```

 ## Run 
 ```
 npm run dev // local
 npm run build // build
```

## Note


you can use Psql client app like Table plust
