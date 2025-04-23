function configureObjects(object1, object2) {
    const keys = [];
    const values = [];

    for ([key, value] of Object.entries(object2)) {
            values.push({ value });
    }

    for ([key, value] of Object.entries(object1)) {
        if (keys.length < values.length) {
            keys.push({ key });
        }
        else
            break;
    }

    const mergedObject = {};
    for (let i = 0; i < keys.length; i++) {
        mergedObject[keys[i].key] = values[i].value;
    }

    return mergedObject;
}

module.exports = { configureObjects };