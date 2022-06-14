// Settings That Are Comming Directly From Spec Reporter Documentation For TypeScript.
// The Repo Link: "https://github.com/bcaudan/jasmine-spec-reporter/tree/master/examples/typescript".
// setting up some custom options for the display processor, then we create a new reporter.

import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter'
import SuiteInfo = jasmine.SuiteInfo;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `TypeScript ${log}`
  }
}

jasmine.getEnv().clearReporters()
jasmine.getEnv().addReporter(
  //@ts-ignore
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
)