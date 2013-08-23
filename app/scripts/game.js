/*global define, $ */

define(['player'], function(Player) {
  /**
   * Main game class.
   * @param {Element} el DOM element containig the game.
   * @constructor
   */

  //wtf is this?
  var Game = function(el) {
    this.el = el;
    this.player = new Player(this.el.find('.player'));
    this.viewEl = el.find('.view');
    console.log(this.viewEl);

    // Cache a bound onFrame since we need it each frame.
    this.onFrame = this.onFrame.bind(this);
  };

  /**
   * Runs every frame. Calculates a delta and allows each game entity to update itself.
   */
  Game.prototype.onFrame = function() {
    var now = +new Date() / 1000,
        delta = now - this.lastFrame;
    this.lastFrame = now;

    this.player.onFrame(delta);
    this.updateView();
    // Request next frame.
    requestAnimFrame(this.onFrame);
  };

  Game.prototype.updateView = function() {
    //this.viewEl.css('transform', 'translate3d(0px,-1000px,0)');
    
  }

  /**
   * Starts the game.
   */
  Game.prototype.start = function() {
    // Restart the onFrame loop
    this.lastFrame = +new Date() / 1000;
    requestAnimFrame(this.onFrame);
  };

  /**
   * Cross browser RequestAnimationFrame
   */
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();

  return Game;
});