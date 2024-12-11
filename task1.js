function asyncFindIndex(array, asyncCallback, finalCallback) {
    let foundIndex = -1;

    for (let i = 0; i < array.length; i++) {
        asyncCallback(array[i], (err, result) => {
            handleResult(err, result, i);
        });
    }

    function handleResult(err, result, index) {
        if (err) {
            return finalCallback(err);
        }

        if (result) {
            foundIndex = index;
            return finalCallback(null, index);
        }

        if (index === array.length - 1 && foundIndex === -1) {
            return finalCallback(null, -1);
        }
    }
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const searchValue = 8;

asyncFindIndex(
    array,
    (item, cb) => {
        setTimeout(() => {
            cb(null, item === searchValue);
        }, 1500);
    },
    (err, result) => {
        if (err) {
            console.log("err", err);
        } else {
            console.log("res", result);
        }
    }
);
