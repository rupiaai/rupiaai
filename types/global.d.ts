// types.d.ts or global.d.ts
declare global {
  var mongoose: {
    conn: any;
    promise: Promise<any> | null;
  };
}

export {};
