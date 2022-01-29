(function( $ ) {
    var o = $( {} );

    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function( key, val ) {
        jQuery[val] = function() {
            o[key].apply( o, arguments )
        };
    });
})( jQuery );

class Rose{
  constructor(){
    $.subscribe('fromJackToRose', this.sendMessToBilly)
    $.subscribe('fromBillyToRose', this.messReceived)
  }
  sendMessToBilly() {
    console.log('Sending message to Billy')
    $.publish('fromRoseToBilly')

  }
  messReceived(){
    console.log('Message from Billy received by Rose')
  }

}

class Billy{

  constructor(){
    $.subscribe('fromRoseToBilly', this.runAway)
  }

  runAway() {

    if(Math.floor(Math.random() * 2)==0)

      console.log('run')
    else
      $.publish('fromBillyToRose')

  }

}

class Jack{

  constructor(){
    $.subscribe('fromRoseToJack')
  }

  sendMessToRose() {
    setTimeout( function() {
      $.publish('fromJackToRose')}, 1000)
      

  }
}

const rose = new Rose();
const billy = new Billy();
const jack = new Jack();

jack.sendMessToRose();