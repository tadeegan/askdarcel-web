var icons = require.context("../assets/images", true, /ic-.*\.png$/i);
var iconPathMap = {};
icons.keys().forEach(function (key) {
  iconPathMap[key.match(/ic-([^@]*)(?:@3x)?.png/)[1]] = icons(key);
});

function icon(name) {
  return iconPathMap[name.toLowerCase()];
}

export const images = {
  background: require('../assets/images/bg.png'),
  logoSmall: require('../assets/images/logo-small-white@3x.png'),
  icon: icon
};
