---
title: "SciAssess: Focusing on Scientific Literature Analysis Benchmarks, Exploring the Field of AI Literature Reading with the DeepModeling Community"
date: 2025-05-28
categories:
- SciAssess
---

On May 6, 2025, the DeepModeling Community released Community Manifesto 2.0, planning to rapidly expand exploratory work in the field of "AI literature reading" in the near future. Today, the SciAssess project has officially joined the DeepModeling Community. Developed jointly by DeepSeek and the Beijing Academy of Scientific Intelligence, this system is a testing benchmark specifically designed to evaluate the scientific literature analysis capabilities of large language models (LLMs), aiming to advance the process of AI empowering scientific research. SciAssess will collaborate with the community to launch explorations in the field of AI for literature analysis.

<!-- more -->

## Project Background

n recent years, with continuous breakthroughs in large language models such as GPT-4, Gemini, and LLaMA, artificial intelligence has achieved remarkable advancements in the field of natural language processing. An increasing number of studies have attempted to apply LLMs to scientific literature analysis, scientific knowledge extraction, and other fields. Although some general evaluation systems (such as MMLU) cover certain scientific tasks, they still suffer from issues such as single evaluation dimensions and neglect of multimodal information.

To address this gap, SciAssess was created. As the first systematic evaluation tool specifically designed for scientific literature analysis, it is built upon Bloom's Taxonomy of Cognitive Processes, comprehensively measuring three core capabilities of models:

* **Memory Ability (L1):** Possession of basic knowledge of scientific facts;

* **Comprehension Ability (L2):** Accurate extraction of key information from multimodal content such as text, tables, and charts;

* **Analysis and Reasoning Ability (L3):** Integration of extracted information with knowledge bases for in-depth reasoning and judgment.

## Project Introduction

SciAssess covers four scientific domains—biology, chemistry, materials science, and medicine—encompassing 27 tasks and nearly 7,000 questions. It involves five input-output formats, including text, multiple-choice questions, table extraction, molecular generation, and chart analysis, providing a comprehensive evaluation of large models' performance in real-world scientific research scenarios.

In terms of task design, SciAssess not only includes classic tasks from public datasets such as MMLU-Pro but also specially invites domain experts to carefully construct multiple new tasks based on scientific research paper scenarios, such as:

* Identification of disease gene functions in biology;

* Analysis of reaction mechanisms in chemistry;

* Judgment of heat treatment processes in materials science;

* Molecular structure generation and literature matching in medicine.
  
<center>
<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_28_05_2025/p1.png">

<font color="gray">Overview of SciAssess Domains and Tasks </font>
</center>

Additionally, SciAssess ensures the high credibility and reproducibility of each question through a rigorous data quality control system, including expert double annotation, manual verification, sensitive information anonymization, and copyright compliance review.

##  Model Evaluation and Findings

<center>
<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/DeePMD_28_05_2025/p2.png">

<font color="gray">Assessment of Main Model Science Literature Understanding Ability </font>
</center>


The team conducted systematic evaluations of 11 mainstream open-source and closed-source large models, including GPT-4o, Gemini 1.5 Pro, Claude 3 Opus, LLaMA-3, and Qwen2. The results show:

- **Memory Tasks:** GPT-4o and Qwen2.5 demonstrated excellent performance;
Comprehension Tasks: OpenAI-o1 led in multiple-choice questions and text extraction;

- **Reasoning Tasks:** GPT-4 and Gemini excelled in complex scientific logic analysis;

- **Multimodal Tasks:** GPT-4o showed the most stable performance in table and molecular structure tasks;

- **Molecular Generation Tasks:** Overall model performance remained unsatisfactory, indicating a need for future integration of specialized chemical recognition tools to assist LLMs.

Notably, SciAssess simulated PDF parsing scenarios in real scientific research, revealing the weaknesses of existing models in image/structure analysis. This highlights that integrating structure-aware and multimodal comprehension capabilities will become a critical breakthrough for scientific research AI systems.

##  Future Outlook

The release of SciAssess provides a systematic benchmark for evaluating the capabilities of scientific research large models and points out directions for model developers to improve. The team stated that it will continue to advance in the following areas:

1.Expansion to other scientific domains such as physics and engineering;

2.Enrichment of task types to cover capabilities like scientific writing and experimental design;

3.Closer collaboration with open-source communities to build an AI capability map for practical scientific research applications.

## Project Address

SciAssess is fully open-source. Community developers and researchers are welcome to use and contribute:

👉 https://github.com/deepmodeling/SciAssess
