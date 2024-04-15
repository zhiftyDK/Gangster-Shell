import pyfiglet
from tabulate import tabulate

def title(text):
    banner = pyfiglet.figlet_format(text, width=500)
    print(banner)

def stats():
    from modules.authenticate import getUserData
    userdata = getUserData()
    table = tabulate([[userdata["username"], userdata["experience"], userdata["money"]]], headers=["Name", "Lvl", "Dollars"], tablefmt='github')
    print(table)