import eel

# Defaults
colors = ["red", "cyan", "lime", "yellow", "magenta"]

# Setting up the game of Jeopardy
players = {}

while True:
    player = input("Player name: ");
    if player is "":
        # Configuration is done
        break

    color = input("That player's color (leave blank for default): ")
    # Assign the default color
    if color is "":
        color = colors[len(players)]

    # Create player and assign given color
    players[player] = color

print(players)


# Eel stuff

eel.init("web")

@eel.expose
def quit_app():
    quit()

web_app_options = {
    'mode': "chrome-app",
    'port': 8080,
    'chromeFlags': ["--start-fullscreen"]
}

eel.start("main.html", block=False, options=web_app_options)

eel.populateBoard(6, 5)
eel.printPlayers(players)

while True:
    eel.sleep(1.0)