# Getting Started with Next.js

**Author:** Jose Benitez  
**File Name:** Deployment.md  
**Date:** March 13, 2023  
> Let this file serve as a summarized guide on how our app was deployed as well as the stack that our team decided to use for this project.


1.  Initialize a Git Hub repository called *Introspect*
2.  Make a local copy of the empty repository:
    ```bash
    git clone https://github.com/jbenite2/Introspect   
    ```
3. Install next, react and react-dom in your project folder:
   ```bash
    npm install next react react-dom
    ```
4. To create a project, run:
    ```bash
    npx create-next-app@latest
    ```
5. Open package.json and add the following 
    ```json
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    }
    ```
6. Download dependencies
    ```bash
     npm install
    ```
7. Start development server
    ```bash
     yarn start
    ```

# Deployment
> We'll be using Vercel for our deployment process. 
>
# Prisma
> Setting up Prisma
1. Download Prisma
    ```bash
     npx prisma init
    ```
2. Go to .env file and update the ${ DATABASE_URL }
3. Set the schema.prism file to this (per documentation)
   ```bash
    generator client {
        provider = "prisma-client-js"
        previewFeatures = ["referentialIntegrity"]
    }

    datasource db {
        provider = "mysql"
        url = env("DATABASE_URL")
        referentialIntegrity = "prisma"
    }
    ```
4. Download planetscale CLI
```bash
    brew install planetscale/tap/pscale
    brew install mysql-client
```
5. Create a new database
```bash
    pscale create ddb
```
6. Run a local proxy to your database, which allows a simpler way to connect to your database when running your app locally
```bash
    pscale connect ddb main --port 3309
```
7. Synchronize changes 
```bash
    npx prisma db push
```
8. Access the MySQL interface and start editing manually
```bash
pscale shell ddb main
```

# Database 
> For this project we'll be using PlanetScale, an AWS service that allows users to store data in a relational database via queries. 
  1. Create an account in PlanetScale or log in using your GitHub account.
  2. Create a database using the free tier. 
  3. For this project we'll be using a database created under Dom's account in PlanetScale called ddb (Dom's Database)