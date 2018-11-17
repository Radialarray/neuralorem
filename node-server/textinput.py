import sys
from textgenrnn import textgenrnn
seed = "gestaltung"

# init textgen
# textgen = textgenrnn()
textgen = textgenrnn('textgenrnn_weights.hdf5')


generated_texts = textgen.generate(n=1, prefix=seed, temperature=0.6, return_as_list=False)
print( generated_texts )