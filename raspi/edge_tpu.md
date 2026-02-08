# Edge Machine Learning

AI applications on microcontrollers (e.g., Arduino) or SBCs (single-board computers, e.g., Raspberry Pi) can be **heavy on CPU or GPU**. To address this, a series of products called **Edge TPU** devices are available, which run machine learning on **separate, dedicated hardware**.  

- **TPU** = *Tensor Processing Unit*  
- **Tensors** are the language of machine learning — multidimensional matrices used for predictions.  
- **Edge** means computations occur locally on the device, rather than on a centralized server.  

---

## Google Coral

Several Edge TPU devices exist. The **Google Coral** family is well-supported and suitable for Raspberry Pi.  

[Good Video](https://www.youtube.com/watch?v=TRxR74qA-5E)  

### Steps to Get Started

1. **Install the driver and firmware** first  
   [See Coral documentation](https://www.coral.ai/docs/accelerator/get-started/#1-install-the-edge-tpu-runtime)    

2. **Make sure you’re running Python 3.9.16**  
   [Download Python](https://www.python.org/downloads/release/python-3916/) | [Specs](https://developers.google.com/coral/guides/software/prerequisites)    

3. **Create a virtual environment** (with system packages if needed)  
   ```bash
   python3.9 -m venv --system-site-packages CoralTest
   source CoralTest/bin/activate
    ```
4. **You'll also need the PyCoral library**
    ```bash
    pip install --extra-index-url https://google-coral.github.io/py-repo/ pycoral~=2.0
    ```
5. Get the **example data**
    ```bash
    bash examples/install_requirements.sh classify_image.py
    ```
6. **Plug in** the coral and **reboot**
7. **Try it out:**
    ```bash
    python examples/classify_image.py \
        --model test_data/mobilenet_v2_1.0_224_inat_bird_quant_edgetpu.tflite \
        --labels test_data/inat_bird_labels.txt \
        --input test_data/parrot.jpg
    ```


