"""Finds random words form a dictionary."""

import random
"""importing the random() method to be used"""

class WordFinder:
    """machine for finding random words from a dictionary
    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True    
    """

    def __init__(self, path):
        """Read dictionary and returns num of items read"""

        dict_file = open(path)

        self.words = self.parse(dict_file)

        print(F"{len(self.words)} words read")

    def parse(self, dict_file):
        """parse dict_file -> list of words"""

        return[w.strip() for w in dict_file]
    
    def random(self):
        """return a random word"""

        return random.choice(self.words)
    
class SpecialWordFinder(WordFinder):
    """Exclusion of blank lines and comments
    >>> swf = SpecialWordFinder("complex.txt")
     3 words read
        
     >>> swf.random() in ["pear", "carrot", "kale"]
    True
        
     >>> swf.random() in ["pear", "carrot", "kale"]
    True
        
    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def parse(self, dict_file):
        """parse dict_file -> lsit of words: now excluding blanks and comments"""

        return [w.strip() for w in dict_file if w.strip() and not w.startswith("#")] 