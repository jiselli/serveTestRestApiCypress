module.exports = {
    createNewEmail() {
        var words = ['Rock', 'Paper', 'Scissors'];
        var word = words[Math.floor(Math.random() * words.length)];
        return `test_${word}${Math.random()}@gmail.com`;
    },

    createNewName() {
        var words = ['Rock', 'Paper', 'Scissors'];
        var word = words[Math.floor(Math.random() * words.length)];
        return `Mary ${word}${Math.random()}`;
    }
}