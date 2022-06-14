"use strict";
// Settings That Are Comming Directly From Spec Reporter Documentation For TypeScript.
// The Repo Link: "https://github.com/bcaudan/jasmine-spec-reporter/tree/master/examples/typescript".
// setting up some custom options for the display processor, then we create a new reporter.
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
class CustomProcessor extends jasmine_spec_reporter_1.DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `TypeScript ${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
//@ts-ignore
new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
}));
