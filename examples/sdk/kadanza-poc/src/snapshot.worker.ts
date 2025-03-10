// Define the base64 conversion function directly in the worker
function uint8ArrayToBase64(array: Uint8Array): string {
  return btoa(
    Array.from(array)
      .map((b) => String.fromCharCode(b))
      .join("")
  );
}

interface SnapshotMessage {
  type: 'processSnapshot';
  layoutId: string;
  layoutName: string;
  snapshotData: Uint8Array;
}

interface SnapshotResult {
  type: 'snapshotResult';
  layoutId: string;
  layoutName: string;
  base64Image: string;
}

self.addEventListener('message', (event: MessageEvent<SnapshotMessage>) => {
  if (event.data.type === 'processSnapshot') {
    const { layoutId, layoutName, snapshotData } = event.data;
    
    try {
      const base64String = uint8ArrayToBase64(snapshotData);

      const result: SnapshotResult = {
        type: 'snapshotResult',
        layoutId,
        layoutName,
        base64Image: base64String
      };

      self.postMessage(result);
    } catch (error) {
      self.postMessage({
        type: 'error',
        layoutId,
        error: error.message
      });
    }
  }
}); 