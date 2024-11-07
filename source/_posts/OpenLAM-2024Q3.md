---
title: "2024 Q3 OpenLAM Report | Release of More Accurate and Faster Pre-trained Model, Crystalline Structure Competition in Full Swing"
date: 2024-11-07
categories:
- OpenLAM
---

On the journey toward developing a Large Atomic Model (LAM), the core Deep Potential development team has launched the OpenLAM initiative for the community. OpenLAM’s slogan is "Conquer the Periodic Table!" The project aims to create an open-source ecosystem centered on microscale large models, providing new infrastructure for microscopic scientific research and driving transformative advancements in microscale industrial design across fields such as materials, energy, and biopharmaceuticals.

<!-- more -->

## Codes

**DeePMD-kit V3.0.0 beta4 Release: New Features and Optimizations**

1. **Comprehensive Optimization of DPA-2:**

   - **Model Structure Enhancements:** 
     - Introduced three-body encoding information and optimized the message-passing update process, significantly improving model training accuracy.
     - Added three model configurations: small, medium, and large, allowing users to choose the appropriate model based on different application scenarios. For details, visit: [DPA-2 example](https://github.com/deepmodeling/deepmd-kit/tree/v3.0.0b4/examples/water/dpa2).
   
   - **Accuracy and Performance Improvements:** 
     - Compared to the DPA-2 model in beta3, the beta4 DPA-2-medium model shows approximately a 30% improvement in energy accuracy and about a 14% improvement in force accuracy when trained from scratch. Training and inference efficiency have nearly doubled.
     - **Accuracy Benchmark (DPA-2-b4-medium vs. DPA-2-b3):** Average test error after training on 27 datasets for 1 million steps, batch size set to "auto:256." (Table 1)
     - **Training Speed:** (Example: 192-atom water system, single 40G A800 card) (Table 2)

Table 1.
|                        | Energy Weighted RMSE (meV/atom) | Force Weighted RMSE (meV/Å) |
|------------------------|---------------------------------|-----------------------------|
| **DPA-2-b4-medium**    | **13.1**                        | **113.1**                   |
| **DPA-2-b3**           | 18.5                            | 130.8                       |

Table 2. 
| Model                | DPA-2-b4-medium | DPA-2-b3 |
|----------------------|-----------------|----------|
| Training speed (s/100 steps) | **8.4**          | 15.9     |


2. **New Property Prediction Feature:** 
   - Supports direct training and prediction on data containing various properties, expanding the model’s application range. Detailed examples can be found at: [Property example](https://github.com/deepmodeling/deepmd-kit/tree/v3.0.0b4/examples/property).

3. **New Descriptor:** 
   - Introduced "three-body type embedding" (se_t_tebd). Usage examples available at: [three-body embedding example](https://github.com/deepmodeling/deepmd-kit/tree/v3.0.0b4/examples/water/se_e3_tebd).

4. **Code Structure Optimization and Stability Improvements:** 
   - Fixed known issues encountered in daily use, enhancing the stability and maintainability of the code.

For detailed release notes, visit: [DeePMD-kit v3.0.0 beta4 release notes](https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0b4).

## Data

**New Materials Project Trajectory Dataset (MPtraj) in DeepMD Mixed Type Format:**
- **Dataset Link:** [MPtraj Dataset](https://www.aissquare.com/datasets/detail?pageType=datasets&name=MPtraj&id=2781)

## Models
**1. Pre-trained Model:**
   - **a. New Version:** The DPA-2 medium multi-task pre-trained model (2.3.0-b4-medium) adapted for V3.0.0 beta4 code. [Model Link](https://www.aissquare.com/models/detail?pageType=models&name=DPA-2.3.0-v3.0.0b4&id=279).
   - **b. Performance Improvement:** Compared to the Q2-released pre-trained model (2.2.0-b3), this new model, which incorporates the MPtraj dataset, achieves double the inference speed while maintaining model accuracy.

     - **Inference Speed Comparison** (192-atom water system, single 40G A800 GPU): (Table 3)

   - **c. Upcoming Releases:** Pre-trained DPA-2 small and large models adapted for V3.0.0 beta4 will be released soon. More information is available on the [AIS Square homepage](https://www.aissquare.com/openlam).

Table 3.
| Pretrained Model      | 2.3.0-b4-medium | 2.2.0-b3 |
|-----------------------|-----------------|----------|
| Python inference speed (s/100 times) | **3.7**          | 6.3      |

**2. Alloy Domain Model:** 
   - A property-driven fine-tuning workflow has been developed for large models, supporting fine-tuning across multiple properties to create customized potential models for specific applications. The corresponding Bohrium Notebook, *Finetune Alloy Property using APEX + DPGen2*, is available. See DPA-1&2 alloy large model details at: [Alloy Multi-task Model](https://www.aissquare.com/models/detail?pageType=models&name=DPA-1%262-53-alloy-multitask-400w&id=280).

## Community
**OpenLAM Crystal Structure Competition:**
   - The competition has hosted over 20 sessions, yielding numerous outstanding structure generation algorithms, including the Con-CDVAE algorithm, which has led the rankings across several sessions ([Con-CDVAE competition page](https://bohrium.dp.tech/competitions/8821838186?tab=discuss&postId=8415617783)). To encourage algorithm diversity, we adjusted evaluation standards based on submitted data analysis ([Evaluation Standards Update](https://bohrium.dp.tech/competitions/8821838186?tab=discuss&postId=4170270451)).
   - The competition database now contains over 13 million crystal structures, with more than 5 million contributions from participants. All structure information in the database is open-source, with two access methods available:
     - **Python API:** Full access to structures and predicted energy data ([GitHub - OpenLAM API](https://github.com/deepmodeling/openlam)).
     - **App:** Supports multiple search functions and structure analysis ([CrystalCraft App](https://bohrium.dp.tech/apps/crystalcraft)).

We invite community members to help refine this database as a shared resource. We welcome feedback, feature requests, and data contributions from the community.