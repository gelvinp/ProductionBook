# Production Book

A simple document library to dynamically get a list of PDF's and display them.

Makes use of the wonderful pdf.js library, released under the Apache License
2.0.

Password is set in the .env file

PDF files are placed in the documents folder, there is no web interface
supplied for uploading and/or removing files.

Your .env should look like the following:

```
RAILS_MAX_THREADS=5
WEB_CONCURRENCY=3
DATABASE_URL=postgres://your_database_username:your_database_password@your_database_host/your_database_name
DATABASE_TEST_URL=postgres://your_database_username:your_database_password@your_database_host/your_test_database_name
RAILS_ENV=production
RACK_ENV=production
PASSWORD=your_password_here
```

In the client folder, you should have a .env file with the following:

```
GENERATE_SOURCEMAP=false
REACT_APP_PROJECT=your_project_name_here
```
