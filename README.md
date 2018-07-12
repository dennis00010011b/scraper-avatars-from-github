## scraper-github-avatars
Script downloads gitHub contibutor's avatars for given organization. Only public (not private)  team members avatars will be downloaded.
 
## Usage
```
const loader = require('scraper-github-avatars');
(async function () {
	let organization = 'facebook';
	let path = './avatars';
	let avatars = await loader.loadAvatars(organization, path);
	for (let i = 0; i < avatars.length; i++)
		console.log(avatars[i].imageUrl + ", " + avatars[i].personName);

})();
```
## Installation
``` npm i scraper-github-avatars ```


## gitHub
```
https://github.com/dennis00010011b/scraper-github-avatars

```

