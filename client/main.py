from modules.auth import auth, getJWT
from modules.gunfights import gunfights
from modules.inventory import inventory
from modules.character import character
from modules.asciiart import title
from InquirerPy import inquirer
import os
import jwt

auth()
jwtdecoded = jwt.decode(getJWT(), key=None, options={"verify_signature":False})

while(1):
    os.system("cls")
    title(f"Welcome {jwtdecoded['username']}!")
    options = ["Gunfights", "Inventory", "Character", "Exit"]
    choice = inquirer.select(
        message = "Whats your next move?",
        choices = options
    ).execute()
    if choice == "Gunfights": gunfights()
    if choice == "Inventory": inventory()
    if choice == "Character": character()
    if choice == "Exit": exit()