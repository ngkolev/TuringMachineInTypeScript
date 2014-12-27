var TuringMachine;
(function (_TuringMachine) {
    var Implementation;
    (function (Implementation) {
        var Writer = (function () {
            function Writer(writeLineFunc) {
                this.writeLineFunc = writeLineFunc;
            }
            Writer.prototype.writeLine = function (line) {
                this.writeLineFunc(line);
            };
            return Writer;
        })();
        Implementation.Writer = Writer;
        var Reader = (function () {
            function Reader(program) {
                this.lines = program.split(/\n/).reverse();
            }
            Reader.prototype.readLine = function () {
                return this.lines.pop();
            };
            return Reader;
        })();
        Implementation.Reader = Reader;
        var Parser = (function () {
            function Parser(reader) {
                this.reader = reader;
            }
            Parser.prototype.parse = function () {
                var statements = [];
                while (true) {
                    var line = this.reader.readLine();
                    if (line == null) {
                        break;
                    }
                    var lineTrimed = line.trim();
                    if (lineTrimed == '' || lineTrimed[0] == Parser.COMMENT_SYMBOL) {
                        continue;
                    }
                    var statement = this.parseLine(line);
                    statements.push(statement);
                }
                return new Program(statements);
            };
            Parser.prototype.parseLine = function (line) {
                var entries = line.split(/\s+/);
                if (entries.length != 5) {
                    throw new Error('Incorrect number of arguments during parsing');
                }
                var result = new _TuringMachine.Model.Statement(new _TuringMachine.Model.State(entries[0]), new _TuringMachine.Model.Letter(entries[1]), new _TuringMachine.Model.State(entries[2]), new _TuringMachine.Model.Letter(entries[3]), _TuringMachine.Model.MoveDirectionUtil.fromName(entries[4]));
                return result;
            };
            Parser.COMMENT_SYMBOL = '#';
            return Parser;
        })();
        Implementation.Parser = Parser;
        var Program = (function () {
            function Program(statements) {
                this.statements = statements;
            }
            Program.prototype.findStatement = function (fromState, readLetter) {
                var result = this.statements.filter(function (s) { return s.fromState.isEqual(fromState) && s.readLetter.isEqual(readLetter); });
                return result[0] || null;
            };
            Program.prototype.toString = function () {
                var buffer = '';
                this.statements.forEach(function (s) {
                    buffer += s.toString();
                    buffer += '\n';
                });
                return buffer;
            };
            return Program;
        })();
        Implementation.Program = Program;
        var Tape = (function () {
            function Tape() {
                this.tapeInternal = {};
                this.tapeIndex = 0;
            }
            Tape.prototype.moveRight = function () {
                this.tapeIndex++;
            };
            Tape.prototype.moveLeft = function () {
                this.tapeIndex--;
            };
            Object.defineProperty(Tape.prototype, "currentLetter", {
                get: function () {
                    return this.tapeInternal[this.tapeIndex] || _TuringMachine.Model.Letter.EMPTY;
                },
                set: function (value) {
                    this.tapeInternal[this.tapeIndex] = value;
                },
                enumerable: true,
                configurable: true
            });
            Tape.prototype.toString = function () {
                var _this = this;
                var keys = Object.keys(this.tapeInternal);
                keys.sort();
                var buffer = '';
                keys.forEach(function (k) {
                    buffer += _this.tapeInternal[k];
                    buffer += ' ';
                });
                return buffer;
            };
            Tape.prototype.writeText = function (letters) {
                var _this = this;
                letters.forEach(function (l) {
                    _this.tapeInternal[_this.tapeIndex] = l;
                    _this.moveRight();
                });
            };
            Tape.prototype.reset = function () {
                this.tapeIndex = 0;
            };
            return Tape;
        })();
        Implementation.Tape = Tape;
        var TuringMachine = (function () {
            function TuringMachine(program, tape) {
                this.program = program;
                this.tape = tape;
                this.state = _TuringMachine.Model.State.INITIAL;
                this.isRejected = false;
            }
            TuringMachine.prototype.getIsHalt = function () {
                return this.state == _TuringMachine.Model.State.FINAL || this.isRejected;
            };
            TuringMachine.prototype.getState = function () {
                return this.state;
            };
            TuringMachine.prototype.getTape = function () {
                return this.tape;
            };
            TuringMachine.prototype.getIsRejected = function () {
                return this.isRejected;
            };
            TuringMachine.prototype.tick = function () {
                var statement = this.program.findStatement(this.state, this.tape.currentLetter);
                if (statement != null) {
                    this.tape.currentLetter = statement.writtenLetter;
                    this.state = statement.toState;
                    switch (statement.moveDirection) {
                        case 0 /* None */:
                            break;
                        case 1 /* Left */:
                            this.tape.moveLeft();
                            break;
                        case 2 /* Right */:
                            this.tape.moveRight();
                            break;
                        default:
                            throw new Error('Invalid enum value');
                    }
                }
                else {
                    this.isRejected = true;
                }
            };
            return TuringMachine;
        })();
        Implementation.TuringMachine = TuringMachine;
    })(Implementation = _TuringMachine.Implementation || (_TuringMachine.Implementation = {}));
})(TuringMachine || (TuringMachine = {}));
//# sourceMappingURL=Implementation.js.map