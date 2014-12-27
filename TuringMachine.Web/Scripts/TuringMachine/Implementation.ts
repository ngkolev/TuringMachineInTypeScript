module TuringMachine.Implementation {

    export class Writer implements Abstraction.IWriter {

        constructor(private writeLineFunc: (line: string) => void) { }

        writeLine(line: string): void {
            this.writeLineFunc(line);
        }
    }

    export class Reader implements Abstraction.IReader {

        private lines: string[];

        constructor(program: string) {
            this.lines = program.split(/\n/).reverse();
        }

        readLine(): string {
            return this.lines.pop();
        }
    }

    export class Parser implements Abstraction.IParser {
        static COMMENT_SYMBOL = '#';

        constructor(private reader: Abstraction.IReader) { }

        parse(): Abstraction.IProgram {
            var statements: Model.Statement[] = [];
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
        }

        private parseLine(line: string): Model.Statement {
            var entries = line.split(/\s+/);
            if (entries.length != 5) {
                throw new Error('Incorrect number of arguments during parsing');
            }

            var result = new Model.Statement(
                new Model.State(entries[0]),
                new Model.Letter(entries[1]),
                new Model.State(entries[2]),
                new Model.Letter(entries[3]),
                Model.MoveDirectionUtil.fromName(entries[4]));

            return result;
        }
    }

    export class Program implements Abstraction.IProgram {

        constructor(private statements: Model.Statement[]) { }

        findStatement(fromState: Model.State, readLetter: Model.Letter): Model.Statement {
            var result = this.statements.filter(s=>
                s.fromState.isEqual(fromState) &&
                s.readLetter.isEqual(readLetter));

            return result[0] || null;
        }

        toString(): string {
            var buffer = '';
            this.statements.forEach(s=> {
                buffer += s.toString();
                buffer += '\n';
            });

            return buffer;
        }
    }

    export class Tape implements Abstraction.ITape {

        private tapeInternal: { [index: number]: Model.Letter; } = {};
        private tapeIndex: number = 0;

        moveRight(): void {
            this.tapeIndex++;
        }

        moveLeft(): void {
            this.tapeIndex--;
        }

        get currentLetter() {
            return this.tapeInternal[this.tapeIndex] || Model.Letter.EMPTY;
        }

        set currentLetter(value) {
            this.tapeInternal[this.tapeIndex] = value;
        }

        toString(): string {
            var keys = Object.keys(this.tapeInternal);
            keys.sort();

            var buffer = '';
            keys.forEach(k=> {
                buffer += this.tapeInternal[k];
                buffer += ' ';
            });

            return buffer;
        }

        writeText(letters: Model.Letter[]): void {
            letters.forEach(l=> {
                this.tapeInternal[this.tapeIndex] = l;
                this.moveRight();
            });
        }

        reset(): void {
            this.tapeIndex = 0;
        }
    }

    export class TuringMachine implements Abstraction.ITuringMachine {

        private isRejected: boolean;
        private state: Model.State;
        private tape: Abstraction.ITape;
        private program: Abstraction.IProgram;

        constructor(program: Abstraction.IProgram, tape: Abstraction.ITape) {
            this.program = program;
            this.tape = tape;
            this.state = Model.State.INITIAL;
            this.isRejected = false;
        }

        getIsHalt(): boolean {
            return this.state == Model.State.FINAL || this.isRejected;
        }

        getState(): Model.State {
            return this.state;
        }

        getTape(): Abstraction.ITape {
            return this.tape;
        }

        getIsRejected(): boolean {
            return this.isRejected;
        }

        tick(): void {
            var statement = this.program.findStatement(this.state, this.tape.currentLetter);

            if (statement != null) {
                this.tape.currentLetter = statement.writtenLetter;
                this.state = statement.toState;

                switch (statement.moveDirection) {
                    case Model.MoveDirection.None:
                        break;
                    case Model.MoveDirection.Left:
                        this.tape.moveLeft();
                        break;
                    case Model.MoveDirection.Right:
                        this.tape.moveRight();
                        break;
                    default: throw new Error('Invalid enum value');
                }
            } else {

                this.isRejected = true;
            }
        }
    }
}