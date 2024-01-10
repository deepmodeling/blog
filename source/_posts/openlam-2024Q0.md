---
title: "OpenLAM | 2024 Q0 Report"
date: 2024-01-10
categories:
- OpenLAM
---
The slogan for OpenLAM is "Conquer the Periodic Table!" We hope to provide a new infrastructure for microscale scientific research and drive the transformation of microscale industrial design in fields such as materials, energy, and biopharmaceuticals by establishing an open-source ecosystem around large microscale models. Relevant models, data, and workflows will be consolidated around the AIS Square; related software development will take place in the DeepModeling open-source community. At the same time, we welcome open interaction from different communities in model development, data sharing, evaluation, and testing.

See [AIS Square](https://www.aissquare.com/openlam) for more details.
<!-- more -->

## Model Structure

- The DPA-2 model structure (PyTorch based) has been released, showing a significant increase in fitting and transferability compared to the DPA-1 ([arxiv:2312.15492](https://arxiv.org/abs/2312.15492)).
- A new capability for unsupervised denoise pretraining has been added (a code branch package file and usage Readme are provided).

## Data
- The DPA-2 paper includes pretrained data for 18 systems and downstream data for 10 systems, covering over ten million frames and 73 elements (for detailed data inventory, see below; data can also be directly downloaded from [DOI:10.5281/zenodo.10428497](https://doi.org/10.5281/zenodo.10428497)).
- Four new datasets have been added for energy&force data related to electrolytes, solid-state electrolytes, chemical reactions, and methane combustion (for details, see the data inventory below).
- Seven new datasets in equilibrium state for unsupervised denoising tasks have been added, including AFLOW, MC2D/3D, CALYPSO, etc. (for details, see the data inventory below).

## Training Strategy
- The DPA-2 paper includes a multi-task pretraining framework for energy and force, supporting the combined training of datasets with different DFT settings.
- Unsupervised denoising task has been added, which is integrated into the multi-task pretraining framework (results are detailed below).

## Automation Process
- The DPA-2 paper encompasses an automated process for all stages of pretraining, fine-tuning, transferability testing, distillation, and compression (experience it at [DP Combo](https://app.bohrium.dp.tech/dp-combo) and try it on the [notebook](https://nb.bohrium.dp.tech/detail/18475433825)).
- The [AIS-Square website](https://www.aissquare.com/openlam) now includes an automated process for integrating user data, automatically [determining the coverage](https://github.com/zjgemi/lam-data-cleaning) of the pretrained model on current data.

## Competition

Coming in March...

## Teaching

Coming in February...

Readers interested in the background of the project and details of the paper can also refer to the [OpenLAM initiative](https://mp.weixin.qq.com/s/qfX7P32dKZ-VZgOtlYRy_A) and the [DPA-2 paper](https://mp.weixin.qq.com/s/qy_t-eHdZ5nNf4L8i1sKfQ) for further information.

## Conclusion

Since the release of DPA-2 less than a month ago, there have been numerous developments that can be summarized as follows:

- The DPA-2 multitask pre-training framework has added a new unsupervised training task: it is now possible to train with any data derived from different DFT calculations together, as well as denoise equilibrium state data without DFT labels, thereby learning a broader range of representation information;
- The OpenLAM initiative has incorporated more production-type data and integrated more publicly available equilibrium state crystal structure data, with the pre-training data pool continuing to expand rapidly;
- After incorporating the unsupervised training task, the overall energy prediction accuracy of the model is higher when compared fairly, indicating that information across different systems and tasks promotes mutual enhancement.

The OpenLAM initiative is currently in rapid continuous iteration. As we move towards the era of large atomic models, open-source sharing becomes an inevitable theme. We welcome like-minded individuals to join, opening up new opportunities for broader scientific discoveries and industrial applications. On the journey to conquering the periodic table of elements, we look forward to creating a new era with you!
To join the "OpenLAM Initiative", visit [AISSquare](https://www.aissquare.com/openlam).

## Appendix
- Unsupervised Denoise Method
  - Data Structure
    - Equilibrium state data consisting only of configurations without DFT computational results; noise is added separately to the coordinates and types during preprocessing (such as adding Gaussian noise to coordinate positions and masking certain element types).
  - Training Method
    - Configurations with added noise are inputted into the network, processed by DPA-2's unified descriptor and denoise fitting, to yield a denoise vector for each atom (i.e., the network's prediction of the proper displacement) as well as the element types. After restoring the configuration and element types based on the denoise vector, a loss is computed against the true configurations and element types without noise. The model is trained by minimizing this loss.
- Data Inventory
  The datasets currently used for training the DPA-2 model cover a wide range of systems including semiconductors, perovskites, alloys, surface catalysis, cathode materials, solid-state electrolytes, organic molecules, and more. This includes the newly added unsupervised equilibrium state Denoise datasets. All these data have been uploaded to the [AISSquare website](https://www.aissquare.com/), where users can find more detailed data descriptions, as well as download and use the datasets, specifically including:
  - Datasets included in the DPA-2 paper

| Index | Dataset name                      | Contributors                                                                                      |
| ----- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1     | Alloy_DPA_v1_0                    | Fuzhi Dai, Wanrun Jiang                                                                           |
| 2     | Cathode(Anode)_DPA_v1_0           | Linshuang Zhang, Jianchuan Liu                                                                    |
| 3     | Cluster_DPA_v1_0                  | Fuqiang Gong                                                                                      |
| 4     | Drug(drug-like-molecule)_DPA_v1_0 | Manyi Yang                                                                                        |
| 5     | FerroEle_DPA_v1_0                 | Jing Wu, Jiyuan Yang, YuanJinsheng Liu, Duo Zhang, Yudi Yang, Yuzhi Zhang, Linfeng Zhang, Shi Liu |
| 6     | Open_Catalyst_2020(OC20_Dataset)  | Duo Zhang                                                                                         |
| 7     | SSE-PBE_DPA_v1_0                  | Jianxing Huang                                                                                    |
| 8     | SemiCond_DPA_v1_0                 | Jianchuan Liu                                                                                     |
| 9     | H2O-PD_DPA_v1_0                   | Linfeng Zhang, Han Wang, Roberto Car, Weinan E                                                    |
| 10    | AgAu-PBE(unitary)_DPA_v1_0        | Yinan Wang, LinFeng Zhang, Ben Xu, Xiaoyang Wang, Han Wang                                        |
| 11    | AlMgCu_DPA_v1_0                   | Wanrun Jiang, Yuzhi Zhang, Linfeng Zhang, Han Wang                                                |
| 12    | Cu_DPA_v1_0                       | Yuzhi Zhang, Haidi Wang, Weijie Chen, Jinzhe Zeng, Linfeng Zhang                                  |
| 13    | Sn_DPA_v1_0                       | Fengbo Yuan                                                                                       |
| 14    | Ti_DPA_v1_0                       | Tongqi Wen, Rui Wang, Lingyu Zhu, Linfeng Zhang, Han Wang, David J Srolovitz, Zhaoxuan Wu         |
| 15    | V_DPA_v1_0                        | Rui Wang, Xiaoxiao Ma, Linfeng Zhang, Han Wang, David J Srolovitz, Tongqi Wen, Zhaoxuan Wu        |
| 16    | W_DPA_v1_0                        | Xiaoyang Wang, Yinan Wang, Linfeng Zhang, Fuzhi Dai, Han Wang                                     |
| 17    | C12H26_DPA_v1_0                   | Jinzhe Zeng, Linfeng Zhang, Han Wang, Tong Zhu                                                    |
| 18    | HfO2_DPA_v1_0                     | Jing Wu, Yuzhi Zhang, Linfeng Zhang, Shi Liu                                                      |

  - Four new datasets for energy & force data

| Index | Dataset name              | Contributors                                                 |
| ----- | ------------------------- | ------------------------------------------------------------ |
| 19    | Electrolyte               | Mengchao Shi, Yuzhi Zhang                                    |
| 20    | Solid_State_Electrolyte   | Mengchao Shi, Yuzhi Zhang                                    |
| 21    | Organic_reactions_dataset | Tong Zhu, Bowen Li                                           |
| 22    | CHO-methane-combustion    | Jinzhe Zeng, Liqun Cao, Mingyuan Xu, Tong Zhu, John ZH Zhang |

  - Seven new datasets in equilibrium state for unsupervised denoising

|       |                     |                                                                                                                                                                                                                                                                                                                  |
| ----- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Index | Dataset name        | Contributors/Link                                                                                                                                                                                                                                                                                                |
| 1     | AFLOW_MP            | [AFLOW](https://www.aflowlib.org/), [MP](https://next-gen.materialsproject.org/)                                                                                                                                                                                                                                     |
| 2     | MC2D| Davide Campi, Nicolas Mounet, Marco Gibertini, Giovanni Pizzi, Nicola Marzari, _The Materials Cloud 2D database (MC2D)_, Materials Cloud Archive 2022.84 (2022), doi: [10.24435/materialscloud:36-nd](https://doi.org/10.24435/materialscloud:36-nd).                                                            |
| 3     | MC3D                | Sebastiaan Huber, Marnik Bercx, Nicolas Hörmann, Martin Uhrin, Giovanni Pizzi, Nicola Marzari, _Materials Cloud three-dimensional crystals database (MC3D)_, Materials Cloud Archive 2022.38 (2022), doi: [10.24435/materialscloud:rw-t0](https://doi.org/10.24435/materialscloud:rw-t0).                        |
| 4     | ChemicalSimilarity  | Hai-Chen Wang, Silvana Botti, Miguel A. L. Marques, _Finding new crystalline compounds using chemical similarity_, Materials Cloud Archive 2021.68 (2021), doi: [10.24435/materialscloud:96-09](https://doi.org/10.24435/materialscloud:96-09).                                                                  |
| 5     | ClusterIsomer| Giuseppe Fisicaro, Bastian Schaefer, Jonas A. Finkler, Stefan Goedecker, _Principles of isomer stability in small clusters_, Materials Cloud Archive 2023.36 (2023), doi: [10.24435/materialscloud:46-nr](https://doi.org/10.24435/materialscloud:46-nr).                                                        |
| 6     | MolecularCrystal    | Rose Cersonsky, Maria Pakhnova, Edgar Engel, Michele Ceriotti, _Lattice energies and relaxed geometries for 2'707 organic molecular crystals and their 3'242 molecular components._, Materials Cloud Archive 2023.5 (2023), doi: [10.24435/materialscloud:71-21](https://doi.org/10.24435/materialscloud:71-21). |
| 7     | CALYPSO_database    | Zhenyu Wang, Xiaoshan Luo                                                                                                                                                                                                                                                                                        |

  - Latest Performance of the Multi-task Pretrained Model (22 energy force systems + 7 unsupervised denoise systems)

|                        | Weight | DPA2 (multi-task 18 heads for 1m steps) | DPA2 (multi-task 29 heads for 1.84m steps) |
| ---------------------- | ------------ | --------------------------------------------- | ------------------------------------------------ |
|                        |              | Energy                                        | Force                                            | Energy | Force |
| Alloy                  | 2.0          | 36.5                                          | 169.5                                            | 32.2 | 160.5 |
| Cluster                | 1.0          | 34.4                                          | 162.5                                            | 40.6 | 171.0 |
| Anode                  | 1.0          | 3.3                                           | 39.8                                             | 2.5 | 45.0 |
| FerroEle               | 1.0          | 4.4                                           | 44.2                                             | 1.7 | 47.2 |
| AgAu-PBE               | 0.2          | 9.4                                           | 28.2                                             | 10.9 | 31.2 |
| Cu                     | 0.1          | 3.6                                           | 18.2                                             | 6.8 | 21.2 |
| Sn                     | 0.1          | 24.8                                          | 69.7                                             | 17.3 | 76.7 |
| Ti                     | 0.1          | 16.3                                          | 112.4                                            | 26.8 | 133.7 |
| AlMgCu                 | 0.3          | 4.9                                           | 23.4                                             | 10.6 | 28.6 |
| V                      | 0.1          | 13.9                                          | 110.2                                            | 16.7 | 121.3 |
| W                      | 0.1          | 24.6                                          | 157.9                                            | 45.8 | 174.0 |
| C12H26                 | 0.1          | 62.5                                          | 710.6                                            | 75.3 | 1486.7 |
| SSE-PBE                | 1.0          | 2.1                                           | 64.0                                             | 2.2 | 75.7 |
| HfO2                   | 0.1          | 3.9                                           | 102.8                                            | 5.0 | 108.4 |
| SemiCond               | 1.0          | 6.5                                           | 131.9                                            | 7.2 | 139.8 |
| Drug                   | 2.0          | 20.6                                          | 128.9                                            | 21.8 | 140.6 |
| OC2M                   | 2.0          | 29.3                                          | 157.6                                            | 26.7 | 138.7 |
| H2O-PD                 | 1.0          | 3.2                                           | 39.7                                             | 1.0 | 45.6 |
| **Weighted sum** |              | **18.6**                               | **116.3**                                        | **18.3** | **123.6** |
|                        |              |                                               |                                                  |  |  |
| Electrolyte            | 1.0          | /                                             | /                                                | 2.9 | 64.3 |
| SSE_new                | 1.0          | /                                             | /                                                | 3.2 | 72.4 |
| Organic_reactions      | 1.0          | /                                             | /                                                | 15.1 | 97.7 |
| Methane-combustion     | 1.0          | /                                       | /                                          | 147.2 | 251.4 |
