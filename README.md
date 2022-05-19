# StoreFrontend
store-frontend is an angular application as an ecommerce starter project. User can find following features in the app.

```
Fetch all products from backend
See details of a particular product
Add to Cart
Check out `(Requires user to be Signed in)`
Register
Login/Logout
Check users' orders
```
### Installing Dependencies

Simply, run the following command to install the project dependencies after you have cloned the repository:
```
npm install
```
## Development server

```
hostname: http://localhost
PORT : 3000
```
## Running the Application

Run `ng serve  --port 3000` to run dev server. Navigate to `http://localhost:3000/`. 

The application will automatically reload if you change any of the source files.
Make sure you run the backend for this application before running the app.You can find the backend here: 
[Store Front backend](https://github.com/toseefAhmed-pk/storefront-backend-api.git)
This will be holding data and user credentials in a postgres database.

## Usage Guide
When you run the application for the first time, there will be no products displayed since the database is empty. Click on **+ Dump Products** in Application header. This will create some products in the database. After that, you should be able to see the products list.

Markup : 1. Select a product to see product details.

         2. Select Quantity and Add to Cart.
         
         3. Go to Cart and insert shipping details. (If you click on `Save for next time`, your address will be saved and populated in the form automatically when you visit your cart next time)
         
         4. Click on Checkout. If you are not signed in, it will take you to login page and you should sign in in order to perform check out. After login, you will be redirected to check out page.
         
         5. After your order is placed, you can check it in My orders. (Click on User Avatar and visit `My Orders`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli)
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
