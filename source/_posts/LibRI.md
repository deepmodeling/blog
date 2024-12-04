---
title: "LibRI | Collaborating with the DeepModeling Community to Support Advanced Methods Beyond Conventional DFT"
date: 2023-05-26
categories:
- LibRI
mathjax: true
---

## Introducing LibRI: Advancing Computational Methods for DFT  

### Development and Features  

**Dr. Peize Lin** and the research group led by **Xinguo Ren** at the Institute of Physics, Chinese Academy of Sciences, have developed the open-source library **LibRI**. This innovative tool is designed for **high-efficiency and highly parallelized RI model calculations** and has already integrated several advanced electronic structure computation methods.  

### Joining the DeepModeling Community  

To accelerate its development and broaden its impact, **LibRI has joined the DeepModeling community**. This collaboration will:  
- Support **advanced methods that go beyond conventional DFT**, enabling the further development of RI methods.  
- Provide **more efficient and accurate computational capabilities** for the domestic DFT software **ABACUS**, boosting its performance and efficiency.  
- Contribute to **AI-assisted, next-generation electronic structure algorithms**.  

<!-- more -->


### The Importance of Density Functional Theory  

**Density Functional Theory (DFT)** is a cornerstone in first-principles electronic structure calculations. Recent advances in **accuracy** and **speed** have made DFT a widely used tool in fields such as:  
- **Physics**  
- **Materials Science**  
- **Chemistry**  
- **Biology**  

However, DFT methods based on local or semi-local exchange-correlation functional approximations face significant limitations. These functionals rely solely on charge density and its gradient, which prevents accurate descriptions of certain critical physical interactions.

### Overcoming Limitations with Advanced Methods  

To address these limitations, higher-level methods, such as:  
- **Hybrid Density Functionals**  
- **Random Phase Approximation (RPA)**  
- **GW Methods**  

are often required for more accurate calculations, such as ground-state energies or quasiparticle excitation energies. Unfortunately, these methods are computationally intensive, with costs scaling **quartically with system size**, restricting their use for large systems.  

### The Role of the RI Method in LibRI  

The **Resolution of Identity (RI)** method reduces computational cost by expanding localized orbital products onto a selected auxiliary basis set, significantly lowering computational scaling. This allows advanced methods to be applied to large systems.  

The research group developed a **unified mathematical model** for the RI method, enabling various advanced methods to share the same computational framework. This abstraction means developers can focus on **physical problems** without worrying about code optimization, reducing development complexity for both computation and method development.  

### Optimization and Applications  

LibRI incorporates a series of optimized algorithms to enhance computational speed and **parallel algorithms** for efficient resource use, enabling large-scale, high-level calculations on systems with thousands of atoms. It has already been integrated into **ABACUS**, supporting self-consistent electronic structure calculations, structural relaxation, and molecular dynamics simulations for hybrid functionals. Development of **low-scaling RPA** and **\(G_0W_0\)** functionalities is nearly complete, with internal testing underway.  

### Acknowledgments  

The development of LibRI received support from:  
- **Prof. Lixin He (USTC)**  
- **Profs. Hongming Weng and Sheng Meng (Institute of Physics)**  
- **Prof. Mohan Chen (Peking University)**  

Contributions were also made by:  
- **Minye Zhang (Institute of Physics)**  
- **Rong Shi (USTC)**  
- **Yuyang Ji (USTC)**  
- **Xinyang Dong (Beijing Academy of Artificial Intelligence, AISI)**  
- **Wenfei Li (AISI)**  
- **Qi Ou (AISI)**  
- **Yu Cao (Peking University)**  

Special thanks to the **DeepModeling community** for offering comprehensive support and providing a broader platform for model reuse and sharing.  

### Further Development
LibRI will focus on three key areas of future development:

1. **Deeper Optimization of RI Model Computations**  
   Efforts will continue to further optimize RI model computations, enabling the handling of larger systems and enhancing the degree of parallelism.

2. **Expanding High-Level Methods Compatible with the RI Model**  
   Additional advanced electronic structure calculation methods will be developed, with an emphasis on achieving greater precision and efficiency.

3. **Collaboration with DFT Software Using Localized Orbitals**  
   Partnerships will be established with DFT software based on localized orbitals, allowing more DFT programs to perform large-scale high-level method calculations.

### Project Repository  

LibRI has now joined the DeepModeling community. The project repository is available at:  
[https://github.com/deepmodeling/LibRI.git](https://github.com/deepmodeling/LibRI.git)  
(The original repository was located at: [https://github.com/abacusmodeling/LibRI.git](https://github.com/abacusmodeling/LibRI.git))  

#### How to Contribute  

We welcome everyone to participate by creating issues and submitting pull requests in the LibRI GitHub repository. Additionally, we encourage users performing electronic structure calculations to provide feedback and share their needs and challenges in materials computations. These valuable suggestions will help refine and improve LibRI further.


