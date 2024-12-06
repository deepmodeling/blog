---
title: "DeepSPIN | Atomic Simulation of Magnetic Materials in the AI for Science Era"
date: 2023-06-25
categories:
- DeepSPIN
mathjax: true
---

In the field of magnetic material science, many frontier challenges require considering the coupling between lattices and spins at the atomic scale. For example, areas such as ultrafast magnetization dynamics, terahertz spintronics, and magnetocaloric materials rely on simulations of energy transfer between lattice and spin subsystems. Additionally, the interplay between magnetism and the lattice directly impacts the performance of materials critical to high-voltage power transmission, the automotive industry, and high-performance batteries.

<!-- more -->

To address these challenges, researchers have employed various multi-scale simulation methods, such as first-principles calculations, spin dynamics, and micromagnetics. However, these methods exhibit significant limitations when describing material defects, polycrystalline and disordered materials, finite-temperature-related properties, and magnetic dynamic processes.

To overcome these obstacles, the research group led by Xu Ben at the Graduate School of China Academy of Engineering Physics (GSCAEP) has developed an atomic-scale lattice-spin potential generation method called DeepSPIN. This tool supports atomic simulations of magnetic materials in the AI for Science era, enabling the exploration of uncharted territories in the world of magnetic materials.

## 1. **DeepSPIN: High-Precision Description of Complex Lattice-Magnetic Coupling**  

The research group led by  Ben Xu at the Graduate School of China Academy of Engineering Physics (GSCAEP) has developed **DeepSPIN**, a method for generating atomic-scale lattice-spin potential energy models. DeepSPIN aims to accurately predict the energy, atomic forces, and magnetic torques of systems under simultaneous lattice and spin perturbations. With DeepSPIN, researchers can simulate the equilibrium and excited-state configurations of lattices and spins and describe their evolution processes. This model, focusing on atomic-scale potential energy generation for non-collinear magnetic configurations, holds significant importance in addressing many challenges in the field of magnetic material science. DeepSPIN's functionalities were officially released in June 2023.

**Key Innovations:**
- **Pseudo-atomic Approach:** DeepSPIN employs a novel "pseudo-atomic" method to accurately describe the relative orientations between spins and lattices.
- **Integration with AI:** The method combines deep learning and active learning strategies to capture multi-degree-of-freedom landscapes at varying energy scales.
- **First-Principles Data:** Training data is generated using the DeltaSPIN magnetic constraint method, developed by the same research group.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f1.png# pic_center width="100%" height="100%" /></center>
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f2.webp# pic_center width="100%" height="100%" /></center>

**Supporting Research Papers:**
- [*Assessing Atomic Spin-Lattice Interactions: A Deep Learning Framework*](https://arxiv.org/abs/2304.09606)  
- [*First-Principles Study of Non-Collinear Spin Fluctuations Using Self-Adaptive Spin-Constrained Method*](https://arxiv.org/abs/2208.04551)  

**Development and Collaboration:**
DeepSPIN was initiated by  Ben Xu (GSCAEP),  Han Wang(Institute of Applied Physics and Computational Mathematics, Beijing), and  Linfeng Zhang (Beijing Academy of Artificial Intelligence), with  Ben Xu leading development efforts. AI modeling support was provided by  Teng Yang (Tsinghua University),  Zhengtao Huang (Wuhan University of Technology), and  Duo Zhang (DP Technology). The DeepModeling community supported code hosting and technical development.


### 1.1 **Challenges Addressed by DeepSPIN**  

The **DeepSPIN project** aims to address the following challenges:

1. **Incorporating Magnetic Ordering in Atomic-Scale Simulations**  
   How to account for the influence of magnetic ordering on phase transitions, transport processes, and other phenomena in existing atomic-scale simulation methods.

2. **Describing the Coupling Between Coordinates and Spins**  
   How to accurately represent the mutual coupling between atomic positions and spins in atomic potential energy functions.

3. **Predicting Spin Evolution**  
   How to predict the evolution of spin orientations starting from atomic structures and magnetic configurations.

4. **Modeling Non-Trivial Magnetic Configurations**  
   How to accurately describe non-trivial magnetic configurations, such as those found at defects and interfaces in complex crystal structures.

5. **Capturing Realistic Magnetic Configurations at Different Temperatures**  
   How to accurately represent magnetic configurations at various temperatures, including paramagnetic states and spin fluctuations.

6. **Simulating Lattice and Spin Dynamics in Magnetic Materials**  
   How to precisely describe the dynamic processes of lattices and spins in magnetic materials.

### 1.2 **Current Capabilities of DeepSPIN**

By integrating with the existing LAMMPS (Spin) framework, DeepSPIN can achieve the following:

1. **Prediction of Key Properties**  
   - Predict the energy, atomic forces, and magnetic torque for complex crystal structures and non-collinear magnetic configurations.

2. **Ground-State Configurations**  
   - Determine the ground-state configurations of both atomic and magnetic systems through iterative energy minimization of the lattice and spin subsystems.

3. **Thermodynamic Descriptions**  
   - Describe magnetic behavior at finite temperatures under thermodynamic ensembles.

4. **Applicable Systems**  
   - Supports simulations of ferromagnetic and antiferromagnetic materials in both metals and insulators. Current model materials include:
     - **Fe (Iron)**
     - **NiO (Nickel Oxide)**
     - **BiFeO\(_3\) (Bismuth Ferrite)**


### 1.3 **Accuracy of DeepSPIN**

- **Energy Prediction Accuracy:** Generally reaches a precision of approximately \(10^{-4}\) eV.  
- **Magnetic Torque Prediction Accuracy:** Achieves a precision of about 10 meV/\(\mu_B\).  

This level of precision makes DeepSPIN highly reliable for exploring complex magnetic material systems.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f3.webp# pic_center width="100%" height="100%" /></center>

## 2. Cases Examples
### **Potential Energy Surface of NiO**

Taking the simple antiferromagnetic material **NiO** as an example, three typical energy-scale events were selected:
1. **Atomic Displacement (D):** Movement of atoms from their equilibrium positions.
2. **Relative Spin Rotation (C):** Rotation of neighboring spins relative to each other.
3. **Collective Spin Rotation (R):** Simultaneous rotation of neighboring spins in the same direction.

The high-dimensional potential energy surface of NiO was projected into a 3D space defined by these events. This example demonstrates that **DeepSPIN** can accurately explore the potential energy surface of materials governed by complex energy-scale interactions.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f4.webp# pic_center width="100%" height="100%" /></center>

### **Magnetic Configurations at NiO Grain Boundaries**

Grain boundaries play a critical role in determining the functionality of magnetic material devices. However, the complex lattice structures at these boundaries greatly influence the magnetic properties of the device. DeepSPIN effectively predicts magnetic configurations and interactions at such complex structures (e.g., grain boundaries), providing valuable insights for optimizing magnetic devices.

For NiO, a classical antiferromagnetic material, grain boundaries are common atomic-scale defects. A specific symmetric grain boundary structure was analyzed, comprising **11,520 atoms** with mirror symmetry across the boundary. At the grain boundary, atomic displacements deviate from the equilibrium configuration of a perfect crystal. For the first time, DeepSPIN revealed the magnetic configurations at such grain boundaries, offering a novel perspective for studying their impact on material properties.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f5.png# pic_center width="100%" height="100%" /></center>


### **Magnetic Switching Barrier in BiFeO\(_3\)**

BiFeO\(_3\) (Bismuth Ferrite) is a representative multiferroic material with two order parameters:
1. **Polarization (P):** Related to structural distortions of the Fe-O octahedra.
2. **Magnetization (S):** Closely associated with the lattice distortions.

In BiFeO\(_3\), the polarization (P) can be reversed under an external field. DeepSPIN was used to simulate one such reversal pathway, showing:
- **Polarization Change:** P gradually varies in magnitude during the reversal.
- **Magnetization Stability:** S remains constant in both direction and magnitude.
- **Atomic Displacement:** Reversal involves significant atomic displacements of up to **0.5 Å**.

DeepSPIN demonstrated excellent performance in scenarios where the relative orientations of lattice and magnetic moments undergo significant changes, providing accurate predictions of energy barriers and dynamics.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/spin/f6.png# pic_center width="100%" height="100%" /></center>


## 3. **Future Development Plans for DeepSPIN**

DeepSPIN will focus on addressing the following challenges in its future development:

1. **Effects of Random Doping**  
   - Developing methods to describe how random doping impacts the magnetic configurations of materials.

2. **Transition-State Simulations in Coupled Systems**  
   - Modeling the transition states during phase transitions in systems with coupled lattice and magnetic properties.

3. **Phase Transitions Under External Fields**  
   - Accurately describing the phase transition processes (both lattice and magnetic moments) under external fields such as force fields, temperature fields, and magnetic fields.

4. **Time-Dependent Evolution of Lattice and Spin Configurations**  
   - Realizing time-dependent simulations of lattice and spin configurations, including high-performance optimization within the LAMMPS framework.


## 4. **DeepSPIN Project Repository**

The DeepSPIN project has been fully integrated into **DeePMD-kit version 2.2.2** and is available for use in version 2.2.2 or later. You can access the project at the following link:  
[DeepMD-kit GitHub Repository](https://github.com/deepmodeling/deepmd-kit)
