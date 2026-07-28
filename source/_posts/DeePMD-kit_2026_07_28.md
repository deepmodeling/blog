---
title: "What Can DP Do too? | Microstructure and Thermophysical Properties of LiF-NaF-KF-ThF₄ Molten Salts: A Deep Potential Molecular Dynamics Study on Composition-Temperature Dependence"
date: 2026-07-28
categories:
- DeePMD-kit
---

Molten salt reactors (MSRs), as important candidates for Generation IV advanced nuclear energy systems, feature fluoride molten salts (such as the LiF-NaF-KF ternary eutectic system FLiNaK) as core functional materials. Their high-temperature stability, excellent thermal conductivity, and ability to dissolve actinides make them ideal carriers for liquid nuclear fuel and coolants. However, the microstructural coordination environment and thermophysical property evolution of the key actinide ion Th⁴⁺ in thorium-based MSRs under different alkali metal cation ratios have lacked systematic study. How to efficiently and accurately screen fuel salt formulations that balance thermal storage, transport properties, and structural stability across a wide compositional space has become a critical bottleneck limiting MSR optimization.


<!-- more -->
To address this challenge, a team led by Associate Researcher Tao Bo from the Ningbo Institute of Materials Technology & Engineering, Chinese Academy of Sciences, in collaboration with North China Electric Power University and other institutions, published a research paper in **Chemical Engineering Science** titled “**Microstructure and thermophysical properties of LiF-NaF-KF-ThF₄ molten salts: a deep potential molecular dynamics study on composition-temperature dependence**”. They innovatively combined active learning with deep potential molecular dynamics to systematically study the FLiNaKTh quaternary molten salt system across 21 different LiF-NaF-KF ratios. By constructing a high-precision DP model, this work successfully revealed the decisive influence mechanisms of composition control on Th⁴⁺ coordination structure, density, heat capacity, viscosity, and ionic conductivity, providing key theoretical support for the composition design and performance matching of MSR fuel salts.

## Accuracy****DP Model: The Core Engine Bridging the Gap between Quantum Accuracy and Classical Efficiency

At the outset, the core technical challenge faced by the team was that traditional ab initio molecular dynamics (AIMD) consumed enormous computational resources, making it difficult to cover a broad compositional space; while classical molecular dynamics (MD) could handle larger systems, its accuracy heavily relied on the reliability of force fields, especially for complex fluoride systems containing Th⁴⁺, where reliable parameterization schemes were lacking. To this end, the study employed the DPGEN software for active learning, iteratively exploring configuration space and generating a high-precision dataset. As shown in Figure 1, the active learning workflow passed through four cyclic steps: dataset construction, model training, configuration exploration, and DFT labeling.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic4.png pic_center width="100%" height="100%" /></center>

Figure 1 Workflow diagram of DPGEN. (a) Dataset. (b) Training. (c) Exploration. (d) Labeling.

During training, the DP model decomposed the total energy of the system into the energy contributions of individual atoms and achieved accurate encoding of local atomic environments through deep neural networks composed of embedding and fitting networks. After 17 iterative rounds, the final training dataset contained 2680 configurations, and a high-precision DP model was obtained after 2 million training steps. The root-mean-square error of the model for energy prediction was only 0.763 meV/atom, and for atomic forces it was 0.060 eV/Å, in excellent agreement with DFT calculations (see Figures 2b, 2c, 2f, 2g). More importantly, the DP model’s prediction of the temperature-dependent density of eutectic FLiNaK deviated by less than 2% from experimental values reported by Janz and Cibulkova et al. (see Figure 2d), validating its reliability in predicting thermophysical properties. Figure 2h further shows that the radial distribution function (RDF) curves from DPMD and AIMD simulations completely overlap, demonstrating that the DP model achieves AIMD-level accuracy.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic5.png pic_center width="100%" height="100%" /></center>

Figure 2 (a) The loss function of FLiNaKTh molten salt. (b) Comparison between DP predicted energies and DFT calculations. (c, f, g) Atomic forces predicted by the DP versus DFT results. (d) Density of eutectic FLiNaK (predicted by DP) as a function of temperature compared with experimental values. (e) RMSE of energy and forces for FLiNaKTh (trn: training dataset; val: validation dataset). (h) RDF of the FLiNaK (eutectic)–12 mol% ThF₄ molten salt system at 893 K predicted by DP and DFT.

## **Microstructural Analysis:****Cation Polarization Regulation of Th⁴⁺ Coordination Environment

At 873 K, the first peak positions of Li-F, Na-F, K-F, and Th-F ion pairs predicted by DP were 1.827, 2.205, 2.597, and 2.303 Å, respectively, in high agreement with AIMD results by Frandsen et al. and polarized force field results by Dai et al. By analyzing the first peak intensities, the study established the order of ion pair interaction strengths as: Th-F > Li-F > Na-F > K-F (see Figure 3). This trend is perfectly explained by charge density theory: Th⁴⁺, with its highest charge state and small ionic radius, exhibits the strongest electrostatic interactions, while alkali metal ions, as their radii increase (Li⁺ < Na⁺ < K⁺), have decreasing charge densities and correspondingly weaker interactions with F⁻.  
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic8.png pic_center width="100%" height="100%" /></center>

Figure 3 RDFs predicted by the DP model for the FLiNaKTh molten salt with different LiF-NaF-KF compositions (with fixed 12 mol% ThF₄) at 873 K: (a) Li-F, (b) Na-F, (c) K-F, and (d) Th-F.

A more critical finding was that the average coordination number (CN) of Th⁴⁺ exhibited significant systematic variation with composition (see Table 1). Under the condition of fixed ThF₄ concentration of 12 mol%, increasing the mole fraction of either LiF or NaF increased the average Th-F CN, while increasing KF led to a decrease in CN (see Figure 4). This phenomenon is attributed to the strong polarization of the surrounding F⁻ electron clouds by the small-radius, high-charge-density Li⁺ and Na⁺ ions, promoting the localization of F⁻ around Th⁴⁺; in contrast, the large-radius K⁺ has weak polarizing ability, weakening the F⁻ redistribution effect. Compared with the high CN of 7.70 in the pure ThF₄ system, the Th-F CN generally decreased in the mixed molten salt systems (see Table 2), indicating that the introduction of alkali metal cations disrupts the highly coordinated environment of Th⁴⁺ in pure fluoride.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic9.png pic_center width="100%" height="100%" /></center>

Figure 4 Average Th–F CN in FLiNaKTh molten salts (with fixed 12 mol% ThF₄) as a function of composition at 873 K, with constant concentrations of (a) LiF, (b) NaF, and (c) KF.

## Thermophysical Properties: Dominant Composition Factors for Density and Heat Capacity

Density calculation results indicated that at 873 K, the density of the system was primarily governed by KF concentration. Since K⁺ has the largest radius (1.38 Å), increasing the KF mole fraction significantly increases the molar volume, thereby decreasing density. Conversely, increasing LiF or NaF (radii of 0.76 Å and 1.02 Å, respectively) is beneficial for increasing ion packing density (see Figures 5a-5c). It is noteworthy that when KF concentration was held constant, the density remained relatively stable even with large changes in the LiF/NaF ratio (see Figure 5d), further confirming the dominant role of KF on density.  
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic12.png pic_center width="100%" height="100%" /></center>

Figure 5 (a)-(c) *ρ* of FLiNaKTh molten salts (with fixed 12 mol% ThF₄) as a function of composition at 873 K with constant (a) LiF, (b) NaF, and (c) KF concentration, respectively; (d) Temperature dependence of *ρ* for four different FLiNaKTh molten salts (with fixed 12 mol% ThF₄) compositions.

Analysis of heat capacity (Cp) revealed another composition regulation law. As shown in Figure 6a, at 923 K, LiF-rich systems exhibited the highest Cp values (reaching 1.471 J·g⁻¹·K⁻¹ for the pure LiF-12%ThF₄ system), while KF-rich systems showed the lowest (0.971 J·g⁻¹·K⁻¹). Notably, compared with the pure FLiNaK eutectic system, the introduction of ThF₄ significantly reduced the thermal storage capacity. The Cp value of eutectic FLiNaK predicted by DPMD was 1.742 J·g⁻¹·K⁻¹, which is in good agreement with the experimental value (1.63 J·g⁻¹·K⁻¹) by the Rudenko team and the calculation result (1.769 J·g⁻¹·K⁻¹) by Salanne et al. Within the temperature range of 923–1223 K, the Cp of each system remained essentially constant (see Figure 6b), reflecting the excellent thermal stability of FLiNaKTh molten salts over a wide temperature range.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic13.png pic_center width="100%" height="100%" /></center>

Figure 6 (a) Ternary phase diagram of heat capacity (*C*p in J⋅g⁻¹⋅K⁻¹) for FLiNaKTh (with fixed 12 mol% ThF₄) molten salts at 923 K; (b) Temperature dependence of *C*p for four different FLiNaKTh compositions (with fixed 12 mol% ThF₄).

## Transport Properties: Composition Dependence of Diffusion, Viscosity, and Conductivity

The study of transport properties revealed differential regulation mechanisms of composition on ion migration behavior. The self-diffusion coefficient (SDC) of Th⁴⁺ was mainly suppressed by NaF concentration: increasing the NaF mole fraction not only raised the average CN of Th⁴⁺ (see Figure 4b), stabilizing its coordination environment, but also significantly increased the viscosity of the system (see Figure 8b). These dual effects jointly restricted the migration ability of Th⁴⁺ (see Figures 7a-7c). The SDCs of all ions exhibited typical Arrhenius temperature dependence, and DPMD calculations were in high agreement with experimental values by Umesaki et al. (see Figures 7i-7l), validating the model’s reliability in predicting transport properties.  
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic16.png pic_center width="100%" height="100%" /></center>

Figure 7 (a–c) SDC of Th⁴⁺ in FLiNaKTh molten salts at 873 K versus composition concentration at fixed (a) LiF, (b) NaF, and (c) KF content; (d-h) Temperature dependence of SDC for different ion species (d) Li⁺, (e) F⁻, (f) Na⁺, (g) K⁺, and (h) Th⁴⁺ in four distinct FLiNaKTh compositions (fixed 12 mol% ThF₄); (i–l) Temperature dependence of SDC for (i) Li⁺, (j) F⁻, (k) Na⁺, and (l) K⁺ in eutectic FLiNaK molten salts.

Viscosity analysis indicated that Na⁺ plays a dominant role in controlling the viscosity of FLiNaKTh molten salts (12 mol% ThF₄). Compared with K⁺, the stronger Na⁺-F⁻ interaction reduces Na⁺ mobility; compared with Li⁺, the larger ionic radius and higher atomic mass of Na⁺ lead to slower diffusion. Therefore, increasing NaF concentration significantly raises the system viscosity (see Figures 8a-8c). The viscosity of eutectic FLiNaK predicted by DPMD as a function of temperature was in high agreement with experimental results by Torklep et al. (see Figure 8d), decreasing from 6.754 mPa·s at 793 K to 1.665 mPa·s at 1073 K.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic17.png pic_center width="100%" height="100%" /></center>

Figure 8 (a-c) η of FLiNaKTh molten salts (with fixed 12 mol% ThF₄) at 873 K as a function of composition concentration, with constant (a) LiF, (b) NaF, and (c) KF content; (d) Temperature dependence of η for eutectic FLiNaK molten salts.

The calculation of ionic conductivity exhibited composition dependence characteristics completely different from viscosity. According to the Nernst-Einstein equation, because Li⁺ has the smallest ionic radius, its diffusion rate is significantly higher than Na⁺ and K⁺; thus, increasing LiF concentration can substantially enhance the conductivity of the system (see Figures 9a, 9c). Under fixed LiF concentration, adjusting the NaF/KF ratio had negligible effect on conductivity (see Figure 9b). This finding provides a clear design direction for engineering applications that require optimization of heat and mass transfer performance by tuning conductivity.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD-kit_2026_07_28/pic18.png pic_center width="100%" height="100%" /></center>

Figure 9 Electrical conductivity of FLiNaKTh molten salts (12 mol% ThF₄ fixed) at 873 K as a function of composition concentration with constant (a) NaF, (b) LiF, and (c) KF content; (d) Temperature dependence of electrical conductivity for four different FLiNaKTh compositions (12 mol% ThF₄ fixed).

## Summary and Outlook

Through the innovative combination of DPMD and active learning, this study successfully filled the gap in the research on the microstructure and thermophysical properties of FLiNaKTh molten salt systems across a wide composition range. The study clarified the order of ion pair interaction strengths, the cation polarization regulation law of Th⁴⁺ coordination number, and the respective dominant composition factors for density, heat capacity, viscosity, and conductivity. These findings not only provide a solid theoretical foundation for understanding the composition-structure-property relationships of fuel salts for thorium-based MSRs, but also offer quantitative scientific guidance for optimizing fuel salt formulations and matching transport and thermal storage performance according to thermal-hydraulic design requirements in engineering applications.  

## Corresponding Author Introduction:

Tao Bo, Associate Researcher, Master’s Supervisor, Ningbo Institute of Materials Technology & Engineering, Chinese Academy of Sciences. Main research directions: 1) First-principles calculations, machine learning potential training, and molecular dynamics simulations of fuel salt systems for thorium-based MSRs; 2) Machine learning potential molecular dynamics simulations of thermophysical and transport properties of solid nuclear fuels; 3) Theoretical prediction and superconducting properties of novel two-dimensional materials. He has published over 90 SCI papers, with more than 2400 citations and an H-index of 30 (ResearchGate). He has led projects including the National Natural Science Foundation Young Scientists Fund and General Program.