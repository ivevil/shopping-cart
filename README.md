## The project
A shopping cart built with React and Typescript.

## RUN:
````
npm install
npm start
````
or with dockerized container:
````
npm or yarn install
docker-compose -f docker-compose.dev.yml up
````
Now open the app at http://localhost:3000


## LINT:
````
eslint src/**/*.tsx
````

## TBD: run unit tests
`npm run test`

## TBD: run e2e tests
`npm run test:e2e`

## Project screenshot
![ScreenShot](https://raw.github.com/ivevil/shopping-cart/main/screenshot.png)

## FINISHED TASKS

* As a customer I want to be able to select products from the drop down list.

* As a customer I would like to be able to see the prices in the drop down list.

* As a customer I would like to be able to determine the quantity of the product before I add it to the shopping cart.

* As a customer I would like to be informed when I exceed the maximum number of products and be prevented from entering more than this number

* As a customer I would like to see the total for the selected product before I add it to the shopping cart

* As a customer I want to be able to see all my products in the shopping cart

* As a customer I want to be able to see the total of the shopping cart at any time

* As a customer I want to be able to remove products from the shopping cart

* As a customer I would like to be able to delete the entire shopping cart at once

* As a customer I want to be able to see how many shopping cart items I can add (max 10 items, not product amount combined)

* As a customer I would like to be informed when I have reached the limit

* As a customer I want to see a graphical overlay when I confirm the purchase to know that my order was successful

* As a customer I want to be able to select the quantity of products with a slider

* As a customer I want to be able to see the quantity selected with the slider also in the input field

* As a customer I want to see the new total for the selected quantity only after a few milliseconds

