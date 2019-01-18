
# How to build the playpen

## Installing

``` bash
npm install
```

You'll need to link the various Cardscript packages.
First, change directories to where your Cardscript packages can be found, e.g.

``` bash
cd \development\tymly\cardscript
```

Now we need to link all those:

``` bash
cd cardscript-examples
npm link
cd ..
cd cardscript-extract-defaults
npm link
cd ..
cd cardscript-extract-lists
npm link
cd ..
cd cardscript-parser
npm link
cd ..
cd cardscript-schema
npm link
cd ..
cd cardscript-table-of-contents
npm link
cd ..
cd cardscript-to-quasar
npm link
cd ..
cd cardscript-to-vuelidate
npm link
cd ..
cd cardscript-vue-sdk
npm link
cd ..
```


Then change directories back here:

``` bash
cd \development\cardscript
```

And link it all in:

``` bash
npm link @wmfs/cardscript-examples
npm link @wmfs/cardscript-extract-defaults
npm link @wmfs/cardscript-extract-lists
npm link @wmfs/cardscript-parser
npm link @wmfs/cardscript-schema
npm link @wmfs/cardscript-table-of-contents
npm link @wmfs/cardscript-to-quasar
npm link @wmfs/cardscript-to-vuelidate
npm link @wmfs/cardscript-vue-sdk
```
