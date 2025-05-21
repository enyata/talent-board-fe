export class RequestTimeoutError extends Error {
    constructor(ms: number) {
      super(`Request exceeded ${ms} ms`);
      this.name = "RequestTimeoutError";
    }
  }
  
  /** Wrap any promise with an AbortController‑based timeout. */
  export async function withTimeout<T>(
    promiseFactory: (signal: AbortSignal) => Promise<T>,
    ms = 12_000
  ): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
  
    try {
      return await promiseFactory(controller.signal);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.name === "AbortError") throw new RequestTimeoutError(ms);
      throw e;
    } finally {
      clearTimeout(timer);
    }
  }
  