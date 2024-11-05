---
title: "OpenLAM | 2024 Q1 Report Infrastructure Upgrade and Release of Pre-trained Models Compatible with DeePMD-kit v3"
date: 2024-11-02
categories:
- OpenLAM
---

On the journey toward developing a Large Atomic Model (LAM), the core Deep Potential development team has launched the OpenLAM initiative for the community. OpenLAM’s slogan is "Conquer the Periodic Table!" The project aims to create an open-source ecosystem centered on microscale large models, providing new infrastructure for microscopic scientific research and driving transformative advancements in microscale industrial design across fields such as materials, energy, and biopharmaceuticals.

## Codes
The code underwent a large-scale restructuring, and the DeePMD-kit v3 alpha version was successfully released in early March. Compared to v2, DeePMD-kit v3 allows users to train and run deep potential models on either the TensorFlow or PyTorch framework, facilitating broader compatibility across downstream applications. DeePMD-kit v3 also adds support for the DPA-2 model, marking a new chapter for Large Atomic Models (LAM). For a more detailed report, see: https://github.com/deepmodeling/deepmd-kit/discussions/3401.

The latest 2024 Q1 branch version of DeePMD-kit v3 (available at https://github.com/deepmodeling/deepmd-kit/tree/2024Q1) includes the following new features:

DeepSpin Upgrade: The PyTorch version now supports all descriptors, including DPA-2, and allows integration with model structures like type embedding, enabling the development of higher-precision magnetic models. This is particularly advantageous for studies involving magnetic systems. Example input: https://github.com/deepmodeling/deepmd-kit/blob/2024Q1/examples/spin/se_e2_a/input_torch.json.
Multitask Feature Upgrade: The PyTorch version now supports multitask fine-tuning, allowing users to fine-tune a pre-trained model on multiple downstream systems simultaneously. Documentation is available at: https://github.com/deepmodeling/deepmd-kit/blob/devel/doc/train/finetuning.md#multi-task-fine-tuning.

## Date
- A data-cleaning workflow was initially established (https://github.com/zjgemi/lam-data-cleaning), and 74 datasets selected from the ColabFit collection (https://materials.colabfit.org/) were incorporated into training. Tests indicate that the model achieved the expected accuracy in multitask training at a scale of 100 tasks.

- A new chalcogenide solid electrolyte dataset was added, covering 26 types of sulfides. Compared to other general-purpose force fields, the DPA-SSE model more accurately predicts dynamic properties such as the diffusion coefficient of Li ions and ionic conductivity.

- The MPtraj dataset was cleaned and categorized, and training and testing were conducted on the updated DPA-2 model structure. Initial results indicate an improvement in model performance.

## Models
The pre-trained model OpenLAM_2.1.0_27heads_20224Q1.pt, compatible with the latest 2024 Q1 branch of DeePMD-kit v3, was updated and uploaded to the AIS-Square website: https://aissquare.com/models/detail?pageType=models&name=DPA-2.1.0-2024Q1&id=244. Tests confirmed that migrating the code to DeePMD-kit v3 did not affect model accuracy. Additionally, tasks like ANI-1x and Transition-1x, previously used as downstream test sets, were included in the pre-trained model, and more extensive training improved model accuracy.

The system was updated with usage guides for zero-shot, single-task fine-tuning, and multi-task fine-tuning with pre-trained models. For any questions on model usage, community members can connect with developers in the GitHub discussion forum: https://github.com/deepmodeling/deepmd-kit/discussions/3772.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/20241104-135649.jpg# pic_center width="100%" height="100%" /></center>


## Infrastructure
- The cloud-native AI4Science workflow framework, Dflow, has been openly and expansively driving the development of a range of community software ecosystems.
    - Preprint of the paper: https://arxiv.org/abs/2404.18392

- dpgen2 now supports DeePMD-kit v3 and introduces new features, including DP-Gen for fine-tuning DPA-2 pre-trained models, large model distillation workflows, and multi-task DP-GEN.
    - Project repository: https://github.com/deepmodeling/dpgen2

- By combining the crystal structure prediction algorithm CALYPSO with DP-GEN, a model construction scheme suited for high-throughput structure prediction has been designed. Additionally, dpgen2 is integrated into the structure search software Calypso as an optional configuration space exploration engine.
    - Article link: https://journals.aps.org/prb/abstract/10.1103/PhysRevB.109.094117

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/20241104-135645.jpg# pic_center width="100%" height="100%" /></center>

- The open-source cloud-native alloy property calculation workflow APEX V1.2.0 has been released, effectively supporting the evaluation of the OpenLAM Large Atomic Model.
    - Project repository: https://github.com/deepmodeling/apex
    - Preprint of the paper: https://arxiv.org/abs/2404.17330

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/20241104-135638.jpg# pic_center width="100%" height="100%" /></center>



