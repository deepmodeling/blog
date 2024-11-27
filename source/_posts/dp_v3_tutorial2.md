---
title: "DeePMD-kit v3 Tutorial 2 | DPA-2 Model, Multi-Task Training, and Fine-Tuning"
date: 2024-11-25
categories:
- DeePMD-kit
mathjax: true
---

The second highlight of **DeePMD-kit v3** is the **DPA model** and training strategies such as **multi-task training** and **fine-tuning**. This article introduces these features from two aspects: **background and principles** and **usage tutorials**.

<!-- more -->

## Background and Basics

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dpv3/dp2.png# pic_center width="100%" height="100%" /></center>

The **DPA-2 model** consists of two main modules: **repinit** and **repformer**.

- **Repinit**: Initializes the descriptors.
- **Repformer**: Iteratively refines the descriptors through multiple iterations (denoted as `x12` in the diagram).

In the input file, these two components are also separated into two distinct sections for configuration.

```
"descriptor": {
  "type": "dpa2",
  "repinit": {
    "tebd_dim": 8,
    "rcut": 6.0,
    "rcut_smth": 0.5,
    "nsel": 120,
    "neuron": [
      25,
      50,
      100
    ],
    "axis_neuron": 12,
    "activation_function": "tanh",
    "three_body_sel": 48,
    "three_body_rcut": 4.0,
    "three_body_rcut_smth": 3.5,
    "use_three_body": true
  },
  "repformer": {
    "rcut": 4.0,
    "rcut_smth": 3.5,
    "nsel": 48,
    "nlayers": 6,
    "g1_dim": 128,
    "g2_dim": 32,
    "attn2_hidden": 32,
    "attn2_nhead": 4,
    "attn1_hidden": 128,
    "attn1_nhead": 4,
    "axis_neuron": 4,
    "update_h2": false,
    "update_g1_has_conv": true,
    "update_g1_has_grrg": true,
    "update_g1_has_drrd": true,
    "update_g1_has_attn": false,
    "update_g2_has_g1g1": false,
    "update_g2_has_attn": true,
    "update_style": "res_residual",
    "update_residual": 0.01,
    "update_residual_init": "norm",
    "attn2_has_gate": true,
    "use_sqrt_nnei": true,
    "g1_out_conv": true,
    "g1_out_mlp": true
  },
  "precision": "float64",
  "add_tebd_to_repinit_out": false
}
```

Under normal circumstances, **repinit** initializes the descriptors using the two-body **DeepPot-SE**. When `use_three_body` is set to `true`, three-body descriptors are also included.

For **repformer**, the parameters `g1` and `g2` represent:
- **g1**: Single-body descriptors
- **g2**: Two-body descriptors

The **DPA-2 model** includes three places where `rcut` (cutoff radius) and `nsel` (neighbor selection) need to be configured. It is crucial to ensure these values are set correctly to avoid inconsistencies or errors during training and inference.

## Tutorial
This tutorial can be run directly in a Notebook on Bohrium:
https://bohrium.dp.tech/notebooks/51511526135/

### **Single-Task Training from Scratch**

1. Clone the DeePMD-kit repository and navigate to the **DPA-2 example** directory:
   ```bash
   git clone https://github.com/deepmodeling/deepmd-kit
   cd deepmd-kit/examples/water/dpa2
   ```

2. The `dpa2` folder contains three JSON files for training configuration: `input_torch_small.json`, `input_torch_medium.json`, and `input_torch_large.json`. These differ in model size and training speed:
   - **Small**: `update_g2_has_attn` is set to `false`.
   - **Medium**: `update_g2_has_attn` is set to `true` with 6 layers (`nlayers`).
   - **Large**: `update_g2_has_attn` is set to `true` with 12 layers (`nlayers`).

3. Use the **medium configuration** as an example:
   - Set the training steps to 10,000:
     ```bash
     sed -i "s/1000000/10000/g" input_torch_medium.json
     ```
   - Train the model:
     ```bash
     dp --pt train input_torch_medium.json
     ```
   - Freeze the trained model:
     ```bash
     dp --pt freeze
     ```

4. This generates a PyTorch model (`frozen_model.pth`). Convert it to a JAX-compatible format (`frozen_model.savedmodel`):
   ```bash
   dp convert-backend frozen_model.pb frozen_model.pth
   ```

5. **Performance Test**:
   On an H100 GPU, the dynamics simulation speed for 500 steps (12,000 atoms) is:
   ```
   PyTorch: 321.824 steps/s
   JAX:     324.792 steps/s
   ```

---

### **Multi-Task Training from Scratch**

1. Switch to the multi-task example directory:
   ```bash
   mkdir -p ../multi_task
   cd ../multi_task
   ```
2. Download the multi-task training configuration:

```bash
wget https://github.com/deepmodeling/deepmd-kit/raw/f1ecf95475a9aeef1abcb480f5d3bd0765d3b403/examples/water_multi_task/pytorch_example/input_torch.json
```

3. Set the training steps to 1,000:
   ```bash
   sed -i "s/100000/1000/g" input_torch.json
   ```
4. Train the multi-task model:
   ```bash
   dp --pt train input_torch.json
   ```

**Key Notes on Multi-Task Configuration**:
- The `input_torch.json` defines two tasks: `water_1` and `water_2`.
- The configuration uses:
  - `shared_dict` (e.g., `type_map` and `descriptor`) for shared parameters across tasks.
  - `model_dict`, `data_dict`, and `loss_dict` for task-specific configurations.

5. Freeze the model for individual tasks:
   - For `water_1`:
     ```bash
     dp --pt freeze --head water_1 -o water_1.pth
     ```
   - For `water_2`:
     ```bash
     dp --pt freeze --head water_2 -o water_2.pth
     ```

---

### **Single-Task Training with a Pretrained Model**

1. Create a new directory for fine-tuning:
   ```bash
   mkdir -p ../../water/finetune
   cd ../../water/finetune
   ```

2. Download the pretrained model and configuration file:
   ```bash
   wget https://store.aissquare.com/models/41d1cfb7-1a98-42a2-90a8-e6257db431ea/DPA2_medium_28_10M_rc0.pt -O finetune.pt
   wget https://store.aissquare.com/models/41d1cfb7-1a98-42a2-90a8-e6257db431ea/input_torch_medium.json -O input_torch_medium.json
   ```

3. Set the training steps to 1,000:
   ```bash
   sed -i "s/10000/1000/g" input_torch_medium.json
   ```

4. Train using the pretrained model:
   ```bash
   dp --pt train input_torch_medium.json --finetune finetune.pt --model-branch H2O_H2O-PD
   ```

5. Freeze the fine-tuned model:
   ```bash
   dp --pt freeze
   ```

6. **Testing Models**:
   Compare the models trained from scratch and fine-tuned models:
   - From scratch:
     ```bash
     dp --pt test -m frozen_model.pth -s ../data
     ```
   - Pretrained:
     ```bash
     dp --pt test -m ../dpa2/frozen_model.pth -s ../data
     ```

**Results**:
| Model   | E RMSE          | F RMSE          |
|---------|------------------|-----------------|
| Scratch | 5.290549e-01    | 6.017190e-02    |
| Pretrained | 5.755728e-02 | 2.978876e-02    |

The fine-tuned model achieves significantly higher accuracy despite the demonstration's limited training steps.

---

### **Multi-Task Training with a Pretrained Model**

For instructions on multi-task fine-tuning with pretrained models, refer to the [official documentation](https://docs.deepmodeling.com/projects/deepmd/en/v3.0.0/train/finetuning.html#multi-task-fine-tuning).