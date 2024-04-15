from modules.authenticate import auth
from modules.gunfights import gunfights
from modules.inventory import inventory
from modules.character import character
from modules.assets import title, stats
from InquirerPy import inquirer
import os

auth()

while(1):
    os.system("cls")
    title(f"Welcome to GunSlinger!")
    stats()
    print("\n")
    options = ["Gunfights", "Inventory", "Character", "Exit"]
    choice = inquirer.select(
        message = "Whats your next move?",
        choices = options
    ).execute()
    if choice == "Gunfights": gunfights()
    if choice == "Inventory": inventory()
    if choice == "Character": character()
    if choice == "Exit": exit()