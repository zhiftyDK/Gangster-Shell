from modules.auth import auth
from modules.gunfights import gunfights
from modules.inventory import inventory
from modules.character import character
from modules.asciiart import title, gangster
from InquirerPy import inquirer
import os
import jwt

os.system("cls")
title("GangsterShell")
gangster()

token = auth()
jwtdecoded = jwt.decode(token, key=None, options={"verify_signature":False})

while(1):
    os.system("cls")
    title(f"Welcome {jwtdecoded['username']}!")
    options = ["Gunfights", "Inventory", "Character", "Friends", "Exit"]
    choice = inquirer.select(
        message = "Whats your next move?",
        choices = options
    ).execute()
    if choice == "Gunfights": gunfights()
    if choice == "Inventory": inventory()
    if choice == "Character": character()
    if choice == "Exit": exit()