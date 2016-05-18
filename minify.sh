#!/bin/bash

#copy flexlayout.js to the demo/js/libs folder
cp -f ./flexlayout.js ./demo/js/libs/flexlayout.js
echo 'flexlayout.js copied to demo/js/libs.'


#remove old files
rm flexlayout.min.js #flexlayout.min.js.gz

#uglify
uglifyjs flexlayout.js --compress --mangle --mangle-props --screw-ie8 --output flexlayout.u.js

#minify
minify --output flexlayout.min.js  flexlayout.u.js

rm flexlayout.u.js

#################################################################################################
#Minify all libs
minify --output ./demo/js/libs.min.js ./demo/js/libs/jquery.js ./demo/js/libs/underscore.js ./demo/js/libs/bootstrap.js ./demo/js/libs/backbone.js ./demo/js/libs/loadCSS.js ./demo/js/libs/less.js ./demo/js/libs/codemirror.js ./demo/js/libs/cm-mode-javascript.js ./demo/js/libs/flexlayout.js ./demo/js/libs/require.js

lessc ./demo/css/main.less ./demo/css/main.css
echo 'less complied.'

#copy to site brach
yes | cp -a ./demo/. ../flexLayout-site/
echo 'site generated'

#gzip min
#gzip -9 -c flexlayout.min.js > flexLayout.min.js.gz