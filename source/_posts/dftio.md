---
title: "dftio | Collaborating with the DeepModeling Community to Develop Efficient Electronic Structure Data Processing Tools"
date: 2024-11-11
categories:
- dftio
---

**DFTIO**, initiated by the DeePTB team at the Beijing Institute of Science and Intelligence, is an efficient electronic structure data processing tool designed to convert electronic structure output information from various first-principles/quantum computation software into data formats that are easy for machine learning models to read.

In recent years, machine learning-based first-principles electronic structure models have developed rapidly, including but not limited to machine learning tight-binding models, Hamiltonian models, electronic density models, and functional models. With the advancement of these models, we have increasingly realized that the post-processing of output data from different electronic structure calculation software has become a common challenge for both developers and users. 

<!-- more -->

On the one hand, for method developers, considerable time is often required to consult and study documentation for various electronic structure calculation tools and to write data processing scripts, enabling the integration of their machine learning frameworks to support batch data reading. On the other hand, for users, differences in data format definitions between methods can hinder their ability to learn new methods and compare results across different approaches.

As machine learning-accelerated solutions for electronic structure modeling become more widespread, a toolkit that separates data operations from method development could address these issues simultaneously. Therefore, a general post-processing tool capable of interfacing with electronic structure data output from a variety of mainstream first-principles software has become an indispensable bridge between machine learning-based electronic structure method developers and software users. 

DFTIO fulfills this need by providing a streamlined and efficient solution to bridge the gap between diverse electronic structure outputs and machine learning frameworks, enhancing usability and accelerating development in this field.

## Functions

The main features of **DFTIO** include: data reading, data manipulation, preprocessing, and postprocessing of outputs from electronic structure software. It is designed to support developers, assist users in data conversion for machine learning datasets and model predictions, and facilitate visualization and analysis. The general framework of DFTIO is shown in the figure below, with specific functions as follows:

**1. Data Reading and Writing**

Based on the target of reading and writing, this can be divided into three categories:

- **DFT data → DFTIO datasets**
- **DFTIO datasets → PyTorch Dataset objects**
- **Machine learning model predictions → Readable DFT software data** (e.g., density grid points, etc.)

**2. Data Manipulation**

Based on the target of manipulation, this can also be divided into two categories:

- **Symbolic matrix data → Tensor-like data**
- **Symbolic matrix or tensor-like data → Grid data, visualizations, analyses, etc.**

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dftio/dftio1.png# pic_center width="100%" height="100%" /></center>


### Data i&o
**DFT Data → DFTIO Dataset**

DFTIO supports converting output data from DFT software into machine learning datasets with a single command. It currently supports two output data formats:

1. **.dat Text Format**:
   - Atomic structure information is stored in text format.
   - Operator matrices are stored in the h5py database format.
   - Easy to read and parse, with high I/O efficiency during training.
   - Suitable for training on small to medium-sized datasets.

2. **.lmdb Database Format**:
   - Data is stored in compressed binary format.
   - Suitable for large-scale datasets (10,000+ configurations).
   - Fast read/write speeds with minimal storage overhead.
   - Ideal for large-scale data training.

DFTIO’s data conversion functionality supports parallel processing, making it capable of handling large datasets efficiently. To facilitate support for new software, DFTIO separates general functionalities like I/O operations, parallel settings, and data processing from the core data conversion logic. A universal output format and corresponding data interfaces have been defined. As a result, adding support for new software only requires developers to implement a few simple data conversion methods.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dftio/dftio2.png# pic_center width="100%" height="100%" /></center>

**DFTIO Dataset → PyTorch Dataset Class**

DFTIO includes a ready-to-use PyTorch Dataset class. This dataset class can directly read datasets converted by DFTIO and provides standard interfaces. Developers can focus on designing and optimizing machine learning methods and models while relying on DFTIO’s pre-defined PyTorch Dataset types through dependency packages. Additionally, data processing can be handled using DFTIO’s command-line tools, saving a significant amount of redundant effort.

### Data Manipulation

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dftio/dftio3.png# pic_center width="100%" height="100%" /></center>

The fundamental data of electronic structures typically involves formats such as equivariant vectors (e.g., wavefunction coefficients), equivariant matrix operators (e.g., Hamiltonians, density matrices), and grid-based fields (e.g., wavefunctions, charge densities). For many physical quantities, obtaining one format allows the computation of its equivalent representation in other formats. For instance:

- Once wavefunction coefficients (equivariant vectors) are obtained, they can be combined with the basis set to compute real-space wavefunctions (grid-based fields).
- Once the density matrix (equivariant matrix operator) is available, it can be converted to real-space charge density (grid-based fields).
- Conversely, real-space charge density can be used to derive coefficients expanded on a given basis set (equivariant vectors).

Current machine learning methods often rely on specific data formats and can only work with one fixed format. However, data formats produced by electronic structure software vary between methods. For example, plane-wave-based DFT software struggles to output equivariant vectors/matrix operators in LCAO basis sets. Enabling conversions between different formats can make machine learning methods compatible with a broader range of electronic structure software.

Additionally, data manipulation can help users visualize output data when using machine learning models, making it easier to analyze and interpret physical phenomena.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dftio/dftio4.png# pic_center width="100%" height="100%" /></center>

## Projects
DFTIO is now open-source in the DeepModeling community. We welcome you to use it or contribute to its development.

DFTIO project repository: https://github.com/deepmodeling/dftio