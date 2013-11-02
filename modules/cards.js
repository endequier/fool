Array.prototype.shuffle = function( b ) {
    var i = this.length, j, t;
    while( i )
    {
        j = Math.floor( ( i-- ) * Math.random() );
        t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }

    return this;
};

function Cards () {
    this.maxHandLength = 6;
    this.deck = [];
    this.getBest = function (min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.drawCards = function () {
        var cards = [];
        var Card = function (family, value, best) {
            this.family = family;
            this.value = value;
            this.best = best;
        };
        var bestFlag = this.getBest(1,4)
        var best;
        for (var fam = 1; fam <= 4; fam++)
        {
            best = (fam == bestFlag)? true : false;
            for (var val = 6; val <= 14; val++)
            {
                cards.push(new Card(fam, val, best))
            }
        }
        this.deck = cards.shuffle();
    };

    this.getCards = function(handLength) {
        var cards = [];
        if (handLength < 6)
        {
            for (var i = handLength; i < this.maxHandLength; i++)
            {
                if (this.deck.length != 0)
                {
                    cards.push(this.deck.pop());
                }
                else break;
            }
        }
        return cards;
    }
};




exports.cards = new Cards;