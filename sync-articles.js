const Parser = require('rss-parser'); 
const Bluebird = require('bluebird');
const db = require('./services/db');
const Article=require('./services/article');
const Email= require('./services/email');
const User = require('./services/user');

const parser = new Parser();

const VNEXPRESS_RSS='https://vnexpress.net/rss/tin-moi-nhat.rss';
const TUOITRE_RSS='https://tuoitre.vn/rss/tin-moi-nhat.rss';
const THANHNIEN_RSS='https://thanhnien.vn/rss/home.rss';
const rssList = [VNEXPRESS_RSS, TUOITRE_RSS,THANHNIEN_RSS];
const SYNC_INTERVAL = Number(process.env.SYNC_INTERVAL || 900000);
const SYNC_INTERVAL2 = Number(process.env.SYNC_INTERVAL2 || 43200000);

//Nạp dữ liệu
db.sync().then(async function () {
  for(;;){
    console.log('start loading news...');
    await Bluebird.each(rssList, async function(rss){
      console.log('Load RSS:',rss);
      const feed = await parser.parseURL(rss);
  
    await Bluebird.each(feed.items,async function (item){
      if(!item.link){
         return;
      }
      const found = await Article.findOne({
        where:{
          link: item.link, 
        }
      });
      if(!found){
        console.log('Add new article: ',item.link,item.pubDate);
        await Article.create({
          link: item.link,
          title: item.title,
          content: item.contentSnippet,
          publishedAt: new Date(item.pubDate),
          nguon: item.link.split('/')[2],
        });
      }
    });
    });
    await Bluebird.delay(SYNC_INTERVAL);
  }
}).catch(console.error);

//Send Email
let tam="";
db.sync().then(async function () {
  for(;;){
    console.log('start loading news...');
    await Bluebird.each(rssList, async function(rss){
    console.log('Load RSS:',rss);
    const feed = await parser.parseURL(rss);
    await Bluebird.each(feed.items,async function (item){
      if(!item.link){
         return;
      }
      const found = await Article.findOne({
        where:{
          link: item.link, 
        }
      });
      if(!found){
        tam=tam + item.title + ': '+ item.link + '\n';
      }
      });
      console.log(tam);
      const AllUser= await User.findAllUerNotNull();
      AllUser.forEach(async function (t) {
      await Email.send(t.email, 'Bảng tin mới' ,tam);
      });
    });
    await Bluebird.delay(SYNC_INTERVAL2);
  }
}).catch(console.error);






// const vnexpress = await Article.findByHost('vnexpress.net');
    // const tuoitre = await Article.findByHost('tuoitre.vn');
    // const thanhnien = await Article.findByHost('thanhnien.vn');
    // tam = tam + '\n vnexpress \n';
    // vnexpress.forEach(async function (t) {
    //   tam=tam + t.title + ': '+ t.link + '\n';
    //   });
    // tam=tam + '\n tuoitre \n';
    // vnexpress.forEach(async function (t) {
    //   tam=tam + t.title + ': '+ t.link + '\n';
    //   });
    // tam=tam + '\n thanhnien \n';
    // vnexpress.forEach(async function (t) {
    //   tam=tam + t.title + ': '+ t.link + '\n';
    //   });