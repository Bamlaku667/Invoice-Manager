# Invoice-Manager

Invoice Manager is a full-stack application that allows users to create, view, update, and delete invoices. Each invoice includes details such as invoice number, client information, itemized list of products/services, total amount, and due date.

# Project Structure

The project is divided into two main directories:

    backend: This directory contains the Node.js server with RESTful APIs for CRUD operations on invoices.

    frontend: This directory contains the Next.js application for the user interface.

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites

Node.js
PostgreSQL
Git

# Installation

1. Clone the repository

git clone https://github.com/yourusername/invoice-manager.git

2. Navigate to the backend directory, install NPM packages and start the server

cd invoice-manager/backend
npm install
npm start

3. In a new terminal window, navigate to the frontend directory, install NPM packages and start the application

cd invoice-manager/frontend
npm install
npm run dev

4. Open http://localhost:3000 with your browser to see the result.

# Environment Variables

Create a .env file in the root directory of your backend project. Add the following environment variables to your .env file.

-- the postgress enviroment variables will be generated on vercel ( you can copy from your vercel account ) or you can use your local one

POSTGRES_PRISMA_URL=<your_postgres_prisma_url>
POSTGRES_URL_NON_POOLING=<your_postgres_url_non_pooling>

TOKEN_KEY=<your_token_key>
TOKEN_EXPIRY=<your_token_expiry>
PORT=<your_port>
NODE_ENV=<your_node_env>
