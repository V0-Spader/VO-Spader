def Print_Upper_Words(words):
    """ Print each word on a sep line, uppercased"""
    for word in words:
        print(word.upper())



def Print_Upper_Words2(words):
    """ print each word on a sep line, uppercase, if starts with e or E"""
    for word in words:
        if word.startswith("e") or word.startswith("E"):
            print(word.upper())



def Print_Upper_Words3(words, must_start_with):
    """ print each word on a sep line, uppercase, if starts with a given letter"""
    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print(word.upper())
                break
