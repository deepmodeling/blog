
---
title: "What Can Uni-Mol Do too? | Multi-Objective Optimization Unlocks an Evolutionary New Scheme in Chemical Product Design"
date: 2024-10-16
categories:
- Uni-Mol
mathjax: true
---

On July 15, 2024, Bilal Aslan from the University of Cape Town, Flavio Correa da Silva from the University of São Paulo, and Geoff Nitschke from the University of Cape Town collaborated and published a research titled "Multi-Objective Evolution for Chemical Product Design" at the Genetic and Evolutionary Computation Conference. This research developed a chemical product design method based on multi-objective evolutionary optimization, innovatively combined deep learning and evolutionary algorithms, optimized molecular properties, and utilized the Uni-Mol model to assess molecular toxicity, providing a brand-new solution for the design and optimization of chemical products.

<!-- more -->

## Research Background

In the field of chemical product design, optimizing the target properties in molecular structures has always been an extremely challenging task. Traditional optimization methods mainly rely on laboratory experiments, which are not only time-consuming and costly but also often struggle to identify ideal molecular candidates when faced with the vast chemical molecular design space. With the development of computer technology, computational methods based on deep learning and multi-objective evolutionary optimization have gradually emerged in chemical product design. They can generate and screen molecules that meet specific property requirements in a short time.

However, there are difficulties in comparing the technical performance of these computational methods because both quantitative evaluation and the diversity and innovativeness of the techniques in generating molecular candidates need to be considered. Therefore, this study proposed a multi-objective evolutionary optimization framework that combines quantitative and qualitative evaluation. The aim is to more comprehensively compare different optimization techniques through these two evaluation methods, helping chemical product design to achieve molecular property optimization more efficiently and ensuring that the generated molecules meet the requirements and possess innovativeness.

## Uni-Mol Facilitates Toxicity Evaluation in Chemical Product Design 

In this research, Uni-Mol was employed for fish toxicity assessment of molecules in chemical product design. Uni-Mol is a universal 3D molecular representation learning framework pre-trained on the 3D structures of over 210 million molecules. The research team used a 3D structure model pre-trained with RDKit and further fine-tuned the Uni-Mol model with data extracted from the public PubChem database to create a model specifically for evaluating molecular toxicity.

During the molecular generation process, a multi-objective optimization method based on evolutionary algorithms was adopted. Firstly, a set of initial seed molecules with a minimum 80% similarity threshold was selected from the PubChem database. Subsequently, the Uni-Mol model was used to evaluate the toxicity of molecules, eliminating those with potential fish toxicity. The optimization process iteratively generated new molecules by specifically selecting parent molecules based on the similarity threshold and generating offspring molecules according to hyperparameters (β and λ). The newly generated molecules were screened based on target properties, including minimizing molecular weight and molecular complexity and maximizing XLogP, while ensuring that the screened molecules were non-toxic. The optimization process continued for multiple generations until stability criteria were met or the running time limit was reached, ensuring that the generated molecules not only satisfied functional requirements but also conformed to safety standards.

This innovative application demonstrated the powerful capabilities of Uni-Mol in molecular toxicity prediction (Figure 2: Box plots of molecular properties such as molecular complexity, molecular weight, XLogP, and reference similarity related to the optimization process (including toxicity evaluation). The data shows that these properties fluctuated towards the target values during the optimization process, indirectly supporting the role of Uni-Mol in molecular screening), providing crucial support for the safe design of chemical products.

## Introduction to the Multi-Objective Evolutionary Optimization (MOEO) Method

The implementation of multi-objective evolutionary optimization (MOEO) in chemical product design mainly includes the following steps:

1. **Optimization Objectives**: The optimization objectives include minimizing molecular weight and molecular complexity, ensuring the optimal value of XLogP, and eliminating molecules with fish toxicity.

2. **Seed Molecule Selection**: The process begins with the selection of seed molecules with 80% similarity to the reference molecule. A search space is defined around these seed molecules to ensure that candidate molecules are close in characteristics to these seed molecules.

3. **Toxicity Evaluation**: By using the model trained with Uni-Mol, fish toxicity evaluation of molecules is performed to screen out safe molecules.

4. **Multi-Objective Optimization Process**: Using multi-objective optimization strategies (such as MO-CMA-ES), new candidate molecules are generated based on the similarity of seed molecules. By controlling parameters such as similarity thresholds, parent selection, and offspring selection, the molecular candidate set is gradually optimized to ensure its performance meets the objectives.



<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/Uni-Mol_Oct_16_2024/Table%201.webp pic_center width="100%" height="100%" /></center>

*Table 1* presents the property constraints used in chemical product design during the experiment. The table is divided into two parts: constraints during the experiment (In - experiment) and constraints after the experiment (Post - experiment).

1. **Molecular Complexity**:

- During the experiment: Molecular complexity is constrained to be less than or equal to 500.

- After the experiment: The optimized molecular complexity needs to be in the range of 250 to 350.

2. **Molecular Weight**:

- During the experiment: Molecular weight is restricted to be less than or equal to 500.

- After the experiment: The optimized molecular weight needs to be in the range of 250 to 350.

3. **XLogP (a lipophilicity index of molecules)**:
   
- During the experiment: XLogP needs to be greater than or equal to 4.

- After the experiment: The optimized XLogP value needs to be in the range of 5 to 10.

The design purpose of these constraints is to ensure that the molecules generated during the optimization process have good performance and practical application feasibility. The constraints during the experiment are relatively loose, allowing more possibilities to be explored in the early stage, while the constraints after the experiment are more stringent to guarantee that the finally generated molecules meet specific chemical product design standards.


## Results and Discussion

This part focuses on analyzing the application effect of the multi-objective evolutionary optimization (MOEO) method in chemical product design. The research team conducted 50 generations of evolutionary runs and 20 independent experiments to evaluate the performance of each method in escaping local optima and exploration behavior. The results are presented as follows:

1. Diversity: Figure 1 shows the variation in the number of generated molecules during the evolutionary process by using the MO-CMA-ES algorithm in direct correlation search and extended search methods.

- Direct Correlation Search: This method generates a relatively small number of molecules, mainly searching around the initial seed molecules within a limited search space, resulting in relatively low molecular diversity.

- Extended Search: Through extended search, more molecular candidates can be discovered, and the number of generated molecules gradually increases during the evolutionary process, demonstrating the advantage of this method in expanding the search space and increasing molecular diversity.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/Uni-Mol_Oct_16_2024/Pic%201.webp pic_center width="100%" height="100%" /></center>

*Figure 1*: The number of molecules discovered by the MO-CMA-ES algorithm using direct correlation search or extended search.

2. Quality of the Optimized Solution Set:

Figure 2 shows that after optimization by MO-CMA-ES, the characteristics of different molecules are well controlled. Although some properties (such as XLogP) exhibit relatively large fluctuations, overall, the performance of the optimized molecules fluctuates within a small range of the target values, demonstrating the effectiveness of this optimization method in maintaining molecular characteristics and diversity.

- Upper Left: Molecular Complexity: This figure shows the distribution of optimized molecular complexity. The lower height of the box plot indicates that the optimized molecular complexity remains in a relatively concentrated range, suggesting that multi-objective optimization effectively reduces molecular complexity.

- Upper Right: Molecular Weight: The distribution of molecular weight is also optimized to a relatively concentrated range, indicating that the optimization method effectively controls molecular weight to meet the expected standards.

- Lower Left: XLogP (Lipophilicity): The value of XLogP fluctuates relatively widely but still remains within the target range. The wider distribution indicates that more molecular candidates were explored during the optimization process.

- Lower Right: Reference Similarity: Reference similarity represents the similarity between the optimized molecules and the seed molecules. The optimization results show that the molecular similarity is high, indicating that most of the generated molecules still retain the key characteristics of the reference molecules.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/Uni-Mol_Oct_16_2024/Pic%202.webp pic_center width="100%" height="100%" /></center>

*Figure 2*: Box plot comparison of compound properties. Upper Left: Molecular Complexity; Upper Right: Molecular Weight; Lower Left: XLogP; Lower Right: Reference Similarity.

## Conclusions

This work compared two search heuristic methods used in multi-objective optimization (MOO), namely direct correlation search and extended search, applied in chemical product design. Experimental results show that extended search can improve the diversity of the solution set without affecting the quality of the obtained solutions. The main contribution of this research lies in designing appropriate evaluation metrics to compare different optimization strategies, especially from the perspectives of solution set diversity and solution set quality.

During the research process, Uni-Mol played an important role, especially in molecular toxicity prediction. Through the trained Uni-Mol model, the research was able to effectively screen molecules with fish toxicity, ensuring that the optimization results not only achieved breakthroughs in performance but also met safety standards.

Experimental results also indicate that the chemical design space is unevenly distributed in terms of molecular similarity and its corresponding observable property values, especially in multi-objective optimization scenarios, where it is prone to falling into local optima. Future work will focus on enhancing dynamic parameter optimization, fine-tuning parameter interactions (such as 𝛽 and 𝜆), and expanding the dataset through generative adversarial networks (GANs) and evolutionary transfer learning to avoid local optima and generate more diverse solutions.
