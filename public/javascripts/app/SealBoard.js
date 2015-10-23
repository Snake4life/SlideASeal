var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __hasProp = {}.hasOwnProperty;

define(['Phaser', './Seal', './Player'], function(Phaser, Seal, Player) {
  var SealBoard;
  return SealBoard = (function(_super) {
    __extends(SealBoard, _super);

    SealBoard.preload = function(game) {};

    function SealBoard(game, side) {
      this.getSide = __bind(this.getSide, this);
      this.getNumberOfSeals = __bind(this.getNumberOfSeals, this);
      this.changeSealSide = __bind(this.changeSealSide, this);
      this.add = __bind(this.add, this);
      this.getRandomSeal = __bind(this.getRandomSeal, this);
      this.create = __bind(this.create, this);
      this.playRandomAnimation = __bind(this.playRandomAnimation, this);
      this.setPosition = __bind(this.setPosition, this);
      this.startAnimationLoop = __bind(this.startAnimationLoop, this);
      this.show = __bind(this.show, this);
      if (!side in Seal.sides) {
        throw new Error("Pleas parse a Sealboard.position as position");
      }
      SealBoard.__super__.constructor.call(this, game, null, 'SealBoard', false, false);
      if (side === Seal.sides.LEFT) {
        this.x = -100;
      } else if (side === Seal.sides.RIGHT) {
        this.x = this.game.world.width / 2 - 100;
      }
      this.y = this.game.world.height;
      this.side = side;
      this.create();
      this.create();
      this.create();
    }

    SealBoard.prototype.show = function() {
      var lastTween, oldX, oldY, seal, _i, _len, _ref;
      this.game.add.existing(this);
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        seal = _ref[_i];
        oldX = seal.x;
        oldY = seal.y;
        if (this.side === Seal.sides.LEFT) {
          seal.x = -200;
        } else if (this.side === Seal.sides.RIGHT) {
          seal.x = this.game.world.width - this.x + 100;
        }
        lastTween = this.game.add.tween(seal).to({
          x: oldX,
          y: oldY
        }, 1000, Phaser.Easing.Quadratic.Out, true, Math.random() * 1000);
        seal.setShow(true);
      }
      return lastTween.onComplete.add(function() {
        return this.startAnimationLoop();
      }, this);
    };

    SealBoard.prototype.startAnimationLoop = function(delayInSeconds) {
      if (delayInSeconds == null) {
        delayInSeconds = 4;
      }
      return this.game.time.events.loop(Phaser.Timer.SECOND * delayInSeconds, function() {
        var seal;
        if (Math.random() > 0.5) {
          seal = this.getRandomSeal();
          if (seal !== null && seal !== void 0) {
            return seal.playRandomAnimation();
          }
        } else {
          return this.playRandomAnimation();
        }
      }, this);
    };

    SealBoard.prototype.setPosition = function(side) {
      if (!side in Player.sides) {
        throw new Error("Please parse a side enum type");
      }
    };

    SealBoard.prototype.playRandomAnimation = function() {
      var seal, _i, _len, _ref, _results;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        seal = _ref[_i];
        _results.push(this.game.time.events.add(Phaser.Timer.SECOND * Math.random(), function() {
          if (Math.random() > 0.5) {
            seal.playRandomSound();
          }
          return seal.playRandomAnimation();
        }, this));
      }
      return _results;
    };

    SealBoard.prototype.create = function(x, y) {
      var seal;
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      seal = new Seal(this.game, this, x, y, this.side);
      return this.add(seal);
    };

    SealBoard.prototype.getRandomSeal = function() {
      return this.children[Math.floor(Math.random() * this.children.length)];
    };

    SealBoard.prototype.add = function(newSeal, randomPostion) {
      if (randomPostion == null) {
        randomPostion = true;
      }
      if (!(newSeal instanceof Seal)) {
        throw new Error("Pleas parse a Seal instnace ");
      }
      if (randomPostion === true) {
        newSeal.setRandomPosition(this.children[this.children.length - 1]);
      }
      return SealBoard.__super__.add.call(this, newSeal);
    };

    SealBoard.prototype.changeSealSide = function(numberOfSealsToChange, sealBoardToAdd) {
      var i, lastTween, randomSeal, seal, sealsToChange, _i, _len;
      i = 0;
      sealsToChange = [];
      while (i !== numberOfSealsToChange) {
        randomSeal = this.getRandomSeal();
        if (randomSeal === null || randomSeal === void 0) {
          break;
        } else {
          sealsToChange.push(randomSeal);
        }
        i = i + 1;
      }
      for (_i = 0, _len = sealsToChange.length; _i < _len; _i++) {
        seal = sealsToChange[_i];
        lastTween = seal.changeSide(sealBoardToAdd);
      }
      return lastTween;
    };

    SealBoard.prototype.getNumberOfSeals = function() {
      return this.children.length;
    };

    SealBoard.prototype.getSide = function() {
      return this.side;
    };

    return SealBoard;

  })(Phaser.Group);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL1N0ZWZhbi9Eb3dubG9hZHMvU2xpZGVBU2VhbC9wdWJsaWMvamF2YXNjcmlwdHMvYXBwL1NlYWxCb2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9TdGVmYW4vRG93bmxvYWRzL1NsaWRlQVNlYWwvYXNzZXRzL2phdmFzY3JpcHRzL2FwcC9TZWFsQm9hcmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7OytCQUFBOztBQUFBLE1BQUEsQ0FBTyxDQUFFLFFBQUYsRUFDRSxRQURGLEVBRUUsVUFGRixDQUFQLEVBRXFCLFNBQUMsTUFBRCxFQUFRLElBQVIsRUFBYSxNQUFiLEdBQUE7QUFNbkIsTUFBQSxTQUFBO1NBQU07QUFLSixnQ0FBQSxDQUFBOztBQUFBLElBQUEsU0FBQyxDQUFBLE9BQUQsR0FBUyxTQUFDLElBQUQsR0FBQSxDQUFULENBQUE7O0FBT2EsSUFBQSxtQkFBQyxJQUFELEVBQU0sSUFBTixHQUFBO0FBQ1gsK0NBQUEsQ0FBQTtBQUFBLGlFQUFBLENBQUE7QUFBQSw2REFBQSxDQUFBO0FBQUEsdUNBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSw2Q0FBQSxDQUFBO0FBQUEsdUVBQUEsQ0FBQTtBQUFBLHVEQUFBLENBQUE7QUFBQSxxRUFBQSxDQUFBO0FBQUEseUNBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBRyxDQUFBLElBQUEsSUFBWSxJQUFJLENBQUMsS0FBcEI7QUFDRSxjQUFVLElBQUEsS0FBQSxDQUFPLDhDQUFQLENBQVYsQ0FERjtPQUFBO0FBQUEsTUFFQSwyQ0FBTSxJQUFOLEVBQVcsSUFBWCxFQUFrQixXQUFsQixFQUE2QixLQUE3QixFQUFtQyxLQUFuQyxDQUZBLENBQUE7QUFHQSxNQUFBLElBQUcsSUFBQSxLQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBdEI7QUFDRSxRQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssQ0FBQSxHQUFMLENBREY7T0FBQSxNQUVLLElBQUcsSUFBQSxLQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBdEI7QUFDSCxRQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBWixHQUFrQixDQUFsQixHQUFzQixHQUEzQixDQURHO09BTEw7QUFBQSxNQU9BLElBQUMsQ0FBQSxDQUFELEdBQUssSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFQakIsQ0FBQTtBQUFBLE1BU0EsSUFBQyxDQUFBLElBQUQsR0FBUSxJQVRSLENBQUE7QUFBQSxNQVdBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FYQSxDQUFBO0FBQUEsTUFZQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBWkEsQ0FBQTtBQUFBLE1BYUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQWJBLENBRFc7SUFBQSxDQVBiOztBQUFBLHdCQXlCQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0osVUFBQSwyQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBVixDQUFtQixJQUFuQixDQUFBLENBQUE7QUFHQTtBQUFBLFdBQUEsMkNBQUE7d0JBQUE7QUFDRSxRQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsQ0FBWixDQUFBO0FBQUEsUUFDQSxJQUFBLEdBQU8sSUFBSSxDQUFDLENBRFosQ0FBQTtBQUlBLFFBQUEsSUFBRyxJQUFDLENBQUEsSUFBRCxLQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBdkI7QUFDRSxVQUFBLElBQUksQ0FBQyxDQUFMLEdBQVMsQ0FBQSxHQUFULENBREY7U0FBQSxNQUVLLElBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQXZCO0FBQ0gsVUFBQSxJQUFJLENBQUMsQ0FBTCxHQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQVosR0FBb0IsSUFBQyxDQUFBLENBQXJCLEdBQXlCLEdBQWxDLENBREc7U0FOTDtBQUFBLFFBVUEsU0FBQSxHQUFZLElBQUMsQ0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQVYsQ0FBZ0IsSUFBaEIsQ0FBcUIsQ0FBQyxFQUF0QixDQUF5QjtBQUFBLFVBQUEsQ0FBQSxFQUFFLElBQUY7QUFBQSxVQUFPLENBQUEsRUFBRSxJQUFUO1NBQXpCLEVBQXVDLElBQXZDLEVBQTRDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQXBFLEVBQXdFLElBQXhFLEVBQTZFLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFjLElBQTNGLENBVlosQ0FBQTtBQUFBLFFBV0EsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFiLENBWEEsQ0FERjtBQUFBLE9BSEE7YUFrQkEsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFyQixDQUF5QixTQUFBLEdBQUE7ZUFDdkIsSUFBQyxDQUFBLGtCQUFELENBQUEsRUFEdUI7TUFBQSxDQUF6QixFQUVDLElBRkQsRUFuQkk7SUFBQSxDQXpCTixDQUFBOztBQUFBLHdCQWtEQSxrQkFBQSxHQUFtQixTQUFDLGNBQUQsR0FBQTs7UUFBQyxpQkFBaUI7T0FHbkM7YUFBQSxJQUFDLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBbEIsQ0FBdUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFiLEdBQW9CLGNBQTNDLEVBQTJELFNBQUEsR0FBQTtBQUV6RCxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLEdBQW5CO0FBQ0UsVUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFQLENBQUE7QUFDQSxVQUFBLElBQUcsSUFBQSxLQUFRLElBQVIsSUFBaUIsSUFBQSxLQUFRLE1BQTVCO21CQUNFLElBQUksQ0FBQyxtQkFBTCxDQUFBLEVBREY7V0FGRjtTQUFBLE1BQUE7aUJBS0UsSUFBQyxDQUFBLG1CQUFELENBQUEsRUFMRjtTQUZ5RDtNQUFBLENBQTNELEVBUUMsSUFSRCxFQUhpQjtJQUFBLENBbERuQixDQUFBOztBQUFBLHdCQWlFQSxXQUFBLEdBQWEsU0FBQyxJQUFELEdBQUE7QUFDWCxNQUFBLElBQUcsQ0FBQSxJQUFBLElBQVksTUFBTSxDQUFDLEtBQXRCO0FBQ0UsY0FBVyxJQUFBLEtBQUEsQ0FBUSwrQkFBUixDQUFYLENBREY7T0FEVztJQUFBLENBakViLENBQUE7O0FBQUEsd0JBdUVBLG1CQUFBLEdBQXFCLFNBQUEsR0FBQTtBQUNuQixVQUFBLDhCQUFBO0FBQUE7QUFBQTtXQUFBLDJDQUFBO3dCQUFBO0FBQ0Usc0JBQUEsSUFBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQWxCLENBQXNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBYixHQUFzQixJQUFJLENBQUMsTUFBTCxDQUFBLENBQTVDLEVBQTJELFNBQUEsR0FBQTtBQUV6RCxVQUFBLElBQUcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLEdBQW5CO0FBQ0UsWUFBQSxJQUFJLENBQUMsZUFBTCxDQUFBLENBQUEsQ0FERjtXQUFBO2lCQUdBLElBQUksQ0FBQyxtQkFBTCxDQUFBLEVBTHlEO1FBQUEsQ0FBM0QsRUFNQyxJQU5ELEVBQUEsQ0FERjtBQUFBO3NCQURtQjtJQUFBLENBdkVyQixDQUFBOztBQUFBLHdCQXFGQSxNQUFBLEdBQVEsU0FBQyxDQUFELEVBQU8sQ0FBUCxHQUFBO0FBQ04sVUFBQSxJQUFBOztRQURPLElBQUk7T0FDWDs7UUFEYSxJQUFJO09BQ2pCO0FBQUEsTUFBQSxJQUFBLEdBQVcsSUFBQSxJQUFBLENBQUssSUFBQyxDQUFBLElBQU4sRUFBVyxJQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsSUFBQyxDQUFBLElBQWxCLENBQVgsQ0FBQTthQUNBLElBQUMsQ0FBQSxHQUFELENBQUssSUFBTCxFQUZNO0lBQUEsQ0FyRlIsQ0FBQTs7QUFBQSx3QkEyRkEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUNiLGFBQU8sSUFBQyxDQUFBLFFBQVMsQ0FBQSxJQUFJLENBQUMsS0FBTCxDQUFXLElBQUksQ0FBQyxNQUFMLENBQUEsQ0FBQSxHQUFjLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBbkMsQ0FBQSxDQUFqQixDQURhO0lBQUEsQ0EzRmYsQ0FBQTs7QUFBQSx3QkFpR0EsR0FBQSxHQUFLLFNBQUMsT0FBRCxFQUFVLGFBQVYsR0FBQTs7UUFBVSxnQkFBZ0I7T0FDN0I7QUFBQSxNQUFBLElBQUcsQ0FBQSxDQUFBLE9BQUEsWUFBd0IsSUFBeEIsQ0FBSDtBQUNFLGNBQVUsSUFBQSxLQUFBLENBQVEsOEJBQVIsQ0FBVixDQURGO09BQUE7QUFJQSxNQUFBLElBQUcsYUFBQSxLQUFpQixJQUFwQjtBQUNDLFFBQUEsT0FBTyxDQUFDLGlCQUFSLENBQTBCLElBQUMsQ0FBQSxRQUFTLENBQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLEdBQWlCLENBQWpCLENBQXBDLENBQUEsQ0FERDtPQUpBO2FBT0EsbUNBQU0sT0FBTixFQVJHO0lBQUEsQ0FqR0wsQ0FBQTs7QUFBQSx3QkFpSEEsY0FBQSxHQUFnQixTQUFDLHFCQUFELEVBQXdCLGNBQXhCLEdBQUE7QUFDZCxVQUFBLHVEQUFBO0FBQUEsTUFBQSxDQUFBLEdBQUksQ0FBSixDQUFBO0FBQUEsTUFDQSxhQUFBLEdBQWdCLEVBRGhCLENBQUE7QUFFQSxhQUFNLENBQUEsS0FBSyxxQkFBWCxHQUFBO0FBQ0UsUUFBQSxVQUFBLEdBQWEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFiLENBQUE7QUFFQSxRQUFBLElBQUcsVUFBQSxLQUFjLElBQWQsSUFBc0IsVUFBQSxLQUFjLE1BQXZDO0FBQ0UsZ0JBREY7U0FBQSxNQUFBO0FBR0UsVUFBQSxhQUFhLENBQUMsSUFBZCxDQUFtQixVQUFuQixDQUFBLENBSEY7U0FGQTtBQUFBLFFBTUEsQ0FBQSxHQUFJLENBQUEsR0FBRSxDQU5OLENBREY7TUFBQSxDQUZBO0FBV0EsV0FBQSxvREFBQTtpQ0FBQTtBQUNFLFFBQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxVQUFMLENBQWdCLGNBQWhCLENBQVosQ0FERjtBQUFBLE9BWEE7QUFjQSxhQUFPLFNBQVAsQ0FmYztJQUFBLENBakhoQixDQUFBOztBQUFBLHdCQXNJQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7YUFBSyxJQUFDLENBQUEsUUFBUSxDQUFDLE9BQWY7SUFBQSxDQXRJbEIsQ0FBQTs7QUFBQSx3QkEwSUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUFLLElBQUMsQ0FBQSxLQUFOO0lBQUEsQ0ExSVQsQ0FBQTs7cUJBQUE7O0tBTHNCLE1BQU0sQ0FBQyxPQU5aO0FBQUEsQ0FGckIsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lIFsnUGhhc2VyJyxcbiAgICAgICAgJy4vU2VhbCcsXG4gICAgICAgICcuL1BsYXllciddLCAoUGhhc2VyLFNlYWwsUGxheWVyKS0+XG5cbiAgI1dpdGggdGhlIFNlYWxCb2FyZCBjbGFzcyB5b3UgY2FuIGNvbnRyb2wgYSBjb2xsZWN0aW9uIG9mIFNlYWxzXG4gICNAc2VlIFNlYWxcbiAgI0BjbGFzc1xuICAjQGV4dGVuZHMgUGhhc2VyLkdyb3VwXG4gIGNsYXNzIFNlYWxCb2FyZCBleHRlbmRzIFBoYXNlci5Hcm91cFxuXG4gICAgI0BzdGF0aWNcbiAgICAjUHJlbG9hZCBmdW5jdGlvbiBmb3IgdGhlIGdhbWUgbG9hZGVyXG4gICAgI0BwYXJhbSB7UGhhc2VyLkdhbWV9XG4gICAgQHByZWxvYWQ6KGdhbWUpLT5cblxuXG5cbiAgICAjQ3JlYXRlIGEgbmV3IEdyb3VwIGZvciBhbGwgc2VhbHMgb2Ygb25lIHBsYXllclxuICAgICNAcGFyYW0ge1BoYXNlci5HYW1lfSBnYW1lIC0gdGhlIGdhbWUgaW5zdGFjZVxuICAgICNAcGFyYW0ge1NlYWwuc2lkZXN9IHNpZGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBzZWFsYm9hcmRcbiAgICBjb25zdHJ1Y3RvcjogKGdhbWUsc2lkZSktPlxuICAgICAgaWYgbm90IHNpZGUgb2YgU2VhbC5zaWRlc1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IgXCJQbGVhcyBwYXJzZSBhIFNlYWxib2FyZC5wb3NpdGlvbiBhcyBwb3NpdGlvblwiXG4gICAgICBzdXBlcihnYW1lLG51bGwsICdTZWFsQm9hcmQnLGZhbHNlLGZhbHNlKVxuICAgICAgaWYgc2lkZSA9PSBTZWFsLnNpZGVzLkxFRlRcbiAgICAgICAgQHggPSAtMTAwXG4gICAgICBlbHNlIGlmIHNpZGUgPT0gU2VhbC5zaWRlcy5SSUdIVFxuICAgICAgICBAeCA9IEBnYW1lLndvcmxkLndpZHRoLzIgLSAxMDBcbiAgICAgIEB5ID0gQGdhbWUud29ybGQuaGVpZ2h0XG5cbiAgICAgIEBzaWRlID0gc2lkZVxuICAgICAgI0NyZWF0ZSAzIFNlYWxzIHBlciBkZWZhdWx0XG4gICAgICBAY3JlYXRlKClcbiAgICAgIEBjcmVhdGUoKVxuICAgICAgQGNyZWF0ZSgpXG5cbiAgICAjU2hvdyB0aGUgYm9hcmQgYW5kIGVhY2ggU2VhbCBpbmRpdmlkdWFsbHlcbiAgICAjU2xpZGUgdGhlIHNlYWwgZm9ybSByaWdodCBvciBsZWZ0IGludG8gdGhlIHNjcmVlblxuICAgIHNob3c6ICgpPT5cbiAgICAgIEBnYW1lLmFkZC5leGlzdGluZyh0aGlzKVxuXG4gICAgICAjU2xpZGUgZWFjaCBTZWFsIGluXG4gICAgICBmb3Igc2VhbCBpbiBAY2hpbGRyZW5cbiAgICAgICAgb2xkWCA9IHNlYWwueFxuICAgICAgICBvbGRZID0gc2VhbC55XG5cbiAgICAgICAgI1NldCBwb3N0aW9uIG9mIHNlYWwgb3V0c2lkZSBvZiB0aGUgV29ybGRcbiAgICAgICAgaWYgQHNpZGUgPT0gU2VhbC5zaWRlcy5MRUZUXG4gICAgICAgICAgc2VhbC54ID0gLTIwMFxuICAgICAgICBlbHNlIGlmIEBzaWRlID09IFNlYWwuc2lkZXMuUklHSFRcbiAgICAgICAgICBzZWFsLnggPSBAZ2FtZS53b3JsZC53aWR0aCAtIEB4ICsgMTAwXG5cbiAgICAgICAgI1R3ZWVuIHRvIG9sZCBwc290aW9uXG4gICAgICAgIGxhc3RUd2VlbiA9IEBnYW1lLmFkZC50d2VlbihzZWFsKS50byh4Om9sZFgseTpvbGRZLDEwMDAsUGhhc2VyLkVhc2luZy5RdWFkcmF0aWMuT3V0LHRydWUsTWF0aC5yYW5kb20oKSoxMDAwKVxuICAgICAgICBzZWFsLnNldFNob3codHJ1ZSlcblxuICAgICAgI0lmIGFsbCBkaXNwbGF5ZWQsIHN0YXJ0IGxvb3BcbiAgICAgIGxhc3RUd2Vlbi5vbkNvbXBsZXRlLmFkZCgoKS0+XG4gICAgICAgIEBzdGFydEFuaW1hdGlvbkxvb3AoKVxuICAgICAgLEApXG5cbiAgICAjU3RhcnRzIHRoZSBhbmltYXRpb24gbG9vcFxuICAgICNAcmV0dXJuIHtQaGFzZXIudGltZS5ldmVudH0gLSBUaGUgdGltZSBldmVudCB0byBzcG90IGxvb3BcbiAgICBzdGFydEFuaW1hdGlvbkxvb3A6KGRlbGF5SW5TZWNvbmRzID0gNCk9PlxuXG4gICAgICAjTG9vcCBldmVudFxuICAgICAgQGdhbWUudGltZS5ldmVudHMubG9vcChQaGFzZXIuVGltZXIuU0VDT05EKmRlbGF5SW5TZWNvbmRzLCAoKS0+XG4gICAgICAgICNpbiA1MCBwZXJjZW50IG9mIHRoZSBjYXNlcyBwbGF5IHJhbmRvbSBsb29wLCBlbHNlIHBsYXkgYWxsIFNlYWxzIGFuaW1hdGlvblxuICAgICAgICBpZiBNYXRoLnJhbmRvbSgpID4gMC41XG4gICAgICAgICAgc2VhbCA9IEBnZXRSYW5kb21TZWFsKClcbiAgICAgICAgICBpZiBzZWFsICE9IG51bGwgYW5kIHNlYWwgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICBzZWFsLnBsYXlSYW5kb21BbmltYXRpb24oKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgQHBsYXlSYW5kb21BbmltYXRpb24oKVxuICAgICAgLEApXG5cbiAgICAjU2V0dGVyIGZvciBwb3N0aW9uXG4gICAgI0BwYXJhbSB7U2VhbC5zaWRlc30gc2lkZSAgVGhlIFBvc2l0aW9uXG4gICAgc2V0UG9zaXRpb246IChzaWRlKT0+XG4gICAgICBpZiBub3Qgc2lkZSBvZiBQbGF5ZXIuc2lkZXNcbiAgICAgICAgdGhyb3cgIG5ldyBFcnJvciAoXCJQbGVhc2UgcGFyc2UgYSBzaWRlIGVudW0gdHlwZVwiKVxuXG4gICAgI1BsYXkgdGhlIFJhbmRvbSBBbmltYXRpb24gZm9yIGVhY2ggU2VhbCB3aXRoICBkZWxheSBiZXR3ZWVuIDEgYW5kIDIgc2Vjb25kc1xuICAgICNAcmV0dXJucyB7UGhhc2VyLmV2ZW50cy50aW1lIHwgbnVsbCB8IFBoYXNlci5Ud2VlbiB9XG4gICAgcGxheVJhbmRvbUFuaW1hdGlvbjogKCk9PlxuICAgICAgZm9yIHNlYWwgaW4gQGNoaWxkcmVuXG4gICAgICAgIEBnYW1lLnRpbWUuZXZlbnRzLmFkZChQaGFzZXIuVGltZXIuU0VDT05EICogTWF0aC5yYW5kb20oKSwgKCktPlxuXG4gICAgICAgICAgaWYgTWF0aC5yYW5kb20oKSA+IDAuNVxuICAgICAgICAgICAgc2VhbC5wbGF5UmFuZG9tU291bmQoKVxuXG4gICAgICAgICAgc2VhbC5wbGF5UmFuZG9tQW5pbWF0aW9uKClcbiAgICAgICAgLEApXG5cblxuICAgICNDcmVhdGUgYSBuZXcgU2VhbFxuICAgICNAcGFyYW0ge2ludH0gW3g9MF0gVGhlIHggY29vcmRcbiAgICAjQHBhcmFtIHtpbnR9IFt5PTBdIFRoZSB4IGNvb3JkXG4gICAgY3JlYXRlOiAoeCA9IDAseSA9IDApPT5cbiAgICAgIHNlYWwgPSBuZXcgU2VhbChAZ2FtZSxALHgseSxAc2lkZSlcbiAgICAgIEBhZGQoc2VhbClcblxuICAgICNSZXR1bnMgYSByYW5kb20gU2VhbFxuICAgICNAcmV0dXJuIHtTZWFsfSB0aGUgUmFuZG9tIGVudHJ5XG4gICAgZ2V0UmFuZG9tU2VhbDogKCk9PlxuICAgICAgcmV0dXJuIEBjaGlsZHJlbltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqQGNoaWxkcmVuLmxlbmd0aCldXG5cbiAgICAjQWRkIGEgbmV3IHNlYWxcbiAgICAjQHBhcmFtIHtTZWFsfSBuZXdTZWFsXG4gICAgI0BwYXJhbSB7Ym9vbGVhbn0gcmFuZG9tUG9zaXRpb24gLSBzZXQgdGhlIG5ld1NlYWwgdG8gYSByYW5kb20gcHNvdGlvbiBpbiB0aGUgc2VpZGUgYm91bmNlXG4gICAgYWRkOiAobmV3U2VhbCwgcmFuZG9tUG9zdGlvbiA9IHRydWUgKT0+XG4gICAgICBpZiBuZXdTZWFsIG5vdCBpbnN0YW5jZW9mICBTZWFsXG4gICAgICAgIHRocm93IG5ldyBFcnJvciAoXCJQbGVhcyBwYXJzZSBhIFNlYWwgaW5zdG5hY2UgXCIpXG5cbiAgICAgICNSYW5kb20gUG9zdGlvblxuICAgICAgaWYgcmFuZG9tUG9zdGlvbiA9PSB0cnVlXG4gICAgICAgbmV3U2VhbC5zZXRSYW5kb21Qb3NpdGlvbihAY2hpbGRyZW5bQGNoaWxkcmVuLmxlbmd0aC0xXSlcblxuICAgICAgc3VwZXIobmV3U2VhbClcblxuXG4gICAgI0NoYW5nZSB0aGUgbnVtYmVyT2ZTZWFsc1RvQ2hhbmdlIHRvIHRoZSBzZWFsQm9hcmRUb0FkZFxuICAgICNBbmltYXRpZSB0aGUgU2VhbHMga2lsbCB0aGVtIGFuZCBhZGQgbmV3IHNlYWxzIHRvIHRoZSBvdGhlciBCb2FyZFxuICAgICNAcGFyYW0ge2ludH0gbnVtYmVyT2ZTZWFsc1RvQ2hhbmdlIC0gVGhlIE51bWJlciBvZiBTZWFscyB0byBtb3ZlIHRvIHRoZSBvaHRlciBTZWFsYm9hcmRcbiAgICAjQHBhcmFtIHtTZWFsQm9hcmR9IHNlYWxCb2FyZFRvQWRkIC0gVGhlIHRhcmdldCBmb3IgdGhlIHNlYWxzXG4gICAgI0ByZXR1cm5zIHtQaGFzZXIuVHdlZW59XG4gICAgY2hhbmdlU2VhbFNpZGU6IChudW1iZXJPZlNlYWxzVG9DaGFuZ2UsIHNlYWxCb2FyZFRvQWRkKSA9PlxuICAgICAgaSA9IDBcbiAgICAgIHNlYWxzVG9DaGFuZ2UgPSBbXVxuICAgICAgd2hpbGUgaSAhPSBudW1iZXJPZlNlYWxzVG9DaGFuZ2VcbiAgICAgICAgcmFuZG9tU2VhbCA9IEBnZXRSYW5kb21TZWFsKClcbiAgICAgICAgI0lmIG5vIHNlYWxzIHRoZXJlXG4gICAgICAgIGlmKHJhbmRvbVNlYWwgPT0gbnVsbCBvciByYW5kb21TZWFsID09IHVuZGVmaW5lZCApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNlYWxzVG9DaGFuZ2UucHVzaChyYW5kb21TZWFsKVxuICAgICAgICBpID0gaSsxXG5cbiAgICAgIGZvciBzZWFsIGluIHNlYWxzVG9DaGFuZ2VcbiAgICAgICAgbGFzdFR3ZWVuID0gc2VhbC5jaGFuZ2VTaWRlKHNlYWxCb2FyZFRvQWRkKVxuXG4gICAgICByZXR1cm4gbGFzdFR3ZWVuXG5cblxuXG4gICAgI1JldHVybnMgdGhlIG51bWJlciBvZiBzZWFsc1xuICAgICNAcmV0dXJuIHtpbnR9XG4gICAgZ2V0TnVtYmVyT2ZTZWFsczogKCk9PiBAY2hpbGRyZW4ubGVuZ3RoXG5cbiAgICAjIEdldHRlciBmb3Igc2lkZVxuICAgICMgQHJldHVybiB7U2VhbC5zaWRlc31cbiAgICBnZXRTaWRlOiAoKT0+IEBzaWRlIl19
