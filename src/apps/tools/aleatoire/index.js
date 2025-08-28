export function getRandomCharacter(characters) {
    const index = Math.floor(Math.random() * characters.length);
    return characters[index];
}
export function tableIndexAscendent(min=0, max) {
    const tab = []
    for(let i = min; i < max; i++){
        tab.push(i)
    }
    return tab
}