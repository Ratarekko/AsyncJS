function asyncFindIndex(array, searchValue) {
    return new Promise((resolve, reject) => {
        let foundIndex = -1;

        for (let i = 0; i < array.length; i++) {
            setTimeout(() => {
                if (array[i] === searchValue) {
                    foundIndex = i;
                    resolve(foundIndex);
                }
                if (i === array.length - 1) {
                    resolve(-1);
                }
            }, 1500);
        }
    });
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

async function example() {
    const result = await asyncFindIndex(array, searchValue);
    console.log("Result:", result);
}

example();

asyncFindIndex(array, searchValue)
    .then(result => {
        console.log("Result:", result);
    })
    .catch(err => {
        console.log(`Caught error: ${err.message}`);
    });
