# viewscript-quasar-playpen

> A playpen to try out some Viewscript output in Quasar.

## Build Setup

Packages to be linked: 
* viewscript-examples
* viewscript-to-quasar
* viewscript-extract-defaults

For each package to be linked, do the following:
``` bash
cd ../<package-name>
yarn link
```

Then:
``` bash
cd ../viewscript-quasar-playpen
yarn install
```

Then again, for each package to be linked, do the following:
``` bash
yarn link <package-name>
```

Finally:
``` bash
quasar dev
```

## Environment Variables
VIEWSCRIPT_ROOT_PATH - Where to find the Viewscript repo e.g. c:/development/viewscript
