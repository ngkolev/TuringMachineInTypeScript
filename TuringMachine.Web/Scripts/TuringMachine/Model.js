var TuringMachine;
(function (TuringMachine) {
    var Model;
    (function (Model) {
        var Letter = (function () {
            function Letter(name) {
                this.name = name;
            }
            Letter.prototype.toString = function () {
                return this.name;
            };
            Letter.prototype.isEqual = function (other) {
                return this.name == other.name;
            };
            Letter.EMPTY = new Letter('_');
            return Letter;
        })();
        Model.Letter = Letter;
        var State = (function () {
            function State(name) {
                this.name = name;
            }
            State.prototype.toString = function () {
                return this.name;
            };
            State.prototype.isEqual = function (other) {
                return this.name == other.name;
            };
            State.INITIAL = new State('init');
            State.FINAL = new State('halt');
            return State;
        })();
        Model.State = State;
        var Statement = (function () {
            function Statement(fromState, readLetter, toState, writtenLetter, moveDirection) {
                this.fromState = fromState;
                this.readLetter = readLetter;
                this.toState = toState;
                this.writtenLetter = writtenLetter;
                this.moveDirection = moveDirection;
            }
            Statement.prototype.toString = function () {
                return [this.fromState, this.readLetter, this.toState, this.writtenLetter, this.moveDirection].join(' ');
            };
            return Statement;
        })();
        Model.Statement = Statement;
        (function (MoveDirection) {
            MoveDirection[MoveDirection["None"] = 0] = "None";
            MoveDirection[MoveDirection["Left"] = 1] = "Left";
            MoveDirection[MoveDirection["Right"] = 2] = "Right";
        })(Model.MoveDirection || (Model.MoveDirection = {}));
        var MoveDirection = Model.MoveDirection;
        var MoveDirectionUtil;
        (function (MoveDirectionUtil) {
            function display(direction) {
                switch (direction) {
                    case 0 /* None */:
                        return '-';
                    case 1 /* Left */:
                        return '<';
                    case 2 /* Right */:
                        return '>';
                    default:
                        throw new Error('Invalid enum value');
                }
            }
            MoveDirectionUtil.display = display;
            function fromName(name) {
                switch (name) {
                    case '-':
                        return 0 /* None */;
                    case '<':
                        return 1 /* Left */;
                    case '>':
                        return 2 /* Right */;
                    default:
                        throw new Error('String cannot be parsed as enum');
                }
            }
            MoveDirectionUtil.fromName = fromName;
        })(MoveDirectionUtil = Model.MoveDirectionUtil || (Model.MoveDirectionUtil = {}));
    })(Model = TuringMachine.Model || (TuringMachine.Model = {}));
})(TuringMachine || (TuringMachine = {}));
//# sourceMappingURL=Model.js.map