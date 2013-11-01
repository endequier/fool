/**
 * Created by Victor on 31.10.13.
 */
(function (){
    window.App = {
        Models: {},
        Views: {},
        Collections: {}
    };

    App.Models.Player = Backbone.Model.extend({
        defaults: {
            id: null,
            name: 'unnamed',
            active: false,
            online: 'online'
        }
    });

    App.Views.Player = Backbone.View.extend({
        tagName: 'div',
        className: 'player',
        template: _.template('<div class="head"></div><div class="body"></div><div class="name"><%= name %></div><div class="player-online-status"><%= online %></div>'),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        remove: function () {
            this.$el.remove();
        },

        initialize: function () {
            this.render();

            this.model.on('change', function() {
                console.log('changed');
                this.render();
            }, this);

            this.model.on('destroy', function() {
                this.remove();
            }, this);

            this.model.on('change:online', function(online) {
                if (this.model.get('online') == 'offline')
                {
                    this.$el.css({'opacity': 0.7});
                }
                else
                {
                    this.$el.css({'opacity': 1});
                }
            }, this);
        }
    });

    App.Collections.Players = Backbone.Collection.extend({
        model: App.Models.Player
    });

    App.Views.Players =  Backbone.View.extend({
        el: '.player-list',
        initialize: function () {
            this.render();
            this.collection.on('add', function (player) {
                this.addMore(player);
            }, this);
        },

        render: function () {
            this.collection.each(this.addMore, this);
            return this;
        },

        addMore: function (player) {
            var playerView = new App.Views.Player({model : player});
            this.$el.append(playerView.render().el);
        }

    });


    App.Views.PlayerNameInput = Backbone.View.extend({
        el: "#input-nick",
        initialize: function() {
            console.log(this.el)
        },

        events: {
            keyup: 'keyup'
        },

        keyup: function (key) {
            if (key.keyCode == 13) {
                var val = this.$el.val().trim()
                if (val.length > 0)
                {
                    this.$el.remove();
                    socket.emit('registration', val);
                }
            }
        }


    })






     window.players = new App.Collections.Players();
     window.playersView = new App.Views.Players({collection : players});
        var input = new App.Views.PlayerNameInput({collection : players});






function reIndexCard (array) {
    for (var key in array)
    {
        array[key].index = key;
    }
}
var     a;
var myCards = [];
var myTable = [];
var enemyTable = []
var socket = io.connect('http://node.dev.market-helper.ru');

    socket.on('getPlayerList', function(data) {
        players.add(data);
    });

    socket.on('playerLeft', function(id) {
        players.get(id).set('online','offline');
        console.log(id);
    });












socket.on('razdat', function(card) {
    var best = (card.best)? 'козырь' : '&nbsp;';
    card.layout = $('<div class="card"><div class="card-family">'+ card.family +'</div><div class="card-value">'+ card.value +'</div><div class="card-best">'+ best +'</div></div>')
    myCards.push(card);
    card.index = myCards.length - 1;
    card.go = function () {
        var tableCard = myCards.splice(card.index, 1)[0];
        myTable.push(tableCard);
        reIndexCard(myCards);
        reIndexCard(myTable);
        var sendCard = {
            family : tableCard.family,
            best : tableCard.best,
            value : tableCard.value
        }
        socket.emit('go', sendCard);
    };
    card.layout.click(function () {
        card.go();
        card.layout.appendTo($('.card-table'));
    })

    $('#content').append(card.layout);
})

socket.on('isGoing', function (card) {
    var best = (card.best)? 'козырь' : '&nbsp;';
    card.layout = $('<div class="card"><div class="card-family">'+ card.family +'</div><div class="card-value">'+ card.value +'</div><div class="card-best">'+ best +'</div></div>')
    enemyTable.push(card);
    card.layout.appendTo($('.card-table'));
    card.index = enemyTable.length - 1;
})

}());