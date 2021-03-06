# Quidax-BookStore
[![Build Status](https://app.travis-ci.com/AbonyiXavier/Quidax-BookStore.svg?branch=main)](https://app.travis-ci.com/AbonyiXavier/Quidax-BookStore)

[![Coverage Status](https://coveralls.io/repos/github/AbonyiXavier/Quidax-BookStore/badge.svg?branch=main)](https://coveralls.io/github/AbonyiXavier/Quidax-BookStore?branch=main)

Web app to purchase book. It is built on top of NodeJS and Express. It is higly flexible because it provides users with opportunity to:

- Sign up
- Sign in
- Add book
- List books with pagination
- List single book
- Like a book
- Review book (rating)
- Search for book
- Add to cart
- Update book

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/Quidax-BookStore)

Postman collection documentation link [url](https://documenter.getpostman.com/view/7775892/TzzHmso4)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A REST API client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- Run 'npm run test' to run test on the application
- In a browser address bar navigate to ''

# Using Book store through a restful client

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST, PUT, PATCH

# Assumption

- All APIs Endpoint have been protected to mirror real life situation
- No users as a role of admin

# Improvement

- Use of Redis to store carts.

## Built With

- NodeJs
- Express
- Mongodb(database)
- Mongoose (ODM)
- AWS s3 bucket
- Coveralls
- Travis CI
## Author

- AbonyiXavier
