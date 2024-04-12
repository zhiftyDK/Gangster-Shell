from modules.auth import auth
from modules.asciiart import title
from InquirerPy import inquirer
import os
import jwt

os.system("cls")
title("GangsterShell")

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
    if choice == "Exit":
        exit()