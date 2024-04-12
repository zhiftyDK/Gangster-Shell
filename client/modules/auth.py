import requests
import os
from modules.asciiart import title
from InquirerPy import inquirer

def auth():
    options = ["Login", "Register"]
    choice = inquirer.select(
        message = "Login or register:",
        choices = options
    ).execute()
    if choice == "Login":
        return login()
    elif choice == "Register":
        register()

def register():
    os.system("cls")
    title("Register")
    username = inquirer.text(message="Username:").execute()
    email = inquirer.text(message="Email:").execute()
    password = inquirer.secret(message="Password:").execute()
    body = {
        "username": username,
        "email": email,
        "password": password
    }
    response = requests.post("http://localhost:3000/register", json=body)
    input(response.json()["message"])
    login()

def login():
    os.system("cls")
    while(1):
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
            os.system("cls")
        else:
            input("\nLogged in successfully!")
            return response.json()["jsonwebtoken"]