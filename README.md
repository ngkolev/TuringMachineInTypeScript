TuringMachineInTypeScript
=========================

As the name of the repo says this is a Turing machine written in TypeScript. The goal of this mini project was to test my TypeScript skills. Therefore it was written only for couple of hours in a slap-dash manner.

Тhe interesting part is located in ~/Scripts/TuringMachine/*.ts. The logic is separated in four type script files:
* Model.ts - contains classes which primary goal is to define domain object without business logic
* Abstraction.ts - contains interfaces used for DI
* Implementation.ts - contains implementation of the interfaces
* TuringMachineManager.ts - contains only one class - the "glue" of the library
