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

#### 1. Inside this example repo to start the surfpool execute, pass the `SBF_TRACE_DIR` ENV var to specify the output folder of the tracing

```bash
SBF_TRACE_DIR=$PWD/sbf_trace_dir surfpool-fork start
```

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

4. Generate the .lcov 
- Make sure you have installed the `solana-coverage` crate globally. Follow this guide: https://github.com/LimeChain/anchor-coverage-dwarf/tree/rework

```bash
RUST_BACKTRACE=1 SRC_PATHS=$PWD/programs/anchor_surfpool_example/src SBF_PATHS=$PWD/target/deploy SBF_TRACE_DIR=sbf_trace_dir solana-coverage
```

5. Visualize the lcov

```bash
genhtml --output-directory coverage sbf_trace_dir/*.lcov --rc branch_coverage=1 && open coverage/index.html
```


## Notes

1. In the `sbf_trace_dir` you need to have the following files before you generate the lcov's:
   - `.insns`
   - `.regs`
   - `.exec.sha256` -> which is the sha of my .so file

2. After you generate the lcovs you will have
   - `branches.lcov`
   - `<hash>.lcov`

