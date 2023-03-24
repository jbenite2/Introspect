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

# Database 
> For this project we'll be using PlanetScale, an AWS service that allows users to store data in a relational database via queries. 
  1. Create an account in PlanetScale or log in using your GitHub account.
  2. Create a database using the free tier. 
  3. For this project we'll be using a DB Jose created last year.