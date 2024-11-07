---
title: "2024 Q2 OpenLAM Report｜More Stable Code, Richer Domain Models"
date: 2024-07-29
categories:
- OpenLAM
---

On the journey toward developing a Large Atomic Model (LAM), the core Deep Potential development team has launched the OpenLAM initiative for the community. OpenLAM’s slogan is "Conquer the Periodic Table!" The project aims to create an open-source ecosystem centered on microscale large models, providing new infrastructure for microscopic scientific research and driving transformative advancements in microscale industrial design across fields such as materials, energy, and biopharmaceuticals.

<!-- more -->

## Codes

The DeePMD-kit v3-beta version (v3.0.0b3) has been released. Compared to the previously released alpha version, the beta version has undergone more comprehensive code refactoring, offers broader support for various model modules, optimizes the support of the DPA-2 model for LAMMPS, and includes many new features. The v3.0.0b3 version further fixes known bugs from v3.0.0b0, v3.0.0b1, and v3.0.0b2, has passed systematic testing, and also includes the release of pre-trained DPA-2 models compatible with v3.0.0b3 (see below). Detailed feature support and optimizations can be found in the release notes:

https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0b0

https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0b1

https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0b2 

https://github.com/deepmodeling/deepmd-kit/releases/tag/v3.0.0b3 (recommended)

The ABACUS software has released the v3.7 version update. The new version of ABACUS has undergone comprehensive testing for alloy applications, ensuring calculation accuracy and pseudopotential reliability. Additionally, to support the OpenLAM large atomic model initiative, extensive optimizations have been made to enhance performance on domestic DCU hardware, including improvements in memory usage efficiency and calculation speed, further expanding its application range in first-principles calculations for large atomic models. For more details, please refer to ABACUS 3.7 Release

## Data
High-Pressure Hydrogen-Rich Compound Data This dataset contains 140,000 data points on ternary hydrogen-rich compounds involving 29 elements, covering a pressure range of 150 - 250 GPa. The high-pressure hydrogen-rich compound database can be accessed via the following link: https://www.aissquare.com/datasets/detail?pageType=datasets&name=High-Pressure-Hydrogen-Rich-Compound&id=257

Solid-State Electrolyte Data (SSE-ABACUS) This dataset comprises 127,000 data points on solid-state electrolytes involving 27 elements and 365 systems (including sulfides, halides, doped materials, and interfaces). The SSE-ABACUS data can be accessed via the following link: https://www.aissquare.com/datasets/detail?pageType=datasets&name=SSE-abacus&id=260

## Models
### Pre-trained Models Based on DeePMD-kit v3-beta Version 

Updated multi-task DPA-2 pre-trained models compatible with DeePMD-kit beta version (v3.0.0b3). Model link: https://www.aissquare.com/models/detail?pageType=models&name=DPA-2.2.0-beta3&id=272 and single-task DPA-2 pre-trained models.

### Domain Models

Free Energy Perturbation Model (https://arxiv.org/pdf/2406.09817) 

On the NNP, using the DPA-2 + semi-empirical method achieves accuracy comparable to DFT. A new NNP-tuning molecular force field process was designed, ensuring the potential energy surface accuracy at the NNP level and the computational efficiency at the MM level.

### Solid-State Batteries 

The pre-trained large model for solid-state electrolytes, DPA-SSE (SSE-ABACUS dataset), has been constructed. The energy prediction accuracy of the model is an order of magnitude higher than that of the CHGNET and M3GNET force fields, and the force prediction accuracy is improved by 1 to 5 times. In terms of dynamic properties, the DPA-SSE's predicted diffusion coefficient and conductivity of Li ions are in good agreement with experimental results. The pre-trained model for bulk materials (chalcogenides) is now available on arXiv (http://arxiv.org/abs/2406.18263). A dedicated app for developing pre-trained models for solid-state electrolytes has also been developed (https://bohrium.dp.tech/apps/voltcraft).

### Alloys 

A pre-trained large atomic model for alloys, comprising 53 elements, has been constructed using the domestic ABACUS software and DCU machines for first-principles calculations, resulting in 24,000 data points. The configurations include elemental, compound, high-entropy alloy crystal structures, defects such as vacancies, interstitials, and surfaces, covering a pressure range of -0.5 to 5 GPa and a temperature range of 50 to 3000 K. The trained model achieves an energy accuracy of less than 35 meV/atom and a force accuracy of less than 0.25 eV/Å. Compared to the existing MACE pre-trained large atomic model, the developed alloy domain model performs better in properties such as elastic constants, moduli, surface energies, and point defect formation energies.

### High-Pressure Hydrogen-Rich Compounds 

An atomic-scale model suitable for predicting the structure of high-pressure hydrogen-rich superconducting compounds has been constructed (including ternary hydrogen-rich compounds involving 29 elements, covering a pressure range of 150 - 250 GPa). This DPA-1 model, based on the 2024Q1 version, can currently stably optimize the structures of 28 known hydrogen-rich superconducting compounds, maintaining the same space group before and after optimization (https://www.aissquare.com/models/detail?pageType=models&name=High-Pressure-Hydrogen-Rich-Compound&id=258).

### Dynamic Catalysis 

A preliminary universal potential function model, DPA-DynaCat, for dynamic catalytic elementary reactions on cluster surfaces has been constructed. Its training set includes common small molecule-related elementary reactions occurring on the surfaces of pure metals and binary alloy clusters of Au/Ag/Cu/Pt/Pd/Ni, involving H2/O2/H2O/CO/CO2/CH4. Compared to DFT calculations, the model can accurately predict potential energy surfaces and achieve approximate reaction free energies similar to those of machine learning potential functions targeted at single systems. This model can be used in conjunction with molecular dynamics for enhanced sampling, considering contributions from various isomers during the reaction process, thus enabling the calculation of reaction barriers and reaction free energies (https://www.aissquare.com/models/detail?pageType=models&name=DPA-DynaCat&id=262).

## Community

"Crystal Structure Collection Competition Across the Periodic Table" Officially Kicked Off on July 1st.

This will be a long-term competition aimed at providing a platform for testing and iterating crystal structure search and generation algorithms, while also enriching the chemical space for OpenLAM updates. For more details, please visit: https://bohrium.dp.tech/competitions/8821838186?tab=introduce.

Based on the Crystal Structure Collection Competition, the OpenLAM Crystal Structure Database has been constructed, currently containing over 500,000 stable structures. All structures in the database can be accessed through the official API (https://github.com/deepmodeling/openlam). To facilitate the effective connection between experimental scientists' language and perspective with the advancements in current AI technology and databases, we have developed the Crystal Craft APP (https://bohrium.dp.tech/apps/crystalcraft). This app provides more possibilities for experimental scientists in structure retrieval and generation, particularly in considering element substitution and template structures based on crystal symmetry.

