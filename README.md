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

When you run the application, there will be no products displayed. Click on `+ Dump Products` in Application header. This will create some products in the database. After that, you should be able to see the products list.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help
This project was generated with [Angular CLI](https://github.com/angular/angular-cli)
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
