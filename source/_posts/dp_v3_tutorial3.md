---
title: "DeePMD-kit v3 Tutorial 3 | Model Plugin Mechanism and Training MACE Models"
date: 2024-11-26
categories:
- DeePMD-kit
mathjax: true
---

The third highlight of **DeePMD-kit v3** is its **model plugin mechanism**. This article introduces the feature from three perspectives: **background and principles**, **development tutorial**, and **usage tutorial**.

<!-- more -->

## Background and Basics
Currently, most deep learning potential model software only supports the potential models developed by their authors. In other words, when developing potential models, the authors “incidentally” develop a set of software. DeePMD-kit also evolved from the Deep Potential series of models. This brings about several issues:

1. **High learning costs**: Users need to learn a new set of software for each new model, whereas different DFT functionals can generally be used within the same software.

2. **High development costs**: Model developers not only need to write the model but also develop and maintain interfaces for training models, connecting with MD software, etc.

3. **Difficulty in fair comparisons**: It is challenging to compare different model structures fairly because the loss functions, learning rates, and data processing methods of different software may vary greatly.

Therefore, DeePMD-kit introduces a model plugin mechanism, allowing new or existing models to be integrated into DeePMD-kit as plugins. These models can then be connected to various MD software and invoked by workflow tools such as DP-GEN.

## Development Tutorial
The repository [https://github.com/njzjz/deepmd-gnn](https://github.com/njzjz/deepmd-gnn) provides an example of a model plugin. It integrates **MACE** and **NequIP** models into **DeePMD-kit**, as illustrated in the figure below.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dpv3/dp3.png# pic_center width="100%" height="100%" /></center>

The most critical model wrapper code is shown as follows:

```python
from deepmd.pt.model.model.model import (
    BaseModel,
)
from e3nn.util.jit import (
    script,
)
from mace.modules import (
    ScaleShiftMACE,
)

@BaseModel.register("mace")
class MaceModel(BaseModel):
    def __init__(
        self,
        different_arguments: ...,
        ...,
        **kwargs: Any,
    ):
    self.model = script(
        ScaleShiftMACE(
            different_arguments,
            ...,
        )
    )
    
    def forward(
        self,
        coord: torch.Tensor,
        atype: torch.Tensor,
        box: Optional[torch.Tensor] = None,
        fparam: Optional[torch.Tensor] = None,
        aparam: Optional[torch.Tensor] = None,
        do_atomic_virial: bool = False,
    ) -> dict[str, torch.Tensor]:
        ...
        self.model(...)
        ...
```

At the same time, it is necessary to register the parameters corresponding to the model:

```python
from dargs import Argument
from deepmd.utils.argcheck import model_args_plugin


@model_args_plugin.register("mace")
def mace_model_args() -> Argument:
   ...
```

In the pyproject.toml file, register the model in the entry points specified by DeePMD-kit so that it can be automatically discovered:
```
[project.entry-points."deepmd.pt"]
mace = "deepmd_gnn.mace:MaceModel"
```

## Tutorial: Training a MACE Model

This tutorial can be run directly in a Notebook on Bohrium:
https://bohrium.dp.tech/notebooks/75755718691/

### **Training, Freezing, and Testing**

#### **1. Install the DeePMD-GNN Plugin**
Follow the [documentation](https://github.com/njzjz/deepmd-gnn) to install the DeePMD-GNN plugin. Then, navigate to the example directory and modify the training steps to **2000**:

```bash
git clone https://github.com/njzjz/deepmd-gnn
cd deepmd-gnn/examples/water/mace
sed -i "s/1000000/2000/g" input.json
cat input.json
```

#### **2. Example Model Configuration**
The **model** section of the training script is defined by the plugin, while other parts (e.g., loss, learning rate, training) remain unchanged from previous tutorials. Here’s an example:

```json
"model": {
    "type": "mace",
    "type_map": [
        "O",
        "H"
    ],
    "r_max": 6.0,
    "sel": "auto",
    "hidden_irreps": "64x0e",
    "_comment2": "that's all"
},
```

#### **3. Train, Freeze, and Test**
Run the following commands to train, freeze, and test the model:

```bash
dp --pt train input.json
DP_GNN_USE_MAPPING=1 dp --pt freeze
dp test -m frozen_model.pth -s ../data
```

- `DP_GNN_USE_MAPPING` is a behavior defined by the plugin itself.

---

### **Running LAMMPS Simulations**

#### **1. Set Up the LAMMPS Environment**
Switch to DeePMD-kit's LAMMPS example directory and copy the frozen model file:

```bash
cd ../../../
git clone https://github.com/deepmodeling/deepmd-kit
cd deepmd-kit/examples/water/lmp
cp ../../../deepmd-gnn/examples/water/mace/frozen_model.pth .
```

#### **2. Create a LAMMPS Input File**
Create a file (e.g., `mace.in`) with the following content:

```text
units           metal
boundary        p p p
atom_style      atomic
atom_modify map yes

neighbor        0.0 bin
neigh_modify    every 50 delay 0 check no

read_data       water.lmp
mass            1 16
mass            2 2

replicate       4 4 4

pair_style      deepmd frozen_model.pth
pair_coeff * *

velocity        all create 330.0 23456789

timestep        0.0005
thermo_style    custom step pe ke etotal temp press vol
thermo          20
run 100
run 500
```

#### **3. Set the Plugin Path and Run LAMMPS**
Set the environment variable `DP_PLUGIN_PATH` to the custom operator library provided by the plugin, then run LAMMPS:

```bash
export DP_PLUGIN_PATH=$CONDA_PREFIX/lib/python3.12/site-packages/deepmd_gnn/lib/libdeepmd_gnn.so
lmp -in mace.in
```

---

### **Conclusion**
By integrating the model into DeePMD-kit via the plugin mechanism, its usage becomes almost identical to native models, with only minor differences. 

If you’ve developed your own model and wish to integrate it with DeePMD-kit, feel free to contact the DeePMD-kit development team on GitHub for guidance.