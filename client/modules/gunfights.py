from modules.asciiart import title
from modules.auth import getJWT
from InquirerPy import inquirer
import requests
import os

def gunfights():
    os.system("cls")
    title("Gunfights")
    choice = inquirer.select(
        message = "How do you want to play?",
        choices = ["Online", "Online with friends", "Go back"]
    ).execute()
    if choice == "Online": online()
    if choice == "Online with friends": onlinewithfriends()

def online():
    pass

def onlinewithfriends():
    body = {
        "jsonwebtoken": getJWT()
    }
    response = requests.get("http://localhost:3000/users", json=body)
    action = inquirer.fuzzy(
        message = "What is your friends username:",
        choices = response.json()["users"]
    ).execute()
    
    # Create gunfight room
    #Invite player
    
    print(f"\nWaiting for {action} to join...")
    input("> ")
    
    # Wait for invited player to join

    os.system("cls")
    title(f"You vs {action}")

    #loadout formatting
    loadout = [
        {
            "name": "Smith & Wesson M&P Bodyguard",
            "damage": 16,
            "effective_against": [
                "Powered Exoskeleton Suit"
            ],
            "modifications": [
                "Match-grade barrel"
            ]
        }
    ]

    formattedloadout = []
    for weapon in loadout:
        formattedweapon = f"{weapon['name']}"
        formattedweapon += f"\n     - Damage: {weapon['damage']}"
        if len(weapon["effective_against"]):
            formattedweapon += "\n     - Effective against:"
            for armor in weapon["effective_against"]:
                formattedweapon += f"\n        + {armor} "
        if len(weapon["modifications"]):
            formattedweapon += f"\n     - Modifications:"
            for mod in weapon["modifications"]:
                formattedweapon += f"\n        + {mod} "
        formattedloadout.append(formattedweapon)
    
    load = inquirer.checkbox(
        message="Choose loadout (Space) (Enter to confirm):",
        choices=formattedloadout,
        cycle=False,
        validate=lambda result: len(result) <= 4 and len(result) >= 1,
        invalid_message="You have to choose 1 weapon and max 4 weapons!",
        transformer=lambda result: "%s weapon%s selected" % (len(result), "s" if len(result) > 1 else ""),
    ).execute()
    input("> ")