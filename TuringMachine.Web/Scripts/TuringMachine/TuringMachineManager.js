var TuringMachine;
(function (TuringMachine) {
    var TuringMachineManager = (function () {
        function TuringMachineManager(parser, writer, input) {
            this.parser = parser;
            this.writer = writer;
            this.input = input;
        }
        TuringMachineManager.prototype.execute = function () {
            var program = this.parser.parse();
            var tape = new TuringMachine.Implementation.Tape();
            var letters = this.input.split('').map(function (c) { return new TuringMachine.Model.Letter(c); });
            tape.writeText(letters);
            tape.reset();
            var machine = new TuringMachine.Implementation.TuringMachine(program, tape);
            // Print program
            this.writer.writeLine('PROGRAM:');
            this.writer.writeLine('');
            this.writer.writeLine(program.toString());
            this.writer.writeLine('');
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
        };
        TuringMachineManager.prototype.writeMachine = function (machine) {
            this.writer.writeLine('STATE: ' + machine.getState());
            this.writer.writeLine('TAPE: ' + machine.getTape());
            this.writer.writeLine('');
        };
        return TuringMachineManager;
    })();
    TuringMachine.TuringMachineManager = TuringMachineManager;
})(TuringMachine || (TuringMachine = {}));
//# sourceMappingURL=TuringMachineManager.js.map