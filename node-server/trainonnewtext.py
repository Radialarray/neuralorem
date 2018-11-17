import sys
from textgenrnn import textgenrnn


# init textgen
textgen = textgenrnn()
textgen.train_from_file('otlaicher-weltalsentwurf.txt', num_epochs=25)
# generated_texts = textgen.generate(n=1, prefix=seed, temperature=0.2, return_as_list=False)
# print( generated_texts )