// types.d.ts or global.d.ts
declare global {
  let mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

export {};
