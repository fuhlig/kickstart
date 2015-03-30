# KICKstart

Web boilerplate for frontend workflow based on **node**, **grunt** and **bower**.  

includes:

- local development
    - local http server
- deployment
    - via gh-pages
- live preview
    - livereload
- modularity
    - html templating via handlebars
    - SASS partials
- notifications


## Installation

- install [node.js](http://nodejs.org/)

*use `npm <package> -g` to install packages globally*  

- install grunt via `npm install grunt-cli`
- install bower via `npm install bower`

- install project depencendies via `npm install` and `bower install`


frontend dependencies / extras:  

- [jQuery](http://jquery.com/)
- [modernizr](http://modernizr.com/)
- [inuit.css](http://inuitcss.com/)

- sass compiling
    - sourcemap (requires sass 3.3 via `gem install sass --pre`)  
    `sass --watch --sourcemap scss:css`

## Usage
run `grunt` for inital setup and `grunt dev` for run the http server and you're ready to go!

*(or execute `$ sh watch` and `$ sh serve` after initial `grunt`)*
