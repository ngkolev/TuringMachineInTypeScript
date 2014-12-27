module TuringMachine.Abstraction {

    export interface IProgram { 
        findStatement(fromState: Model.State, readLetter: Model.Letter): Model.Statement;
        toString(): string;
    }

    export interface IParser {
        parse(): IProgram;
    }

    export interface IReader {
        readLine(): string;
    }

    export interface ITape {
        currentLetter: Model.Letter;
        moveRight(): void;
        moveLeft(): void;
        writeText(text: Model.Letter[]): void;
        reset(): void;
    }

    export interface ITuringMachine {
        getState(): Model.State;
        getTape(): ITape;
        getIsHalt(): boolean;
        getIsRejected(): boolean;
        tick(): void;
    }

    export interface IWriter {
        writeLine(line: string): void;
    }
}