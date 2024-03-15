---
title: "OpenLAM | Visualization and Analysis of Learned Representations in DPA-2: Encoding Chemical and Configurational Informationt"
date: 2024-03-14
categories:
- OpenLAM
---
The slogan for OpenLAM is "Conquer the Periodic Table!" We hope to provide a new infrastructure for microscale scientific research and drive the transformation of microscale industrial design in fields such as materials, energy, and biopharmaceuticals by establishing an open-source ecosystem around large microscale models. Relevant models, data, and workflows will be consolidated around the AIS Square; related software development will take place in the DeepModeling open-source community. At the same time, we welcome open interaction from different communities in model development, data sharing, evaluation, and testing.

See [AIS Square](https://www.aissquare.com/openlam) for more details.
<!-- more -->

Recently, we reveal a remarkable correspondence between the learned representations by DPA-2 and existing chemical knowledge and the periodic table. And the DPA-2 representation effectively distinguishes between various chemical and configurational environments, atoms sharing similar chemical and configurational environments are closer in the representation space learned by the DPA-2 model. It underscores the potential of the proposed model architecture and the multi-task training scheme.

![image](https://github.com/Chengqian-Zhang/blog/assets/100290172/c6feeb3b-1c91-4986-88f4-a7340e09e162)

We present a visualization of the update of single-atom representations by the final repformer layer using a 2-dimensional t-SNE plot, as depicted in Fig.4. In Fig.4(a), colors denote distinct groups in the periodic table, as annotated in Fig.4(b). Notably, Fig.4(a) reveals that representations of identical chemical species tend to form cohesive clusters in the t-SNE latent space. The distribution of these representations distinctly aligns with known chemistry: The elements in groups IA and IIA are clustered at the top right of the t-SNE plot; The non-metals cluster predominantly at the top left and bottom; The transition metals, typically positioned at the middle of the periodic table, are accordingly situated in the central region of the t-SNE figure. However, hydrogen (H) presents an exception, exhibiting two clusters: one aligned with metals, primarily in water datasets, and another near non-metals, particularly in molecular datasets such as Drug, ANI-1x, and Transition-1x.

Elements such as Copper (Cu), Silver (Ag), and Gold (Au) in group IB exhibit a tendency to cluster closer to Lithium (Li) than other transition metals due to their shared possession of one s-electron in the outermost electron shell. Similarly, representations of group IIA elements like Calcium (Ca) and Strontium (Sr) closely associate with those of group IIB elements such as Zinc (Zn) and Cadmium (Cd) owing to their shared possession of two s-electrons in the outermost electron shell. Additionally, there's a discernible trend for elements from the same group in the periodic table to cluster together, as evident with Phosphorus (P), Arsenic (As), and Antimony (Sb) from group VII, and Selenium (Se) and Tellurium (Te) from group VIII.

The DPA-2 representation effectively distinguishes between various chemical and configurational environments, as showcased in Fig.4(c-e). In Fig.4(c), representations of Aluminum (Al) atoms from the Alloy and OC2M datasets are depicted. The color gradient from purple to yellow indicates the distance of the Al atom from the closest adsorbate in the OC2M dataset, while Al atoms from the Alloy dataset (all-metal environment) are colored red. Notably, Al atoms distanced from adsorbates closely resemble those in the Alloy dataset, indicative of similar chemical and configurational environments, whereas those in proximity to adsorbates exhibit discernible differences (see the red-circled blue cluster). Similarly, Fig.4(d) illustrates representations of Carbon (C) atoms in the Drug and OC2M datasets. Carbon atoms in adsorbates closer to catalyst materials are positioned farther away in latent space from representations in the Drug dataset due to more pronounced differences in their chemical and configurational environments.

Moreover, the DPA-2 representation shows insensitivity to DFT labeling accuracy. As demonstrated in Fig.4(e), representations of sulfur (S) in SSE-PBE (labeled with PBE exchange correlation functional) and SSE-PBESol (labeled with PBE-Sol exchange correlation functional) datasets exhibit mutual overlap. The S atoms form two clusters, with one cluster indicating a phosphorus neighboring atom and the other representing a neighboring Si/Ge/Sn atom.

In summary, our analysis reveals that atoms sharing similar chemical and configurational environments are closer in the representation space learned by the DPA-2 model. Thus, the DPA-2 representation emerges as a promising candidate for encoding chemical and configurational information in molecular and condensed-phase applications.


