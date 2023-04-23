///////////////////////////////////////////////////
//////// preload //////////////////////////////////
///////////////////////////////////////////////////



function getEasterEgg(date) {
    switch (date) {
        case [1, 1]:
            return 'newyear';
        case [12, 31]:
            return 'newyear';
        case [2, 14]:
            return 'vday';
        case [2, 27]:
            return 'pikanyan';
        case [2, 29]:
            return '404';
        case [3, 8]:
            return 'gb';
        case [3, 17]:
            return 'paddy';
        case [4, 4]:
            return '404';
        case [4, 14]: // May she rest in peace
            return 'grumpy';
        case [4, 9]: // Update yearly, because the churches don't give a damn
        case [4, 16]:
            return 'easter';
        case [4, 30]:
            return 'jazz';
        case [7, 28]:
            return 'elevator';
        case [8, 13]:
            return 'zombie';
        case [8, 31]:
            return 'pumpkin';
        case [9, 16]:
            return 'mexinyan';
        case [12, 5]:
            return 'ninja';
        default:
            if (date[0] == 12 && date[1] >= 20 && date[1] <= 27) {
                return 'xmas';
            } else {
                return 'original';
            }
    }
}

console.log("Preload code loaded.")
var catAudio = null;
var catImg = null;
var catStyle = document.getElementById('catStyle');
console.log("Got catStyle");
var tim = 0;
var speed = 1;
var updatedName = '';
console.log("Got rainbows");

today = new Date();
var defaultName = getEasterEgg([today.getMonth() + 1, today.getDate()]);

window.catName = location.hash.replace('#', '');
if (!catName) {
    if (location.search.includes('cat')) {
        console.log("Cat in search, moving to rug...");
        catName = new URL(location).searchParams.get('cat') || defaultName;
        console.log("Purr.");
    } else {
        console.log("No cat specified.");
        location.hash = defaultName;
        catName = defaultName;
    }
}

console.log("Initial: '" + catName + "'");

function getDisplayName(catName) {
    switch (catName) {
        case 'original':
            return 'Nyan Cat';
        case 'tacnayn':
            return 'taC nayN';
        case 'nyandoge':
            return 'Doge Cat';
        case 'nyancoin':
            return 'coin Cat';
        case 'pikanyan':
            return 'Pika Cat';
        case 'j5':
            return 'Catson 5';
        case 'gb':
            return 'Gameboy Cat';
        case 'vday':
            return 'Valentine Cat';
        case '404':
            return 'MISSINGNYAN';
        case 'oldnewyear':
            return 'newyear Cat';
        case 'fiesta':
            return 'fiesta Dog';
        case 'tacodog':
            return 'taco Dog';
        case 'nyanvirus':
            return 'virus Cat';
        case 'smurfcat':
            return 'Smurf Cat';
        case 'melon':
        case 'watermelon':
            return 'Melon Bird';
        case 'wtf':
            return 'Glitch Cat';
        default:
            return catName + ' Cat';
    }
}

function getAudioFileName(catName) {
    switch (catName) {
        case 'jamaica':
            return 'ganja';
        case 'tacodog':
            return 'fiesta';
        case 'floppy':
            return 'gb';
        case 'skrillex':
            return 'dub';
        case 'fat':
            return 'sad';
        case 'nyanvirus':
            return '404';
        case 'oldnewyear':
            return 'newyear';
        default:
            //return 'original';
            return catName;
    }
}

function hasRainbows(catName) {
    return !(['balloon', 'dub', 'elevator', 'fiesta', 'manyan', 'pirate', 'skrillex', 'star', 'tacodog'].includes(catName));
}

function getStyleName(catName) {
    if (['404', 'bloon', 'fat', 'floppy', 'ganja', 'jacksnyan', 'jazzcat', 'manyan', 'nyanamerica', 'nyancat', 'nyanvirus', 'oldnewyear', 'oldnyan', 'rasta', 'sadnyan', 'skrillex', 'slomocat', 'smooth', 'smurfcat', 'starsheep', 'tacodog', 'toaster', 'watermelon', 'xmasold'].includes(catName)) {
        return 'original';
    } else {
        return catName;
    }
}

async function updateCat(name) {
    if (name != '' && name != updatedName) {
        console.log("Update: '" + catName + "'");
        if (name == 'bloon') {
            name = 'balloon'
        }
        catName = name;
        if (catName != updatedName) {
            updatedName = catName;


            if (window.displayName) {
                window.displayName = getDisplayName(catName);
            }

            if (['watermelon', 'melon', 'pirate', 'pumpkin', 'zombie', 'bday', 'breakfast', 'easter', 'grumpy', 'melon', 'watermelon', 'mummy', 'nyancoin', 'paddy', 'star', 'oldnyan', 'smooth'].includes(catName)) {
                catAudioName = 'original';
            } else {
                catAudioName = getAudioFileName(catName);
            }
            console.log(`audioName: ${catAudioName}`)

            tim = catAudio[0].currentTime;
            speed = catAudio[0].playbackRate;

            catAudio[1].src = `music/${catAudioName}.mp3`;
            catAudio[2].src = `music/${catAudioName}.ogg`;
            catAudio[0].load();

            catAudio[0].currentTime = (tim + 0.03) % catAudio[0].duration;
            catAudio[0].playbackRate = speed;

            styleName = getStyleName(catName);
            result = fetch(`style/${styleName}.css`);
            e = document.createElement("style");
            e.id = 'catStyle';
            e.type = 'text/css';
            catStyle.parentElement.replaceChild(e, catStyle);
            catStyle = e;
            catImg.src = `cats/${catName}.gif`;
            if (!hasRainbows(catName)) {
                e.innerHTML = 'div.rainbows {\n    display: none;\n};\n';
            }
            e.innerHTML += (await result).text;

        } else {
            console.log("Update called for same name.");
        }
    }
    if (location.hash != '#' + catName) {
        location.hash = catName;
    }
}
console.log("Update function loaded.");
