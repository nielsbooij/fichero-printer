// Fichero D11s
export const SERVICE_UUID = "000018f0-0000-1000-8000-00805f9b34fb";
export const WRITE_CHAR_UUID = "00002af1-0000-1000-8000-00805f9b34fb";
export const NOTIFY_CHAR_UUID = "00002af0-0000-1000-8000-00805f9b34fb";
export const PRINTHEAD_PX = 96;

// Fichero 3561
export const SERVICE_UUID_3561 = "e7810a71-73ae-499d-8c15-faa9aef0c3f2";
export const WRITE_CHAR_UUID_3561 = "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f";
export const NOTIFY_CHAR_UUID_3561 = "bef8d6c9-9c21-4c9e-b632-bd58c1009f9f";
export const PRINTHEAD_PX_3561 = 384;

export const BYTES_PER_ROW = 12;
export const CHUNK_SIZE = 200;
export const CHUNK_DELAY_MS = 20;

export const CMD = {
  getModel: [0x10, 0xff, 0x20, 0xf0],
  getFirmware: [0x10, 0xff, 0x20, 0xf1],
  getSerial: [0x10, 0xff, 0x20, 0xf2],
  getBattery: [0x10, 0xff, 0x50, 0xf1],
  getStatus: [0x10, 0xff, 0x40],
  getShutdownTime: [0x10, 0xff, 0x13],
  setDensity: (level: number) => [0x10, 0xff, 0x10, 0x00, level],
  setPaperType: (type: number) => [0x10, 0xff, 0x84, type],
  setShutdownTime: (mins: number) => [0x10, 0xff, 0x12, (mins >> 8) & 0xff, mins & 0xff],
  enablePrinter: [0x10, 0xff, 0xfe, 0x01],
  stopPrint: [0x10, 0xff, 0xfe, 0x45],
  formFeed: [0x1d, 0x0c],
  factoryReset: [0x10, 0xff, 0x04],
} as const;

export const FICHERO_CLIENT_DEFAULTS = {
  packetIntervalMs: 20,
} as const;