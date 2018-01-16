# Food Delivery System

## Basic File Structure

```bash
├── src/app
│   ├── create
│   │   ├── create.component.*
│   ├── predict
│   │   ├── predict.component.*
│   ├── kitchen
│   │   ├── kitchen.component.*
│   ├── app.component.*
│   ├── app.module.ts
│   ├── app-routing.module.ts
│   └── dalviroo.service.ts
├── dist
├── server.js
├── README.md
├── node_modules
├── package.json
└── .gitignore

```

## API docs

* Create a New Order ```/api/create```
* Get All Orders ```/api/orders```
* Update Order Details ```/api/orders/:id```
* Export as CSV ```/api/export```

## Libraries & Modules Used

* Angular 2
* Ng-Bootstrap
* [json2csv](https://www.npmjs.com/package/json2csv)

## How to run locally?

* Clone the repo.
* Run `npm install`
* Run the command `npm run postinstall  && npm run start`
* Go to the browser and open `localhost:8080`

