---
title: "DP Tutorial 2: DeePMD-kit: Install with Conda & Offline Packages & Docker"
date: 2021-07-06
categories:
- tutorial
tags:
- DeePMD-kit
---
Do you prepare to read a long article before clicking the tutorial? Since we can teach you how to setup a DeePMD-kit training in 5 minutes, we can also teach you how to install DeePMD-kit in 5 minutes. The installation manual will be introduced as follows:

<!-- more -->

## Install with conda

After you install `conda`, you can install the CPU version with the following command:

```sh
conda install deepmd-kit=*=*cpu lammps-dp=*=*cpu -c deepmodeling
```

To install the GPU version containing CUDA 10.1:

```sh
conda install deepmd-kit=*=*gpu lammps-dp=*=*gpu -c deepmodeling
```

If you want to use the specific version, just replace `*` with the version:

```sh
conda install deepmd-kit=1.3.3=*cpu lammps-dp=1.3.3=*cpu -c deepmodeling
```

## Install with offline packages

Download offline packages in the [Releases page](https://github.com/deepmodeling/deepmd-kit/releases), or use `wget`:

```sh
wget https://github.com/deepmodeling/deepmd-kit/releases/download/v1.3.3/deepmd-kit-1.3.3-cuda10.1_gpu-Linux-x86_64.sh -O deepmd-kit-1.3.3-cuda10.1_gpu-Linux-x86_64.sh
```

Take an example of `v1.3.3`. Execuate the following commands and just follow the prompts.

```sh
sh deepmd-kit-1.3.1-cuda10.1_gpu-Linux-x86_64.sh
```

## With Docker

To pull the CPU version:

docker pull ghcr.io/deepmodeling/deepmd-kit:1.2.2_cpu
To pull the GPU version:

docker pull ghcr.io/deepmodeling/deepmd-kit:1.2.2_cuda10.1_gpu

## Tips

`dp` is the program of DeePMD-kit and `lmp` is the program of LAMMPS.

```sh
dp -h
lmp -h
```

GPU version has contained CUDA Toolkit. Note that different CUDA versions support different NVIDIA driver versions. See [NVIDIA documents](https://docs.nvidia.com/deploy/cuda-compatibility/) for details.

Don't hurry up and try such a convenient installation process. But I still want to remind everyone that the above installation methods only support the official version released by DeePMD-kit. If you need to use the devel version, you still need to go through a long compilation process. Please refer to the [installation manual](https://docs.deepmodeling.org/projects/deepmd/).
