import sys
from textgenrnn import textgenrnn

# get request
args = sys.argv[1:]
seed = args[0]

# init textgen
textgen = textgenrnn()

generated_texts = textgen.generate(n=1, prefix=seed, temperature=0.2, return_as_list=False)
print( generated_texts )