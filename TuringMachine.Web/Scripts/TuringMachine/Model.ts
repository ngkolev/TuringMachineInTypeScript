module TuringMachine.Model {

    export class Letter {

        static EMPTY = new Letter('_');

        constructor(private name: string) { }

        toString(): string {
            return this.name;
        }

        isEqual(other: Letter): boolean {
            return this.name == other.name;
        }
    }

    export class State {

        static INITIAL = new State('init');
        static FINAL = new State('halt');

        constructor(private name: string) { }

        toString(): string {
            return this.name;
        }

        isEqual(other: State): boolean {
            return this.name == other.name;
        }
    }

    export class Statement {

        constructor(
            public fromState: State,
            public readLetter: Letter,
            public toState: State,
            public writtenLetter: Letter,
            public moveDirection: MoveDirection) { }

        toString(): string {
            return [this.fromState,
                this.readLetter,
                this.toState,
                this.writtenLetter,
                this.moveDirection].join(' ');
        }
    }

    export enum MoveDirection {
        None,
        Left,
        Right,
    }

    export module MoveDirectionUtil {
        export function display(direction: MoveDirection): string {
            switch (direction) {
                case MoveDirection.None: return '-';
                case MoveDirection.Left: return '<';
                case MoveDirection.Right: return '>';
                default: throw new Error('Invalid enum value');
            }
        }

        export function fromName(name: string): MoveDirection {
            switch (name) {
                case '-': return MoveDirection.None;
                case '<': return MoveDirection.Left;
                case '>': return MoveDirection.Right;
                default: throw new Error('String cannot be parsed as enum');
            }
        }
    }
}