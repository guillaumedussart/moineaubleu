const {resolve} = require('path');
const {
	appendFileSync,
	copyFileSync,
	existsSync,
} = require('fs');

const refreshScript = `\n\n  script(src="${process.env.BROWSER_REFRESH_URL}")`;
const pugLayoutPath = resolve('views', 'layout.pug');
const pugLayoutPath_COPY = pugLayoutPath + "~";

if (!existsSync(pugLayoutPath_COPY)) {
	copyFileSync(pugLayoutPath, pugLayoutPath_COPY);
	appendFileSync(pugLayoutPath, refreshScript);
}else{

}