import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio';
const baseUrl = 'https://www.reddit.com/r/dailyprogrammer/comments/7dlaeq/20171117_challenge_340_hard_write_a_web_crawler/';
fetch(baseUrl)
  .then(resp => resp.text())
  .then(body => {
    const $ = cheerio.load(body);
    const links = $('a'); //jquery get all hyperlinks
    $(links).each(function (i, link) {
      //console.log(relativeToAbsolute(baseUrl, $(link).attr('href')) + ':\n  ')
      console.log($(link).text() + ':\n  ' + $(link).attr('href').startsWith('https') ? $(link).attr('href') + ':\n  ': relativeToAbsolute(baseUrl, $(link).attr('href')) + ':\n  ');
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
