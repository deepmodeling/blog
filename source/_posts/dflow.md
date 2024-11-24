---
title: "The cloud-native AI4Science workflow framework Dflow | Enhances the development of scientific computing software and the OpenLAM model"
date: 2024-05-10
categories:
- Dflow
---

From the development of software ecosystems in fields such as electronic structure calculations and molecular dynamics, to the systematic evaluation of large models like OpenLAM, and gradually addressing scientific and industrial R&D problems such as biological simulations, drug design, and molecular property prediction, a series of AI4Science scientific computing software and models are rapidly advancing. This progress is closely linked to better research infrastructure, with the Dflow project being a key component.
<!-- more -->

AI advancements are driving a paradigm shift in scientific research, but the integration of scientific computing and AI faces challenges, such as the complex processes of efficient data generation and model training, and the management and scheduling of large-scale tasks. Traditional manual task management is inefficient, and script-based automation lacks reusability and maintainability. The rapid scalability of cloud computing offers new opportunities for scientific research, necessitating a new, user-friendly workflow framework that can effectively utilize cloud and high-performance computing resources, enabling seamless integration of algorithm design and practical application.

In this context, the DeepModeling community initiated and gradually improved Dflow, a Python toolkit designed to help scientists build workflows. The core features of Dflow include:

1. Enabling complex process control and task scheduling. Dflow integrates Argo Workflows for reliable scheduling and task management, uses container technology to ensure environmental consistency and reproducibility, and employs Kubernetes technology to enhance workflow stability and observability, capable of handling workflows with thousands of concurrent nodes.

2. Adapting to various environments and supporting distributed and heterogeneous infrastructure. Dflow services can run on both single machines and large Kubernetes clusters based on the cloud. Additionally, Dflow easily interfaces with high-performance computing (HPC) environments and the Bohrium® cloud computing platform specifically designed for scientific research, making it suitable for diverse computing needs.

3. Offering simple interfaces, flexible rules, and local debugging support. Before workflow submission, exception handling and fault tolerance strategies can be set. Dflow also provides a flexible restart mechanism, allowing seamlessly integrating previously completed steps into new workflows. Dflow's debug mode supports running workflows locally without using containers, offering an experience consistent with Argo Workflows.

The diagram below illustrates Dflow within the AI for Science computing framework:
<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dflow1.png# pic_center width="100%" height="100%" /></center>




So far, many workflow projects have been developed based on Dflow, covering various fields from electronic structure calculations and molecular dynamics to biological simulations, drug design, material property predictions, and automated software testing. Representative open-source software includes:

- [APEX](https://github.com/deepmodeling/apex): Workflow for alloy property calculations.

- [DPGEN2](https://github.com/deepmodeling/dpgen2): Second-generation DP potential generator.

- [Rid-kit](https://github.com/deepmodeling/rid-kit): Enhanced dynamics toolkit.

- [DeePKS-flow](https://github.com/hustlingFive/deepks-flow): Building machine learning density functionals.

- [VSW](https://github.com/dp-yuanyn/virtual-screening-workflow): Virtual screening workflow in drug design.

- [ABACUS](https://deepmodeling-activity.github.io/abacus-test.github.io/index.html?pname=performance): Automated evaluation workflow.

- [Dflow-galaxy](https://github.com/chenggroup/dflow-galaxy): Series of tools and workflows based on Dflow and ai2-kit.

- [ir-flow](https://github.com/tfzx/IR-Raman-Workflow): Spectral calculation workflow.

- [ThermalConductivity-Workflow](https://github.com/gdbhcxhmjk-z/ThermalConductivity-Workflow): Thermal conductivity calculation workflow.

There are also various industrial application software or computing platforms developed based on the Dflow framework, achieving systematic progress.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dflow2.png# pic_center width="100%" height="100%" /></center>

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/dflow3.png# pic_center width="100%" height="100%" /></center>


These extensive applications demonstrate the openness and scalability of Dflow. Additionally, the basic units in Dflow (called OPs) can be reused across different workflow applications. The Dflow ecosystem has accumulated a set of reusable OPs, such as the collection related to first-principles calculations—the FPOP project (Project link: https://github.com/deepmodeling/fpop). These components not only facilitate the development of complex workflows within the scientific community but also provide researchers with a collaborative environment to share best practices and innovations. The community ecosystem, driven by an open and scalable architecture, keeps Dflow at the forefront of workflow management, providing robust support for the evolving needs of the scientific and technological community.

In previous versions, the requirement to set up an Argo server posed a challenge for some novice users. Subsequently, the core developers of Dflow, based on the Bohrium research cloud platform, provided users with an out-of-the-box workflow middleware service (https://workflows.deepmodeling.com/), along with a beginner's guide based on Bohrium Notebook.

notebook link: https://bohrium.dp.tech/notebooks/1211442075

If you are also interested in developing an efficient, user-friendly, and automated workflow in the AI4Science era, you are welcome to embrace Dflow.

[1] https://github.com/deepmodeling/dflow 

[2] https://arxiv.org/abs/2404.18392