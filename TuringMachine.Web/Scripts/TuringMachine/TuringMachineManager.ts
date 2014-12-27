module TuringMachine {

    export class TuringMachineManager {

        constructor(
            private parser: Abstraction.IParser,
            private writer: Abstraction.IWriter,
            private input: string) { }

        execute(): void {
            var program = this.parser.parse();
            var tape = new Implementation.Tape();
            var letters = this.input.split('').map(c=> new Model.Letter(c));

            tape.writeText(letters);
            tape.reset();
            var machine = new Implementation.TuringMachine(program, tape);

            // Print program
            this.writer.writeLine('PROGRAM:');
            this.writer.writeLine('');
            this.writer.writeLine(program.toString());
            this.writer.writeLine('');

            // Execute step by step
            while (!machine.getIsHalt()) {
                this.writeMachine(machine);
                machine.tick();
            }

            // Print final tape
            if (machine.getIsRejected()) {
                this.writer.writeLine('FINAL - REJECTED:');
            }
            else {
                this.writer.writeLine('FINAL - ACCEPTED:');
            }

            this.writeMachine(machine);

        }

        private writeMachine(machine: Implementation.TuringMachine): void {
            this.writer.writeLine('STATE: ' + machine.getState());
            this.writer.writeLine('TAPE: ' + machine.getTape());
            this.writer.writeLine('');
        }
    }
}