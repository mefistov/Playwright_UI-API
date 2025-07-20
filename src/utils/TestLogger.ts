export class TestLogger {

  static error(error: unknown) {
    console.error(`❌ [TEST FAIL]`, error);
  }

  static info(msg: string) {
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