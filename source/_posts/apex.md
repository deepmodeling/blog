---
title: "APEX | Collaborating with the DeepModeling Community to Build an Efficient, User-Friendly, and Open-Source Workflow for Alloy Property Calculations"
date: 2023-06-08
categories:
- APEX
mathjax: true
---

The AI for Science approach, exemplified by DeePMD-kit, has demonstrated immense potential in precise molecular/atomic-scale simulations. At the same time, a robust, efficient, and automated model evaluation system plays a vital role in the ongoing development and practical applications of these methods.

For alloy systems, researchers are particularly interested in the calculation of equilibrium structures and energies, energy-volume relationships, elastic constants, vacancy formation energy, interstitial defect formation energy, and surface formation energy. Comparing these properties with Density Functional Theory (DFT) or experimental results for the same alloy system helps evaluate model accuracy. For machine learning potentials like Deep Potential (DP), such evaluations can also guide optimization of training strategies and parameter settings during preliminary training.

To address these needs, developers from the DeepModeling community, including @kevinwenminion and @ZLI-afk, leveraged the capabilities of the maturing dflow cloud-native workflow for scientific computing. They released an open-source software package called APEX (Alloy Properties EXplorer using simulations). The project repository is available at: [APEX GitHub](https://github.com/deepmodeling/APEX).

## 1 Historical Background:
The early workflow for alloy property calculations was released in 2019 as part of the DP-GEN code and functioned as a submodule, `dpgen autotest`. Despite multiple optimizations and iterations, this setup faced challenges:
- Significant redundancy in development efforts when adding new property calculation modules or simulation methods, making maintenance difficult.
- Weak error detection and exception handling capabilities.

In response, developers rebuilt the alloy property workflow using dflow's comprehensive and user-friendly workflow development tools, along with tools like the first-principles operator library `fpop`. The restructured workflow was named Alloy Properties EXplorer using simulations (APEX). APEX aims to provide the community with an efficient, user-friendly, and highly compatible workflow for alloy property testing.

---

## 2 Current Features of APEX
The current APEX alloy property testing workflow supports:
- **First-principles calculations** (VASP, ABACUS)
- **Molecular dynamics calculations** (LAMMPS)

Currently supported alloy properties include:
- **Energy-volume relationship curves (EOS)**
- **Elastic constants**
- **Surface energy**
- **Interstitial formation energy**
- **Vacancy formation energy**
- **Stacking fault energy (Gamma Line)**

New property calculation functionalities will be added in future updates.

### 2.1 Key Highlights of APEX:
1. **Efficiency in Workflow Management:** Enhanced by the integration with dflow, ensuring smooth process control.
2. **Simplicity and User-Friendliness:** Easy to install and operate, with intuitive interfaces and intelligent interactions.
3. **Parallel Task Execution:** Enables parallel submission of multiple configurations and properties, with one-click execution and result retrieval.
4. **High Extensibility:** Facilitates expansion to support additional properties and computational software.

### 2.2 APEX Workflow Overview

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/apex/f1.png# pic_center width="100%" height="100%" /></center>

APEX maintains a two-step structure for alloy property calculations:
1. **Relaxation** 
2. **Property Calculation**

These steps are encapsulated into two independent workflows, allowing users to execute either step independently. Alternatively, APEX provides a joint workflow that merges both steps for a streamlined, one-click property testing process.

---

### 2.3 Example Outputs:
#### Full Workflow for Relaxation + Testing (Joint Workflow)
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/apex/f2.png# pic_center width="100%" height="100%" /></center>

#### Elastic Constants and Modulus
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/apex/f3.png# pic_center width="100%" height="100%" /></center>

#### Equation of State (EOS)
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/apex/f4.png# pic_center width="100%" height="100%" /></center>

By combining advanced AI methods, user-friendly design, and open collaboration, APEX establishes itself as a powerful tool for alloy property exploration in scientific research and engineering applications.


The full code for APEX is available on GitHub at [https://github.com/deepmodeling/APEX](https://github.com/deepmodeling/APEX). 

Looking ahead, APEX will expand to support functionalities such as phonon spectrum calculations, dislocation structure calculations, and finite-temperature property calculations. It will also enhance post-processing capabilities to enable automatic extraction of results, plotting, and preparation of final reports, making it easier for users to intuitively analyze test results.

We welcome everyone to provide feedback by submitting issues on APEX's GitHub repository or contribute code via pull requests.