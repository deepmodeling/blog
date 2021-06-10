const crypto = require('crypto');
const { gh_url } = require("jsdelivr_url");

hexo.extend.filter.register('after_generate', () => {
  // remove all images
  hexo.route.list().filter(path => path.startsWith("images/")).forEach(path => {
    hexo.route.remove(path);
  });
});

hexo.on('generateBefore', function () {
  if (process.env.CSS_COMMIT) {
    hexo.theme.config.css = gh_url("deepmodeling", "blog", process.env.CSS_COMMIT, "css");
  }

  // icons
  const avatar_url = "https://avatars.githubusercontent.com/u/32671488?s=200&v=4";
  hexo.theme.config.avatar.url = avatar_url;
  hexo.theme.config.favicon.small = avatar_url;
  hexo.theme.config.favicon.medium = avatar_url;
  hexo.theme.config.favicon.apple_touch_icon = avatar_url;
  hexo.theme.config.favicon.safari_pinned_tab = avatar_url;
});

hexo.extend.filter.register('after_generate', function (data) {
  const hexo = this;
  const reg = /<link(.*?) href="(.*?)\/main.css">/gi;
  return new Promise((resolve, reject) => {
    // read css and get md5
    const html = hexo.route.get("css/main.css");
    let cssContent = "";
    html.on('data', (chunk) => (cssContent += chunk));
    html.on('end', () => {
      const css_hash = crypto.createHash('md5').update(cssContent).digest('hex');
      const new_css_path = `css/${css_hash}.css`;
      hexo.route.remove('css/main.css');
      hexo.route.set(new_css_path, cssContent);
      resolve(css_hash);
    });
  }).then((css_hash) => {
    return Promise.all(hexo.route.list().filter(path => path.endsWith('.html')).map(path => {
      return new Promise((resolve, reject) => {
        const html = hexo.route.get(path);
        let htmlContent = "";
        html.on('data', (chunk) => (htmlContent += chunk));
        html.on('end', () => {
          hexo.route.set(path, htmlContent.replace(reg, function (str, p1, p2) {
            return str.replace("main.css", `${css_hash}.css`);
          }));
        });
        resolve();
      });
    }));
  });
});
