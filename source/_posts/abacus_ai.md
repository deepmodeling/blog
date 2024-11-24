---
title: "What Can ABAUCS Do too? | Using AI to describe the kinetic energy of electrons in semiconductors"
date: 2024-11-18
categories:
- ABACUS
mathjax: true
---

Recently, doctoral student Sun Liang and researcher Chen Mohan from the Center for Applied Physics and Technology at Peking University implemented a machine learning-based kinetic energy density functional (multi-channel ML-based Physically-constrained Non-local KEDF, or CPN KEDF) in the domestically developed open-source density functional theory software ABACUS (Atomic-based Ab initio Computation at UStc). This functional employs a multi-channel architecture, extending the previously developed MPN KEDF (ML-based Physical-constrained Non-local KEDF) [1], which was designed for simple metallic systems, to semiconductors. The method achieved promising results in tests on ground-state energy and ground-state charge density, laying the groundwork for the development of machine learning-based kinetic energy density functionals with broader applicability. The article, titled “Multi-channel machine learning-based nonlocal kinetic energy density functional for semiconductors,” has been published in the journal Electronic Structure (DOI: 10.1088/2516-1075/ad8b8c) [2].

<!-- more -->

## Research Background

### **Orbital Free Density Functional Theory and Kinetic Energy Density Functional**

**Orbital Free Density Functional Theory (OFDFT)** is a highly efficient density functional theory calculation method, benefiting from its computational complexity of $O(N)$ or $O(N \ln N)$, where $N$ is the number of atoms in the system. This enables it to handle systems with millions of atoms. In contrast, the commonly used Kohn–Sham DFT (KSDFT) has a computational complexity generally around $O(N^3)$, which is limited to processing systems containing thousands of atoms at most. The OFDFT algorithm has been implemented in ABACUS.

The lower computational complexity of OFDFT stems from its treatment of the non-interacting kinetic energy as being dependent only on the electron density in the kinetic energy density functional (KEDF). As a result, it avoids the most time-consuming diagonalization of the Kohn–Sham density matrix. However, the total energy (including kinetic energy) is of the same order of magnitude as interaction energies in condensed matter and molecular systems. Therefore, the accuracy of the approximate kinetic energy functional significantly affects the precision of OFDFT calculations.

Over the past few decades, researchers have proposed various kinetic energy functionals suitable for different systems. For instance:
- **Wang-Teter (WT) functional** [3]: applicable to simple metals;
- **Wang-Govind-Carter (WGC) functional** [4]: applicable to simple metals;
- **Huang-Carter (HC) functional** [5]: applicable to semiconductors.

Despite these developments, finding a universal kinetic energy functional capable of describing both simple metals and semiconductors remains a challenge.

### **Machine Learning-Based Kinetic Energy Density Functionals**

In recent years, researchers have begun exploring machine learning to construct kinetic energy density functionals. These methods leverage machine learning models to capture the relationship between the electron density (or related quantities) and kinetic energy. However, there is currently no unified framework for constructing such functionals. To address this, we propose three fundamental requirements for machine learning-based kinetic energy density functionals:

1. **Incorporation of nonlocal information**: Since the non-interacting kinetic energy is a highly nonlocal quantity, machine learning-based functionals should include nonlocal electron density information.
2. **Adherence to physical constraints**: Although the exact form of the non-interacting kinetic energy functional is unknown, several physical properties (e.g., scaling behavior, Pauli contribution, free electron gas [FEG] limit) must be satisfied. Incorporating these physical properties into machine learning models can improve their accuracy and transferability.
3. **Stability in computation**: Numerical stability is essential as the functional serves as the foundation for practical calculations.

Based on these requirements, we constructed the **MPN functional**, expressed as:

$$\int w(|\mathbf{r} - \mathbf{r}'|) f(\rho(\mathbf{r})) \, \mathrm{d}\mathbf{r},$$

where $w(|\mathbf{r} - \mathbf{r}'|)$ is the kernel describing nonlocal interactions, and $f(\rho(\mathbf{r}))$ is the function of the local electron density. In addition, the MPN functional incorporates penalties and constraints to ensure the three requirements mentioned above, thereby achieving numerical stability in calculations. Tests show that the MPN functional achieves high accuracy in describing simple metals and alloys.


However, we found that the MPN functional struggled to capture the bonding characteristics of semiconductors. This is because, in semiconductors, the charge density distribution differs significantly from that of simple metals: while simple metals exhibit a nearly uniform electron density, semiconductors possess distinct covalent bonding features and residual separated regions. To address this, we introduced a "multi-channel" architecture to better describe the electrons in semiconductors. 

## The Design of NN

### **Multi-Channel Architecture**

As shown in the figure, we scaled the kernel function in the MPN functional as:

$$w_\lambda(r - r') = \lambda^3 w(\lambda(r - r'))$$

and used this to replace the kernel function in the MPN functional. This allowed the input electron density to be transformed into a new set of descriptors. Thus, the scaled kernel functions define a "channel." When \( \lambda > 1 \), the kernel function is compressed, enabling it to capture local electron information. Conversely, when \( \lambda < 1 \), the kernel function is stretched, making it capable of capturing long-range electron information. Finally, the descriptors from different channels are combined into a new vector, which is input into a neural network with a structure similar to that of the MPN functional to obtain the final kinetic energy density functional.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/abacus_ai/aba1.png# pic_center width="100%" height="100%" /></center>


We named the new functionals **CPN\(_n\)**, where the subscript \(n\) represents the number of channels. To study the impact of different numbers of channels on the accuracy of the functional, we constructed three versions: **CPN\(_1\)**, **CPN\(_3\)**, and **CPN\(_5\)**. The details of the descriptors and parameters are shown in the table below.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/abacus_ai/aba2.png# pic_center width="100%" height="100%" /></center>


### **Loss Function and Training Set**

The loss function for the CPN functional is the same as that used for the MPN functional:

$$
L = \frac{1}{N} \sum_r \left[ \left(\frac{F^\text{NN}_\theta - F^\text{KS}_\theta}{\overline{F^\text{KS}_\theta}}\right)^2 + \left(\frac{V^\text{MPN}_\theta - V^\text{KS}_\theta}{\overline{V^\text{KS}_\theta}}\right)^2 + \left[F^\text{NN}_\text{FEG} - \ln(e - 1)\right]^2 \right],
$$

where $N$ is the number of spatial grid points, and $\overline{F^\text{KS}_\theta}$ and $\overline{V^\text{KS}_\theta}$ are the averages of $F^\text{KS}_\theta$ and $V^\text{KS}_\theta$, respectively.


- The first term reinforces the functional with energy-related information, enhancing the numerical stability of the model.
- The second term ensures corrections to the free electron gas (FEG) limit are not excessive, maintaining stability in calculations.

The training set for the CPN functional includes 10 semiconductor systems, covering silicon (Si) in the diamond structure as well as zincblende-structured compounds AIP, AIP, AlSb, GaP, GaAs, GaSb, InP, InAs, and InSb. Each system consists of \(27 \times 27 \times 27\) spatial grid points, totaling 196,830 grid points in the training set.

## Results
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/abacus_ai/aba3.png# pic_center width="100%" height="100%" /></center>

The figure above shows the energy-volume curve for Si in the diamond structure. The **CPN\(_1\)** KEDF, which includes only one channel, fails to produce a smooth curve. However, with an increasing number of channels, the accuracy of **CPN\(_3\)** KEDF surpasses that of the WGC KEDF, while **CPN\(_5\)** KEDF achieves accuracy comparable to that of KSDFT and HC KEDF.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/abacus_ai/aba4.png# pic_center width="100%" height="100%" /></center>

This section demonstrates the results obtained for the ground-state electron densities of Si in the diamond structure, GaAs in the zincblende structure, and systems from the training set. Firstly, all three CPN functionals successfully yield smooth electron densities. Secondly, with more channels included, the accuracy of the CPN functionals progressively improves, indicating that the multi-channel architecture effectively enhances the ability of the machine-learning-based functionals to describe semiconductors. Finally, describing covalent bonding remains a significant challenge in kinetic energy density functionals. As shown in the figure, even the HC functional, which is specifically designed for semiconductors, underestimates the electron density in covalent bond regions. However, whether in the training or testing set, **CPN\(_5\)** KEDF with five channels accurately captures and reconstructs covalent bonding structures. This demonstrates that the descriptors and multi-channel architecture effectively capture the characteristics of electron densities in semiconductors.

Reference:
[1] Sun L, Chen M. Machine learning based nonlocal kinetic energy density functional for simple metals and alloys[J]. Physical Review B, 2024, 109(11): 115135.
[2] Sun L, Chen M. Multi-channel machine learning based nonlocal kinetic energy density functional for semiconductors[J]. Electronic Structure, 2024.
[3] Wang L W, Teter M P. Kinetic-energy functional of the electron density[J]. Physical Review B, 1992, 45(23): 13196.
[4] Wang Y A, Govind N, Carter E A. Orbital-free kinetic-energy density functionals with a density-dependent kerne[J]. Physical Review B, 1999, 60(24): 16350.
[5] Huang C, Carter E A. Nonlocal orbital-free kinetic energy density functional for semiconductors[J]. Physical Review B, 2010, 81(4): 045206.
