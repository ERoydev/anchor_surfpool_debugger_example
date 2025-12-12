# Surfpool debugger enabled from the litesvm features


### 1. Setup Surfpool fork with the debugger enabled

#### Execute these commands in the provided order

```bash
git clone --branch v3.0.6_dbg_deps https://github.com/ERoydev/surfpool-debugger.git
```

```bash
cd surfpool-debugger
```

```bash
cargo surfpool-install
```

It wil install the surfpool in ~/.cargo/bin/surfpool-fork and u can use with surfpool-fork without overriding your original surfpool which should be inside /opt/homebrew/bin/surfpool.


### 2. Start Surfpool with debugging

#### 1. Inside this example repo to start the surfpool execute

```bash
VM_DEBUG_PORT=6612 VM_DEBUG_EXEC_INFO_FILE=/tmp/gimlet_vm_info.txt surfpool-fork start
```

It will start the gdbstub on `6612` Port when you run the tests


### 2. Start Debugging:

1. Disable all optimizations in Cargo.toml:

```toml
lto = "off"
opt-level = 0
debug = true
```

2. Compile your program using the platform-tools V1 dynamic stack frames:

```bash
cargo build-sbf --debug --tools-version v1.51 --arch v1
```

3. Start the tests
```bash
anchor test --skip-local-validator
```

### 3. Manual debugging

#### Start the lldb

```bash
solana-lldb solana-lldb ./target/deploy/anchore_surfpool_example.debug
```

#### Connect to the TPC port of the gdbstub 

```bash
gdb-remote 127.0.0.1:6612
```

#### Set breakpoint 

```lldb
breakpoint set --file /Users/emilemilovroydev/Rust/projects/Solana/gimlet-debugger/anchor_surfpool_example/programs/anchor_surfpool_example/src/lib.rs --line 10
```
