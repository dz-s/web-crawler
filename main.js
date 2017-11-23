import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio';

fetch('https://www.reddit.com/r/dailyprogrammer/comments/7dlaeq/20171117_challenge_340_hard_write_a_web_crawler/')
.then(resp => resp.text())
.then(body => {
    const $ = cheerio.load(body);
    const links = $('a'); //jquery get all hyperlinks
    $(links).each(function(i, link){
      console.log($(link).text() + ':\n  ' + $(link).attr('href'));
    });
});