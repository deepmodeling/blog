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

| Index | Dataset name        | Contributors/Link                                                                                                                                                                                                                                                                                                |
| ----- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | AFLOW_MP            | [AFLOW](https://www.aflowlib.org/), [MP](https://next-gen.materialsproject.org/)                                                                                                                                                                                                                                     |
| 2     | MC2D| Davide Campi, Nicolas Mounet, Marco Gibertini, Giovanni Pizzi, Nicola Marzari, _The Materials Cloud 2D database (MC2D)_, Materials Cloud Archive 2022.84 (2022), doi: [10.24435/materialscloud:36-nd](https://doi.org/10.24435/materialscloud:36-nd).                                                            |
| 3     | MC3D                | Sebastiaan Huber, Marnik Bercx, Nicolas Hörmann, Martin Uhrin, Giovanni Pizzi, Nicola Marzari, _Materials Cloud three-dimensional crystals database (MC3D)_, Materials Cloud Archive 2022.38 (2022), doi: [10.24435/materialscloud:rw-t0](https://doi.org/10.24435/materialscloud:rw-t0).                        |
| 4     | ChemicalSimilarity  | Hai-Chen Wang, Silvana Botti, Miguel A. L. Marques, _Finding new crystalline compounds using chemical similarity_, Materials Cloud Archive 2021.68 (2021), doi: [10.24435/materialscloud:96-09](https://doi.org/10.24435/materialscloud:96-09).                                                                  |
| 5     | ClusterIsomer| Giuseppe Fisicaro, Bastian Schaefer, Jonas A. Finkler, Stefan Goedecker, _Principles of isomer stability in small clusters_, Materials Cloud Archive 2023.36 (2023), doi: [10.24435/materialscloud:46-nr](https://doi.org/10.24435/materialscloud:46-nr).                                                        |
| 6     | MolecularCrystal    | Rose Cersonsky, Maria Pakhnova, Edgar Engel, Michele Ceriotti, _Lattice energies and relaxed geometries for 2'707 organic molecular crystals and their 3'242 molecular components._, Materials Cloud Archive 2023.5 (2023), doi: [10.24435/materialscloud:71-21](https://doi.org/10.24435/materialscloud:71-21). |
| 7     | CALYPSO_database    | Zhenyu Wang, Xiaoshan Luo                                                                                                                                                                                                                                                                                        |

  - Latest Performance of the Multi-task Pretrained Model (22 energy force systems + 7 unsupervised denoise systems)

<table>
  <thead>
    <tr>
      <th rowspan=2></th>
      <th rowspan=2>Weight</th>
      <th colspan=2>DPA2 (multi-task 18 heads for 1m steps)</th>
      <th colspan=2>DPA2 (multi-task 29 heads for 1.84m steps)</th>
    </tr>
    <tr>
      <th>Energy</td>
      <th>Force</td>
      <th>Energy</td>
      <th>Force</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alloy</td>
      <td>2.0</td>
      <td>36.5</td>
      <td>169.5</td>
      <td>32.2</td>
      <td>160.5</td>
    </tr>
    <tr>
      <td>Cluster</td>
      <td>1.0</td>
      <td>34.4</td>
      <td>162.5</td>
      <td>40.6</td>
      <td>171.0</td>
    </tr>
    <tr>
      <td>Anode</td>
      <td>1.0</td>
      <td>3.3</td>
      <td>39.8</td>
      <td>2.5</td>
      <td>45.0</td>
    </tr>
    <tr>
      <td>FerroEle</td>
      <td>1.0</td>
      <td>4.4</td>
      <td>44.2</td>
      <td>1.7</td>
      <td>47.2</td>
    </tr>
    <tr>
      <td>AgAu-PBE</td>
      <td>0.2</td>
      <td>9.4</td>
      <td>28.2</td>
      <td>10.9</td>
      <td>31.2</td>
    </tr>
    <tr>
      <td>Cu</td>
      <td>0.1</td>
      <td>3.6</td>
      <td>18.2</td>
      <td>6.8</td>
      <td>21.2</td>
    </tr>
    <tr>
      <td>Sn</td>
      <td>0.1</td>
      <td>24.8</td>
      <td>69.7</td>
      <td>17.3</td>
      <td>76.7</td>
    </tr>
    <tr>
      <td>Ti</td>
      <td>0.1</td>
      <td>16.3</td>
      <td>112.4</td>
      <td>26.8</td>
      <td>133.7</td>
    </tr>
    <tr>
      <td>AlMgCu</td>
      <td>0.3</td>
      <td>4.9</td>
      <td>23.4</td>
      <td>10.6</td>
      <td>28.6</td>
    </tr>
    <tr>
      <td>V</td>
      <td>0.1</td>
      <td>13.9</td>
      <td>110.2</td>
      <td>16.7</td>
      <td>121.3</td>
    </tr>
    <tr>
      <td>W</td>
      <td>0.1</td>
      <td>24.6</td>
      <td>157.9</td>
      <td>45.8</td>
      <td>174.0</td>
    </tr>
    <tr>
      <td>C12H26</td>
      <td>0.1</td>
      <td>62.5</td>
      <td>710.6</td>
      <td>75.3</td>
      <td>1486.7</td>
    </tr>
    <tr>
      <td>SSE-PBE</td>
      <td>1.0</td>
      <td>2.1</td>
      <td>64.0</td>
      <td>2.2</td>
      <td>75.7</td>
    </tr>
    <tr>
      <td>HfO2</td>
      <td>0.1</td>
      <td>3.9</td>
      <td>102.8</td>
      <td>5.0</td>
      <td>108.4</td>
    </tr>
    <tr>
      <td>SemiCond</td>
      <td>1.0</td>
      <td>6.5</td>
      <td>131.9</td>
      <td>7.2</td>
      <td>139.8</td>
    </tr>
    <tr>
      <td>Drug</td>
      <td>2.0</td>
      <td>20.6</td>
      <td>128.9</td>
      <td>21.8</td>
      <td>140.6</td>
    </tr>
    <tr>
      <td>OC2M</td>
      <td>2.0</td>
      <td>29.3</td>
      <td>157.6</td>
      <td>26.7</td>
      <td>138.7</td>
    </tr>
    <tr>
      <td>H2O-PD</td>
      <td>1.0</td>
      <td>3.2</td>
      <td>39.7</td>
      <td>1.0</td>
      <td>45.6</td>
    </tr>
    <tr>
      <td><strong>Weighted sum</strong></td>
      <td></td>
      <td><strong>18.6</strong></td>
      <td><strong>116.3</strong></td>
      <td><strong>18.3</strong></td>
      <td><strong>123.6</strong></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>Electrolyte</td>
      <td>1.0</td>
      <td>/</td>
      <td>/</td>
      <td>2.9</td>
      <td>64.3</td>
    </tr>
    <tr>
      <td>SSE_new</td>
      <td>1.0</td>
      <td>/</td>
      <td>/</td>
      <td>3.2</td>
      <td>72.4</td>
    </tr>
    <tr>
      <td>Organic_reactions</td>
      <td>1.0</td>
      <td>/</td>
      <td>/</td>
      <td>15.1</td>
      <td>97.7</td>
    </tr>
    <tr>
      <td>Methane-combustion</td>
      <td>1.0</td>
      <td>/</td>
      <td>/</td>
      <td>147.2</td>
      <td>251.4</td>
    </tr>
  </tbody>
</table>