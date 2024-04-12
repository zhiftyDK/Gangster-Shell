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
        choices = ["Online", "Online with friends"]
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
    print(action)
    input("> ")