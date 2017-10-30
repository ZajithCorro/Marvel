const publicKey = '80be763c3895d8b5cbb1a7802695530f',
    privateKey = 'cbfed83fa1f10f90f88b956d2b59f3e749d7d54f',
    content = document.getElementById('content'),
    buscador = document.getElementById('buscador');

buscador.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        content.innerHTML = "";
        searcHero(e.target.value);
    }
});

const getHash = () => {
    const ts = Date.now(),
        hash = MD5(ts + privateKey + publicKey);

    const data = {
        ts: ts,
        pubKey: publicKey,
        hash: hash
    }

    return data;
}

const getConnection = () => {
    const data = getHash(),
        URL = `http://gateway.marvel.com/v1/public/characters?ts=${data.ts}&apikey=${data.pubKey}&hash=${data.hash}`;

    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => drawHero(e));
        });
};


const searcHero = name => {
    const data = getHash()
        hero = encodeURIComponent(name),
        URL = `http://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${data.ts}&apikey=${data.pubKey}&hash=${data.hash}`;

    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => drawHero(e));
        });
}


const drawHero = e => {
    const image =`${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
        <div class="hero">
            <h3>${e.name}</h3>
            <div class="hero-image-des">
                <img class="hero-image" src="${image}">
                <p class="description">${e.description}</p>
            </div
        </div>
    `;

    content.insertAdjacentHTML('beforeEnd', hero)
}

getConnection();