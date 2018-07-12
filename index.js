
const  fetch = require('node-fetch');
const request = require('request');
const fs = require('fs-extra');

exports.loadAvatars = async function (url,path) {
    try {

        let page = "";
        let data="";
        let counter = 1;
        await fs.ensureDirSync(path);
        while (((page = await fetchPage(url + "people?page=" + counter++)) !== "Not Found") )
            {
                if (!page.includes('class="avatar"')) break;
                data += page;

            }

        let array = await getStringFromText(data, 'class="avatar"', '<');
        let avatars = [];
        let imageUrl = "";
        let personName = "";

        for (let i = 0; i < array.length; i++) {
            imageUrl = (await getStringFromText(array[i], 'https', '"'))[0];
            personName = (await getStringFromText(array[i], '@', '"'))[0];
            avatars.push({imageUrl: imageUrl.trim(), personName: personName.trim()});
        }

        for (let i = 0; i < avatars.length; i++) {
            await loadImage(avatars[i].imageUrl, path + avatars[i].personName + ".jpeg");
        }
    }
    catch (err){
        console.log("loadAvatars method: "+err);
        return false;
    }

}
async function getStringFromText(text,phrase,delimiter) {
    let page = text.split(delimiter);
    let array =[];
    for (let i=0; i<page.length; i++) {
        if (page[i].includes(phrase)){
            array.push(page[i]);
        }
    }
    return array;
}


async function loadImage(url,fileName){
   try {
       await request(url).pipe(fs.createWriteStream(fileName));
       return true;
   }
   catch (err) {
       console.log("loadImage method: "+err);
       return false;
   }
}

async function fetchPage(url) {
   try {
       const options =
       {
           follow: 1,         // maximum redirect count. 0 to not follow redirect
           timeout: 10000,    // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
           size: 0            // maximum response body size in bytes. 0 to disable
       }
       const res = await fetch(url,options);
       return await res.text();
   }
   catch (err){
       console.log("fetchPage method: "+err);
       return false;
   }

}

