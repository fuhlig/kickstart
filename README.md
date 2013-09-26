kickstart
=========

web boilerplate for frontend workflow.
based on node, grunt and bower.
includes:
- http server
- livereload
- templating (via handlebars, compiled with grunt-assemble)

- grunt-notify (https://github.com/dylang/grunt-notify)
install

npm install
bower install

sass compiling:
sass --watch --sourcemap scss:css

grunt:
run initial "grunt" and "grunt dev" for run the http server

(or execute watch.sh and serve.sh after initial "grunt")