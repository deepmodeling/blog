---
title: "DeePMD-kit v3 Official Release: Multi-Backend Support, DPA-2 Large Model, and Plugin Mechanism"
date: 2024-11-23
categories:
- DeePMD-kit
mathjax: true
---

## 1. Multi-backend framework: Powered by TensorFlow, PyTorch, and JAX

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dpv3/dp1.png# pic_center width="100%" height="100%" /></center>

DeePMD-kit v3 implements a flexible and pluggable backend framework, providing a consistent training and inference experience across multiple backends. Version 3.0.0 includes the following backends:

<!-- more -->

- **TensorFlow Backend**: Static graph for efficient computation.  
- **PyTorch Backend**: Dynamic graph, simplifying model extension and development.  
- **DP Backend**: Reference backend implemented with NumPy and Array API.  
- **JAX Backend**: Static graph + JIT, based on the DP backend and Array API.  

| Function                     | TensorFlow | PyTorch | JAX  | DP   |
|------------------------------|------------|---------|------|------|
| Local frame descriptor       | ✅          | ✅       | ✅    | ✅    |
| se_e2_a descriptor           | ✅          | ✅       | ✅    | ✅    |
| se_e2_r descriptor           | ✅          | ✅       | ✅    | ✅    |
| se_e3 descriptor             | ✅          | ✅       | ✅    | ✅    |
| se_e3_tebd descriptor        | ✅          | ✅       | ✅    | ✅    |
| DPA-1 descriptor             | ✅          | ✅       | ✅    | ✅    |
| DPA-2 descriptor             | ✅          | ✅       | ✅    | ✅    |
| Hybrid descriptor            | ✅          | ✅       | ✅    | ✅    |
| Fit energy                   | ✅          | ✅       | ✅    | ✅    |
| Fit dipole                   | ✅          | ✅       | ✅    | ✅    |
| Fit polar                    | ✅          | ✅       | ✅    | ✅    |
| Fit DOS                      | ✅          | ✅       | ✅    | ✅    |
| Fit properties               | ✅          | ✅       | ✅    | ✅    |
| ZBL                          | ✅          | ✅       | ✅    | ✅    |
| DPLR                         | ✅          | ✅       | ✅    | ✅    |
| DPRc                         | ✅          | ✅       | ✅    | ✅    |
| Spin                         | ✅          | ✅       | ✅    | ✅    |
| Ladder calculation           | ✅          | ✅       | ✅    | ✅    |
| Model training               | ✅          | ✅       | ✅    | ✅    |
| Model compression            | ✅          | ✅       | ✅    | ✅    |
| Python inference             | ✅          | ✅       | ✅    | ✅    |
| C++ inference                | ✅          | ✅       | ✅    | ✅    |


The main features of the multi-backend framework include:
- Models can be trained using the same training data and input scripts across different backends, allowing users to switch backends based on efficiency or convenience requirements.
```markdown
# Training a model using the TensorFlow backend
dp --tf train input.json
dp --tf freeze
dp --tf compress

# Training a model using the PyTorch backend
dp --pt train input.json
dp --pt freeze
dp --pt compress
```

- Use `dp convert-backend` to convert models between different backends. It supports backend-specific file extensions (e.g., TensorFlow uses `.pb`, PyTorch uses `.pth`).

```markdown
# Convert a TensorFlow model to a PyTorch model
dp convert-backend frozen_model.pb frozen_model.pth

# Convert a PyTorch model to a TensorFlow model
dp convert-backend frozen_model.pth frozen_model.pb

# Convert a PyTorch model to a JAX model
dp convert-backend frozen_model.pth frozen_model.savedmodel

# Convert a PyTorch model to a backend-independent DP format
dp convert-backend frozen_model.pth frozen_model.dp
```

- Inference with different backends can be performed using the `dp test` interface, Python/C++/C interfaces, or third-party packages such as `dpdata`, ASE, LAMMPS, AMBER, Gromacs, i-PI, CP2K, OpenMM, ABACUS, and others.

```markdown
# In LAMMPS file:

# Run LAMMPS using a TensorFlow backend model
pair_style deepmd frozen_model.pb

# Run LAMMPS using a PyTorch backend model
pair_style deepmd frozen_model.pth

# Run LAMMPS using a JAX backend model
pair_style deepmd frozen_model.savedmodel

# Calculate model deviation using two or more models
pair_style deepmd frozen_model.pb frozen_model.pth frozen_model.savedmodel o
```
- Adding new backends to DeePMD-kit has become faster and more streamlined.  
DP-GEN has also released a new version, **v0.13.0**, which supports DeePMD-kit’s multi-backend functionality through the `train_backend` parameter (can be set to `tensorflow` or `pytorch`).

## 2. DPA-2 Model: A General Large-Atom Model for Molecular and Material Simulations

The DPA-2 model provides a robust architecture for large-atom models ([link](https://www.aissquare.com/openlam)), enabling highly accurate representation of various chemical systems for high-quality simulations. In version 3.0.0, DPA-2 supports single-task or multi-task training on the PyTorch backend and inference using the JAX backend.

The DPA-2 descriptor consists of two modules: **repinit** and **repformer**, as shown in the figure below.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dpv3/dp2.png# pic_center width="100%" height="100%" /></center>

The PyTorch backend supports training strategies required for large-atom models, including:

- **Parallel Training**: Train large-atom models across multiple GPUs to improve efficiency.  

```
torchrun --nproc_per_node=4 --no-python dp --pt train input.json
```

- **Multi-task Training**: Share descriptors across diverse datasets computed using different DFT methods to train large-atom models.  
- **Fine-tuning**: Train pre-trained large-atom models on smaller, task-specific datasets. The PyTorch backend supports the `--finetune` parameter in the `dp --pt train` command line.  

## 3. Plugin Mechanism: Connecting DeePMD-kit with External Models

Version 3.0.0 significantly enhances the plugin mechanism, enabling the development or integration of potential energy models using TensorFlow, PyTorch, or JAX frameworks. This allows users to leverage DeePMD-kit's training modules, loss functions, and various interfaces.  

Here is an example of a plugin package: [deepmd-gnn](https://github.com/njzjz/deepmd-gnn). The **deepmd-gnn** plugin supports training MACE and NequIP models within DeePMD-kit using familiar `dp` commands.  

```markdown
# after installing deepmd-gnn
dp --pt train mace.json
dp --pt freeze
dp --pt test -m frozen_model.pth -s ../data/
```
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dpv3/dp3.png# pic_center width="100%" height="100%" /></center>

## 4. More functions
**Descriptor se_e3_tebd**  
- A descriptor designed for fitting arbitrary properties of a system.  

**New Training Parameters**:  
- **max_ckpt_keep**: Specifies the maximum number of checkpoints to keep.  
- **change_bias_after_training**: Allows adjustment of biases after training.  
- **stat_file**: Provides a file for recording statistical information during training.  

**New Command-Line Interfaces**:  
- **`dp change-bias`**: Modify model biases post-training.  
- **`dp show`**: Display model details or parameters.  

**Enhanced JSON Input File Support in VSCode**:  
- View parameter documentation directly in JSON input files.  
- Check parameters for correctness within VSCode.  

**Support for Latest LAMMPS Version**:  
- Compatible with **stable_29Aug2024_update1**.  
The PyTorch backend for DeePMD-kit was initially developed in the **deepmd-pytorch** project and was later fully migrated to the **deepmd-kit** project.  

## 5. Contributors to the **deepmd-pytorch** Project:
Chenqqian Zhang, Chun Cai, Duo Zhang, Guolin Ke, Han Wang, Hangrui Bi, Jinzhe Zeng, Junhan Chang, Xiangyu Zhang, Shaochen Shi, Yifan Li, Yiming Du, Zhaohan Ding, Xuejian Qin, Xinzijian Liu  

Contributors to the **deepmd-kit** Project (after branching out for v3 development):
Anyang Peng, Chenqqian Zhang, Chenxing Luo, Chun Cai, Duo Zhang, Han Wang, Jia-Xin Zhu, Jinzhe Zeng, Pinghui Mo, Ruosong Shi, Sensen He, Sigbjørn Løland Bore, Xiangyu Zhang, Yan Wang, Yifan Li, Yiming Du, Yong-Bin Zhuang, Yunpei Liu, Zhangmancang Xu, Zhe Deng, Zhengtao Huang, Zhenyu Wang  

We would also like to thank everyone who participated in testing and bug reporting over the past eight months.  

Version Release Notes & Offline Package Download:  
[https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0](https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0)  

Documentation:  
[https://docs.deepmodeling.com/projects/deepmd/en/v3.0.0/](https://docs.deepmodeling.com/projects/deepmd/en/v3.0.0/)  

## 6. Join the Team of **Jinzhe Zeng**!

The author of this article and one of the main contributors to DeePMD-kit, **Jinzhe Zeng**, earned a bachelor's degree in Chemistry from East China Normal University in July 2019. He is expected to receive his Ph.D. in Chemistry from Rutgers University in January 2025. Afterward, he will join the **School of Artificial Intelligence and Data Science** at the University of Science and Technology of China (working in Suzhou) as a tenure-track associate professor and will establish his own research team.

The team will welcome outstanding undergraduate students to apply for graduate positions. One of the research directions will focus on the development of DeePMD-kit.  

**Contact**: [jinzhe.zeng@rutgers.edu](mailto:jinzhe.zeng@rutgers.edu)  
