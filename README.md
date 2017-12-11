# perx-frontend-challenge

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

In the root directory, you can use `sample.csv` to upload and test the app.

## Notes

I wanted to challenge myself a bit for this interview test. Normally, I would build a Single Page App using AngularJS, but I wanted to learn something new so I decided to use Vue.js. The learning experience was great. Vue.js and AngularJS use very similar syntax so it was easy to transition to a new framework. Hopefully, this wasn't a bad first project ;)

### Other Notes
- This project does not contain Unit/E2E testing
- Responsive CSS was kept at a minimal since the focus was to build an application that works
- The CSV upload assumes that there are no headers.
- While the user specifies which column maps with which data in the CSV, validation was kept at a minimal. All columns must be selected && unique.
- There are 20 different colors for UP TO 20 categories. All extra categories will be colored black. However, I've limited the CSV parsing to 20 rows.
