---
title: "TBPLaS | Partnering with the DeepModeling Community to Build Large-Scale Computational Physics Software"
date: 2024-03-15
categories:
- TBPLaS
mathjax: true
---

The **tight-binding model** based on **second quantization** is a widely used theoretical model in **condensed matter physics**. In this model:

- Atoms in a lattice are represented as **discrete points** with a specific number of electrons.
- Each electron occupies a corresponding **atomic orbital**.
- Using **creation and annihilation operators**, electron transitions between atomic orbitals are described in the second quantization framework.
- The **Hamiltonian** comprises:
  - **Transition terms** between atomic orbitals.
  - **Energy levels** of the orbitals.

Project on GitHub: https://github.com/deepmodeling/tbplas

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/tbplas/f1.webp# pic_center width="40%" height="40%" /></center>

<!-- more -->


**Challenges in Large-Scale Computation**
Solving the tight-binding model typically involves:
- The **stationary Schrödinger equation**, requiring diagonalization of the Hamiltonian.
- A computational complexity proportional to the **cube of the system size** (\(O(N^3)\)).

For instance:
- In a **3D system**, if the size increases tenfold:
  - The **volume** and **number of atoms** increase by **1,000 times**.
  - The Hamiltonian's **dimension** grows 1,000-fold.
  - The time required for diagonalization increases nearly **1 billion times**.

This poses significant challenges for **large-scale numerical computations** in fields such as:
- Defects, impurities, and interfaces.
- Superlattices, alloys, and clusters.
- Quasicrystals, fractals, polycrystals, and amorphous systems.

**Breakthrough with TBPLaS**
Addressing these challenges, **Professor Shengjun Yuan** from **Wuhan University** has:
- Conducted **over a decade of research** to propose universally applicable computational physics formulas.
- Developed the **Tight-Binding Propagation Method (TBPM)** and the **TBPLaS** software package.

**Key Features of TBPLaS**
- **Low-scaling computation**: Overcomes the limitations of traditional diagonalization methods.
- **Scalable simulations**: Can simulate systems spanning nearly **10 orders of magnitude** in size, including those with billions of atoms (lattice points).
 
**Collaboration with DeepModeling**
TBPLaS has officially joined the **DeepModeling community** to:
- Collaborate with developers and users.
- Promote the development and application of **large-scale computational physics methods** and **software**.

---

## Basics
The core idea of the TBPM (Tight-Binding Propagation Method) is as follows: In solid-state physics, a random state in real space contains information about all eigenstates of the system. As the wave function of the random state evolves, each eigenstate evolves independently. However, in terms of physical observables, what is needed is the contribution from a group of eigenstates with similar eigenvalues, not their individual characteristics. Hence, this idea suggests that information from the wave function’s time-domain evolution can be converted into physical quantities of interest, thereby avoiding the diagonalization process. By reducing the computational complexity from \(O(N^3)\) to \(O(N)\), this approach ensures that the linear scaling relationship between computational cost and system size is maintained, even for extremely large systems.

Below is a brief explanation using electronic transport properties as an example. The formula for the electrical conductivity \(\sigma_{AA}(E, \tau)\) is approximately:

\[
\sigma_{AA}(E, \tau) \approx \frac{1}{\Omega} \rho(E) \int_0^{\tau} dt \, \text{Re} \left[ e^{-iEt} \langle \phi | A e^{iHt} J_A e^{-iHt} | \phi \rangle \right]
\]

Here:
- \(|\phi\rangle\) represents a random initial state.
- \(|\phi(t)\rangle\) is the time-evolved state calculated from \(|\phi\rangle\) (via the time-dependent Schrödinger equation).
- \(\Omega\) is the system's volume (or area in 2D).
- \(J_A\) is the \(A\)-direction component of the current operator.
- \(\rho(E)\) is the electronic density of states (which can be obtained via the spectral correlation function).
- The time-evolution operator \(e^{iHt}\) is computed using the Chebyshev polynomial expansion method.

The quantity \(\sigma_{AA}(E, \tau)\) is determined by the integral up to the time limit \(\tau\). It provides information about the energy-dependent conductivity, with \(\rho(E)\) describing the contribution of states near energy \(E\). The diffusion coefficient \(D_{AA}(E, \tau)\), derived from this method, captures the dynamics and transport properties over different timescales. Additionally, quantities like the mean free path and localization length can be obtained.

For more computational details, refer to the following articles:
- *Phys. Rev. B 82, 115448 (2010)* (Electrical, optical, and transport properties)
- *Phys. Rev. B 84, 035439 (2011)* (Polarization and related quantities)
- *Phys. Rev. B 91, 045420 (2015)* (Transport properties)
- *Comput. Phys. Commun. 285, 108632 (2023)* (Summary of the computational methodology for transport properties)
- *Chin. Phys. Lett. 40, 027101 (2023)* (Automated self-consistent calculations of the electronic density distribution).

---
## **Features of TBPLaS**


**1. Powerful Modeling Capabilities**
- **Supports diverse models**:
  - Tight-binding models in arbitrary dimensions, shapes, and boundary conditions.
  - Molecules, clusters, nanotubes, nanoribbons, 2D crystals, 3D crystals, etc.
- **Built-in modeling tools**:
  - Quickly construct complex models like heterojunctions, twisted structures, quasicrystals, and fractals.
  - Handle defects like vacancies and deformations, as well as external electric and magnetic fields.
- **Analytical support**:
  - Derive and use analytical Hamiltonians directly.
- **Built-in formula libraries**:
  - **Slater-Koster formula library**: Build tight-binding models directly from atomic structures.
  - **Spin-orbit coupling formula library**: Support various spin-orbit coupling effects.
- **Predefined material models**:
  - Tight-binding models for common materials like graphene, phosphorene, and transition metal dichalcogenides are readily available.
- **Parameter optimization**:
  - Fit tight-binding models to band structures obtained from first-principles calculations.
- **Seamless integration**:
  - Interface with **Wannier90**: Directly import tight-binding models fitted by Wannier90.
  - Interface with **LAMMPS**: Import optimized atomic configurations to build tight-binding models.
  - Interface with **DeePTB** and **DeepH**: Directly import machine-learning-fitted tight-binding models.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/tbplas/f2.webp# pic_center width="100%" height="100%" /></center>


**2. Rich Physical Property Calculation Features**
- **Precise diagonalization methods**:
  - Calculate band structures, density of states, local density of states, \(Z(2)\) topological invariants, polarizability, dielectric functions, AC (optical) conductivity, and more.
- **Time-evolution algorithms (TBPM)**:
  - Simulate real-space wavefunction propagation.
  - Compute:
    - Energy density of states, Landau levels, local density of states, quasi-eigenstates.
    - Optical conductivity, electrical conductivity, magneto-optical conductivity.
    - Carrier velocity, mobility, mean free path, localization length, diffusion coefficients.
    - Transmission coefficients, magnetization, magnetic susceptibility.
    - Polarization functions, response functions, dielectric constants.
    - Energy loss spectra, plasmon spectra, plasmon lifetime, and spatial electron density distribution.
- **Kernel Polynomial Method (KPM)**:
  - Compute DC conductivity and Hall conductivity.
- **Green’s function methods**:
  - Calculate the local density of states.


**3. High Computational Efficiency**
- **Optimized performance**:
  - Core components written in **Cython** and **Fortran**.
  - Extensive use of **sparse matrices** to reduce memory usage.
- **High-performance libraries**:
  - Support for **MKL** and other efficient math libraries.
- **Parallelization**:
  - **MPI + OpenMP hybrid parallelization** for optimal hardware resource utilization.


**4. Simple and User-Friendly**
- **Python-based interface**:
  - Object-oriented design closely tied to physical concepts, reducing the learning curve.
- **Robust error handling**:
  - Built-in parameter checks and exception handling for detailed error diagnostics.
- **Comprehensive documentation**:
  - The project website provides detailed tutorials and example programs:
    [TBPLaS Tutorials](http://www.tbplas.net/tutorial/index.html).

## **Recent Applications of TBPLaS in Large-Scale Electronic Structure and Property Research**

**1. Research on Twisted Graphene Structures by Francisco Guinea's Group**
- **Who**: Professor Francisco Guinea, Foreign Member of the U.S. National Academy of Sciences, and his group at the **IMDEA Research Institute, Spain**.
- **Published Work**:
  - *Phys. Rev. Res. 6, 013165 (2024)*.
  - *arXiv:2401.09010 (2024)*.
- **Highlights**:
  - TBPLaS was used to perform large-scale electronic structure and property calculations.
  - **Topics**:
    - The mechanism behind the formation of "magic angles" in **twisted multilayer graphene**.
    - The flat-band properties of **quasicrystals in twisted trilayer graphene**.
  - **Scale**:
    - Simulations were conducted on systems with **over 10 million atoms** in the supercell using the **TBPM method**.


**2. Research on GaP Crystals by Wei-Nan E and Linfeng Zhang’s Team**
- **Who**: 
  - Academician **Wei-Nan E** from the **Chinese Academy of Sciences** and **Peking University**.
  - Linfeng Zhang’s team from the **Beijing Institute for General Artificial Intelligence (BIGAI)**.
  - Researcher Gu Qiangqiang et al.
- **Published Work**:
  - *arXiv:2307.04638*.
- **Highlights**:
  - Proposed a deep-learning-based method, **DeePTB**, to construct tight-binding model Hamiltonians.
  - **Steps**:
    1. **Finite-temperature structure sampling**:
       - Conducted molecular dynamics simulations using **DeePMD** (Deep Potential Molecular Dynamics) to sample structures at finite temperatures.
    2. **Hamiltonian construction**:
       - Constructed tight-binding Hamiltonians using the **DeePTB method**.
    3. **Property calculations**:
       - Leveraged **TBPLaS** and the **TBPM method** to calculate properties of **millions of atoms** in large-scale GaP crystal systems.
  - **Results**:
    - Computed finite-temperature **electronic density of states**, **optical conductivity**, **dielectric functions**, and **complex refractive indices**.


**Representative Applications of TBPLaS in the Past Five Years**
**1. 2D Crystals and Quantum Dots**
- **References**:
  - *Phys. Rev. X 12, 021055 (2022)*
  - *Phys. Rev. Lett. 129, 056803 (2022)*
  - *Phys. Rev. B 108, 045404 (2023)*
  - *Phys. Rev. B 105, 094111 (2022)*
  - *Phys. Rev. B 104, 155110 (2021)*
  - *Phys. Rev. B 98, 155411 (2018)*
  - *Phys. Rev. B 98, 115117 (2018)*
  - *Phys. Rev. B 97, 245410 (2018)*
  - *Phys. Rev. Mater. 2, 114011 (2018)*
  - *Nanoscale 10, 21918 (2018)*


**2. Moiré Superlattice Structures**
- **References**:
  - *Science 380, 1367 (2023)*
  - *Nat. Commun. 11, 371 (2020)*
  - *Phys. Rev. B 109, 085118 (2024)*
  - *Nano Lett. 23, 1836 (2023)*
  - *Phys. Rev. B 108, 045138 (2023)*
  - *Phys. Rev. B 107, 035109 (2023)*
  - *Phys. Rev. B 105, 245415 (2022)*
  - *npj Comput. Mater. 8, 73 (2022)*
  - *Phys. Rev. B 104, 205104 (2021)*
  - *Phys. Rev. B 103, 115431 (2021)*
  - *Sci. China: Phys. Mech. Astron. 64, 267811 (2021)*
  - *Phys. Rev. B 102, 235418 (2020)*
  - *Phys. Rev. B 102, 241106 (R) (2020)*


**3. Quasicrystals with Rotational Symmetry**
- **References**:
  - *Phys. Rev. B 105, 075121 (2022)*
  - *Phys. Rev. B 105, 125403 (2022)*
  - *Phys. Rev. B 102, 115123 (2020)*
  - *Phys. Rev. B 102, 045113 (2020)*
  - *npj Comput. Mater. 5, 122 (2019)*


**4. Fractal Structures with Fractional Spatial Dimensions**
- **References**:
  - *Phys. Rev. B 107, 115424 (2023)*
  - *Phys. Rev. B 105, 205433 (2022)*
  - *Phys. Rev. B 102, 075440 (2020)*
  - *Phys. Rev. B 102, 245425 (2020)*
  - *Phys. Rev. B 101, 045413 (2020)*
  - *Phys. Rev. B 99, 075402 (2019)*
  - *Phys. Rev. B 97, 205434 (2018)*

---

## **Future Development Directions for TBPLaS**

**1. Algorithm Development for Strongly Correlated Systems**
- Implementation of algorithms for **strongly correlated systems**, including:
  - **Hubbard models**.
  - **Self-consistent iterative methods**.


**2. Code Refactoring**
- Refactor legacy code in **C++**:
  - Simplify the installation process.
  - Improve code maintainability and readability.


**3. High-Performance C++ User Interfaces**
- Develop a comprehensive **C++ user interface** for scenarios requiring extremely high performance.


**4. Deep Collaboration with the DeepModeling Community**
- Foster deeper integration with other software in the **DeepModeling community**, enabling seamless workflows for:
  - **First-principles modeling** to **large-scale property calculations**.
  - Full integration of the toolchain:
    - **ABACUS**: First-principles calculations.
    - **DeePTB**: Tight-binding Hamiltonian construction via deep learning.
    - **DeePMD**: Molecular dynamics simulations.
    - **TBPLaS**: Tight-binding simulations and large-scale property calculations.





