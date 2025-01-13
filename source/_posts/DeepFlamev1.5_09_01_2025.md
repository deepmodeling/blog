---
title: "DeepFlame 1.5 Released, Fully Compatible with ARM Architecture, New Buoyancy-Driven Solver Added"
date: 2025-01-09
categories:
- DeepFlame
---

DeepFlame is an open-source platform for combustion fluid calculations developed for the AI for Science era [1 - 3]. It aims to break through the long-standing application implementation challenges of traditional Computational Fluid Dynamics (CFD) in the field of combustion fluids. Since its release, DeepFlame has attracted the interest and attention of both academia and industry, and has drawn a group of outstanding developers and users, providing continuous impetus for the sustainable development of DeepFlame.

In recent years, flow and combustion problems driven by buoyancy, such as fire research in fields like batteries, have garnered increasingly extensive attention from academia and industry. The DeepFlame team has seized on this hot topic. Referring to the fireFoam solver in OpenFOAM, they constructed the dfBuoyancyFoam solver based on the PIMPLE algorithm. This solver is suitable for solving turbulent flow and diffusion flame problems driven by buoyancy, expanding the application scenarios of DeepFlame. Moreover, in the development trend of new-generation CPU supercomputers based on the ARM architecture, the newly released version has been comprehensively adapted and optimized for DeepFlame on Kunpeng and Fujitsu hardware, significantly enhancing computational efficiency and parallel scalability.

<!-- more -->

## Version Update Overview
- Launched the dfBuoyancyFoam solver, which is a transient compressible reactive flow solver considering buoyancy effects.
- Added the totalFlowRateAdvectiveDiffusion boundary condition, which takes into account the influence of component diffusion at the boundary.
- Coupled the radiation model, enabling DeepFlame to analyze radiation problems.
- Added new combustion models, including the infinitelyFastChemistry model and the eddyDissipationModel.
- Achieved the transplantation of DeepFlame onto new-generation CPU platforms based on the Arm architecture, such as Kunpeng and Fujitsu.

## New Feature: dfBuoyancyFoam Reactive Flow Solver Considering Buoyancy Effects
This version refers to the fireFoam solver in OpenFOAM to construct the dfBuoyancyFoam solver suitable for solving flow and combustion problems driven by buoyancy. Multiple radiation models are integrated into this solver, which can be used to analyze the influence of radiation effects on flames. After the construction of the solver, we calculated an example of a pool fire flame plume, thereby verifying the simulation ability of the dfBuoyancyFoam solver for turbulent flow and diffusion flame problems driven by buoyancy.

The computational domain of the pool fire flame plume example is a 3×3×3 m cube. The area with a length and width of 0.3 m at the center of the bottom of the computational domain is the methane inlet, and the top is the outlet. The automatic mesh generation tool SnappyHexMesh provided by OpenFOAM is used to generate meshes of different sizes in different regions. The initial field in the computational domain is air at 298.15 K and 101325 Pa. The inlet boundary condition is totalFlowRateAdvectiveDiffusion, which considers both the mass and energy fluxes of convection and diffusion. The fvDOM radiation model is adopted in this calculation, with the absorption and emission model being greyMean. For other calculation settings, please refer to [4].

The animation in Figure 1 shows the morphological changes of the flame, from which the typical structural characteristics of a diffusion flame under the action of buoyancy can be seen.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic1.jpeg pic_center width="50%" height="50%" /></center>
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic2.gif pic_center width="50%" height="50%" /></center>

*Figure 1 Animated Image of Flame Oscillation*

## Demonstration of Real-Scale Laboratory Examples

### DNN Combined with Large Eddy Simulation to Calculate Double-Swirling Hydrogen Non-Premixed Flame

The new version developed a hydrogen non-premixed deep neural network based on two-dimensional convective-diffusion flame manifold data combined with random data augmentation. Furthermore, the developed DNN was combined with large eddy simulation to study the stabilization mechanism of the low-NOx emission double-swirling hydrogen (HYLON) non-premixed flame at the Institute of Fluid Mechanics, University of Toulouse, France. As shown in Figure 2, the HYLON burner has two coaxial swirling channels for injecting fuel and oxidant respectively. The annular channel supplies air mass flow through a pipe with an outer diameter of 18 mm. A swirler is embedded in the outer pipe, and the inner injector supplies hydrogen through a pipe with a diameter of 6 mm. This channel contains a spiral axial swirler. The outer and inner swirlers generate flows with swirl numbers of 0.65 and 0.60 respectively. As can be seen from the results in Figure 3, replacing the direct chemical solution with DNN can achieve an acceleration of more than an order of magnitude, and the numerical simulation results are consistent with the experimental results [5].

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic3.gif pic_center width="50%" height="50%" /></center>

*Figure 2 Double-Swirling Hydrogen (HYLON) Non-Premixed Flame*

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic4.png pic_center width="50%" height="50%" /></center>

*Figure 3 Comparison between the Calculation Results of DNN Replacing Chemical Reactions and Experimental Results*

### Q-DNS Numerical Simulation of Jet Flame Burner

The Q-DNS example demonstrated in this version update is for the jet flame burner of Lund University [6]. It calculates a premixed jet flame of ammonia with an equivalence ratio of 1. This example uses a structured grid, and the final computational grid is obtained through multiple rounds of encryption. The total number of grids is 140 million, and the minimum grid scale is 80 microns, which can resolve the flow in most areas and the chemical reactions in the entire area. As shown in Figure 4, a comparison between the calculation results of this example and the flames observed in the experiment shows that the morphologies of the two are consistent, verifying the correctness of the calculated results. At the same time, the high-resolution data obtained from Q-DNS provides a wealth of valuable information for studying the interaction between flow and chemical reactions during the combustion process of new zero-carbon fuels such as ammonia.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic5.png pic_center width="70%" height="70%" /></center>

*Figure 4 On the left is the numerical simulation result of the jet flame burner, and on the right is the flame observed in the experiment*

### Deep Learning Method Combined with High-Fidelity Large Eddy Simulation to Calculate Hydrogen-Ammonia Jet Flame

The figure below shows the high-fidelity large eddy simulation results of the partially premixed hydrogen-ammonia jet flame burner at KAUST [7]. In this example, the fuel is a hydrogen-ammonia blended fuel with 45% ammonia cracking. The equivalence ratio of the fuel/air mixture at the burner inlet is 3, the inlet velocity is approximately 90 m/s, and the Reynolds number reaches 36,000. The number of grids is 4.6 million. In this study, the thermochemical solution method based on deep learning was successfully extended from hydrocarbon fuels [8] to ammonia fuels and applied to the calculation of the chemical source term in this example. The simulation results are highly consistent with the finite rate chemistry direct integration method and experimental data. At the same time, the combustion chemistry calculation was accelerated by approximately two orders of magnitude. Some of the calculation results are shown in Figure 5, and the local extinction phenomenon reported in the experiment was successfully captured.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeepFlamev1.5_09_01_2025/pic6.jpeg pic_center width="70%" height="70%" /></center>

*Figure 5 High-Fidelity Large Eddy Simulation of Hydrogen-Ammonia Blended Jet Flame at Laboratory Scale*

## Other New Features and Optimizations

### Implementation of DeepFlame Transplantation on Arm Architecture Platforms (such as Huawei Kunpeng, Fugaku Fujitsu, etc.)

To complete the compilation of Deepflame on Arm architecture platforms, users need to adjust the compilation of OpenFOAM v7. Users need to download the bashrc file and the linuxArm64Clang folder in the link (OpenFOAM7-aarch64-Clang-config-file), replace the etc/bashrc file in OpenFOAM v7 with this bashrc, and add linuxArm64Clang to wmake/rules of OpenFOAM v7. Then, OpenFOAM7 can be compiled normally.

### Correction of the Convective Term Calculation Format in the Species Equation of dfHighSpeedFoam

In the old version, the convective term of the species equation in the high-speed reactive flow solver dfHighSpeedFoam was interpolated from the convective term of the mass equation. This calculation method performed poorly in some examples. Therefore, it was modified to explicitly calculate the convective term of the species equation, and better performance was observed through example tests.

## Quick Access to DeepFlame

- GitHub repository address of DeepFlame in the DeepModeling community:
https://github.com/deepmodeling/deepflame-dev
- Release tag of DeepFlame 1.5 version:
https://github.com/deepmodeling/deepflame-dev/releases/tag/v1.5
- Documentation (including installation methods, introduction to input and output parameters, function introductions, example introductions, developer instructions, etc.):
https://deepflame.deepmodeling.com/en/latest/
- Quickly get started with DeepFlame:

## Function Updates and Bug Fix List

v1.5.0
- Added the totalFlowRateAdvectiveDiffusion boundary condition, which takes into account the influence of diffusion at the boundary. By @maorz1998 in #524
- Constructed the dfBuoyancyFoam solver for simulating turbulent flow and diffusion flame problems driven by buoyancy. By @chenzhenyi - 123 in #539
- Added combustion models to the dfBuoyancyFoam solver, including the infinitelyFastChemistry model and the eddyDissipationModel. By @chenzhenyi - 123 in #538
- Added a radiation model to the dfBuoyancyFoam solver. By @chenzhenyi - 123 in #536 and #540
- Modified the calculation method of the convective term splitting in the species equation of dfHighSpeedFoam. By @pkuLmq in #517
- Achieved the transplantation of DeepFlame onto Arm architecture platforms (such as Huawei Kunpeng, etc.). By @seeudong in #541

## References

[1] Mao R, Lin M, Zhang Y, et al. DeepFlame: A deep learning empowered open-source platform for reacting flow simulations. Computer Physics Communications, 291: 108842. (2023)

[2] Mao R, Zhang M, Wang Y, Li H, et al. An integrated framework for accelerating reactive flow simulation using GPU and machine learning models. Proceedings of the Combustion Institute, 40(1 - 4), 105512. (2024)

[3] Zhang M, Mao R, Li H, An Z, Chen ZX. Graphics processing unit/artificial neural network-accelerated large-eddy simulation of swirling premixed flames. Physics of Fluids, 36(5). (2024)

[4] https://github.com/fireFoam-dev/fireFoam-v1912/tree/main/tutorials/poolfireMcCaffrey

[5] Aniello A, Laera D, Marragou S, Magnes H, Selle L, Schuller T, & Poinsot T. Experimental and numerical investigation of two flame stabilization regimes observed in a dual swirl H2 - air coaxial injector. Combustion and flame, 249, 112595. (2023).

[6] Fan Q, Liu X, Cai X, Brackmann C, Alden M, Bai X S, & Li Z. Structure and scalar correlation of ammonia/air turbulent premixed flames in the distributed reaction zone regime. Combustion and Flame, 241, 112090. (2022).

[7] Tang H, Barlow R, Magnotti G. Local extinction in piloted turbulent partially premixed ammonia/hydrogen/nitrogen - air jet flames. Proceedings of the Combustion Institute, 40, 105472. (2024).

[8] Li H, Yang R, Chen ZX et al. Comprehensive deep learning for combustion chemistry integration: Multi - fuel generalization and a posteriori validation in reacting flow. Physics of Fluids 37, 015162. (2025)
