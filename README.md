# IT-research-vector-search-engine

a school project for my IT research class

## How to run

 1. install and run the docker containers with the following command:

    ```bash
     docker compuse up -d
    ```

 2. Run the nodejs server with the following command:

    ```bash
    node .
    ```

 3. Import the included SQL file to create the tables and insert the data
 4. Import milvus.csv to import the sample data, this can be done using Attu UI: <https://github.com/zilliztech/attu>

 5. Open the index.html file in your browser

## How to use

This application has a search bar where you can type in a query. The query can be a single word or a sentence. There are two search buttons, one for the vector database and one for a relational postgres database. The goal of this project is to set up a minimal application using a vector database for a search/recommendation engine and compare it to a similar setup with a relational database. My findings during the development and testing of this application will be documented in a blog post assigment.
