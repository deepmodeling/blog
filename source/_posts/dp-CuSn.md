---
title: "What Can DP Do too? | Leveraging Deep Potential to Unveil the Phase Transition and Mechanical Property Evolution of Cu-Sn Alloys"
date: 2024-11-11
categories:
- DeePMD-kit
---

Recently, Professor Han Ye's research team from the School of Materials Science and Engineering at Shandong University of Science and Technology utilized the Deep Potential (DP) model for molecular dynamics simulations. They conducted an in-depth analysis of the phonon dispersion relations, energy-volume curves, solid-liquid interfacial structures, and mechanical properties of Cu-Sn alloys. The results were validated against density functional theory (DFT) calculations, demonstrating excellent consistency.

The radial distribution function (RDF) results computed using the DP model revealed that the disordered atomic arrangements of Cu₁₀Sn₃ and CuSn structures at 1100 K are attributed to the broadening and shortening of RDF peaks at high temperatures, indicating reduced atomic coherence.

The findings were published in Computational Materials Science under the title "Research on Cu-Sn Machine Learning Interatomic Potential with Active Learning Strategy". Master's students Liu Jinyan and Zhang Guanghao were the co-first authors, with Professor Han Ye serving as the corresponding author.

<!-- more -->

## Research Background
Metallic materials and their alloys play a crucial role in various fields. The copper-tin (Cu-Sn) alloy, composed of copper and tin, exhibits excellent wear resistance, corrosion resistance, and high strength. This alloy is widely used in industries such as electronics, automation, chemical engineering, petroleum, and casting. Its unique structure and properties make it an ideal material for manufacturing high-performance components such as bearings, gears, and valves. Additionally, it is an ideal material for 3D printing, providing a solid foundation for advancements across multiple industrial sectors.

Molecular modeling methods, especially Molecular Dynamics (MD) simulations, have rapidly advanced in studying the mechanical properties of materials, particularly in alloy systems. Zhang et al., using first-principles calculations based on Density Functional Theory (DFT), investigated the effects of different tin contents on the structure, elasticity, electronic properties, and thermal performance of Cu-Sn alloys. Zhang further studied the mechanical behavior and deformation mechanisms of Cu-Sn alloys under various influencing factors through tensile tests using MD simulations. The accuracy of MD simulations largely depends on the interatomic potential employed. However, traditional empirical potentials, such as the Lennard-Jones (L-J) potential, Embedded Atom Method (EAM), and Modified Embedded Atom Method (MEAM), are primarily developed based on experimental data and empirical rules, limiting their applicability and modeling scope. Although these empirical potentials significantly enhance the efficiency of MD simulations, the accuracy of their results remains a topic of debate.

In this study, we constructed a Deep Potential (DP) model for the Cu-Sn system based on deep neural networks. An active learning strategy was adopted to thoroughly explore phase space and minimize manual intervention, thereby generating a reliable interatomic potential. With continuous training and optimization, the accuracy of the DP model's predictions improved significantly. The DP model for the Cu-Sn system accurately reproduces the results of first-principles calculations in predicting energy and mechanical properties.

## Results and Discussion
First, we performed molecular dynamics (MD) simulations of phonon dispersion relations using the constructed DP potential model and compared the results with DFT calculations. As shown in Figure 4(a), the phonon dispersion curves obtained using the DP potential align well with the DFT results. The DP interatomic potential effectively reproduces the DFT data, indicating its ability to accurately describe the phonon behavior of the Cu₁₀Sn₃ structure. Figure 4(b) illustrates the phonon spectrum of the CuSn structure. The acoustic branches and most optical branches derived from the DP potential agree with the DFT results, with only the highest-frequency optical branch being slightly underestimated, a trend observed in previous studies. These findings demonstrate that the DP model trained via deep neural networks achieves computational accuracy comparable to that of DFT methods. This model can be applied in MD simulations to further explore the structures and properties of Cu-Sn alloys.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp1.png# pic_center width="100%" height="100%" /></center>


Second, for the Cu₁₀Sn₃ and CuSn structures, MD simulations using the DP model yielded energy-volume curves consistent with DFT results, as shown in Figures 5(a) and 5(c), validating the feasibility of the DP model. To further evaluate the accuracy of the DP model, energy values were computed across different volumes, and their standard deviations were analyzed. As illustrated in Figures 5(b) and 5(d), the standard deviations are minimal near the energy minima. This minimal standard deviation further confirms the DP model's accuracy in describing equilibrium positions on the energy-volume curve. This finding provides critical insights for further studies on the mechanical properties and phase transition behaviors of materials.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp2.png# pic_center width="100%" height="100%" /></center>

To optimize the mechanical properties and applications of alloys, understanding the structural characteristics of solid-liquid interfaces is considered highly significant. At the upper-left corners of Figures 6(a) and 6(b), both structures exhibit typical ordered states at 800 K, reflecting highly regular and periodic arrangements of atoms or molecules. However, at 1100 K, both structures display disordered states, with atomic arrangements appearing random and irregular. In the lower-right corners of Figures 6(a) and 6(b), separation between Cu and Sn is observed, consistent with the findings of Karthik [11].
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp3.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp4.jpeg# pic_center width="100%" height="100%" /></center>

To verify the separation between Cu and Sn, radial distribution functions (RDFs) for Cu-Cu, Cu-Sn, and Sn-Sn were statistically analyzed at 800 K and 1100 K, as shown in Figures 6(c) and 6(d). The results indicate that at high temperatures, RDF peaks become broader and shorter, suggesting reduced atomic coherence. Notably, the first peaks in Cu-Cu and Sn-Sn RDFs shift significantly leftward, indicating increased clustering of Cu and Sn atoms under high-temperature conditions, resulting in a distinctly nonuniform distribution.

Finally, we analyzed the stress-strain curves of Cu₁₀Sn₃ and CuSn structures while considering the effects of strain rate, temperature, and model size, and compared the results with DFT calculations. The findings demonstrate that the DP potential constructed in this study accurately describes mechanical properties such as the elastic modulus of the Cu-Sn system. This provides a novel approach for investigating the mechanical properties of the Cu-Sn system.
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp5.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp6.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp7.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dp_cusn/dp8.png# pic_center width="100%" height="100%" /></center>



## Conclusions
The energy and forces predicted by the DP potential function, fitted using a deep neural network, are in good agreement with first-principles calculations, validating its accuracy. The study revealed that Cu₁₀Sn₃ and CuSn undergo energy transitions at 900–1000 K and 1000–1100 K, respectively, with phase transition temperatures deviating by approximately 50 K from the phase diagram description. At 800 K, both structures exhibit ordered states, while at 1100 K, they transition to disordered states. The separation of Cu and Sn atoms was confirmed through radial distribution function analysis. 

The elastic modulus of Cu₁₀Sn₃ (103.9 GPa) is higher than that of CuSn (71.61 GPa), indicating that the former possesses better ductility. While the elastic modulus is insensitive to strain rate, the tensile strength increases with higher strain rates. As temperature rises, the elastic modulus of both structures gradually decreases, leading to reduced elastic deformation capacity. Overall, this research provides critical insights into the phase transition behavior and mechanical properties of Cu-Sn alloys.