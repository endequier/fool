/**
 * Created by Victor on 02.11.13.
 */
var Players = function () {
    this.players = [];
    this.length = 0;
    var Player = function (params) {
        this.cards = [];
        this.name = 'unnamed';
        if (params) {
            for (var key in params)
            {
                this[key] = params[key];
            }
        }
        this.sendData = function () {
            var publicData = {
                cards: this.cards || null,
                name: this.name || null,
                id: this.id || null
            }
            return publicData;
        };
    };

    this.add = function (params) {
        params = params || {};
        params.id = this.length;
        this.length++;
        this.players.push(new Player(params))
    };

    this.get = function (id) {
        id = id || this.length - 1;
        if (id > this.length - 1)
        {
            return false
        }
        else return this.players[id];
    }
};
exports.players = new Players();