<h3 align="center"> Technical Assessment (Relationship Management System) </h3>

## Introduction

The relationship management solution addresses the issue of conflicting tokens and user data when RMs open multiple tabs for customer signups. The solution should ensure that each customer signup is uniquely identified with an ID, preventing data conflicts in scenarios with concurrent tab usage.

## Problem

Concurrent signup attempts from multiple tabs can lead to:

- Duplicate customer records
- [Data inconsistencies] - partially completed signups from one tab overwritten by another
- [Race conditions] - data from one tab impacting the signup process in another

## Solution

This application solves the problems by main generating unique IDs when customer are being signed up. Additionally, there is a check for existing IDs before customer data is added to the database (json-server) in special cases where IDs generated are the same.

## Explanation

- A unique ID using uuid from and attached to the customer data
- A duplicate check is done by querying the database with the unique ID generated for any existing customer
- customer data together with the unique ID is then stored in the database (json-server).
- Error handling is implemented to handle potential issues during ID generation and signup


## Installation
To use the relationship management system, follow these steps:

- Clone the repository from the GitHub repository.
- Run `npm install` to install the project dependencies.
- Run `ng serve` to start the development server. The application will be accessible at http://localhost:4200/ by default.
- To start the server navigate to src directory and run `npx json-server --watch db.json`.


