---
title: "NBHub | ABACUS+DeePKS Step-by-Step Practical Tutorial: Using the Perovskite System as an Example"
date: 2024-10-17
categories:
- Tutorials@Notebooks
mathjax: true
---

This Notebook will approach DeePKS from an application perspective, using the **perovskite system** as a case study. It systematically presents the complete process of **DeePKS model training and deployment**, including:

1. **Preparation of labeled data** for the example system,  
2. **Model training**, and  
3. **Result analysis**.  

Check out here: https://bohrium.dp.tech/collections/6242632852/

**Tutorial Structure**

Following a progression from simple to complex, this tutorial series is designed to guide readers step by step in learning DeePKS:  

- **Single-element systems**:  
   - Start with energy label training for systems containing the same type of element.  

- **Multi-label training for single-element systems**:  
   - Expand to training multiple labels (e.g., **energy**, **forces**, **stress**, and **band structure**) for single-element systems.  

- **Real-world research systems**:  
   - Transition to complex research systems (e.g., those with diverse elemental compositions), incorporating multi-label training for **energy**, **forces**, **stress**, and **band structure**.



**Learning Outcomes**

Through this tutorial, readers will:  

- Gain a **deep understanding of the DeePKS method**,  
- Master how to apply it to actual model training and deployment, and  
- Equip themselves with essential skills to support future research.


## Background
### **First-Principles Calculations Based on KS-DFT**

First-principles calculations based on **Kohn−Sham Density Functional Theory (KS-DFT)** have become one of the most widely used quantum mechanical methods at the atomic and molecular scales in recent decades. 

The **accuracy of KS-DFT** is determined by the precision of the unknown terms in the total energy—namely, the **exchange-correlation functional**. Among the various approximations of exchange-correlation functionals—such as **LDA**, **GGA**, **meta-GGA**, and **hybrid functionals** [1-2]—achieving a balance between **accuracy** and **efficiency** has always been a challenge.

- The most commonly used functional, such as the **PBE functional** under the **GGA approximation**, performs well in terms of computational efficiency but **often lacks accuracy** for specific systems.
- On the other hand, **hybrid functionals** like **HSE06** offer higher accuracy but suffer from **lower computational efficiency**, making them impractical for handling large systems.

---

### **Opportunities with Artificial Intelligence**

The **rapid development of artificial intelligence** (AI) has introduced new possibilities for representing and approximating high-dimensional complex functions. By leveraging **deep learning models** to bridge the gap between low- and high-accuracy functionals, it is now possible to achieve a good balance between efficiency and accuracy.

---

### **DeePKS Method**

The **DeePKS method** is a deep learning-based functional correction approach developed to address this challenge [3-5]. Its key features are as follows:

1. **Objective**: 
   - DeePKS does not reconstruct the exchange-correlation functional itself. 
   - Instead, it uses **machine learning techniques** to optimize low-accuracy functionals.

2. **How it Works**:
   - DeePKS learns the differences in **energy**, **forces**, **stress**, and **band structure** labels between:
     - A **baseline functional** (e.g., PBE)
     - A **target functional** (e.g., HSE06)
   - This effectively combines the advantages of low- and high-accuracy calculations.

3. **Key Benefits**:
   - **Good balance between efficiency and accuracy**.
   - **Low computational cost**:
     - Correction terms are computationally as inexpensive as low-accuracy functionals.
     - Far less expensive than high-accuracy functionals like HSE06.

---

### **Advantages in Practical Applications**

- The **computational cost of correction terms** in DeePKS is comparable to that of low-accuracy functionals.
- This makes DeePKS **significantly faster** than high-accuracy functionals, giving it a notable edge in practical applications.

---

### **Integration with DFT Software**

During **DeePKS model training**, the update of model parameters alternates with the **self-consistent calculations** of first-principles methods.  
This requires DeePKS to **seamlessly integrate** with existing **density functional theory software**.

<center><img src=https://dp-public.oss-cn-beijing.aliyuncs.com/community/DEEPKS.webp# pic_center width="100%" height="100%" /></center>


Reference: 
1.Kohn W, Sham L J. Self-consistent equations including exchange and correlation effects[J]. Physical review, 1965, 140(4A): A1133.
2.Perdew J P, Burke K, Ernzerhof M. Generalized gradient approximation made simple[J]. Physical review letters, 1996, 77(18): 3865.
3.https://github.com/deepmodeling/deepks-kit/tree/develop
4.Chen Y, Zhang L, Wang H, et al. DeePKS: A comprehensive data-driven approach toward chemically accurate density functional theory[J]. Journal of Chemical Theory and Computation, 2020, 17(1): 170-181.
5.Ou Q, Tuo P, Li W, et al. DeePKS Model for Halide Perovskites with the Accuracy of a Hybrid Functional[J]. The Journal of Physical Chemistry C, 2023, 127(37): 18755-18764.
6.https://github.com/deepmodeling/abacus-develop
7.Li W, Ou Q, Chen Y, et al. DeePKS+ ABACUS as a Bridge between Expensive Quantum Mechanical Models and Machine Learning Potentials[J]. The Journal of Physical Chemistry A, 2022, 126(49): 9154-9164.
