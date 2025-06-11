[Back to Readme](./README.md)

# tests/socket.test.ts - @eed_modSocketComm

**Summary:** This code defines a suite of Jest unit tests for a `NativeSocket` class. The goal is to thoroughly test the functionality of the `NativeSocket` class, including establishing connections, sending and receiving events, handling disconnections and reconnections, managing payload sizes, handling invalid message formats, dealing with connection errors, managing timeouts, and ensuring proper cleanup of socket files.

- **File Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts
- **Language:** TypeScript

## Table of Contents
- [classes](#classes)
- [variables](#variables)
- [imports](#imports)
## classes


### 📘 NativeSocket - CLASS
------------------------------------------------------------
**Description:** Tests for the NativeSocket class.

**Code Snippet:**

describe('NativeSocket', () => {
  let server: NativeSocket;
  let client: NativeSocket;

  beforeEach(async () => {
    server = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
    client = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
  });

  afterEach(async () => {
    await Promise.all([
      client.disconnect(),
      server.disconnect()
    ]);
  });

  it('should establish connection between server and client', async () => {
    const serverConnected = new Promise<void>((resolve) => {
      server.once('connect', () => resolve());
    });

    const clientConnected = new Promise<void>((resolve) => {
      client.once('connect', () => resolve());
    });

    await server.setupServer();
    await client.connect();

    await Promise.all([serverConnected, clientConnected]);
  });

  it('should send and receive events', async () => {
    await server.setupServer();
    await client.connect();

    const message = { test: 'Hello World' };
    const received = new Promise<any>((resolve) => {
      server.once('test-event', (data) => resolve(data));
    });

    client.emit('test-event', message);
    const result = await received;
    expect(result).toEqual(message);
  });

  it('should handle disconnection and reconnection', async () => {
    await server.setupServer();
    await client.connect();

    const disconnected = new Promise<void>((resolve) => {
      client.once('disconnect', () => resolve());
    });

    const reconnected = new Promise<void>((resolve) => {
      client.once('connect', () => resolve());
    });

    await server.disconnect();
    await disconnected;

    await server.setupServer();
    await reconnected;
  });

  it('should reject payloads exceeding maximum size', async () => {
    const smallSocket = new NativeSocket({ 
      socketPath: TEST_SOCKET_PATH,
      maxPayloadSize: 10 
    });

    await server.setupServer();
    await smallSocket.connect();

    const error = new Promise<Error>((resolve) => {
      smallSocket.once('error', (err) => resolve(err as Error));
    });

    smallSocket.emit('test-event', { data: 'x'.repeat(100) });
    const err = await error;
    expect(err.message).toContain('Payload size exceeds maximum');

    await smallSocket.disconnect();
  });

  it('should handle invalid message formats', async () => {
    await server.setupServer();
    await client.connect();

    const error = new Promise<Error>((resolve) => {
      server.once('error', (err) => resolve(err as Error));
    });

    // @ts-ignore - Accessing private property for testing
    client.socket?.write('invalid json\n');
    
    const err = await error;
    expect(err.message).toBe('Invalid message format');
  });

  it('should handle connection errors', async () => {
    const error = new Promise<Error>((resolve) => {
      client.once('error', (err) => resolve(err as Error));
    });

    try {
      await client.connect();
    } catch (err) {
      // Expected error
    }

    const result = await error;
    expect(result).toBeDefined();
  });


  it('should properly stay connected beyond the timeout execution, if successfully connected', async ()=>{
    const server = new NativeSocket({ socketPath: TEST_SOCKET_PATH, connectTimeout: 5000 });
    const client = new NativeSocket({ socketPath: TEST_SOCKET_PATH, connectTimeout: 5000 });
    await server.setupServer();
    await client.connect();

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 6000);
    })

    await expect(server.connected).toBe(true);
    await expect(client.connected).toBe(true);

    await server.disconnect();
    await client.disconnect();

    // Ensure both sockets are disconnected
    await expect(server.connected).toBe(false);
    await expect(client.connected).toBe(false);
  })

  it('should properly timeout if the path is not writeable after a certain period of time', async ()=>{
    const server = new NativeSocket({ socketPath: TEST_SOCKET_PATH, connectTimeout: 3000 });
    const client = new NativeSocket({ socketPath: TEST_SOCKET_PATH, connectTimeout: 3000 });

    const interval = setInterval(()=>{
      // CHMOD the sock to not be readable/writable!
      try {
        fs.chmodSync(TEST_SOCKET_PATH, 0o000);

      } catch (e) {
        // ignore
      }
    }, 500)

     const serverConnect = await server.setupServer()
     .then(()=>false) 

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 4000);
    })

    clearInterval(interval);

    expect(server.connected).toBe(false);
    expect(client.connected).toBe(false);
    expect(serverConnect).toBe(false);
    
  })

  // Commenting this test out for now - communication works between Feather and SDR using this module, but this test does not
  // it('should properly handle multiple back and forth communications without issues', async ()=>{
    
  //   await server.setupServer();
  //   await client.connect();

  //   const numberOfMessagesToSend = 25;
  //   let messageNumber = 0;
  //   const message = 'Hello World!';

  //   server.on('test-event', (data) => {
  //     expect(server.connected).toBe(true);
  //     expect(data).toEqual(message);
  //     messageNumber++;
  //     server.emit('test-event-returned', data + ' back' + messageNumber);
      
  //   })

  //   const clientDoneSending = new Promise<boolean>((resolve) => {
  //     const timeout = setTimeout(() => {
  //       console.log("Timeout reached")
  //       resolve(false);
  //     }, 30000);

  //   client.on('test-event-returned', (data) => {
  //     expect(client.connected).toBe(true);
  //     expect(data).toEqual(message + ' back' + messageNumber);
  //     if (messageNumber === numberOfMessagesToSend) {
  //       clearTimeout(timeout);
  //       resolve(true);
  //     } else {
  //       client.emit('test-event', message);
  //     }
  //   })
  // })
  //   client.emit('test-event', message);
     
  //   const bOK = await clientDoneSending;
  //   expect(bOK).toBe(true);

  // })

  it('should attempt multiple reconnects before succeeding once the server is up', async () => {
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      reconnectDelay: 1000,
      maxRetries: 5
    });
  
    // We'll start the server after 3 seconds, ensuring first attempts fail.
    let serverStartTimeout: NodeJS.Timeout;
  
    // Promises to track client events
    const errorEvents: Array<Error> = [];
    client.on('error', (err) => {
      errorEvents.push(err);
    });
  
    const connectedPromise = new Promise<void>((resolve) => {
      client.once('connect', () => {
        resolve();
      });
    });
  
    // Initiate client connection before server is up
    await client.connect().catch(() => {
      // We expect some initial connection failures
    });
  
    // Start the server after 3 seconds to ensure the client has time to fail a few times
    serverStartTimeout = setTimeout(async () => {
      await server.setupServer(); // Reuse existing server from your describe hooks or a new instance
    }, 3000);
  
    // Wait for the client to eventually connect
    await connectedPromise;
    clearTimeout(serverStartTimeout);
  
    // Validate that we did get some errors along the way
    expect(errorEvents.length).toBeGreaterThan(0);
  
    // Cleanup
    await client.disconnect();
  });
  

  it('should stop trying to connect after maxRetries is exceeded', async () => {
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      reconnectDelay: 500,
      maxRetries: 2
    });
  
    let finalError: Error | null = null;
    client.on('error', (err) => {
      finalError = err;
    });
  
    // Attempt to connect to a server that will not be started
    await expect(client.connect()).rejects.toThrow();
  
    // Wait enough time for all retries to be exhausted
    await new Promise(resolve => setTimeout(resolve, 3 * 1000)); 
    // 3 seconds is enough for 2 retries at 500ms
  
    // Because the server never starts, we expect client to hit maxRetries and fail
    expect(client['retries']).toBe(2); // If you can access private property
    expect(client.connected).toBe(false);
    expect(finalError).toBeTruthy();
    // You could also check if finalError message indicates something like 'Max retries reached'
  
    // Cleanup
    await client.disconnect();
  });
  
  it('should handle multiple concurrent connect calls gracefully', async () => {
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      reconnectDelay: 500,
      maxRetries: 2
    });
  
    // Setup a spy for the actual socket creation
    const originalCreateConnection = client['socket']; // or a method if you're mocking net.createConnection
    
    // Attempt multiple connects in quick succession
    const connectPromises = [
      client.connect().catch(() => {}),
      client.connect().catch(() => {}),
    ];
  
    // Start the server after a short delay
    setTimeout(async () => {
      await server.setupServer();
    }, 1000);
  
    await Promise.all(connectPromises);
  
    // Check that client is connected
    expect(client.connected).toBe(true);
  
    // If you have a spy or a mock, confirm only one socket was created
    // e.g., expect(mockCreateConnection).toHaveBeenCalledTimes(1);
  
    // Cleanup
    await client.disconnect();
  });
  
  it('should reconnect if the server closes the connection unexpectedly', async () => {
    await server.setupServer();
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      reconnectDelay: 1000,
      maxRetries: 2
    });
  
    // Track disconnect and reconnect events
    let disconnectCount = 0;
    client.on('disconnect', () => {
      disconnectCount++;
    });
  
    await client.connect();
    expect(client.connected).toBe(true);
  
    // We forcibly close the server side socket
    if (server['socket']) {
      server['socket'].destroy();
    }
  
    // Wait for the client to detect the 'close' event and attempt reconnection
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    // 2 seconds for one reconnect cycle
  
    expect(disconnectCount).toBeGreaterThan(0);
    // The client should have tried to reconnect automatically
    // If the server is still up, it should reconnect successfully
    // If you want to verify reconnection success, do:
    // expect(client.connected).toBe(true); 
    // But you might need the server to accept a new socket or re-listen
  
    // Cleanup
    await client.disconnect();
  });
  
  it('should reject large payloads sent from the server to the client', async () => {
    const smallClient = new NativeSocket({ 
      socketPath: TEST_SOCKET_PATH,
      maxPayloadSize: 10 
    });
    await server.setupServer();
    await smallClient.connect();
  
    const errorPromise = new Promise<Error>((resolve) => {
      smallClient.once('error', (err) => resolve(err));
    });
  
    // Emulate the server sending data that exceeds the client's maxPayloadSize
    // You may need a way to send data from server => client. 
    // e.g., server.emit('test-event', { data: 'too large...' });
    server.emit('test-event', { data: 'x'.repeat(100) });
  
    const err = await errorPromise;
    expect(err.message).toContain('Payload size exceeds maximum allowed');
  
    await smallClient.disconnect();
  });
  
  it('should emit error if server does not accept connection within connectTimeout', async () => {
    // We create a 'fake' server that never actually calls accept or responds
    // or we skip server setup. The client will attempt connect, but never get 'connect' event
  
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      connectTimeout: 2000,  // short for test
    });
  
    const errorPromise = new Promise<Error>((resolve) => {
      client.once('error', (err) => resolve(err));
    });
  
    await expect(client.connect()).rejects.toThrow();
  
    const err = await errorPromise;
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toMatch(/timeout/i);
  
    await client.disconnect();
  });
  
  it('should remove socket file on server disconnect', async () => {
    await server.setupServer();
    const socketPath = server['socketPath']; // or however you access it
    
    // Ensure file exists
    expect(fs.existsSync(socketPath)).toBe(true);
  
    await server.disconnect();
    
    // Check that the socket file has been removed
    const fileStillExists = fs.existsSync(socketPath);
    expect(fileStillExists).toBe(false);
  });
  
  it('should emit error when writing to a closed socket', async () => {
    await server.setupServer();
    await client.connect();
  
    // Simulate server closing socket abruptly
    server['socket']?.destroy();
  
    const errorPromise = new Promise<Error>((resolve) => {
      client.once('error', (err) => resolve(err));
    });
  
    // Attempt to emit from the client side after server is closed
    client.emit('test-event', { foo: 'bar' });
  
    const err = await errorPromise;
    expect(err.message).toMatch(/Not connected/);
  
    await client.disconnect();
  });

  it('should cancel pending reconnect when disconnect is called', async () => {
    const client = new NativeSocket({
      socketPath: TEST_SOCKET_PATH,
      reconnectDelay: 1000,
      maxRetries: 3
    });
  
    // The server won't be started, so the client tries to reconnect
    client.connect().catch(() => {});
  
    // Wait briefly to let the first connection fail and a retry get scheduled
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Disconnect, which should cancel any further retry
    await client.disconnect();
  
    // Wait enough time that would otherwise trigger 2 or 3 more retries
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    // If `disconnect()` is correct, retries won't happen, so 'retries' won't increment
    expect(client['retries']).toBeLessThanOrEqual(1);
  
    // Validate no timers are still running
    expect(client.connected).toBe(false);
  });
  
});

- **Line:** 13
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** This `describe` block defines a suite of Jest tests for the `NativeSocket` class. It aims to thoroughly test the functionality of the `NativeSocket` class, including establishing connections, sending and receiving events, handling disconnections and reconnections, managing payload sizes, handling invalid message formats, dealing with connection errors, managing timeouts, and ensuring proper cleanup of socket files.
- **Usage Example:** 


```typescript
// This is a test suite, so it doesn't have a direct usage example.
// However, each `it` block demonstrates how to use the NativeSocket class.
// For example, to test connection establishment:
// const server = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
// const client = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
// await server.setupServer();
// await client.connect();
```

- **Edge Cases:** The tests cover various edge cases, such as exceeding maximum payload size, invalid message formats, connection errors, timeouts, and unexpected disconnections.
- **Dependencies:** Jest, `NativeSocket` class (from '../src'), `path`, `os`, `fs`
## variables


### 🧮 TEST_SOCKET_PATH - VARIABLE
------------------------------------------------------------
**Description:** Defines the socket path based on the operating system.

**Code Snippet:**
```
const TEST_SOCKET_PATH = platform() === 'win32' 
  ? '\\\\.\\pipe\\feather-test-unit.pipe'
  : join('/Users/Shared/Library/Application Support/Stanford', 'feather-test-unit.sock');
```
- **Line:** 7
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines a constant `TEST_SOCKET_PATH` that specifies the file path for the Unix domain socket (or named pipe on Windows) used in the unit tests. The path is determined based on the operating system. This ensures that the tests use a consistent and appropriate socket path for the platform they are running on.
- **Returns:** string: The socket path. On Windows, it's a named pipe path (e.g., `\\.\pipe\feather-test-unit.pipe`). On other platforms, it's a file path within the `/Users/Shared/Library/Application Support/Stanford` directory (e.g., `/Users/Shared/Library/Application Support/Stanford/feather-test-unit.sock`).
- **Usage Example:** 


```typescript
import { TEST_SOCKET_PATH } from './socket.test';

const socketPath = TEST_SOCKET_PATH; // Use the socket path in tests
```

- **Edge Cases:** The socket path is hardcoded and might need to be adjusted based on the environment or user preferences. The Windows named pipe path format is specific to Windows. The Unix domain socket path is specific to macOS and may need to be adjusted for other Unix-like systems.
- **Dependencies:** os, path

### 🧮 server - VARIABLE
------------------------------------------------------------
**Description:** Variable to hold the NativeSocket server instance.

**Code Snippet:**
```
let server: NativeSocket;
```
- **Line:** 13
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Declares a variable named `server` to hold an instance of the `NativeSocket` class. This instance will be used to represent the server-side socket in the unit tests.
- **Returns:** None
- **Usage Example:** 


```typescript
let server: NativeSocket;

beforeEach(async () => {
  server = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
});
```

- **Edge Cases:** The `server` variable is initially undefined and must be initialized before use. If not initialized, any operation on it will result in an error.
- **Dependencies:** NativeSocket class (from '../src')

### 🧮 client - VARIABLE
------------------------------------------------------------
**Description:** Variable to hold the NativeSocket client instance.

**Code Snippet:**
```
let client: NativeSocket;
```
- **Line:** 14
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Declares a variable `client` to hold an instance of the `NativeSocket` class. This instance will represent the client-side socket connection in the unit tests.
- **Usage Example:** 


```typescript
client = new NativeSocket({ socketPath: TEST_SOCKET_PATH });
await client.connect();
```

- **Edge Cases:** The `client` variable is initially undefined and must be initialized with a `NativeSocket` instance before use. Failure to do so will result in runtime errors.
- **Dependencies:** NativeSocket (from '../src')
## imports


### 📥 NativeSocket - IMPORT
------------------------------------------------------------
**Description:** Imports the NativeSocket class from the specified path.

**Code Snippet:**
```
import { NativeSocket } from '../src';
```
- **Line:** 1
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `NativeSocket` class from the `../src/index.ts` file, making it available for use in the test file. This allows the test suite to instantiate and test the functionality of the `NativeSocket` class.
- **Usage Example:** 


```typescript
import { NativeSocket } from '../src';

// Now you can use the NativeSocket class
const socket = new NativeSocket();
```

- **Edge Cases:** If the path to `../src/index.ts` is incorrect, the import will fail, and the test suite will not be able to run.
- **Dependencies:** The `NativeSocket` class itself, which relies on modules like `net`, `fs`, `os`, and `eventemitter3` as defined in `src/index.ts`.

### 📥 join - IMPORT
------------------------------------------------------------
**Description:** Imports the join function from the path module.

**Code Snippet:**
```
import { join } from 'path';
```
- **Line:** 2
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `join` function from the `path` module. This function is used to construct file paths in a platform-independent manner.
- **Usage Example:** 


```typescript
import { join } from 'path';
const filePath = join('/Users/Shared/Library/Application Support/Stanford', 'feather-test-unit.sock');
console.log(filePath); // Output: /Users/Shared/Library/Application Support/Stanford/feather-test-unit.sock
```

- **Edge Cases:** The `join` function handles cases where path segments are empty strings, `.` (current directory), or `..` (parent directory) correctly.
- **Dependencies:** path module (Node.js built-in module)

### 📥 platform - IMPORT
------------------------------------------------------------
**Description:** Imports the platform function from the os module.

**Code Snippet:**
```
import { platform } from 'os';
```
- **Line:** 3
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `platform` function from the `os` module. This function is used to determine the operating system the code is running on, which is crucial for platform-specific logic, such as determining the correct socket path (Unix domain socket vs. named pipe on Windows).
- **Usage Example:** 


```typescript
import { platform } from 'os';

if (platform() === 'win32') {
  // Windows-specific code
} else {
  // Non-Windows code
}
```

- **Edge Cases:** The `platform` function relies on the underlying operating system reporting the correct platform. In rare cases where the OS is misconfigured or spoofed, the function might return an incorrect value.
- **Dependencies:** os module

### 📥 fs - IMPORT
------------------------------------------------------------
**Description:** Imports the fs module.

**Code Snippet:**
```
import * as fs from 'fs';
```
- **Line:** 4
- **Location:** /Users/fterry/code/modSocketComm/tests/socket.test.ts (/Users/fterry/code/modSocketComm/tests/socket.test.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the Node.js 'fs' (file system) module, providing functions for interacting with the file system. This is used in the test suite to check for the existence and permissions of the socket file.
- **Usage Example:** 


```typescript
import * as fs from 'fs';

if (fs.existsSync('/path/to/file')) {
  console.log('File exists!');
}
```

- **Edge Cases:** The 'fs' module relies on the underlying operating system's file system. Errors can occur due to permission issues, file not found, or other system-level problems.
- **Dependencies:** Node.js runtime environment.
