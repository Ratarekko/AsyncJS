const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('generate', (count) => {
    const array = Array.from({ length: count }, () => Math.floor(Math.random() * 20));
    const searchValue = Math.floor(Math.random() * 20);

    console.log('Array to search:', array);
    console.log('Value to search:', searchValue);

    emitter.emit('search', array, searchValue);
});

emitter.on('search', (array, searchValue) => {
    asyncFindIndex(array, searchValue)
        .then((index) => {
            emitter.emit('result', index, searchValue);
        })
        .catch((err) => {
            emitter.emit('error', err);
        });
});

emitter.on('result', (index, searchValue) => {
    if (index === -1) {
        console.log(`Value ${searchValue} not found in array.`);
    } else {
        console.log(`Value ${searchValue} found at index ${index}.`);
    }
});

emitter.on('error', (err) => {
    console.error(`Error occurred: ${err.message}`);
});

emitter.emit('generate', 10);

function asyncFindIndex(array, searchValue) {
    return new Promise((resolve, reject) => {

        for (let i = 0; i < array.length; i++) {
            if (array[i] === searchValue) {
                resolve(i);
            }
            if (i === array.length - 1) {
                resolve(-1);
            }
        }
    });
}
