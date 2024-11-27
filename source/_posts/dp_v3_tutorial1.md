---
title: "DeePMD-kit v3 Tutorial 1 | Multi-Backend Framework"
date: 2024-11-24
categories:
- DeePMD-kit
mathjax: true
---

One of the highlights of DeePMD-kit v3 is its multi-backend framework. This article introduces it from three aspects: background and principles, usage tutorial, and development tutorial.

<!-- more -->

## Background and Basics

Through a pluggable mechanism, **DeePMD-kit** currently supports four major backends: **TensorFlow**, **PyTorch**, **DP**, and **JAX**, with plans to support the **Paddle** backend in the next version.

### TensorFlow Backend:
- **Implementation**: Based on the TensorFlow v1 API.
- **Usage**: 
  - A static graph is first constructed using Python APIs.
  - During training or inference, input and output nodes of the static graph must be specified. Data is provided for all input nodes, which are then used to infer results for all output nodes.
- **Freezing**:
  - The static graph is serialized into a `.pb` model file.
  - The TensorFlow C++ library reads the static graph from this file for inference.

---

### PyTorch Backend:
- **Implementation**: Designed for dynamic computation graphs.
- **Usage**:
  - During each training and inference cycle, all Python code is re-executed.
  - PyTorch separates Python execution and GPU scheduling into different threads. This allows asynchronous computation on the GPU, reducing the performance loss caused by Python execution.
- **Freezing**:
  - All code is stored in a `.pth` file using TorchScript.
  - The PyTorch C++ library (libtorch) reads this file for inference using the same method.

---

### DP Backend:
- **Implementation**: Built using **NumPy** and the **Array API** to serve as a reference backend.
- **Characteristics**:
  - The Array API standardizes array operations across different software.
  - Supported by NumPy (v2.0.0+) and JAX (v0.4.33+).
  - Does not support gradient computation or training as NumPy lacks these capabilities.
  - Cannot run directly in C++.
- **Freezing**:
  - Models are serialized and stored in HDF5 files.

---

### JAX Backend:
- **Implementation**: Based on the Array API and reuses much of the DP backend’s code, making it the most compact backend in terms of codebase.
- **Training**: The training feature will be introduced in **DeePMD-kit v3.1.0**, but models can currently be converted and frozen from other backends using the `dp convert-backend` tool.
- **Freezing**:
  - Utilizes `jax2tf` to convert parts of the model with static shapes into **StableHLO** (serialized XLA JIT format).
  - Dynamic shape components (e.g., neighbor list construction) are implemented using TensorFlow v2 API.
  - Both parts are stored in the TensorFlow **SavedModel** format.
  - TensorFlow’s C library reads this format for inference.

---

### Paddle Backend:
- Currently under active development and will be introduced in **DeePMD-kit v3.1.0**.

---

### Ensuring Compatibility Across Backends:
1. **Serialization and Deserialization**:
   - All modules include methods for serialization and deserialization.
   - The serialized output for the same module (and parameters) is consistent across backends, ensuring identical inference results.
2. **Unified Parameters**:
   - All backends share the same input parameters (though not all parameters are supported by every backend). Detailed documentation clarifies these differences.
3. **Consistent Inference Interfaces**:
   - Identical Python/C++/command-line interfaces are used for inference across backends.
   - The file extension of the model (e.g., `.pb`, `.pth`) determines which backend is used for implementation.

## Tutorial

This tutorial can be run directly in a Notebook on Bohrium:
https://bohrium.dp.tech/notebooks/38388452597/

### **Multi-Backend Training/Freezing/Compression**

This section demonstrates training, freezing, and compressing models using the `se_atten_compressible` example from **DeePMD-kit**, with the number of training steps set to **1000**. 

⚠️ **Note**: Setting the training steps to 1000 renders the model completely unsuitable for production. The results are unreliable and for demonstration purposes only.

```bash
git clone https://github.com/deepmodeling/deepmd-kit
cd deepmd-kit/examples/water/se_atten_compressible
sed -i "s/1000000/1000/g" input.json
```
---

Training/Freezing/Compression Process:
1. **Backend Specification**:
   - Use `dp --tf` or `dp --pt` to differentiate between TensorFlow and PyTorch backends.
```bash
dp --tf train input.json
dp --tf freeze
dp --tf compress
dp --pt train input.json
dp --pt freeze
dp --pt compress
```
2. **Generated Models**:
   After the training, freezing, and compression, the following files are obtained:
   - `frozen_model.pb` (TensorFlow backend)
   - `frozen_model_compressed.pb` (compressed TensorFlow model)
   - `frozen_model.pth` (PyTorch backend)
   - `frozen_model_compressed.pth` (compressed PyTorch model)

---

### Model Conversion:
Since the **JAX backend** does not currently support training, use `dp convert-backend` to convert a PyTorch model file into a JAX-compatible format.

```bash
dp convert-backend frozen_model.pth frozen_model.savedmodel
```
---

### Model Testing:
- The command `dp test` automatically determines the backend based on the model file extension, removing the need for flags like `--tf` or `--pt`.

```bash
dp test -m frozen_model_compressed.pb -s ../data
dp test -m frozen_model.pth -s ../data
dp test -m frozen_model.savedmodel -s ../data
```
---

### LAMMPS Dynamics Simulation Performance Testing:
- **Objective**: Although the quickly trained models are unsuitable for production, performance testing is conducted across backends to compare speeds.
- **Test System**: A water system with **12,000 atoms**.
- **Notes**:
  - No path integral simulations like NVE or NVT were conducted; thus, the coordinates at each step remain identical.
  - Each model is run for:
    - **100 steps** (cold start)
    - **500 steps** (actual speed testing)
```
cat<<EOF > water.in
units           metal
boundary        p p p
atom_style      atomic

neighbor        0.0 bin
neigh_modify    every 50 delay 0 check no

read_data       water.lmp
mass            1 16
mass            2 2

replicate       4 4 4

pair_style      deepmd ../se_atten_compressible/frozen_model.pb
pair_coeff * *

velocity        all create 330.0 23456789

timestep        0.0005
thermo_style    custom step pe ke etotal temp press vol
thermo          20
run 100
run 500
EOF

lmp -in water.in
```
  - Replace the model name `frozen_model.pb` with other models (`frozen_model_compressed.pb`, `frozen_model.pth`, `frozen_model_compressed.pth`, `frozen_model.savedmodel`) to test different files.

---

### Results on V100 and H100 GPUs:
- The performance of compressed and uncompressed models across different backends is nearly identical.

| Model Name                  | V100 Time/s | H100 Time/s |
|-----------------------------|-------------|-------------|
| `frozen_model.pb`           | 72.6601     | 16.3344     |
| `frozen_model_compressed.pb`| 19.6433     | 6.5113      |
| `frozen_model.pth`          | 70.5811     | 19.7320     |
| `frozen_model_compressed.pth`| 23.7640     | 10.1136     |
| `frozen_model.savedmodel`   | 69.3794     | 28.4590     |

- **Important Notes**:
  - Results vary significantly across models, systems, and hardware.
  - The observations here may not apply universally.

Key Observations:
- The compression process has little to no impact on performance for the tested backends and systems.
- Speed results illustrate that the multi-backend functionality in **DeePMD-kit** ensures consistent performance across different frameworks.


## Development Tutorial: Integrating a New Backend

When developing a new backend for **DeePMD-kit**, the process involves steps on both the **Python side** and the **C++ side**. Below is an overview of the key tasks and requirements:

### **Python-Side Development**
1. **Create and Register the Backend**:
   - Inherit from the abstract class `deepmd.backend.backend.Backend`.
   - Create a subclass that implements the required hooks.
   - Add the new backend implementation to the `deepmd/backend` directory.

2. **Implement Required Hooks**:
   The `Backend` class defines several hooks that need to be implemented:
   - **`entry_point_hook`**:
     - Handles user commands provided via the command line interface.
   - **`deep_eval`**:
     - Implements inference functionality in Python.
     - Should inherit from `deepmd.infer.deep_eval.DeepEvalBackend`.
   - **`neighbor_stat`**:
     - Handles neighbor atom statistical analysis.
   - **`serialize_hook`** and **`deserialize_hook`**:
     - Implement serialization and deserialization of modules for saving to or reading from model files.

3. **Consistency Testing**:
   - Add tests to ensure consistency for the new backend in `source/tests/consistent`.
   - These tests should validate both:
     - The internal consistency of the new backend.
     - Consistency with the reference backend.

### **C++-Side Development**
1. **Implement Abstract Classes**:
   - Add a specific implementation of the `deepmd::DeepPotBackend` and other relevant abstract classes in the `source/api_cc` directory.

2. **Register the Backend**:
   - Integrate the new backend into the backend-selection codebase.

---

### **Examples and References**
- Example Pull Requests:
  - [#4302](https://github.com/deepmodeling/deepmd-kit/pull/4302)
  - [#4307](https://github.com/deepmodeling/deepmd-kit/pull/4307)

These PRs provide practical examples of adding new backends and implementing required features in both Python and C++.

---

### **Additional Notes**
- When implementing a new backend, ensure comprehensive testing and alignment with the existing backend framework to maintain the consistency and reliability of DeePMD-kit across different backends.