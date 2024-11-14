---
title: DeepFlame 1.4 Released, Introducing Full-Speed Range Multiphase Reactive Flow Solver"
date: 2024-08-23
categories:
- DeepFlame
---

DeepFlame is an open-source combustion fluid dynamics platform developed for the AI for Science era [1-3], aimed at overcoming the longstanding challenges of applying traditional Computational Fluid Dynamics (CFD) in the field of combustion. Since its release, DeepFlame has garnered significant interest and attention from both academia and industry, attracting a group of outstanding developers and users. This ongoing support has provided continuous momentum for DeepFlame's development and has been a crucial driving force in its application to real-world scenarios.

In recent years, research on aerosol or spray detonation propulsion using liquid fuels has been experiencing a resurgence, and supersonic combustion, such as detonation combustion in gas-liquid two-phase systems, has been gaining increasing attention. The DeepFlame team has captured these trending topics and, based on the OpenFOAM open-source library, coupled the Euler-Lagrange model into the high-speed flow solver dfHighSpeedFoam and the low-speed flow solver dfLowMachFoam. This enables the solvers to simulate two-phase reactive flows, thereby expanding the application scenarios of DeepFlame.

<!-- more -->

## Version Update Overview
- In the new version, the Lagrangian source term has been coupled into the high-speed reactive flow solver dfHighSpeedFoam, enabling it to calculate two-phase reactive flows. Similarly, the Lagrangian source term has also been coupled into the low-speed reactive flow solver dfLowMachFoam, replacing dfSprayFoam for low-speed two-phase reactive flow calculations.
- The Lagrangian model has been fine-tuned by adjusting the order of particle temperature and velocity updates, and the liquidEvaporationSpalding evaporation model has been added.
- For the high-speed reactive flow solver dfHighSpeedFoam, a new convection scheme library has been added.
- Additionally, tools for converting Lagrangian particle position coordinates have been added to the submodels.

## New Feature: High-Speed Reactive Flow Solver Coupled with Two-Phase Calculation Module
The new version, based on the OpenFOAM open-source library, couples the Euler-Lagrange model into the high-speed flow solver dfHighSpeedFoam to simulate gas-liquid two-phase reactive flows. Building on this, the new version fine-tunes the Lagrangian model and two-phase submodels, enabling the dfHighSpeedFoam solver to more accurately capture key parameters and characteristics of gas-liquid interactions, such as changes in droplet diameter and velocity. Additionally, the new version introduces examples of shock wave propagation through water mist and two-phase detonation, thereby validating the high-speed flow solver's ability to accurately capture flow instabilities and the coupling of shock waves with chemical reactions.

Figure 1 shows a schematic of the ethylene/air + water mist two-dimensional two-phase detonation computational domain. The initial gas phase temperature and pressure are 300 K and 101,325 Pa, respectively, with an equivalence ratio of 1. In the two-phase region, the water droplet diameter is 11 μm, and the initial temperature is 300 K, with specific settings referenced from [4]. The computation begins with ignition at three high-temperature, high-pressure points.


<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-1.png# pic_center width="100%" height="100%" /></center>




As the detonation wave progresses, relatively regular and distinct cellular structures can be observed, and the different physical fields effectively demonstrate the influence of water droplets on the cell size and the formation of the detonation wave. The evolution of peak pressure shown in Figure 2 indicates a slight increase in cell size within the two-phase region. From the temperature field depicted in Figure 4, it can be observed that the temperature behind the wave front is lower due to the evaporation of the droplets.


<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-2.png# pic_center width="100%" height="100%" /></center>




## New Feature: Low-Speed Reactive Flow Solver Coupled with Two-Phase Calculation Module
Similar to dfHighSpeedFoam, the new version also integrates the Euler-Lagrange model into the low-speed flow solver dfLowMachFoam to simulate gas-liquid two-phase reactive flows, functionally replacing the previous spray solver dfSprayFoam. Figure 6 presents a simulation study of kerosene combustion around two blunt bodies using the new version of dfLowMachFoam. The computational domain for this case is a rectangular combustion chamber measuring 0.8m × 0.2m × 0.04m. Two blunt bodies, each with a length of L = 0.04m and a height of H = 0.032m, are fixed at both ends on the chamber walls, symmetric about the central plane, with a distance of 0.08m between the central planes of the two blunt bodies. In this case, the airflow rate is 0.6kg/s, and the fuel-air ratio is 0.055. It can be observed that dfLowMachFoam accurately captures the high-frequency oscillation phenomena within the combustion field, with the oscillation modes closely matching experimental observations.


<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-3.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-4.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-5.gif# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1d4-6.gif# pic_center width="100%" height="100%" /></center>


## Additional Features and Optimizations
### New Convection Schemes Added to dfHighSpeedFoam

In version 1.4, a new convection scheme library has been added to the high-speed reactive flow solver dfHighSpeedFoam, referencing detonationFoam [5]. This library includes KT, KNP, HLLC, and HLLCP schemes, with the addition of AUSMDV [6]. The HLLC scheme, applied in this updated version to the ethylene/water droplet suspension in air two-phase detonation, has shown promising performance.

### Neural Network Training and Inference Compatibility with Baidu PaddlePaddle Framework

In version 1.4, the neural network inference and training module, which replaces the chemical source term ODE solver in DeepFlame, has been successfully made compatible with the Baidu PaddlePaddle framework. This allows users to more conveniently perform deep learning tasks within the PaddlePaddle environment. The code repository now includes example cases and documentation using the PaddlePaddle framework to help users quickly get started and fully leverage PaddlePaddle's strengths.

## DeepFlame Quick Access Link
The GitHub repository for DeepFlame within the DeepModeling community can be accessed at: 

https://github.com/deepmodeling/deepflame-dev

Release tag for DeepFlame version 1.4: 

https://github.com/deepmodeling/deepflame-dev/releases/tag/v1.4

Documentation (including installation instructions, input/output parameter descriptions, feature overview, case study introductions, developer notes, etc.): 

https://deepflame.deepmodeling.com/en/latest/


## Feature Updates and Bug Fixes List
### v1.4.0

- Fine-tuned the Lagrangian model by adjusting the update order of particle temperature and velocity, and added the liquidEvaporationSpalding evaporation model. by @pkuLmq in #504

- Integrated Lagrangian source terms into the low-speed reactive flow solver dfLowMachFoam. by @pkuLmq in #506

- Coupled Lagrangian source terms into the high-speed reactive flow solver dfHighSpeedFoam, enabling it to simulate high-speed two-phase reactive flows. by @pkuLmq in #510

- Added a new convection scheme library to the high-speed reactive flow solver dfHighSpeedFoam (adopted from detonationFoam) with minor adjustments. by @pkuLmq in #510

- Added tools for converting Lagrangian particle position coordinates in submodels via lagrangianExtraFunctionObjects (adopted from lagrangianExtraFunctionObjects). by @pkuLmq in #511

- Added the AUSMDV scheme to the convection scheme library. by @risinyoung in #512

- Made the chemical source term neural network inference compatible with Baidu PaddlePaddle framework. by @BiteBytePKU in #500

### v1.4.0

- Added new example cases using dfHighSpeedFoam, including a 1D single droplet motion case, a 1D heptane two-phase detonation, a 1D hydrogen/air + water mist two-phase detonation, and a 2D ethylene/air + water mist two-phase detonation. by @pkuLmq in #510

- Added a 2D aachenBomb case to the test examples. by @pkuLmq in #509

- Modified example cases to incorporate the addition of Lagrangian source terms in the two solvers. by @pkuLmq in #510 and #506

- Added a new example case demonstrating the use of Baidu PaddlePaddle framework for neural network inference of chemical source terms. by @BiteBytePKU in #500



Reference:

[1] Mao R, Lin M, Zhang Y, et al. DeepFlame: A deep learning empowered open-source platform for reacting flow simulations. Computer Physics Communications, 291: 108842. (2023)

[2] Mao R, Zhang M, Wang Y, Li H, et al. An integrated framework for accelerating reactive flow simulation using GPU and machine learning models. Proceedings of the Combustion Institute, 40(1-4), 105512. (2024)

[3] Zhang M, Mao R, Li H, An Z, Chen ZX. Graphics processing unit/artificial neural network-accelerated large-eddy simulation of swirling premixed flames. Physics of Fluids, 36(5). (2024)

[4] Huang Z, Zhao M, Xu Y, Li G, Zhang H. Eulerian-Lagrangian modelling of detonative combustion in two-phase gas-droplet mixtures with OpenFOAM: Validations and verifications. Fuel, 286, 119402. (2021)

[5] Sun J, Wang Y, Tian B, Chen Z. detonationFoam: An open-source solver for simulation of gaseous detonation based on OpenFOAM. Computer Physics Communications, 292: 108859. (2023).

[6] Wada Y, Liou M-S. A flux splitting scheme with high-resolution and robustness for discontinuities. 32nd Aerospace Sciences Meeting and Exhibit. (1994).







