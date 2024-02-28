# Cell Tech

### Live Website Link https://cell-tech-client.vercel.app/

## Description
The Project is developed using ReactJS, TypeScript, NodeJS, ExpressJS, MongoDB.

#### Admin Login Details
Email: test@email.com
Password: 123abc!@#ABC

### CSS Framework
Material UI CSS Framework

### React Library's used
Some of the library's that was used in the project

#### Redux Toolkit
 - To preserve global state and api calls

#### React Router
 - To navigate the system
 - To make private routing

#### Redux Persist
 - To persist user data after reload

#### React Hot Toast
 - To display messages

#### React Chart JS 2
 - To show statistics

### Pages
The system consists of 6 main pages

 - Login
 - Register
 - Dashboard
 - Products
 - Inventory
 - Sales History
 - Users

The system is locked for users only, Without logging in it cannot be used

### Features
Features of the system

 - Login page has email-password login option and jwt implementation for user validation
 - Register page has email-password registration option, password is encrypted with bcryptjs
 - SideMenu can be used to navigate the system and logout, Menu changes based on user role
 - Dashboard shows line chart of total sold amount based on selected days, Admins can select individual user and Users will see their own data
 - Products page lists all the available and active products
 - A new product button at top opens a modal to add new product
 - Products page have search functionality by price, release date, brand, model, os, storage, screen, camera, battery
 - Each product card shows product image, name, price, release date, brand, model, os, storage, screen, camera, battery
 - Product card has 3 action buttons that update, delete, sell and duplicate to create new product
 - Sales History page shows all sales history by daily, weekly, monthly and yearly, Admins can select individual user and Users will see their own data
 - Inventory page lists the products with additional fields sold, status and selection for bulk delete (Admin Only)
 - Users page shows all the in the system (Admin Only)