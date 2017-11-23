import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio';
const baseUrl = 'https://www.reddit.com/r/dailyprogrammer/comments/7dlaeq/20171117_challenge_340_hard_write_a_web_crawler/';
fetch(baseUrl)
  .then(resp => resp.text())
  .then(body => {
    const $ = cheerio.load(body);
    const links = $('a'); //jquery get all hyperlinks
    $(links).each(function (i, link) {
      const href = $(link).attr('href');
      if (href && !href.startsWith('javascript')) {
        if (!href.startsWith('http')) {
          if (href.startsWith('/')) {
            console.log($(link).text() + ':\n  ' + relativeToAbsolute(baseUrl, href.slice(1, href.length)));
          } else {
            console.log($(link).text() + ':\n  ' + relativeToAbsolute(baseUrl, href));
          }
        } else {
          console.log($(link).text() + ':\n  ' + href);
        }
      }
    });
  });

const relativeToAbsolute = (base, relative) => {
  if (relative) {
    const stack = base.split("/"), parts = relative.split("/");
    stack.pop();
    for (let i = 0; i < parts.length; ++i) {
      if (parts[i] == ".")
        continue;
      if (parts[i] == "..")
        stack.pop();
      else
        stack.push(parts[i]);
    }
    return stack.join("/");
  }
}
