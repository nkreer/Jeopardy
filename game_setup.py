import json
# Setting up the game of Jeopardy

# Get the defaults from the config file
with open("config.json") as configFile:
    config = json.load(configFile)

colors = config["colors"]
keys = config["keys"]
values = config["values"]
defaultbar = config["default_infobar"]
host_screen = config["host_screen"]

def create_players():
    players = {}
    while True:
        player = input("Player name: ");
        if player is "":
            # Configuration is done when no name is entered
            break

        default_color = colors[len(players)]
        color = input("Color (leave blank for " + default_color + "): ")
        # Assign the default color if no other is supplied
        if color is "":
            color = default_color

        # Are we playing with buzzer support?
        default_key = keys[len(players)]
        key = input("Key (Leave blank for " + default_key + "): ")
        # Assign the chosen buzzer key
        if key is "":
            key = default_key

        # Create player and assign given color and points
        players[player] = {}
        players[player]["color"] = color
        players[player]["points"] = 0
        players[player]["key"] = key

    return players