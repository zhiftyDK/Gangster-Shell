import pyfiglet

def title(text):
    banner = pyfiglet.figlet_format(text, width=500)
    print(banner)