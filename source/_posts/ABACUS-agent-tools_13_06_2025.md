---
titile : "AI4S-Agent Co-building Initiative | Local Setup and Contribution Cases of ABACUS-agent-tools"
date : 2025-06-13
categories : 
- ABACUS
---

This document describes how to install ABACUS agent and Google ADK in a local Linux environment (including WSL) as of June 12, 2025, and how to run a simple ABACUS calculation after startup.

Requirements: conda and ABACUS (recommended to install v3.10 LTS version) are installed locally.

<!-- more -->

##  Tutorial for Experiencing ABACUS-agent-tools in Local Environment

**Local Installation and Startup**

**Create and activate the environment**

```
conda create -n abacus-agent python=3.11  
conda activate abacus-agent  
```

**Install MCP, Google ADK, Litellm, and science-agent-sdk**

```
pip install mcp google-adk litellm science-agent-sdk  
```

**Install abacus-agent**

```
git clone -b develop https://github.com/deepmodeling/ABACUS-agent-tools/  
cd abacus-agent  
pip install .  
```

**Install abacus-test**

```
cd ..  
git clone -b develop https://github.com/pxlxingliang/abacus-test.git  
cd abacus-test  
pip install .  
```

If ABACUS is not installed, you can install it with conda:

```
conda install abacus "libblas=*=*mkl" mpich -c conda-forge  
```

**Set environment variables required by ABACUS agent tools**

Before starting `abacusagent`, some environment variables need to be set in the configuration file. This file is located at `.abacusagent/env.json`. If the file does not exist, you can create it directly.

When running ABACUS agent and Google ADK locally for ABACUS calculations, it is recommended to set at least the following environment variables: `ABACUSAGENT_WORK_PATH`, `ABACUS_COMMAND`, `ABACUS_PP_PATH`, `ABACUS_ORB_PATH`. Environment variables can be added by inserting them into env.json.

It is recommended to use the efficiency orbitals and pseudopotentials in APNS-v1.

```
{
    "_comments": {
        "ABACUS_WORK_PATH": "The working directory for AbacusAgent, where all temporary files will be stored.",
        "ABACUS_SUBMIT_TYPE": "The type of submission for ABACUS, can be local or bohrium.",
        "ABACUSAGENT_HOST": "The host address for the AbacusAgent server.",
        "ABACUSAGENT_PORT": "The port number for the AbacusAgent server.",
        "ABACUSAGENT_MODEL": "The model to use for AbacusAgent, can be 'fastmcp', 'test', or 'dp'.",
        "BOHRIUM_USERNAME": "The username for Bohrium.",
        "BOHRIUM_PASSWORD": "The password for Bohrium.",
        "BOHRIUM_PROJECT_ID": "The project ID for Bohrium.",
        "BOHRIUM_ABACUS_IMAGE": "The image for Abacus on Bohrium.",
        "BOHRIUM_ABACUS_MACHINE": "The machine type for Abacus on Bohrium.",
        "BOHRIUM_ABACUS_COMMAND": "The command to run Abacus on Bohrium",
        "ABACUS_COMMAND": "The command to execute Abacus on local machine.",
        "ABACUS_PP_PATH": "The path to the pseudopotential library for Abacus.",
        "ABACUS_ORB_PATH": "The path to the orbital library for Abacus.",
        "_comments": "This dictionary contains the default environment variables for AbacusAgent."
    }
}
```

**Start abacusagent (or start in the background)**


```
# Foreground startup  
abacusagent  

# Background startup  
nohup abacusagent &  
```

The default port used is 50001, and the MCP server address is localhost. Use abacusagent -h to see how to change the MCP backend, the IP address, and port of the running MCP server.

If the previous step was not started in the background, open a new terminal next and load the Python environment of the previous terminal.

## Prepare agent.py for use by Google ADK

```
mkdir my_agents && cd my_agents  
mkdir abacus_agent && cd abacus_agent  
```

Create `agent.py` and fill in the following content:

```
import os  
from google.adk.agents import Agent  
from google.adk.models.lite_llm import LiteLlm  
from google.adk.tools.mcp_tool import MCPToolset  
from google.adk.tools.mcp_tool.mcp_toolset import SseServerParams  
from dp.agent.adapter.adk import CalculationMCPToolset  

# Set the environment variables required for the LLM you are using and your own API key here  
os.environ['DEEPSEEK_API_KEY'] = ""  
model = LiteLlm(model='deepseek/deepseek-chat')  

instruction = """You are an expert in materials science and computational chemistry. "
                "Help users perform ABACUS including single point calculation, structure optimization, molecular dynamics and property calculations. "
                "The website of ABACUS documentation is at https://abacus.deepmodeling.com/en/latest/, please read it if necessary."  
                "Use default parameters if the users do not mention, but let users confirm them before submission. "
                "Always verify the input parameters to users and provide clear explanations of results."
                "The LCAO basis is prefered."
                """  

# Modify the url here according to the port used when starting abacusagent  
toolset = CalculationMCPToolset(  
    connection_params=SseServerParams(  
        url="http://localhost:50001/sse",  
    )  
)  

root_agent = Agent(  
    name="Abacus_agent",  
    model=model,  
    instruction=instruction,  
    tools=[toolset]  
)
```

Explanation:

1.An LLM API key is required and imported into the environment variable. The example shows the method of using Deepseek's API; fill in the API key on line 9. For using other LLMs, please query the environment variables that need to be imported and modify line 14.

2.Line 12 gives the prompt for the LLM, which can be appropriately modified to make the LLM perform better.

3.The port of the URL in line 23 needs to be the same as the port used when starting abacusagent.

## Start Google ADK

After writing `agent.py`, start Google ADK locally:

```
cd ..  
adk web
```

If the port is occupied, you can modify the port: `adk web --port 8001`

```
Started server process [3260] INFO: INFO:  
Waiting for application startup.  
ADK Web Server started  
For local testing, access at http://localhost:8001.  
INFO: INFO:  
Application startup complete. Uvicorn running on http://127.0.0.1:8001 (Press CTRL+C to quit)  
```

Access the given URL in a browser to start the conversation. You can use Chinese or English for the conversation.

Below is an example of performing a relax calculation on a water molecule and giving the bond length of the O-H bond and the bond angle of H-O-H after optimization.

```
H2O  
1.0  
10.00000000    0.00000000    0.00000000  
 0.00000000   10.00000000    0.00000000  
 0.00000000    0.00000000   10.00000000  
  O  H  
  1  2  
Cartesian  
4.89025267    4.76510552    4.31745869  
5.79758521    5.07855692    4.30766611  
4.34283524    5.35177489    3.79043572  
```

<center>
<img src = "https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p1.png" >
</center>

<center>
<img src = "https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p2.png" >
</center>

<center>
<img src = "https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p3.png" >
</center>

<center>
<img src = "https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p4.png" >
</center>

**Add your own written tool functions**

Currently, you can add your own written functions in `src/abacusagent/modules` and use the decorator `@mcp.tool() . `It is necessary to restart `abacusagent` and `adk`.

## Contribution Cases

**Calculation Function Case - Bader Charge Calculation**

To implement Bader charge calculation, the following tool functions need to be built:

1.Calculate the charge density based on the given ABACUS input file.

2.Merge the charge densities of different spin components into one file.

3.Perform Bader charge analysis using the merged file and output the results.

Therefore, create the file `bader.py` and place it in the `src/abacusagent/modules/` directory. Construct the following functions in the file:

```
from abacusagent.init_mcp import mcp  
from typing import Optional, List  

@mcp.tool()  # important! to make this function visible to Agent  
def calculate_charge_densities_with_abacus(  
    abacus: str,  
    jobdir: str  
) -> Optional[List[str]]:  
    """  
    calculate the charge densities (of different spin channels, if calculation  
    is polarized) within given prepared ABACUS job directory  
    Parameters:  
    abacus (str): Path to the abacus executable.  
    jobdir (str): Directory where the job files are located.  
    Returns:  
    list: List of file names for the charge density cube files.  
    """  

@mcp.tool()  # important! to make this function visible to Agent  
def merge_charge_densities_of_different_spin(  
    cube_manipulator: str,  
    fcube: List[str]  
) -> str:  
    """  
    merge the charge densities of different spin channels into one file  
    Parameters:  
    cube_manipulator (str): Path to the cube manipulator executable.  
    fcube (list): List of file names for the cube files to be manipulated.  
    Returns:  
    str: Output cube file path.  
    """  

@mcp.tool()  # important! to make this function visible to Agent  
def calculate_bader_charges(  
    bader: str,  
    fcube: str  
) -> List[str]:  
    """  
    Calculate Bader charges using the bader executable.  
    Parameters:  
    bader (str): Path to the bader executable.  
    fcube (str): Path to the cube file containing charge density.  
    Returns:  
    list: A list of file names generated by the Bader analysis.  
    """
```

In addition, several tool functions are implemented for automatically identifying whether it is a spin-polarized calculation and reading input/output files. Decorate the above main functions expected to be called by the Agent with the `mcp_tool()` decorator to enable Agent calls.

**Calculation Example Contribution Case - Band Gap of NiO**

To automatically select examples from the database for the requested material calculation, a tool function in ABACUS-agent-tools is written and stored in `src/abacusagent/modules/abacus.py`:

```
from abacusagent.init_mcp import mcp  
from typing import Literal, TypedDict  
from pathlib import Path  
import json  
import time  
import os  
import shutil  
from abacusagent.preprocess import PrepInput  
from abacusagent.utils import WriteInput  

@mcp.tool()  
def abacus_prepare_example_material(  
    chemical_formula: Literal['NiO'] = 'NiO'  
    ) -> TypedDict("results", {"job_path": str, 'description': str}):  
    """  
    Prepare input files for ABACUS from given examples. Should only be used if the completely same material are requested to calculate.  
    Currently examples are listed here:  
        - NiO: A typical antiferromagnetic material. The provided example calculate the band gap of NiO with PBE+U and the U for Ni 3d is 5 eV.  
    Args:  
        chemical_formula: The chemical formula of the material. Should be among provided examples.  
    Returns:  
        A dictionary contains the job path, with input files generated according to provided examples and original description in the example.  
    """  
    example_database_path = Path(__file__).resolve().parent / "example_data"  
    with open(example_database_path / f"{chemical_formula}.json") as fin:  
        job_info = json.load(fin)  
    input, stru = job_info['input'], job_info['stru']  
    current_time = time.strftime("%Y%m%d%H%M%S")  
    job_work_dir = Path(f"{os.environ['ABACUSAGENT_WORK_PATH']}") / f"{chemical_formula}-{current_time}"  
    temp_stru_file_path = f'/tmp/{chemical_formula}-{current_time}'  
    with open(temp_stru_file_path, "w") as fout:  
        for lines in stru:  
            fout.write(lines + "\n")  
    fout.close()  
    _, job_path = PrepInput(  
        files=temp_stru_file_path,  
        filetype="abacus/stru",  
        jobtype='scf',  
        lcao=True  
    ).run()  
    job_path = Path(job_path[0])  
    WriteInput(input, job_path / "INPUT")  
    os.remove(temp_stru_file_path)  
    shutil.move(job_path, job_work_dir)  
    return {'job_path': str(job_work_dir.absolute()),  
            'description': job_info['description']}
```

For example, after preparing the following NiO band gap calculation case (stored in `src/abacusagent/modules/example_data/NiO.json`), the Agent can find that the NiO band gap case has been saved in the database and automatically read the database to prepare ABACUS calculation files.

```
{  
        "description": "This example is calculating the band gap of NiO using APNS-v1 pseudopotential and orbital bundle. This material is a typical magnetic material. The magnetic moment of Ni atoms are in antiferromangetics form. The band gap are calculated using PBE+U with Ueff= 7 eV for Ni 3d orbital.",  
        "input": {  
            "suffix": "NiO",  
            "ntype": 2,  
            "calculation": "scf",  
            "ecutwfc": 100,  
            "scf_thr": 1e-07,  
            "scf_nmax": 200,  
            "smearing_method": "gaussian",  
            "smearing_sigma": 0.01,  
            "mixing_type": "broyden",  
            "mixing_beta": 0.2,  
            "mixing_gg0": 1.5,  
            "ks_solver": "genelpa",  
            "basis_type": "lcao",  
            "gamma_only": 0,  
            "symmetry": 1,  
            "nspin": 2,  
            "dft_plus_u": 1,  
            "orbital_corr": "2     -1",  
            "hubbard_u": "7.0  0.0",  
            "out_mul": 1,  
            "out_bandgap": 1,  
            "kspacing": 0.1  
        },  
        "stru": [  
            "ATOMIC_SPECIES",  
            "Ni  58.6934 Ni_ONCV_PBE-1.2.upf upf201",  
            "O  15.9994 O.upf upf201",  
            "NUMERICAL_ORBITAL",  
            "Ni_gga_8au_100Ry_4s2p2d1f.orb",  
            "O_gga_6au_100Ry_2s2p1d.orb",  
            "LATTICE_CONSTANT",  
            "1.8897260000",  
            "LATTICE_VECTORS",  
            "4.1632639461         2.0729584133         2.0729584133",  
            "2.0729584133         4.1632639461         2.0729584133",  
            "2.0729584133         2.0729584133         4.1632639461",  
            "ATOMIC_POSITIONS",  
            "Direct",  
            "Ni #label",  
            "0.0000   #magnetism",  
            "2 #number of atoms",  
            "0.0000000000         0.0000000000         0.0000000000 m 1 1 1 mag  1.3047",  
            "0.5000000000         0.5000000000         0.5000000000 m 1 1 1 mag -1.3047",  
            "O #label",  
            "0.0000   #magnetism",  
            "2 #number of atoms",  
            "0.2500000000         0.2500000000         0.2500000000 m 1 1 1 mag -0.0000",  
            "0.7500000000         0.7500000000         0.7500000000 m 1 1 1 mag -0.0000"  
        ],  
        "pp": "APNS-v1",  
        "orb": "APNS-v1"  
    }
```

<center>
<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p5.png">
</center>

For subsequent further development, it is hoped to achieve fuzzy matching, select the case closest to the desired calculation from the database, and automatically prepare the input file.

**Bader Charge Calculation Case Demonstration**

A workflow driver function named `calculate` is also created in `bader.py`:

```
@mcp.tool()  
def calculate(  
    jobdir: str,  
    abacus: str,  
    cube_manipulator: str,  
    bader: str  
) -> List[float]:  
    """  
    Calculate Bader charges for a given job directory, with ABACUS as  
    the dft software to calculate the charge density, and then postprocess  
    the charge density with the cube manipulator and Bader analysis.  
    Parameters:  
    jobdir (str): Directory where the job files are located.  
    abacus (str): Path to the abacus executable.  
    cube_manipulator (str): Path to the cube manipulator executable.  
    bader (str): Path to the bader executable.  
    Returns:  
    list: A list of Bader charges.  
    """
```

Therefore, if the prompt is written correctly, the numerical values of Bader charges can be directly obtained, and the Agent will automatically perform ABACUS calculation, cube file processing, and Bader post-processing operations:

<center>
<img src="https://dp-public.oss-cn-beijing.aliyuncs.com/community/Blog%20Files/ABACUS-agent-tools_13_06_2025/p6.jpg">
</center>








