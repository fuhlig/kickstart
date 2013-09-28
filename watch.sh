#!/bin/sh

# ** watches and compiles sass/scss files **

# modified version from @csswizardry watch script
# https://github.com/csswizardry/inuit.css-web-template/blob/master/css/watch

# generate sourcemap (sass 3.3 required [gem install sass --pre])
# sass --watch --sourcemap scss:css

# No minification
sass --watch scss:css --style expanded

# No minification
# sass --watch scss:css --style compressed

exit 0