/**
 * Created by 39557 on 2020/3/17.
 */
var a = {
  "presets": [
  ["env", {
    "modules": false,
    "targets": {
      "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
    }
  }],
  "stage-2"
],
  "plugins": ["transform-vue-jsx", "transform-runtime"],
  "env": {
  "test": {
    "presets": ["env", "stage-2"],
      "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
  }
}
}
