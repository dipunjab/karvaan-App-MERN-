function createMatchFunction(input) {
    const regex = /\/v\d+\/([^\/]+)(?=\.[a-z0-9]+$)/i;;
    if (!input) return null;
    const match = input.match(regex);
    return match ? match[1] : null;
};


export {
    createMatchFunction
};
