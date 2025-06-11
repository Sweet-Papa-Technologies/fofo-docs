[Back to Readme](./README.md)

# src/index.ts - @eed_modSocketComm

**Summary:** This code defines a `NativeSocket` class that facilitates communication between processes using Unix domain sockets (or named pipes on Windows). It provides functionality for both a server and a client to connect, send, and receive messages. The class handles connection management, reconnection attempts, payload size limits, and error handling.

- **File Location:** /Users/fterry/code/modSocketComm/src/index.ts
- **Language:** TypeScript

## Table of Contents
- [classes](#classes)
- [imports](#imports)
- [exports](#exports)
- [interfaces](#interfaces)
## classes


### 📘 NativeSocket - CLASS
------------------------------------------------------------
**Description:** A class for handling native socket connections.

**Code Snippet:**
```
export class NativeSocket extends EventEmitter { ... }
```
- **Line:** Could Not Verify Line
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** true
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines a `NativeSocket` class that extends `EventEmitter` to provide a mechanism for inter-process communication using Unix domain sockets (or named pipes on Windows). It handles connection management, data transfer, and error handling for both server and client roles.
- **Usage Example:** 


```typescript
import { NativeSocket, SocketConfig } from './src';

// Example configuration
const config: SocketConfig = {
  socketPath: '/tmp/my_socket.sock',
  maxPayloadSize: 1024 * 1024, // 1MB
  reconnectDelay: 5000, // 5 seconds
  connectTimeout: 10000, // 10 seconds
  maxRetries: 3
};

// Create a NativeSocket instance
const socket = new NativeSocket(config);

// Setup as a server
async function setup() {
  try {
    await socket.setupServer();
    socket.on('my-event', (data) => {
      console.log('Received data:', data);
    });
  } catch (error) {
    console.error('Server setup failed:', error);
  }
}

// Connect as a client
async function connect() {
  try {
    await socket.connect();
    socket.emit('my-event', { message: 'Hello from client!' });
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

// Disconnect
async function disconnect() {
  await socket.disconnect();
}
```

- **Edge Cases:** Handles cases where the socket file already exists, connection timeouts occur, payload sizes exceed the maximum allowed, invalid message formats are received, and connection errors happen. It also manages reconnection attempts with a maximum retry limit.
- **Dependencies:** eventemitter3, net, fs/promises, os, path
###### Sub Objects:

  ### 🧮 socket - VARIABLE
------------------------------------------------------------
**Description:** The socket instance.

**Code Snippet:**
```
private socket: Socket | null = null;
```
  - **Line:** 14
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 server - VARIABLE
------------------------------------------------------------
**Description:** The server instance.

**Code Snippet:**
```
private server: any = null;
```
  - **Line:** 15
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 isServer - VARIABLE
------------------------------------------------------------
**Description:** A flag indicating if this is a server.

**Code Snippet:**
```
private isServer: boolean = false;
```
  - **Line:** 16
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 reconnectTimer - VARIABLE
------------------------------------------------------------
**Description:** The reconnect timer.

**Code Snippet:**
```
private reconnectTimer: NodeJS.Timeout | null = null;
```
  - **Line:** 17
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 connected - VARIABLE
------------------------------------------------------------
**Description:** A flag indicating if the socket is connected.

**Code Snippet:**
```
public connected: boolean = false;
```
  - **Line:** 18
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🧮 socketPath - VARIABLE
------------------------------------------------------------
**Description:** The path to the socket.

**Code Snippet:**
```
private socketPath: string;
```
  - **Line:** 19
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 maxPayloadSize - VARIABLE
------------------------------------------------------------
**Description:** The maximum payload size.

**Code Snippet:**
```
private maxPayloadSize: number;
```
  - **Line:** 20
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 connectTimeout - VARIABLE
------------------------------------------------------------
**Description:** The connection timeout.

**Code Snippet:**
```
private connectTimeout: number;
```
  - **Line:** 21
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 timeoutTimer - VARIABLE
------------------------------------------------------------
**Description:** The timeout timer.

**Code Snippet:**
```
private timeoutTimer: NodeJS.Timeout | null = null;
```
  - **Line:** 22
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 reconnectDelay - VARIABLE
------------------------------------------------------------
**Description:** The delay between reconnection attempts.

**Code Snippet:**
```
private reconnectDelay: number;
```
  - **Line:** 23
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 maxRetries - VARIABLE
------------------------------------------------------------
**Description:** Maximum number of reconnection attempts

**Code Snippet:**
```
private maxRetries: number;  // Maximum number of reconnection attempts
```
  - **Line:** 24
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🧮 retries - VARIABLE
------------------------------------------------------------
**Description:** Current reconnection attempt count

**Code Snippet:**
```
private retries: number;  // Current reconnection attempt count
```
  - **Line:** 25
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🔧 constructor - FUNCTION
------------------------------------------------------------
**Description:** Constructor for the NativeSocket class.

**Code Snippet:**
```
constructor(config?: SocketConfig) { ... }
```
  - **Line:** 28
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Function Parameters:
  - **config** (SocketConfig): Optional configuration object. 
 Example: { socketPath: '/tmp/my.sock', maxPayloadSize: 2048 }
  ###### Annotations / Comments:

  ### 🔧 getDefaultSocketPath - FUNCTION
------------------------------------------------------------
**Description:** Gets the default socket path based on the platform.

**Code Snippet:**
```
private getDefaultSocketPath(): string { ... }
```
  - **Line:** 38
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Function Returns:
  - **Type:** string
  - **Description:** The default socket path.
  - **Example:** /tmp/feather.sock
  ###### Annotations / Comments:

  ### 🔧 setupServer - FUNCTION
------------------------------------------------------------
**Description:** Sets up the socket server.

**Code Snippet:**
```
async setupServer(): Promise<void> { ... }
```
  - **Line:** 45
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  - **Async:** true


  ###### Annotations / Comments:

  ### 🔧 connect - FUNCTION
------------------------------------------------------------
**Description:** Connects to the socket.

**Code Snippet:**
```
async connect(): Promise<void> { ... }
```
  - **Line:** 160
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  - **Async:** true


  ###### Annotations / Comments:

  ### 🔧 cleanupSocket - FUNCTION
------------------------------------------------------------
**Description:** Cleans up the socket.

**Code Snippet:**
```
private async cleanupSocket(): Promise<void> { ... }
```
  - **Line:** 215
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  - **Async:** true


  ###### Annotations / Comments:

  ### 🔧 disconnect - FUNCTION
------------------------------------------------------------
**Description:** Disconnects from the socket.

**Code Snippet:**
```
async disconnect(): Promise<void> { ... }
```
  - **Line:** 241
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  - **Async:** true


  ###### Annotations / Comments:

  ### 🔧 scheduleReconnect - FUNCTION
------------------------------------------------------------
**Description:** Schedules a reconnection attempt.

**Code Snippet:**
```
private async scheduleReconnect(): Promise<void> { ... }
```
  - **Line:** 254
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  - **Async:** true


  ###### Annotations / Comments:

  ### 🔧 setupSocketHandlers - FUNCTION
------------------------------------------------------------
**Description:** Sets up the socket handlers.

**Code Snippet:**
```
private setupSocketHandlers(socket: Socket): void { ... }
```
  - **Line:** 292
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** true
  ###### Annotations / Comments:

  ### 🔧 emit - FUNCTION
------------------------------------------------------------
**Description:** Emits an event.

**Code Snippet:**
```
emit(event: string | symbol, ...args: any[]): boolean { ... }
```
  - **Line:** 347
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🔧 on - FUNCTION
------------------------------------------------------------
**Description:** Attaches an event listener.

**Code Snippet:**
```
on<T extends string | symbol>(event: T, listener: (...args: any[]) => void): this { ... }
```
  - **Line:** 406
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:
## imports


### 📥 EventEmitter - IMPORT
------------------------------------------------------------
**Description:** Imports EventEmitter from eventemitter3.

**Code Snippet:**
```
import { EventEmitter } from 'eventemitter3';
```
- **Line:** 1
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `EventEmitter` class from the `eventemitter3` library. This class is used as the base class for `NativeSocket` to provide event emission and handling capabilities.
- **Usage Example:** 


```typescript
import { EventEmitter } from 'eventemitter3';

class MyClass extends EventEmitter {
  constructor() {
    super();
  }

  doSomething() {
    this.emit('somethingHappened', { data: 'some data' });
  }
}

const myInstance = new MyClass();
myInstance.on('somethingHappened', (data) => {
  console.log('Event received:', data);
});

myInstance.doSomething();
```

- **Edge Cases:** The `EventEmitter` class itself doesn't have specific edge cases, but its usage within `NativeSocket` might have limitations related to the number of listeners or the complexity of event handling.
- **Dependencies:** eventemitter3

### 📥 Socket - IMPORT
------------------------------------------------------------
**Description:** Imports Socket from net.

**Code Snippet:**
```
import { Socket, createServer, createConnection } from 'net';
```
- **Line:** 2
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `Socket`, `createServer`, and `createConnection` classes from the `net` module. These classes are fundamental for creating and managing TCP sockets, which are used for inter-process communication in this `NativeSocket` implementation.
- **Usage Example:** 


```typescript
import { Socket, createServer, createConnection } from 'net';

// Example usage (within the NativeSocket class):
const server = createServer((socket: Socket) => {
  // Handle socket connection
});
```

- **Edge Cases:** The `net` module is platform-dependent and may behave differently on different operating systems (e.g., Windows vs. Linux).
- **Dependencies:** The code depends on the built-in `net` module in Node.js.

### 📥 chmod - IMPORT
------------------------------------------------------------
**Description:** Imports chmod from fs/promises.

**Code Snippet:**
```
import { chmod, unlink } from 'fs/promises';
```
- **Line:** 3
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `chmod` and `unlink` functions from the `fs/promises` module. These functions are used for changing file permissions and deleting files asynchronously, respectively.
- **Usage Example:** 


```typescript
import { chmod, unlink } from 'fs/promises';

async function changePermissions(filePath: string, mode: number) {
  try {
    await chmod(filePath, mode);
    console.log(`Permissions changed for ${filePath}`);
  } catch (error) {
    console.error(`Failed to change permissions for ${filePath}:`, error);
  }
}

async function deleteFile(filePath: string) {
  try {
    await unlink(filePath);
    console.log(`File deleted: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete file ${filePath}:`, error);
  }
}
```

- **Edge Cases:** The `chmod` function may throw an error if the file does not exist or if the user does not have permission to change the file's permissions. The `unlink` function may throw an error if the file does not exist or if the user does not have permission to delete the file. On Windows, `chmod` might not behave as expected for all permission changes.
- **Dependencies:** fs/promises

### 📥 platform - IMPORT
------------------------------------------------------------
**Description:** Imports platform from os.

**Code Snippet:**
```
import { platform } from 'os';
```
- **Line:** 4
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `platform` function from the `os` module. This function is used to determine the operating system the code is running on (e.g., 'win32', 'darwin', 'linux').
- **Usage Example:** 


```typescript
import { platform } from 'os';
const osType = platform();
console.log(`Operating system: ${osType}`);
```

- **Edge Cases:** The `platform` function relies on the underlying operating system's identification. It might return unexpected values in virtualized or containerized environments if the OS is not correctly identified.
- **Dependencies:** os

### 📥 dirname - IMPORT
------------------------------------------------------------
**Description:** Imports dirname from path.

**Code Snippet:**
```
import { dirname, join } from 'path';
```
- **Line:** 5
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `dirname` and `join` functions from the `path` module. These functions are used for manipulating file paths.
- **Usage Example:** 


```typescript
import { dirname, join } from 'path';

const directory = dirname('/path/to/file.txt'); // Returns '/path/to'
const fullPath = join('/path', 'to', 'file.txt'); // Returns '/path/to/file.txt'
```

- **Edge Cases:** The behavior of `dirname` and `join` can vary slightly depending on the operating system, especially regarding path separators.
- **Dependencies:** path module (Node.js built-in)

### 📥 lstatSync - IMPORT
------------------------------------------------------------
**Description:** Imports lstatSync from fs.

**Code Snippet:**
```
import { lstatSync, mkdirSync } from 'fs';
```
- **Line:** 6
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** Could Not Determine
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Imports the `lstatSync` and `mkdirSync` functions from the `fs` (file system) module. `lstatSync` is used to synchronously retrieve file or directory statistics, including whether a path refers to a socket. `mkdirSync` is used to synchronously create a directory.
- **Usage Example:** 


```typescript
import { lstatSync, mkdirSync } from 'fs';

try {
  const stats = lstatSync('/path/to/socket');
  const isSocket = stats.isSocket();
  console.log(`Is socket: ${isSocket}`);
} catch (error) {
  console.error('Error getting file stats:', error);
}

try {
  mkdirSync('/path/to/new/directory', { recursive: true });
  console.log('Directory created successfully');
} catch (error) {
  console.error('Error creating directory:', error);
}
```

- **Edge Cases:** If the file or directory does not exist, `lstatSync` will throw an error. If the directory already exists, `mkdirSync` with `recursive: true` will not throw an error. If the user does not have permissions to access the file or directory, an error will be thrown.
- **Dependencies:** fs (Node.js file system module)
## exports


### 📤 NativeSocket - EXPORT
------------------------------------------------------------
**Description:** Exports the NativeSocket class.

**Code Snippet:**
```
export class NativeSocket extends EventEmitter { ... }
```
- **Line:** Could Not Verify Line
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** true
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the `NativeSocket` class, which provides a mechanism for inter-process communication using Unix domain sockets (or named pipes on Windows). It handles connection management, message sending/receiving, reconnection attempts, payload size limits, and error handling. It extends EventEmitter to provide a publish/subscribe pattern for socket events.
- **Parameters:** config?: SocketConfig - An optional configuration object that allows customization of the socket's behavior. It can include properties like `socketPath`, `maxPayloadSize`, `reconnectDelay`, `connectTimeout`, and `maxRetries`.
- **Returns:** N/A - The constructor returns an instance of the `NativeSocket` class.
- **Usage Example:** 


```typescript
import { NativeSocket } from './src/index';

// Create a new NativeSocket instance with default configuration
const socket = new NativeSocket();

// Or with a custom configuration
const config = {
  socketPath: '/tmp/my_socket.sock',
  maxPayloadSize: 2048, // 2KB
  reconnectDelay: 5000, // 5 seconds
  connectTimeout: 10000, // 10 seconds
  maxRetries: 3
};
const customSocket = new NativeSocket(config);
```

- **Edge Cases:** The class handles cases where the socket file already exists (attempting to delete it), connection timeouts, payload size limits, invalid message formats, and connection errors. It also manages reconnection attempts with a configurable delay and maximum number of retries. Platform differences (Windows vs. other OS) are handled for socket path and permissions.
- **Dependencies:** eventemitter3, net (Socket, createServer, createConnection), fs/promises (chmod, unlink), os (platform), path (dirname, join), fs (lstatSync, mkdirSync)

### 📤 SocketConfig - EXPORT
------------------------------------------------------------
**Description:** Exports the SocketConfig interface.

**Code Snippet:**
```
export interface SocketConfig { ... }
```
- **Line:** Could Not Verify Line
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** true
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the `SocketConfig` interface, which is used to configure the `NativeSocket` class. It specifies optional parameters for customizing the socket's behavior, such as the socket path, maximum payload size, reconnection delay, connection timeout, and maximum reconnection attempts.
- **Usage Example:** 


```typescript
const config: SocketConfig = {
  socketPath: '/tmp/my_socket.sock',
  maxPayloadSize: 2048,
  reconnectDelay: 5000,
  connectTimeout: 10000,
  maxRetries: 3
};

const socket = new NativeSocket(config);
```

- **Edge Cases:** If no configuration is provided, default values are used for each property.  Invalid values (e.g., negative numbers for sizes or timeouts) are not explicitly validated by the interface itself, but the `NativeSocket` class may impose further restrictions.
- **Dependencies:** None
## interfaces


### 🌉 SocketConfig - INTERFACE
------------------------------------------------------------
**Description:** Configuration interface for the socket.

**Code Snippet:**
```
export interface SocketConfig { ... }
```
- **Line:** Could Not Verify Line
- **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
- **Exported:** true
- **Private:** Could Not Determine
###### Annotations / Comments:
- **Purpose:** Defines the configuration options for the `NativeSocket` class, allowing customization of socket behavior.
- **Returns:** void
- **Usage Example:** 


```typescript
const config: SocketConfig = {
  socketPath: '/tmp/my_socket.sock',
  maxPayloadSize: 2048,
  reconnectDelay: 5000,
  connectTimeout: 10000,
  maxRetries: 3
};

const socket = new NativeSocket(config);
```

- **Edge Cases:** If no configuration is provided, default values are used for all options. Invalid values (e.g., negative numbers for sizes or delays) are not explicitly validated by the interface itself, but the `NativeSocket` class should handle them appropriately.
- **Dependencies:** None
###### Sub Objects:

  ### 🧮 socketPath - VARIABLE
------------------------------------------------------------
**Description:** The path to the socket.

**Code Snippet:**
```
socketPath?: string;
```
  - **Line:** 8
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🧮 maxPayloadSize - VARIABLE
------------------------------------------------------------
**Description:** The maximum payload size.

**Code Snippet:**
```
maxPayloadSize?: number;
```
  - **Line:** 9
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🧮 reconnectDelay - VARIABLE
------------------------------------------------------------
**Description:** The delay between reconnection attempts.

**Code Snippet:**
```
reconnectDelay?: number;
```
  - **Line:** 10
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🧮 connectTimeout - VARIABLE
------------------------------------------------------------
**Description:** The connection timeout.

**Code Snippet:**
```
connectTimeout?: number;
```
  - **Line:** 11
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:

  ### 🧮 maxRetries - VARIABLE
------------------------------------------------------------
**Description:** The maximum number of reconnection attempts.

**Code Snippet:**
```
maxRetries?: number;
```
  - **Line:** 12
  - **Location:** /Users/fterry/code/modSocketComm/src/index.ts (/Users/fterry/code/modSocketComm/src/index.ts)
  - **Exported:** Could Not Determine
  - **Private:** Could Not Determine
  ###### Annotations / Comments:
