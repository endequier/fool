var playerList = [];
for (var key in players)
{
    playerList.push(players[key]);
}
socket.emit('getPlayerList', playerList);

socket.on('disconnect', function () {
    players[socket.id.slice(0,6)].online = 'offline';
    socket.broadcast.emit('playerLeft', socket.id.slice(0,6));
})


socket.on('registration', function (playername){
    players[socket.id.slice(0,6)] = {
        name: playername,
        id: socket.id.slice(0,6),
        online: 'online'
    }
    socket.broadcast.emit('getPlayerList', players[socket.id.slice(0,6)]);
    socket.emit('getPlayerList', players[socket.id.slice(0,6)]);
})
socket.emit('hello', socket.id);

/*   for (var i = 0; i < 6; i ++)
 {
 socket.emit('razdat', cards.pop());
 }
 */
socket.on('go', function (card) {
    socket.broadcast.emit('isGoing', card);
})

/*
 socket.on('addUserToChat', function (userInfo) {
 vk.request('getProfiles', {'uids' : userInfo.uid});
 vk.on('done:getProfiles', function(user) {
 chatUsers[user.response[0].uid] = user.response[0].first_name + " " + user.response[0].last_name;
 socket.emit('readyToChat');
 });

 });





 socket.on('getUsers', function() {

 })

 socket.on('message', function (value) {
 var text = chatUsers[value.uid] + ' : ' + value.text;
 socket.broadcast.emit('message', text);
 messageStack.push(text);
 console.log(messageStack)
 });
 */


// colode section
var familyList = {
    1: 'Черви',
    2: 'Буби',
    3: 'Пики',
    4: 'Крести'
}

var cardList = {
    6 : 6,
    7 : 7,
    8 : 8,
    9 : 9,
    10 : 10,
    11 : 'V',
    12 : 'Q',
    13 : 'K',
    14 : 'T'
};

var cards = [];
var Card = function (family, value, best) {
    this.family = family;
    this.value = value;
    this.best = best;
};

function getBest(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var bestFlag = getBest(1,4)
var best;
for (var fam = 1; fam <= 4; fam++)
{
    best = (fam == bestFlag)? true : false;
    for (var val = 6; val <= 14; val++)
    {
        cards.push(new Card(familyList[fam], cardList[val], best))
    }
}

cards.shuffle();
// colode section end
