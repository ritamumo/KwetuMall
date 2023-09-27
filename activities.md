# Notes

## creating a react project
- how to create a react project using vite
- create react app (creating react app)

## Creating a node and express project
1. Create a folder from your terminal using the following command
```
mkdir name of folder
```
2. cd into that folder
3. Add commamd npm init that creates the package.json file for you
4. Install the necessary packages
```
npm install express
npm install nodemon
npm install mongoose
npm install body-parser
npm install cors
```

- nodemon enables us to see changes without having to restart the server
5. Go into your package.json file. Remove the following code in the scripts:
```
"test": "echo\" Error: no test specified\" && exit 1"
```
- Replace it with the following code
```
"start": "nodemon index.js
```
- Just above the "scripts" ,  add the following line of code:
```
"type": "module"
```
6. To run your project run the following command in your terminal:
```
npm start
```

## Naming

- Component will always start with a capital letter: nameof file, function name, export default
- Everything else: camel cased
- "She went to the shop" -> sheWentToTheShop
- Snake case your urls/paths (App.js, routes)
- "She went to the shop" -> she-went-to-the-shop

**_ Not a rule, specific to this project _**

- Plural/singular
- crud
- create: creating 1 category
- read: getting all categories-plural | getting 1 category-singular
- updating: editing 1 category- singular
- deleting:
deleting 1 category - singular

## frontend vs backend
# Activities
## Challenge 1 
- on App.jsx remove all the code in the return
- Add a div with a button inside called fetch
- we have created an API that sends an array that sends an array of students
- fetch from this API and map over data you receive

## Assignment 1 - To be checked on Friday
- Finish on react basics assignments
    - try 3 components tabs, forms & modals
    - commas on population

## Assignment 2
- Add the respective models as discussed

## Assignment 3
- Find out why delete operation uses POST method

## Activity 1
- Create a file under pages under admin folder
- name the folder Sidebar.jsx
- implement the design sent on Sidebar.jsx
- you can add a route on app.jsx to view the sidebar

## Assignment:
-  Try get all the pickup points from 'getPickupPoints' function

## Activity 2

- Implement the delete functionality for pickup points ie deleting a pickup point

- ## Assignment 4

- Fetch all the products
- map over them in a table
      - name
      - sellingPrice
      - stock
      - categories
      - description
      - action(edit, delete btns)

## Assignment
- on Home.jsx format the price to follow the example below
-Example: 1000 -> 1,000, 10000000 -> 10,000,000