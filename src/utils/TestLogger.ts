export class TestLogger {
  static testStart(name: string, caseIds?: string[]) {
    const ids = caseIds?.join(', ') ?? 'N/A';
    const timeStamp = new Date().toISOString();
    console.log(`\n🧪[${timeStamp}] [TEST START] ${name}`);
    if (caseIds) {
      console.log(`📝 [TestRail ID(s)] ${ids}`);
    }
  }

  static testPass() {
    console.log(`✅ [TEST PASS]`);
  }

  static testFail(error: unknown) {
    console.error(`❌ [TEST FAIL]`, error);
  }

  static step(msg: string) {
    const timeStamp = new Date().toISOString();
    console.log(`📤[${timeStamp}] [STEP] ${msg}`);
  }

  static assert(msg: string) {
    console.log(`✅ [ASSERT] ${msg}`);
  }

  static data(label: string, data: string) {
    console.log(`📦 [${label}  ${JSON.stringify(data, null, 2)}]`);
  }
}
