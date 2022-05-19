const { npm_url } = require("unpkg_url");

hexo.extend.filter.register('after_generate', () => {
  // remove all images
  hexo.route.list().filter(path => path.startsWith("images/")).forEach(path => {
    hexo.route.remove(path);
  });
});

hexo.on('generateBefore', function () {

  // icons
  const avatar_url = npm_url("@njzjz/icons", "0.0.4", "logos/deepmodeling.png");
  hexo.theme.config.avatar.url = avatar_url;
  hexo.theme.config.favicon.small = avatar_url;
  hexo.theme.config.favicon.medium = avatar_url;
  hexo.theme.config.favicon.apple_touch_icon = avatar_url;
  hexo.theme.config.favicon.safari_pinned_tab = avatar_url;
});

