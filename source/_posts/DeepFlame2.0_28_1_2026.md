---
title: "DeepFlame 2.0: Embracing the “Agent Era” of Combustion and Fluid Science Computing"
date: 2026-1-28
categories: 
- DeepFlame
---

Over the past two years, the DeepFlame community has witnessed the rapid development of AI for Science (AI4S) together with researchers and practitioners. Since advocating the co-construction of an AI4S open-source combustion platform in June 2022, and releasing more than twenty versions that realize full-process GPU heterogeneous solvers, we have consistently been committed to building a bridge between artificial intelligence, high-performance computing, and physical modeling.

However, in today’s era of explosive AI growth, why are many researchers’ daily routines still dominated by heavy code debugging and case configuration? True AI4S should not stop at “using AI to compute faster,” but should aim to “use AI to liberate researchers’ productivity.”

Today, we officially release **DeepFlame 2.0**. In this version, beyond functional updates and performance optimizations, more importantly, we formally introduce a brand-new scientific computing paradigm — **AI-agent-driven scientific computing**. By bringing AI agents into scientific computing workflows, researchers can leverage the power of intelligent agents to improve research efficiency and focus more on solving scientific problems themselves.

<!--more-->

## 01 What Is the “Agent Ecosystem” of DeepFlame 2.0?

DeepFlame 2.0 is no longer merely a collection of solvers. It is evolving into an open, agent-friendly scientific computing foundation. We introduce AI agents that cover multiple stages of the workflow, from code development to case simulation, helping researchers enhance productivity.

## 02 Version Update Overview

### Agent Ecosystem

#### 1. GPU Programming Agent CoCo: High-Performance Computing Without Knowing CUDA

One of DeepFlame’s core competitive advantages lies in its efficient GPU heterogeneous solving capability. However, migrating CFD codes from traditional CPU architectures to GPUs often requires deep expertise in CUDA programming, which has become a major obstacle for many combustion or CFD experts.

To address this challenge, we collaborated with Shanghai Shuqian Technology to develop the code migration agent **CoCo**. It can not only understand the semantics of traditional C++ numerical algorithms, but also automatically generate, review, and test CUDA code according to the DeepFlame-GPU framework specifications.

The CoCo agent significantly lowers the barrier to high-performance computing development, allowing researchers to focus on high-level physical model design while delegating tedious code migration tasks to AI.


#### 2. FlamePilot: DeepFlame’s CFD Simulation Agent

Another important application scenario of AI agents in scientific computing is serving as research partners that can run tools, autonomously correct errors, and learn from tasks.

To meet this need, we developed the FlamePilot agent, a “digital teammate” for DeepFlame combustion simulations. Its primary goal is to assist users in carrying out combustion simulations through natural language interaction, while autonomously diagnosing issues based on runtime feedback, proposing improvement hypotheses, executing corrective optimizations, until the results converge or align with expectations.

Project repository:  
https://github.com/deepflame-ai/flamepilot


#### 3. DFODE-kit Trainer: Neural Network Training for Combustion Chemistry

To lower the barrier for building and training combustion chemistry DNN models, DeepFlame 2.0 introduces the DFODE-kit Trainer agent. This agent aims to autonomously complete operating condition setup, data generation, model training, and validation for combustion chemistry simulations through natural language interaction.

Users only need to provide simple natural language instructions, and the Trainer agent can automatically execute complex training workflows, greatly improving the efficiency of developing combustion chemistry neural network models.

Project repository:  
https://github.com/deepflame-ai/DFODE-kit/blob/agent/agent_user_guide_zh.md

### New Features

The upper-layer architecture of agents relies on the solid underlying foundation of DeepFlame. In DeepFlame 2.0, we introduce multiple new features to further enhance software usability and performance.

#### 1. DFODE-kit: Deep Learning Solver for Combustion Chemistry [1]

DFODE-kit aims to accelerate combustion simulations by efficiently solving chemical reaction kinetics governed by high-dimensional stiff ordinary differential equations (ODEs). This software package integrates deep learning methods to replace traditional numerical integration, thereby significantly improving simulation speed and accuracy.

Project repository:  
https://github.com/deepflame-ai/DFODE-kit

#### 2. DeepFlame-GPU: Continuous Optimization of User Experience and Functional Capabilities [2–3]

- **Solvers**: Completed GPU porting of df0DFoam and dfHighSpeedFoam  
- **Turbulence models**: Added LES subgrid-scale models including WALE, SIGMA, and kEqn  
- **Boundary conditions**: Added boundary conditions such as flowRateInletVelocity, waveTransmissive, and totalTemperature  
- **Discretization schemes**: Ported the KNT and KT schemes, supporting supersonic flow simulations  
- **ODE solvers**: Optimized user experience and fixed bugs for GPSODE  
- **Standard cases**: Substantially supplemented and improved standard cases for df0DFoam, dfLowMachFoam, and dfHighSpeedFoam

### 3. New Progress in Domestic High-Performance Adaptation

Based on the Kunpeng ecosystem, DeepFlame 2.0 has carried out multiple adaptation and optimization efforts, improving performance on domestically produced hardware.

In terms of usability, the DeepFlame 2.0 software stack can be natively compiled for Kunpeng platforms and supports one-click deployment and execution via the Jarvis tool. In terms of performance, DeepFlame 2.0 achieves deep optimization for ARM architectures and full-stack performance breakthroughs: at the hardware level, fine-grained core binding and memory allocation strategies are introduced for the Kunpeng 920 Professional Edition’s many-core, multi-NUMA, on-chip memory architecture; at the software level, the codebase is refactored based on the BiSheng compiler, integrating the Kunpeng Math Library (KML) to accelerate GEMM computations while ensuring accuracy and robustness; at the algorithmic level, ARM-native mixed-precision solvers (FP64 sparse solving + FP16 inference) are designed to balance accuracy and speed. For AI–CFD integrated inference acceleration, lightweight neural network models are developed at the model layer to achieve high-accuracy inference and are adapted to the Kunpeng SME instruction set.

## 04 Quick Access to DeepFlame

The DeepFlame repository in the DeepModeling community is available at:  
https://github.com/deepmodeling/deepflame-dev

The release tag for DeepFlame version 2.0:  
https://github.com/deepmodeling/deepflame-dev/releases/tag/v2.0.0

DeepFlame online documentation (including installation instructions, input/output parameter descriptions, feature introductions, case studies, developer notes, etc.):  
https://deepflame.deepmodeling.com/en/latest/




