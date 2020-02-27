# Production Book

A simple document library to dynamically get a list of PDF's and display them.

Makes use of the wonderful pdf.js library, released under the Apache License
2.0.

Users are created from the Rails console, and running their setup method before saving for the first time will generate a random four digit ID and random password for the user, as well as set their auth to 0. The ID and password will be logged to the console.

An auth of 0 is read only, an auth of 1 allows uploading of documents, and an auth of 2 or greater allows full access.

PDFs are stored through ActiveStorage, and the web interface can be used to create and destroy sections, upload rename and delete documents, and move documents between sections.

Your .env should look like the following:

```
RAILS_MAX_THREADS=5
WEB_CONCURRENCY=3
DATABASE_URL=postgres://your_database_username:your_database_password@your_database_host/your_database_name
DATABASE_TEST_URL=postgres://your_database_username:your_database_password@your_database_host/your_test_database_name
RAILS_ENV=production
RACK_ENV=production
```

In the client folder, you should have a .env file with the following:

```
GENERATE_SOURCEMAP=false
REACT_APP_PROJECT=your_project_name_here
```
