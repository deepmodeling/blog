---
title: "DeepFlame 1.6 Released: \"Optimized Thermal Modeling, New Steady-State Solver, and Significantly Improved Engineering Performance\""
date: 2025-06-26
categories: 
- DeepFlame
---

DeepFlame is an open-source platform for combustion fluid computation developed in the era of AI for Science, aiming to promote the application of combustion fluid simulation technology in scientific research and industry [1–4]. Since its release, the platform has attracted extensive attention from academia and industry, and continues to attract outstanding developers and user communities to participate in its construction.

<!-- more -->

In this update, DeepFlame further expands the platform's engineering steady-state computing capabilities and the flexibility of thermochemical calculations. The new version of DeepFlame provides an option for sensible enthalpy (hs) in energy transport and computation, which can be selected during solver compilation. On this basis, DeepFlame has added temperature calculation capabilities independent of Cantera, supporting local thermodynamic state solving based on Newton iteration. Users can switch with one click through environment variables during compilation to meet the integration needs of different users. In addition, the DeepFlame 1.6 version introduces the steady-state solver dfSteadyFoam, which adds component transport and chemical reactions based on rhoSimpleFoam. It is suitable for calculating various subsonic reactive flow steady-state problems, broadening the engineering application scenarios of DeepFlame. Furthermore, we have optimized the build script, which can display system architecture information after the build is completed, improving the transparency of platform deployment. At the same time, DeepFlame has been adapted and optimized based on the domestic Kunpeng platform, achieving significant performance improvements in the inference and solving parts. The documentation system has also been upgraded to sphinx-book-theme, and with the new Python and operating system environments, the documentation interface is more modern and the organization is clearer. We have also added a 2D Riemann case as a test case for various flux splitting in dfHighSpeedFoam, further enriching the verification cases for high-speed reactive flow solvers.


## Version Update Overview

* Based on rhoSimpleFoam, the dfSteadyFoam steady-state compressible reactive flow solver is launched, suitable for calculating various subsonic steady-state cases.

* The energy calculation provides a sensible enthalpy (hs) option, and can complete temperature calculation as well as enthalpy and specific heat capacity solving independently of Cantera. Users can freely switch the solving mode through the environment variable CANTERA_THERMO.

* The installation script is optimized, and the system architecture is automatically displayed after the build is completed, facilitating deployment and debugging.
* The documentation system is upgraded to sphinx-book-theme, improving documentation compatibility and reading experience.
* The problem of repeated initialization of Cantera Reactor is solved by calling syncState(), achieving an acceleration effect of 8% to 10%.
* A 2D Riemann case is added as a test case for various flux splitting in dfHighSpeedFoam.

**New Feature 1: Steady-State Compressible Flow Solver dfSteadyFoam and Flexible Thermodynamic Modeling**

This version introduces a new steady-state solver dfSteadyFoam. Based on the SIMPLE algorithm, this solver adds multi-component transport equations and chemical reaction solving, and is suitable for steady-state calculation of compressible subsonic reactive flows. It can be widely applied to steady-state problem solving and industrial engineering scenarios, expanding the applicability of DeepFlame in engineering problems.

<center>

<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_26_06_2025/p1.png">

*Figure1 Steady-state fuel field obtained from 2D non-reactive single-nozzle case calculated using dfSteadyFoam*
</center>

<center>

<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_26_06_2025/p2.png">

*Figure2 Steady-state temperature field obtained from 2D non-reactive single-nozzle case calculated using dfSteadyFoam*

</center>


The above figures show the results obtained from the 2D non-reactive single-nozzle case calculated using dfSteadyFoam. The flow field reaches relative stability after approximately 3500 iterations, and the results are basically consistent with those calculated by the steady-state solver constructed based on reactingFoam and rhoSimpleFoam in OpenFoam, thus verifying the accuracy of the solver. At the same time, it can be found that this solver cannot capture the detailed structures of the flow field, such as the instability at the mixing of fuel and oxidizer. However, using the steady-state solver to calculate the relatively stable flow field of this cold-state case on 20 cores takes less than 3 hours, which is about 4 times faster than the transient solver. Therefore, it is more suitable for calculating large-scale engineering problems and the initial field of transient problems to accelerate the simulation.


**New Feature 2: Providing Sensible Enthalpy as an Option for Energy Calculation, and Capability to Complete Temperature Calculation Independently of Cantera**


In terms of thermophysical properties, the energy model of DeepFlame now supports sensible enthalpy (hs) as an option for energy transport, alongside the original absolute enthalpy (ha) and absolute energy (ea). Users can select it through the function CanteraMixture::setEnergyName in createFields.H.

In addition, users can independently complete the calculation of temperature, enthalpy, and specific heat capacity without calling Cantera through the Newton iteration method implemented in DeepFlame. Users can control the calculation method through the environment variable CANTERA_THERMO (setting it to 1 during compilation means using Cantera for calculation, and 0 means using the Newton iteration calculation implemented by DeepFlame itself), which significantly improves the portability and control flexibility of the platform.


**New Feature 3: New Progress in Domestic High-Performance Adaptation**

DeepFlame has completed full-stack in-depth optimization based on the domestic Kunpeng platform. Firstly, the compilation and dependency library calling links are reconstructed based on the Kunpeng high-performance suite, realizing efficient and seamless migration from x86 to ARM architecture. In addition, DeepFlame makes full use of the unique matrix acceleration unit and high-bandwidth memory architecture of the Kunpeng platform, realizes hardware-level acceleration for core operations such as dense matrix multiplication, and dynamically adjusts parameters such as BatchSize, process/thread count involved in neural network inference, greatly improving the inference performance. Finally, for the multi-threaded code in the solving part, by reconstructing the task scheduling strategy, optimizing thread pinning and resource isolation, the inter-core competition problem is effectively avoided, and the solving efficiency of each control equation is significantly improved.

<center>

<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_26_06_2025/p3.png">

*Figure3 Time comparison between Kunpeng Professional Edition and NVIDIA A100 in solving and inference parts*
</center>


## Demonstration of Newly Added Cases

To further verify the ability of DeepFlame to resolve shock wave structures and contact discontinuities under high-speed compressible flows, this version adds a 2D Riemann problem case [4]. This problem includes multi-shock interaction and strong shear characteristics, and is an important test for the robustness and low-dissipation characteristics of high-order schemes.

In this case, a flow field with significantly different initial conditions in four regions is set in a 1 m×1 m computational domain, and a high-resolution mesh of 2000×2000 is used for solving. The initial shock intersection point triggers complex wave system evolution, including reflected shocks, Mach stems, and shear layers.

<center>
<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_26_06_2025/p4.png">

*Figure4 Density contours and isopleths of Riemann problem under different numerical schemes*

</center>

As shown in the figure, the comparison of simulation effects under different numerical schemes shows that the new numerical scheme has lower numerical dissipation compared with the traditional KNP scheme, and can more clearly capture small-scale structures near the contact surface, such as shear layer unstable ripples.


## Other New Features and Optimizations

* To improve the user's deployment experience on multiple platforms, the installation script install.sh is optimized in this version. After the compilation process is completed, the script will automatically detect and display the system architecture used for the current build (such as x86_64, aarch64, etc.), facilitating users to quickly confirm the target platform, improving the visibility and debugging efficiency of the build process, and is especially suitable for multi-architecture cross-compilation scenarios.

* The documentation system of DeepFlame has also been upgraded. The theme is switched to the more modern sphinx-book-theme, and the documentation build environment is upgraded to Ubuntu 24.04 and Python 3.12 to adapt to the continuous development of the Python package ecosystem. The new documentation structure is clearer, supports multi-level directories and code block folding, and has stronger Jupyter compatibility, bringing users a smoother reading and learning experience.

## Quick Access to DeepFlame

The GitHub repository address of DeepFlame in the DeepModeling community is:

https://github.com/deepmodeling/deepflame-dev


The release tag of DeepFlame 1.6 version:

https://github.com/deepmodeling/deepflame-dev/releases/tag/v1.6

Documentation (including installation methods, input/output parameter introduction, function introduction, case introduction, developer notes, etc.):

https://deepflame.deepmodeling.com/en/latest/

## List of Feature Updates and Bug Fixes

**v1.6.0**

* Added steady-state compressible flow solver dfSteadyFoam by @pkuLmq in #559, which supports turbulence and efficiently calculates steady-state solutions using the SIMPLE algorithm.

* Extended the energy model by @user20250420 in #556, supporting sensible enthalpy (hs) in addition to the original absolute enthalpy (ha) and internal energy (ea). In addition, the calculation of temperature (T), enthalpy (h), and specific heat capacity at constant pressure (cp) can now be completed independently of Cantera. This change improves the flexibility of the platform and removes the dependency on external dependencies. Users can control the calculation method by setting the environment variable CANTERA_THERMO in bashrc, where CANTERA_THERMO=1 (currently default) uses Cantera, and CANTERA_THERMO=0 uses the built-in calculation method of DeepFlame.
* Optimized the installation script install.sh by @seeudong in #546, which will automatically display system architecture information (such as x86_64) after the build is completed, facilitating users to confirm the build platform. At the same time, the transplantation and optimization of DeepFlame have been carried out on domestic software and hardware platforms, achieving comprehensive performance improvement under the Arm architecture.
* Switched the documentation system to sphinx-book-theme and updated the build environment to Ubuntu 24.04 and Python 3.12 by @njzjz in #547, improving the aesthetics and build compatibility of the documentation interface.
  
* Solved the problem of repeated initialization of Cantera Reactor by calling syncState() by @xiao312 in #563.

* Added 2D Riemann case as a test case for dfHighSpeedFoam by @circlexiang in #560.

## References

1. Mao R, Lin M, Zhang Y, et al. DeepFlame: A deep learning empowered open-source platform for reacting flow simulations. Computer Physics Communications, 291: 108842. (2023)

2. Mao R, Zhang M, Wang Y, Li H, et al. An integrated framework for accelerating reactive flow simulation using GPU and machine learning models. Proceedings of the Combustion Institute, 40(1-4), 105512. (2024)
3. Mao R, Dong X, Bai X, et al. DeepFlame 2.0: A new version for fully GPU-native machine learning accelerated reacting flow simulations under low-Mach conditions. Computer Physics Communications, 312: 109595. (2025)
4. Zhang M, Mao R, Li H, An Z, Chen ZX. Graphics processing unit/artificial neural network-accelerated large-eddy simulation of swirling premixed flames. Physics of Fluids, 36(5). (2024)
5. Chen H, Zhao M, Hua Q, Zhu Y. Implementation and verification of an OpenFOAM solver for gas-droplet two-phase detonation combustion. Physics of Fluids, 36(8). (2024)






