---
title: "DeepFlame: Co-Building the Computational Platform for Combustion Reactive Fluids in the Era of AI for Science"
date: 2022-06-13
categories:
- DeepFlame
---

Combustion, particularly in multiphase and turbulent scenarios, involves the intricate integration of a range of complex, multiscale problems, and has long been a challenging area in large-scale scientific computing. Recently, the DeepModeling open-source community initiated a new research paradigm that combines "machine learning, physical modeling, and high-performance computing," offering an opportunity to pursue systematic solutions in this field.

The DeepFlame project, built on open-source platforms such as OpenFOAM, Cantera, and Torch, leverages next-generation computational infrastructure, including heterogeneous parallel computing and AI accelerators. It aims to develop a numerical simulation program for combustion reactive flows that is high-precision, efficient, easy to use, and broadly applicable. The project seeks to address issues like the monopolization of proprietary codes, the concentration of computational resources, and the stagnation of legacy codes. Additionally, it aims to harness the power of the open-source community to create a shared platform for code, computational resources, and case libraries for combustion simulation users, with the goal of overcoming challenges like the lack of available codes for researchers and the difficulty of reproducing results from academic papers.

<!-- more -->

## Why DeepFlame
Computational Fluid Dynamics (CFD), based on the numerical solution of macroscopic continuous medium Navier-Stokes equations, has already played an irreplaceable role in fields such as aerospace and meteorological forecasting. The numerical solution of continuous partial differential equations by computers requires numerical discretization. The finite volume method, which is based on spatial grid discretization, is one of the most widely applied methods and has been implemented and industrialized in various foreign commercial CFD software, such as ANSYS Fluent, StarCCM+, etc.

On the other hand, the calculation of chemical reaction kinetics at the macroscopic level typically uses the Arrhenius formula to solve elementary reaction rates. Combustion systems usually consist of hundreds to thousands of components and even more elementary reactions, requiring the solution of a large set of ordinary differential equations over time. Similar commercial software like ChemkinPro, CosiLab, etc., have been developed abroad to solve such systems.

However, fluid dynamics calculations involving combustion reactions require the coupling of the above two aspects, presenting even greater challenges. Despite the various functionalities developed and tested by commercial software, current computational accuracy and efficiency are still relatively low, making it difficult to meet the demands of industrial applications. From a scientific research perspective, there is an urgent need for a widely accessible open-source code to support the development of scientific computing in combustion reactive fluid dynamics.

In recent years, as computer technology has increasingly penetrated scientific research, the open sourcing and collaborative development of software code have greatly propelled the development of various industries. This is becoming a common understanding. Among the numerous open-source programs, OpenFOAM and Cantera have emerged as leaders in the fields of CFD and reaction kinetics calculation, respectively, with the most widespread user and developer communities worldwide. Recently, research teams domestically and internationally have attempted to combine the two, but have not yet formed an effective open-source collaborative development mechanism. The research has been confined within research groups, lacking an external ecosystem, and has not become widespread. In the realm of deep learning, the use of open-source libraries like Torch and TensorFlow remains relatively independent, and integration with combustion CFD has yet to be achieved. The highly serial workflows also suffer from inefficiencies, poor portability, and high error rates.

Targeting these issues, the initial intention of the DeepFlame project is to build upon the open-source collaborative culture already established within the DeepModeling community and to draw on the development experiences of other projects within the community. The goal is to create an open-source platform serving the combustion reactive fluid dynamics scientific computing community, attracting more developers to join our ranks, and in turn benefiting a broader user base, ultimately promoting the application of combustion computing in industrial scenarios.

## The pain points addressed by DeepFlame
First and foremost, it is important to clarify that DeepFlame is not intended to be a general-purpose CFD software. Our focus is solely on tackling the "tough nut" of combustion reactive fluid dynamics.

With this in mind, the first task is to "slim down" OpenFOAM, which consists of millions of lines of code, by minimizing dependencies on unrelated function libraries while maintaining the integrity of the source code structure (to facilitate future version migrations). This might sound trivial, but anyone familiar with the "nested" structure of OpenFOAM knows that this is far from easy.

Another pain point we aim to address is how to completely replace the cumbersome OpenFOAM combustion reaction thermophysical library and the extensive strings and parameters related to reaction mechanisms with Cantera, making the process more efficient (see the comparison of the code and logic framework before and after optimization in the image below).

Regarding the integration of AI capabilities, we have also completed a demonstrative validation. For the chemical reaction rate stiffness issue that limits computational speed, DeepFlame can either call the SUNDIALS CVODE solver integrated in Cantera or support neural network surrogate models in native pyTorch format (refer to [4] for the related algorithms).

Although DeepFlame's current functionality is still somewhat limited, it has already achieved initial success in creating an efficient, portable, and cross-platform coupling of OpenFOAM, Cantera, and Torch. This lays the foundation for the subsequent integration and advancement of physical modeling, high-performance computing, and machine learning.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame1.png# pic_center width="100%" height="100%" /></center>

## What can DeepFlame Do?
Based on the above code framework and thermophysical chemistry library, DeepFlame currently offers the following features:

- Four core solvers: df0DFoam, dfLowMachFoam, dfHighSpeedFoam, and dfSprayFoam.

- Each solver comes with corresponding case examples and accompanying Allrun and Allclean scripts provided in the examples directory.

- The calculable systems include: strong turbulent flames in open/confined spaces, complex reaction kinetics laminar flames, spray/particle combustion, supersonic combustion, deflagration-to-detonation transition, continuous rotating detonation waves, and more.

- Ability to read in chemical reaction mechanisms of any size (supporting cti, xml, yaml formats).

- Integration with Cantera’s native detailed transport models such as UnityLewis, Mix, and Multi.

- Two chemical reaction rate solvers: cvode and torch.

- Adaptation for domestic ARM heterogeneous chips (Kunpeng, Phytium).

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/deepflame2.gif# pic_center width="100%" height="100%" /></center>


## What is DeepFlame going to accomplish?

### Physical models + AI

When we talk about combustion reactive fluid dynamics within the continuum, the main physical modeling subjects can be categorized into:

1. Unresolved scale turbulence models (Reynolds-averaged or subgrid-scale stress)

2. Chemical reaction kinetics models (including detailed mechanisms, mechanism simplification, ODE integration)

3. Unresolved scale turbulence and chemical reaction interaction models (Reynolds-averaged or subgrid-scale reaction rates)

Our current work focuses on Model 2. Therefore, DeepFlame is currently capable of full-scale resolved simulations. For detailed mechanisms within Model 2, we plan to collaborate with the first-principles molecular dynamics simulation project in the DeepModeling community to obtain more optimal reaction pathways and rate constants. For Models 1 and 3, challenges remain, particularly in terms of model generalization due to the unclear upper limits of training data dimensions, especially considering the effects of spatial scale and boundary conditions. Moreover, due to OpenFOAM's second-order accuracy in both time and space, we are developing higher-order accuracy programs to generate training data for small-scale effects. Beyond ideal gas, we also need to explore real gas effects in supercritical states and the atomization process of continuous phase liquids within the DeepFlame framework.

### High-performance calculations

When you log into any national supercomputing system worldwide and enter commands like qstat or squeue to display the task list, there's a high probability that you'll see names like VSAP, LAMMPS, and various CFD codes on the screen. CFD related to combustion may account for more than half of the computational power demand in large-scale scientific computing. Currently, DeepFlame's parallel framework is derived from native OpenFOAM, whose parallel acceleration capabilities are not particularly outstanding and urgently need improvement. Additionally, moving chemical reaction rate calculations and AI inference to GPUs or other accelerators would yield better results. These are the directions for our future work. Furthermore, in the context of Exascale Computing, DeepFlame will need to be adapted and optimized for the new generation of domestic heterogeneous supercomputing platforms to support larger-scale and faster computations.

## How to Join the Development of DeepFlame
If you are interested in DeepFlame's combustion CFD and machine learning code development or high-performance optimization, we recommend reaching out to us directly via GitHub. Your ideas will be highly valued! As the project is still in a relatively early stage, we will soon begin organizing communication groups and establishing more channels based on the emerging needs.

If you wish to use DeepFlame for your research, please follow DeepFlame on GitHub and subscribe to this public account to stay updated on relevant developments. Additionally, you are welcome to join the "DeepFlame User Group" to discuss and share tips on using DeepFlame!

## DeepFlame Team and Timelines
DeepFlame was initiated and led by Dr. Zhi Chen from Peking University, with AI modeling support provided by Tianhan Zhang from Beihang University and Zhiqin Xu from Shanghai Jiao Tong University. The project is supported by the research collaboration platform of the Beijing Academy of Artificial Intelligence (AISI) and receives code hosting and related technical support from the DeepModeling community.

- On January 16, 2022, during a special invited lecture on turbulent combustion at the Academic Annual Conference on Combustion of the Chinese Society of Engineering Thermophysics, Dr. Zhi Chen made an urgent appeal to his colleagues in the combustion community: "Without a widely accessible open-source computational platform, foundational research in turbulent combustion simulation will struggle to achieve further effective development." This marked a significant commitment.
- By the end of February 2022, the team was initially formed, and the DeepFlame project was officially launched.
- By mid-March 2022, the team had achieved the coupling of OpenFOAM and Cantera based on a minimal thermophysical library.
- By the end of April 2022, the development of the gas-phase solvers df0DFoam, dfLowMachFoam, and dfHighSpeedFoam was completed.
- By the end of May 2022, the development of the spray combustion solver dfSprayFoam, based on the Lagrangian point source method, was completed, along with the integration of the Torch API and adaptation for domestic ARM architecture chips (Kunpeng, Phytium).
- On June 13, 2022, the DeepFlame code repository was officially hosted by the DeepModeling community, and version 0.1.0 was released as open-source.

