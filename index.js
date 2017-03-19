(function() {
  var Typewriter, type,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Typewriter = (function() {
    function Typewriter($wrap) {
      this.$wrap = $wrap;
      this.delayedDelete = bind(this.delayedDelete, this);
      this.deleteIt = bind(this.deleteIt, this);
      this.typeIt = bind(this.typeIt, this);
      this.$type = this.$wrap.find('.anim-type');
      this.text = this.$type.data('text');
      this.typeIt(this.text[0], true);
    }

    Typewriter.prototype.typeIt = function(string, bool) {
      var i, j, len, letter, results, text;
      text = string.split('');
      results = [];
      for (i = j = 0, len = text.length; j < len; i = ++j) {
        letter = text[i];
        results.push((function(_this) {
          return function(letter, i) {
            return setTimeout(function() {
              _this.$type.html(_this.$type.html() + letter);
              if (bool === true && i === string.length - 1) {
                return _this.delayedDelete();
              }
            }, 100 * i);
          };
        })(this)(letter, i));
      }
      return results;
    };

    Typewriter.prototype.deleteIt = function(bool) {
      var currentText, i, j, len, letter, results;
      currentText = this.$type.text();
      if (currentText === this.text[1]) {
        this.string = this.text[0];
      } else {
        this.string = this.text[1];
      }
      results = [];
      for (i = j = 0, len = currentText.length; j < len; i = ++j) {
        letter = currentText[i];
        results.push((function(_this) {
          return function(letter, i) {
            return setTimeout(function() {
              _this.$type.html(_this.$type.html().slice(0, -1));
              if (bool === true && i === currentText.length - 1) {
                return _this.typeIt(_this.string, true);
              }
            }, 100 * i);
          };
        })(this)(letter, i));
      }
      return results;
    };

    Typewriter.prototype.delayedDelete = function() {
      return setTimeout((function(_this) {
        return function() {
          return _this.deleteIt(true);
        };
      })(this), 1000);
    };

    return Typewriter;

  })();

  type = new Typewriter($('.anim'));

}).call(this);