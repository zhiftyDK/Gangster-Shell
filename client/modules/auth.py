import requests
import os
from modules.asciiart import title
from InquirerPy import inquirer

jsonwebtoken = ""

def auth():
    os.system("cls")
    title("GangsterShell")
    options = ["Login", "Register"]
    choice = inquirer.select(
        message = "Login or register:",
        choices = options
    ).execute()
    if choice == "Login": login()
    elif choice == "Register": register()

def register():
    os.system("cls")
    title("Register")
    username = inquirer.text(message="Username:").execute()
    email = inquirer.text(message="Email:").execute()
    password = inquirer.secret(message="Password:").execute()
    repeatPassword = inquirer.secret(message="Repeat password:").execute()
    if not password == repeatPassword:
        input("\nPasswords does not match!")
        register()
    body = {
        "username": username,
        "email": email,
        "password": password
    }
    response = requests.post("http://localhost:3000/register", json=body)
    input("\n"+response.json()["message"])
    login()

def login():
    while(1):
        os.system("cls")
        title("Login")
        email = inquirer.text(message="Email:").execute()
        password = inquirer.secret(message="Password:").execute()
        body = {
            "email": email,
            "password": password
        }
        response = requests.post("http://localhost:3000/login", json=body)
        if response.json()["error"]:
            input("\n"+response.json()["message"])
        else:
            input("\nLogged in successfully!")
            global jsonwebtoken
            jsonwebtoken = response.json()["jsonwebtoken"]
            break

def getJWT():
    return jsonwebtoken