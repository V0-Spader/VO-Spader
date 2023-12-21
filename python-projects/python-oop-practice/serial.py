"""Serial number generator"""

class SerialNumberGenerator:
    """Purpose is to create unique incrementing serial numbers
    
    >>> serial = SerialNumberGenerator(start = 100)
    
    >>> serial.generate()
    100
    
    >>> serial.generate()
    101
    
    >>> serial.generate()
    102
    
    >>> serial.reset
    
    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        """Make a new generator, start from initial start."""
        self.start = self.next = start

    def __repr__(self):
        """Shows formal representation"""
        return f"<SerialNumberGenerator start={self.start} next={self.next}>"
    
    def generate(self):
        """Return next serial number in sequence"""
        self.next += 1
        return self.next -1
    
    def reset(self):
        """Reset number back to initial start"""
        self.next = self.start
