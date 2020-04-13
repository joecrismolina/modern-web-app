# Basics of Modern Web Applications

![modern JS meme](https://memeshappen.com/media/created/2018/04/he-just-wanted-to-build-a-modern-JavaScript-frontend.jpg)

*(image courtesy of https://memeshappen.com/)*

## Introduction

In the beginning, creating websites/web applications, consisted of HTML pages, a dash of CSS and some sprinkles of Javascript. But people wanted the websites to look more appealing and flashy, so they added heaps and heaps of CSS and Javascript. But alas!, they were not contented and wanted their websites and web applications to not just be visually appealing but more interactive and dynamic, and so they added tons more of Javascript. This gave rise to *Javascript Frameworks*. First, jQuery, then Angular, Ember, then React, and then Vue, Svelte, and... they keep on coming and coming, and now everyone's lost and just want to go back to the good old days of `document.querySelectorAll()` (or not! Lols). You get the basic picture right?

In summary, we have a very complex and rich Javascript frameworks and ecosystem right now and these frameworks come and go sometimes faster than you can master any of them. But these frameworks are just *toolings to help developers be more productive*. In the end, they will all come down to HTML, CSS and Javascript asset files that you will need to serve to your clients.

The goal, is to somehow help us understand, how we get from point A (complex Front End framework) to point B (final HTML, CSS and Javascript assets).

## Structure

For the project, we will create a simple project structure as follows

```javascript
/root
    /dist
    /src
        index.html
        index.js
        index.css
        /js
```

## Source code Overview

* index.html - our main html page, modern web applications are usually Single-Page Applications (SPAs). Ddynamic content and routing are usually done via Javascript.
* index.js - our **application entry point**. This is usually the main Javascript file loaded by the index.html and contains all the necessary logic for the entire application. You may have, and usually you will, more  than one Javascript file to properly modularise your application's logic. That is where asset bundler like **Webpack** comes in. Also, your Javascript code maybe using *next-generation Javascript* syntax and functionalities that are not yet well-supported by most browsers (i.e. IE) and that is why we need to transpile our Javascript code to a version (ES2015) that most browsers will understand, that is where a tool like *Babel* comes in.
* index.css - (optional) will just contain some styling for our application. You may also want to have your styling using (CSS in JS), but for brevity, let's just have our styling in this file.

---

## Babel

[Babel](https://babeljs.io/) as it says on their official website is a Javascript compiler. It enables developers to use advanced and next-generation Javascript syntax and features, that are yet to be supported by most browsers by compiling them into ES2015 format and by "polyfilling" if necessary. So basically, you can use Javascript ES6, ES2017, ES2018 features like Classes, Arrow functions, spreading, etc. in your source code and Babel will take care of compiling them into a code that browsers will understand.

### Babel setup

We need to add some Babel libraries for our application

`npm install @babel/core @babel/preset-env -D`

### Babel config

Babel uses a configuration file `.babelrc` to help it compile our source code.
We can always refer to the [official Babel documentation](https://babeljs.io/docs/en/) for more details.

For our purposes, we will add a minimal Babel config

#### **`.babelrc`**
```javascript
{
    "presets": ["@babel/preset-env"]
}
```

[preset-env](https://babeljs.io/docs/en/babel-preset-env) is a "smart preset" that helps us simplify compiling and ployfilling latest Javacsript code.

---

## Webpack

[Webpack](https://webpack.js.org/) is a tool that help developers "bundle" their application source codes into the final assets that they can serve to their clients. It also helps in making the development faster by providing a "development server" that makes viewing changes to our applications instantaneous.

Basically, Webpack takes all your application code (Javascript, styles, images, fonts, files etc.) and bundles them for you while also providing other functionality like minification, etc.

### Webpack setup

To use Webpack in our app, we have to install webpack libraries as "dev dependencies" to our project. We need to install `webpack`, `webpack-cli` and `webpack-dev-server`.

`npm install webpack webpack-cli webpack-dev-server -D`

### Webpack config

After adding the necessary webpack libraries to our project's dependencies, we will need to add our webpack configuration file `webpack.config.js`.

For our purposes, we will add a minimal configuration file.


#### **`webpack.config.js`**
```javascript
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    }
}
```

The configuration file above basically says, to start our bundling from the file at `./src/index.js` and to save the final Javascript bundle file in `<project_root>/dist/js/bundle.js` . The `devServer` section tells the Webpack Dev Server to serve the files in our `./dist` folder.

### Webpack plugins

Webpack ecosystem is basically consisted of [Plugins](https://webpack.js.org/plugins/) . These plugins add functionalities to Webpack's bundling capabilities and makes it flexible. One of the most commonly used plugin is the [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) . One of the key use of this plugin is to generate your final `index.html` file from scratch or from a "template" if you have one, and automatically "inject" your final JS bundle file into that HTML file as well.

To add it in our project,

`npm install html-webpack-plugin -D`

After adding it, we will need to add some configuration lines in our `webpack.config.js` file.

```javascript
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // require it here!

module.exports = {
    // ... lines omitted
    // Add the HtmlWebpackPlugin to the plugins array!
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // use our existing index.html as template
        }),
    ]
}
```

### Webpack loaders

[Loaders](https://webpack.js.org/loaders/) can be simply describe as how we setup the "rules" on how we tell Webpack to bundle certain type of files and what "additional libraries" if needed to be used.

For our project, we simply want to tell Webpack to ***use Babel to compile all Javascript code*** we have.

We need to add it to our project

`npm install babel-loader -D`

Then apply the loader in our `webpack.config.js`

```javascript
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    // ...
}
```

---

## NPM Scripts

In our `package.json` , we will add some script files as follows

```javascript
{
    // ...other lines omitted
    "scripts": {
        "start": "webpack-dev-server --open",
        "build": "webpack",
        "build:dev": "webpack --mode=development"
    }
    // ...
}
```

* `npm run start` - will start the webpack development server
* `npm run build:dev` - will build the assets in DEVELOPMENT mode
* `npm run build` - will build the assets in PRODUCTION mode

Using the above npm scripts plus the basic Babel and Webpack setup specified above, we can now use modern Javascript code and bundle them properly to make simple ***modern web applications*** . 

In the next section, we will use the React front end library to build a simple web application.

---

## Let's Create a React Application, without using create-react-app!

---

## Notes and References

* Webpack
* Babel
* React
